// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import {IConnext} from "@connext/smart-contracts/contracts/core/connext/interfaces/IConnext.sol";
import {IXReceiver} from "@connext/smart-contracts/contracts/core/connext/interfaces/IXReceiver.sol";
import "./interfaces/external/aaveV3/types/DataTypes.sol";
import "./interfaces/IRoute.sol";
import "./helpers/Errors.sol";

contract Registry is IXReceiver, Ownable {

    using SafeERC20 for IERC20;

    IConnext public immutable connext;

    enum RequestType {
        DEPOSIT,
        BORROW
    }

    struct RouteData {
        address route;
        bool isEnabled;
    }

    struct BridgeRequest {
        uint32 destinationDomain;
        uint256 relayerFee;
        uint256 slippage;
    }

    struct VaultRequest {
        uint256 routeId;
        uint256 amount;
        address vaultAddress;
        address underlying;
        address onBehalfOf;
        BridgeRequest bridgeRequest;
    }

    struct RemoteRegistry {
        uint32 domainId;
        address reomoteRegistry;
    }

    RouteData[] public routes;

    mapping(uint32 => address) public registryForDomains;

    event RouteAdded(uint256 routeId, address route, bool isEnabled);

    event RouteDisabled(uint256 routeId);

    event Bridged(address sender, bytes32 transferId);


    // Todo: add source chain authentication by mapping sourceDomain->sourceRegsitry
    modifier onlySource(address _originSender, uint32 _origin) {
        if (registryForDomains[_origin] != _originSender ||
            msg.sender != address(connext)) revert Errors.Unauthorized();
        _;
    }

    // Todo: change the routes check logic for case: 
    // tx includes bridge and routeId of destination chane is not present on source chain
    modifier onlyExistingRoutes(uint256 _routeId) {
        if(routes[_routeId].route == address(0)) revert Errors.RouteNotFound(_routeId);
        _;
    }

    constructor (address _connext) {
        connext = IConnext(_connext);
    }

    /**
     @notice Deposit user funds in multiple vaults
     @param _depositRequest list of vaultRequest to deposit in multiple vaults
     */
    function userDepositRequest(
        VaultRequest[] calldata _depositRequest
    )   external
        payable
        returns (bytes32[] memory)
    {   
        bytes32[] memory transferIds = new bytes32[](_depositRequest.length);
        for(uint i=0; i<_depositRequest.length; i++) {
            _checkUserRequest(
                _depositRequest[i].amount, 
                _depositRequest[i].onBehalfOf, 
                _depositRequest[i].vaultAddress, 
                _depositRequest[i].underlying
            );

            // Check destination domain if not same as current domain, need to bridge
            if (_depositRequest[i].bridgeRequest.destinationDomain != connext.domain()) {
                if (registryForDomains[_depositRequest[i].bridgeRequest.destinationDomain] == address(0)) revert Errors.DomainNotSupported();
                bytes memory _params = abi.encode(
                    _depositRequest[i].onBehalfOf,
                    _depositRequest[i].vaultAddress
                );
                // payload for xcall
                bytes memory _payload = abi.encode(
                    RequestType.DEPOSIT,
                    _depositRequest[i].routeId,
                    _params
                );

                // User sends funds to this contract
                IERC20(_depositRequest[i].underlying).safeTransferFrom(msg.sender, address(this), _depositRequest[i].amount);
                // This contract approves transfer to Connext
                IERC20(_depositRequest[i].underlying).safeApprove(address(connext), _depositRequest[i].amount);

                // send xcall
                bytes32 transferId = connext.xcall{value: _depositRequest[i].bridgeRequest.relayerFee}(
                    _depositRequest[i].bridgeRequest.destinationDomain, 
                    registryForDomains[_depositRequest[i].bridgeRequest.destinationDomain], 
                    _depositRequest[i].underlying,
                    address(0), 
                    _depositRequest[i].amount, 
                    _depositRequest[i].bridgeRequest.slippage, 
                    _payload
                );
                transferIds[i] = transferId;
                emit Bridged(msg.sender, transferId);
            } 
            // if bridge is not required, deposit in the vault
            else {
                if(routes[_depositRequest[i].routeId].route == address(0)) revert Errors.RouteNotFound(_depositRequest[i].routeId);
                IERC20(_depositRequest[i].underlying).safeTransferFrom(
                    msg.sender, 
                    routes[_depositRequest[i].routeId].route, 
                    _depositRequest[i].amount
                );

                _userDeposit(
                    _depositRequest[i].routeId, 
                    _depositRequest[i].amount, 
                    _depositRequest[i].onBehalfOf, 
                    _depositRequest[i].underlying, 
                    _depositRequest[i].vaultAddress
                );
                transferIds[i] = 0x00;
            }
        }
        return transferIds;
    }

    function userBorrowRequest(
        VaultRequest calldata _borrowRequest,
        uint256 _interestRateMode
    )   external
        payable
        onlyExistingRoutes(_borrowRequest.routeId)
        returns(bytes32) 
    {
        _checkUserRequest(
            _borrowRequest.amount, 
            _borrowRequest.onBehalfOf, 
            _borrowRequest.vaultAddress, 
            _borrowRequest.underlying
        );

        if (_borrowRequest.bridgeRequest.destinationDomain != connext.domain()) {
            if (registryForDomains[_borrowRequest.bridgeRequest.destinationDomain] == address(0)) revert Errors.DomainNotSupported();
            // encode the params for borrow 
            bytes memory _params = abi.encode(
                _borrowRequest.amount,
                _interestRateMode,
                _borrowRequest.onBehalfOf,
                _borrowRequest.underlying,
                _borrowRequest.vaultAddress
            );
            // payload for xcall 
            bytes memory _payload = abi.encode(
                RequestType.BORROW,
                _borrowRequest.routeId,
                _params
            );

            // send xcall
            bytes32 transferId = connext.xcall{value: _borrowRequest.bridgeRequest.relayerFee}(
                _borrowRequest.bridgeRequest.destinationDomain, 
                registryForDomains[_borrowRequest.bridgeRequest.destinationDomain], 
                address(0),
                address(0), 
                0, 
                0, 
                _payload
            );

            emit Bridged(msg.sender, transferId);
            return transferId;

        } else {
            if(routes[_borrowRequest.routeId].route == address(0)) revert Errors.RouteNotFound(_borrowRequest.routeId);
            _userBorrow(
                _borrowRequest.routeId,
                _borrowRequest.amount,
                _interestRateMode,
                _borrowRequest.underlying,
                _borrowRequest.onBehalfOf,
                _borrowRequest.vaultAddress
            );
            return 0x00;
        }


    }

    function userWithdrawRequest(
        VaultRequest calldata _withdrawRequest
    )   external 
        payable 
        onlyExistingRoutes(_withdrawRequest.routeId)
        returns (uint256)
    {
        _checkUserRequest(
            _withdrawRequest.amount, 
            _withdrawRequest.onBehalfOf, 
            _withdrawRequest.vaultAddress, 
            _withdrawRequest.underlying
        );
        
        // transfer yield bearing token from user wallet to route
        address yieldBreaingToken = IRoute(routes[_withdrawRequest.routeId].route).
                                        getYieldBearingToken(
                                            _withdrawRequest.underlying, 
                                            _withdrawRequest.vaultAddress
                                        );

        IERC20(yieldBreaingToken).safeTransferFrom(
            msg.sender, 
            routes[_withdrawRequest.routeId].route, 
            _withdrawRequest.amount
        );
        uint256 withdrawnAmount = IRoute(routes[_withdrawRequest.routeId].route).withdraw(
            _withdrawRequest.amount, 
            _withdrawRequest.onBehalfOf, 
            _withdrawRequest.underlying, 
            _withdrawRequest.vaultAddress
        );

        return withdrawnAmount;
    }

    
    function xReceive(
        bytes32 ,
        uint256 _amount,
        address _asset,
        address _originSender,
        uint32 _origin,
        bytes memory _callData
    ) external onlySource(_originSender, _origin) returns (bytes memory) {
        (
            RequestType _request,
            uint256 _routeId,
            bytes memory _params
        ) = abi.decode(_callData, (RequestType, uint256, bytes));

        // check if route exists
        if(routes[_routeId].route == address(0)) revert Errors.RouteNotFound(_routeId);

        // check for the request type
        if (_request == RequestType.DEPOSIT) {
            (address _onBehalfOf, address _vaultAddress) = abi.decode(_params, (address, address));
            IERC20(_asset).safeTransfer(routes[_routeId].route, _amount);
            // TODO: check for input params if required
            // TODO: check for revert with try catch
            _userDeposit(_routeId, _amount, _onBehalfOf, _asset, _vaultAddress);
        } else if (_request == RequestType.BORROW) {
            (
                uint256 _borrowAmount,
                uint256 _interestRateMode,
                address _onBehalfOf,
                address _borrowUnderlying,
                address _vaultAddress
            ) = abi.decode(_params, (uint256, uint256, address, address, address));
            // borrow the asset
            _userBorrow(
                _routeId,
                _borrowAmount,
                _interestRateMode,
                _borrowUnderlying,
                _onBehalfOf,
                _vaultAddress
            );

            // TODO: send borrowed asset back to source chain
        }
    }

    /**
     @notice Borrow specified assets from the vault
     @param _routeId Id of the route to follow
     @param _amount amount of underlying to deposit
     @param _interestRateMode type of interest rate mode
     @param _borrowAsset address of the asset to borrow
     @param _onBehalfOf address of the receiver to get yield tokens
     @param _vaultAddress address of vault to deposit
     */
    function _userBorrow(
        uint256 _routeId,
        uint256 _amount,
        uint256 _interestRateMode,
        address _borrowAsset,
        address _onBehalfOf,
        address _vaultAddress
    ) internal {
        IRoute(routes[_routeId].route).borrow(
            _amount,
            _interestRateMode,
            _borrowAsset,
            _onBehalfOf,
            _vaultAddress
        );
    }

    /**
     @notice Deposit User assets in specified vault
     @param _routeId Id of the route to follow
     @param _amount amount of underlying to deposit
     @param _onBehalfOf address of the receiver to get yield tokens
     @param _vaultAddress address of vault to deposit
     @param _underlying address of underlying token
     */ 
    function _userDeposit(
        uint256 _routeId,
        uint256 _amount,
        address _onBehalfOf,
        address _underlying,
        address _vaultAddress
    ) internal {
        IRoute(routes[_routeId].route).deposit(
            _amount, 
            _onBehalfOf, 
            _underlying, 
            _vaultAddress
        );
    }

    /**
     @notice Check User Request params, reverts if invalid
     @param _amount amount of underlying to deposit
     @param _onBehalfOf address of the receiver to get yield tokens
     @param _vaultAddress address of vault to deposit
     @param _underlying address of underlying token
     */ 
    function _checkUserRequest(
        uint256 _amount,
        address _onBehalfOf,
        address _vaultAddress,
        address _underlying
    ) internal pure {
        // check for amount, revert if 0
        if (_amount == 0) revert Errors.ZeroAmount();
        // check for input params, revert if zero address
        if (_onBehalfOf == address(0) ||
            _vaultAddress == address(0) ||
            _underlying == address(0)) revert Errors.ZeroAddress();
    }

    // Registry Management Functions

    /**
     @notice map registry address with domain Id of remote chain
     @param _remoteRegistries: list of remote registries
     */
    function addRemoteRegistry(
        RemoteRegistry[] calldata _remoteRegistries
    ) external onlyOwner {
        for (uint256 i = 0; i < _remoteRegistries.length; i++) {
            if (_remoteRegistries[i].reomoteRegistry == address(0)) revert Errors.ZeroAddress();
            registryForDomains[_remoteRegistries[i].domainId] = _remoteRegistries[i].reomoteRegistry;
        }
    }

    // Route Management Functions

    /**
     @notice add routes to the registry
     @param _routes: list of routes to be added in `RouteData` format
     */
    function addRoute(RouteData[] calldata _routes)
        external
        onlyOwner
        returns (uint256[] memory)
    {
        if(_routes.length == 0) revert Errors.ZeroRoutes();
        uint256[] memory routeIds = new uint256[](_routes.length);
        for (uint256 i = 0; i < _routes.length; i++) {
            if(_routes[i].route == address(0)) revert Errors.ZeroAddress();
            routes.push(_routes[i]);
            routeIds[i] = routes.length - 1;
            emit RouteAdded(i, _routes[i].route, _routes[i].isEnabled);
        }
        return routeIds;
    }

    /**
     @notice Disable route if required
     @param _routeId: Id of the existing route to disable
     */
    function disableRoute(uint256 _routeId)
        external
        onlyOwner
        onlyExistingRoutes(_routeId) 
    {
        routes[_routeId].isEnabled = false;
        emit RouteDisabled(_routeId);
    }

    /**
     @notice Rescue funds if required. can only be called by `owner`
     @param _token: address of the token to rescue
     @param _onBehalfOf: address of the receiver for the provided `_token`
     @param _amount: amount of the tokens to rescue
     */
    function rescueFunds(
        address _token,
        address _onBehalfOf,
        uint256 _amount
    ) external onlyOwner {
        IERC20(_token).safeTransfer(_onBehalfOf, _amount);
    }

}