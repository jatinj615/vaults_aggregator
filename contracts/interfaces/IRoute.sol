// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IRoute {

    function getYieldBearingToken(
        address _underlying, 
        address _vaultAddress
    ) external view returns(address);
    
    function deposit(
        uint256 _amount, 
        address _receiverAddress, 
        address _underlying, 
        address _vaultAddress
    ) external;

    function withdraw(
        uint256 _amount,
        address _receiver,
        address _underlying,
        address _vaultAddress 
    ) external returns (uint256);

    function borrow(
        uint256 _amount,
        uint256 _interestRateMode,
        address _asset,
        address _onBehalfOf,
        address _vaultAddress
    ) external;
}