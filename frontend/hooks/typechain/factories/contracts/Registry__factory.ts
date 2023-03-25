/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type { Registry, RegistryInterface } from "../../contracts/Registry";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_connext",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "DomainNotSupported",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "routeId",
        type: "uint256",
      },
    ],
    name: "RouteNotFound",
    type: "error",
  },
  {
    inputs: [],
    name: "Unauthorized",
    type: "error",
  },
  {
    inputs: [],
    name: "ZeroAddress",
    type: "error",
  },
  {
    inputs: [],
    name: "ZeroAmount",
    type: "error",
  },
  {
    inputs: [],
    name: "ZeroRoutes",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "transferId",
        type: "bytes32",
      },
    ],
    name: "Bridged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "routeId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "route",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "isEnabled",
        type: "bool",
      },
    ],
    name: "RouteAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "routeId",
        type: "uint256",
      },
    ],
    name: "RouteDisabled",
    type: "event",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "uint32",
            name: "domainId",
            type: "uint32",
          },
          {
            internalType: "address",
            name: "reomoteRegistry",
            type: "address",
          },
        ],
        internalType: "struct Registry.RemoteRegistry[]",
        name: "_remoteRegistries",
        type: "tuple[]",
      },
    ],
    name: "addRemoteRegistry",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "route",
            type: "address",
          },
          {
            internalType: "bool",
            name: "isEnabled",
            type: "bool",
          },
        ],
        internalType: "struct Registry.RouteData[]",
        name: "_routes",
        type: "tuple[]",
      },
    ],
    name: "addRoute",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "connext",
    outputs: [
      {
        internalType: "contract IConnext",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_routeId",
        type: "uint256",
      },
    ],
    name: "disableRoute",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint32",
        name: "",
        type: "uint32",
      },
    ],
    name: "registryForDomains",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_token",
        type: "address",
      },
      {
        internalType: "address",
        name: "_onBehalfOf",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "rescueFunds",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "routes",
    outputs: [
      {
        internalType: "address",
        name: "route",
        type: "address",
      },
      {
        internalType: "bool",
        name: "isEnabled",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "routeId",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "vaultAddress",
            type: "address",
          },
          {
            internalType: "address",
            name: "underlying",
            type: "address",
          },
          {
            internalType: "address",
            name: "onBehalfOf",
            type: "address",
          },
          {
            components: [
              {
                internalType: "uint32",
                name: "destinationDomain",
                type: "uint32",
              },
              {
                internalType: "uint256",
                name: "relayerFee",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "slippage",
                type: "uint256",
              },
            ],
            internalType: "struct Registry.BridgeRequest",
            name: "bridgeRequest",
            type: "tuple",
          },
        ],
        internalType: "struct Registry.VaultRequest",
        name: "_borrowRequest",
        type: "tuple",
      },
      {
        internalType: "uint256",
        name: "_interestRateMode",
        type: "uint256",
      },
    ],
    name: "userBorrowRequest",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "routeId",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "vaultAddress",
            type: "address",
          },
          {
            internalType: "address",
            name: "underlying",
            type: "address",
          },
          {
            internalType: "address",
            name: "onBehalfOf",
            type: "address",
          },
          {
            components: [
              {
                internalType: "uint32",
                name: "destinationDomain",
                type: "uint32",
              },
              {
                internalType: "uint256",
                name: "relayerFee",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "slippage",
                type: "uint256",
              },
            ],
            internalType: "struct Registry.BridgeRequest",
            name: "bridgeRequest",
            type: "tuple",
          },
        ],
        internalType: "struct Registry.VaultRequest[]",
        name: "_depositRequest",
        type: "tuple[]",
      },
    ],
    name: "userDepositRequest",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "routeId",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "vaultAddress",
            type: "address",
          },
          {
            internalType: "address",
            name: "underlying",
            type: "address",
          },
          {
            internalType: "address",
            name: "onBehalfOf",
            type: "address",
          },
          {
            components: [
              {
                internalType: "uint32",
                name: "destinationDomain",
                type: "uint32",
              },
              {
                internalType: "uint256",
                name: "relayerFee",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "slippage",
                type: "uint256",
              },
            ],
            internalType: "struct Registry.BridgeRequest",
            name: "bridgeRequest",
            type: "tuple",
          },
        ],
        internalType: "struct Registry.VaultRequest",
        name: "_withdrawRequest",
        type: "tuple",
      },
    ],
    name: "userWithdrawRequest",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "_transferId",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_asset",
        type: "address",
      },
      {
        internalType: "address",
        name: "_originSender",
        type: "address",
      },
      {
        internalType: "uint32",
        name: "_origin",
        type: "uint32",
      },
      {
        internalType: "bytes",
        name: "_callData",
        type: "bytes",
      },
    ],
    name: "xReceive",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x60a06040523480156200001157600080fd5b506040516200261c3803806200261c8339810160408190526200003491620000a1565b6200003f3362000051565b6001600160a01b0316608052620000d3565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b600060208284031215620000b457600080fd5b81516001600160a01b0381168114620000cc57600080fd5b9392505050565b6080516125036200011960003960008181610208015281816103ab015281816106000152818161067b01528181610ebe0152818161105e01526114c301526125036000f3fe6080604052600436106100dd5760003560e01c8063d03b76571161007f578063ea95260111610059578063ea95260114610257578063f2fde38b1461028d578063fd614f41146102ad578063ffcdf4ed146102da57600080fd5b8063d03b7657146101e3578063de4b0548146101f6578063def9d6051461022a57600080fd5b8063715018a6116100bb578063715018a61461014a578063726f16d81461015f5780638da5cb5b1461019e578063929cb63f146101d057600080fd5b806322ed95f6146100e25780632625c2a9146101085780636ccae0541461012a575b600080fd5b6100f56100f0366004611d94565b6102fa565b6040519081526020015b60405180910390f35b34801561011457600080fd5b50610128610123366004611e55565b610a34565b005b34801561013657600080fd5b50610128610145366004611eac565b610b3b565b34801561015657600080fd5b50610128610b57565b34801561016b57600080fd5b5061017f61017a366004611eed565b610b6b565b604080516001600160a01b0390931683529015156020830152016100ff565b3480156101aa57600080fd5b506000546001600160a01b03165b6040516001600160a01b0390911681526020016100ff565b6100f56101de366004611f1f565b610ba0565b6100f56101f1366004611f43565b610e29565b34801561020257600080fd5b506101b87f000000000000000000000000000000000000000000000000000000000000000081565b34801561023657600080fd5b5061024a610245366004611e55565b61121a565b6040516100ff9190611f70565b34801561026357600080fd5b506101b8610272366004611fcd565b6002602052600090815260409020546001600160a01b031681565b34801561029957600080fd5b506101286102a8366004611fe8565b61140d565b3480156102b957600080fd5b506102cd6102c8366004612074565b611486565b6040516100ff919061218c565b3480156102e657600080fd5b506101286102f5366004611eed565b611655565b6000808215610a2c576103a98484838181106103185761031861219f565b90506101000201602001358585848181106103355761033561219f565b90506101000201608001602081019061034e9190611fe8565b8686858181106103605761036061219f565b9050610100020160400160208101906103799190611fe8565b87878681811061038b5761038b61219f565b9050610100020160600160208101906103a49190611fe8565b61172a565b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031663c2fb26a66040518163ffffffff1660e01b8152600401602060405180830381865afa158015610407573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061042b91906121b5565b84848381811061043d5761043d61219f565b6104579260c061010090920201908101915060a001611fcd565b63ffffffff161461085b5760006002818686858181106104795761047961219f565b6104939260c061010090920201908101915060a001611fcd565b63ffffffff1681526020810191909152604001600020546001600160a01b0316036104d157604051636323101960e01b815260040160405180910390fd5b60008484838181106104e5576104e561219f565b9050610100020160800160208101906104fe9190611fe8565b8585848181106105105761051061219f565b9050610100020160400160208101906105299190611fe8565b604080516001600160a01b0393841660208201529290911690820152606001604051602081830303815290604052905060008086868581811061056e5761056e61219f565b90506101000201600001358360405160200161058c939291906121e4565b60405160208183030381529060405290506105fb33308888878181106105b4576105b461219f565b90506101000201602001358989888181106105d1576105d161219f565b9050610100020160600160208101906105ea9190611fe8565b6001600160a01b031692919061179e565b6106777f00000000000000000000000000000000000000000000000000000000000000008787868181106106315761063161219f565b905061010002016020013588888781811061064e5761064e61219f565b9050610100020160600160208101906106679190611fe8565b6001600160a01b03169190611809565b60007f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316638aac16ba8888878181106106ba576106ba61219f565b9050610100020160a001602001358989888181106106da576106da61219f565b6106f49260c061010090920201908101915060a001611fcd565b600260008c8c8b81811061070a5761070a61219f565b6107249260c061010090920201908101915060a001611fcd565b63ffffffff1681526020810191909152604001600020546001600160a01b03168b8b8a8181106107565761075661219f565b90506101000201606001602081019061076f9190611fe8565b60008d8d8c8181106107835761078361219f565b90506101000201602001358e8e8d8181106107a0576107a061219f565b9050610100020160a001604001358a6040518963ffffffff1660e01b81526004016107d19796959493929190612221565b60206040518083038185885af11580156107ef573d6000803e3d6000fd5b50505050506040513d601f19601f8201168201806040525081019061081491906121b5565b60408051338152602081018390529192507f4f05c4ae3686666522258eb6a9de04fb6b2a61522685b91ee7aecaa16a272dd5910160405180910390a19350610a2e92505050565b600060018585848181106108715761087161219f565b90506101000201600001358154811061088c5761088c61219f565b6000918252602090912001546001600160a01b0316036108e8578383828181106108b8576108b861219f565b9050610100020160000135604051634bd16f7f60e01b81526004016108df91815260200190565b60405180910390fd5b61095f3360018686858181106109005761090061219f565b90506101000201600001358154811061091b5761091b61219f565b6000918252602090912001546001600160a01b03168686858181106109425761094261219f565b90506101000201602001358787868181106105d1576105d161219f565b610a228484838181106109745761097461219f565b90506101000201600001358585848181106109915761099161219f565b90506101000201602001358686858181106109ae576109ae61219f565b9050610100020160800160208101906109c79190611fe8565b8787868181106109d9576109d961219f565b9050610100020160600160208101906109f29190611fe8565b888887818110610a0457610a0461219f565b905061010002016040016020810190610a1d9190611fe8565b61191e565b5060009050610a2e565b505b92915050565b610a3c6119b7565b60005b81811015610b36576000838383818110610a5b57610a5b61219f565b9050604002016020016020810190610a739190611fe8565b6001600160a01b031603610a9a5760405163d92e233d60e01b815260040160405180910390fd5b828282818110610aac57610aac61219f565b9050604002016020016020810190610ac49190611fe8565b60026000858585818110610ada57610ada61219f565b610af09260206040909202019081019150611fcd565b63ffffffff168152602081019190915260400160002080546001600160a01b0319166001600160a01b039290921691909117905580610b2e81612292565b915050610a3f565b505050565b610b436119b7565b610b366001600160a01b0384168383611a11565b610b5f6119b7565b610b696000611a41565b565b60018181548110610b7b57600080fd5b6000918252602090912001546001600160a01b0381169150600160a01b900460ff1682565b6000816000013560006001600160a01b031660018281548110610bc557610bc561219f565b6000918252602090912001546001600160a01b031603610bfb57604051634bd16f7f60e01b8152600481018290526024016108df565b610c336020840135610c1360a0860160808701611fe8565b610c236060870160408801611fe8565b6103a46080880160608901611fe8565b60006001846000013581548110610c4c57610c4c61219f565b6000918252602090912001546001600160a01b031663c7980949610c766080870160608801611fe8565b610c866060880160408901611fe8565b6040516001600160e01b031960e085901b1681526001600160a01b03928316600482015291166024820152604401602060405180830381865afa158015610cd1573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610cf591906122ab565b9050610d37336001866000013581548110610d1257610d1261219f565b600091825260209182902001546001600160a01b03858116939291169088013561179e565b60006001856000013581548110610d5057610d5061219f565b600091825260209182902001546001600160a01b0316906323e103a890870135610d8060a0890160808a01611fe8565b610d9060808a0160608b01611fe8565b610da060608b0160408c01611fe8565b6040516001600160e01b031960e087901b16815260048101949094526001600160a01b03928316602485015290821660448401521660648201526084016020604051808303816000875af1158015610dfc573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610e2091906121b5565b95945050505050565b6000826000013560006001600160a01b031660018281548110610e4e57610e4e61219f565b6000918252602090912001546001600160a01b031603610e8457604051634bd16f7f60e01b8152600481018290526024016108df565b610ebc6020850135610e9c60a0870160808801611fe8565b610eac6060880160408901611fe8565b6103a46080890160608a01611fe8565b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031663c2fb26a66040518163ffffffff1660e01b8152600401602060405180830381865afa158015610f1a573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610f3e91906121b5565b610f4e60c0860160a08701611fcd565b63ffffffff1614611182576000600281610f6e60c0880160a08901611fcd565b63ffffffff1681526020810191909152604001600020546001600160a01b031603610fac57604051636323101960e01b815260040160405180910390fd5b6000602085013584610fc460a0880160808901611fe8565b610fd46080890160608a01611fe8565b610fe460608a0160408b01611fe8565b6040805160208101969096528501939093526001600160a01b039182166060850152811660808401521660a082015260c00160408051601f198184030181529082905291506000906110409060019088359085906020016121e4565b60408051601f19818403018152919052905060006001600160a01b037f000000000000000000000000000000000000000000000000000000000000000016638aac16ba60c089018035906110979060a08c01611fcd565b600260006110ab60c08e0160a08f01611fcd565b63ffffffff1681526020810191909152604090810160009081205491516001600160e01b031960e087901b1681526110f993926001600160a01b031691908190819081908c90600401612221565b60206040518083038185885af1158015611117573d6000803e3d6000fd5b50505050506040513d601f19601f8201168201806040525081019061113c91906121b5565b60408051338152602081018390529192507f4f05c4ae3686666522258eb6a9de04fb6b2a61522685b91ee7aecaa16a272dd5910160405180910390a19350610a2c915050565b6001805460009190863590811061119b5761119b61219f565b6000918252602090912001546001600160a01b0316036111d157604051634bd16f7f60e01b8152843560048201526024016108df565b61121184356020860135856111ec6080890160608a01611fe8565b6111fc60a08a0160808b01611fe8565b61120c60608b0160408c01611fe8565b611a91565b60009150610a2c565b60606112246119b7565b6000829003611246576040516318d78ff560e11b815260040160405180910390fd5b60008267ffffffffffffffff81111561126157611261612005565b60405190808252806020026020018201604052801561128a578160200160208202803683370190505b50905060005b838110156114055760008585838181106112ac576112ac61219f565b6112c29260206040909202019081019150611fe8565b6001600160a01b0316036112e95760405163d92e233d60e01b815260040160405180910390fd5b60018585838181106112fd576112fd61219f565b8354600181018555600094855260209094206040909102929092019291909101905061132982826122d6565b505060018054611339919061232f565b82828151811061134b5761134b61219f565b6020026020010181815250507f8c7241f7d7efcaf997d919b5026078b7bc3deb9041b162b9bd9ddfc1231d2c8c8186868481811061138b5761138b61219f565b6113a19260206040909202019081019150611fe8565b8787858181106113b3576113b361219f565b90506040020160200160208101906113cb9190612342565b604080519384526001600160a01b03909216602084015215159082015260600160405180910390a1806113fd81612292565b915050611290565b509392505050565b6114156119b7565b6001600160a01b03811661147a5760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b60648201526084016108df565b61148381611a41565b50565b63ffffffff8216600090815260026020526040902054606090849084906001600160a01b0380841691161415806114e65750336001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001614155b15611503576040516282b42960e81b815260040160405180910390fd5b60008060008680602001905181019061151c919061235f565b92509250925060006001600160a01b0316600183815481106115405761154061219f565b6000918252602090912001546001600160a01b03160361157657604051634bd16f7f60e01b8152600481018390526024016108df565b600083600181111561158a5761158a6121ce565b036115f357600080828060200190518101906115a691906123f9565b915091506115df600185815481106115c0576115c061219f565b6000918252602090912001546001600160a01b038e811691168f611a11565b6115ec848e848f8561191e565b5050611646565b6001836001811115611607576116076121ce565b03611646576000806000806000858060200190518101906116289190612433565b94509450945094509450611640878686858786611a91565b50505050505b50505050509695505050505050565b61165d6119b7565b8060006001600160a01b03166001828154811061167c5761167c61219f565b6000918252602090912001546001600160a01b0316036116b257604051634bd16f7f60e01b8152600481018290526024016108df565b6000600183815481106116c7576116c761219f565b60009182526020909120018054911515600160a01b0260ff60a01b199092169190911790556040517f91a0168fe2af7d03fc4465ab611da7d997fe924f69c20e9d16a23e6fc7af88d49061171e9084815260200190565b60405180910390a15050565b8360000361174b57604051631f2a200560e01b815260040160405180910390fd5b6001600160a01b038316158061176857506001600160a01b038216155b8061177a57506001600160a01b038116155b156117985760405163d92e233d60e01b815260040160405180910390fd5b50505050565b6040516001600160a01b03808516602483015283166044820152606481018290526117989085906323b872dd60e01b906084015b60408051601f198184030181529190526020810180516001600160e01b03166001600160e01b031990931692909217909152611b32565b8015806118835750604051636eb1769f60e11b81523060048201526001600160a01b03838116602483015284169063dd62ed3e90604401602060405180830381865afa15801561185d573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061188191906121b5565b155b6118ee5760405162461bcd60e51b815260206004820152603660248201527f5361666545524332303a20617070726f76652066726f6d206e6f6e2d7a65726f60448201527520746f206e6f6e2d7a65726f20616c6c6f77616e636560501b60648201526084016108df565b6040516001600160a01b038316602482015260448101829052610b3690849063095ea7b360e01b906064016117d2565b600185815481106119315761193161219f565b6000918252602090912001546040516330940a0f60e21b8152600481018690526001600160a01b038581166024830152848116604483015283811660648301529091169063c250283c90608401600060405180830381600087803b15801561199857600080fd5b505af11580156119ac573d6000803e3d6000fd5b505050505050505050565b6000546001600160a01b03163314610b695760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064016108df565b6040516001600160a01b038316602482015260448101829052610b3690849063a9059cbb60e01b906064016117d2565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b60018681548110611aa457611aa461219f565b60009182526020909120015460405163132d428360e01b815260048101879052602481018690526001600160a01b038581166044830152848116606483015283811660848301529091169063132d42839060a401600060405180830381600087803b158015611b1257600080fd5b505af1158015611b26573d6000803e3d6000fd5b50505050505050505050565b6000611b87826040518060400160405280602081526020017f5361666545524332303a206c6f772d6c6576656c2063616c6c206661696c6564815250856001600160a01b0316611c049092919063ffffffff16565b805190915015610b365780806020019051810190611ba59190612494565b610b365760405162461bcd60e51b815260206004820152602a60248201527f5361666545524332303a204552433230206f7065726174696f6e20646964206e6044820152691bdd081cdd58d8d9595960b21b60648201526084016108df565b6060611c138484600085611c1b565b949350505050565b606082471015611c7c5760405162461bcd60e51b815260206004820152602660248201527f416464726573733a20696e73756666696369656e742062616c616e636520666f6044820152651c8818d85b1b60d21b60648201526084016108df565b600080866001600160a01b03168587604051611c9891906124b1565b60006040518083038185875af1925050503d8060008114611cd5576040519150601f19603f3d011682016040523d82523d6000602084013e611cda565b606091505b5091509150611ceb87838387611cf6565b979650505050505050565b60608315611d65578251600003611d5e576001600160a01b0385163b611d5e5760405162461bcd60e51b815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e747261637400000060448201526064016108df565b5081611c13565b611c138383815115611d7a5781518083602001fd5b8060405162461bcd60e51b81526004016108df919061218c565b60008060208385031215611da757600080fd5b823567ffffffffffffffff80821115611dbf57600080fd5b818501915085601f830112611dd357600080fd5b813581811115611de257600080fd5b8660208260081b8501011115611df757600080fd5b60209290920196919550909350505050565b60008083601f840112611e1b57600080fd5b50813567ffffffffffffffff811115611e3357600080fd5b6020830191508360208260061b8501011115611e4e57600080fd5b9250929050565b60008060208385031215611e6857600080fd5b823567ffffffffffffffff811115611e7f57600080fd5b611e8b85828601611e09565b90969095509350505050565b6001600160a01b038116811461148357600080fd5b600080600060608486031215611ec157600080fd5b8335611ecc81611e97565b92506020840135611edc81611e97565b929592945050506040919091013590565b600060208284031215611eff57600080fd5b5035919050565b60006101008284031215611f1957600080fd5b50919050565b60006101008284031215611f3257600080fd5b611f3c8383611f06565b9392505050565b6000806101208385031215611f5757600080fd5b611f618484611f06565b94610100939093013593505050565b6020808252825182820181905260009190848201906040850190845b81811015611fa857835183529284019291840191600101611f8c565b50909695505050505050565b803563ffffffff81168114611fc857600080fd5b919050565b600060208284031215611fdf57600080fd5b611f3c82611fb4565b600060208284031215611ffa57600080fd5b8135611f3c81611e97565b634e487b7160e01b600052604160045260246000fd5b604051601f8201601f1916810167ffffffffffffffff8111828210171561204457612044612005565b604052919050565b600067ffffffffffffffff82111561206657612066612005565b50601f01601f191660200190565b60008060008060008060c0878903121561208d57600080fd5b863595506020870135945060408701356120a681611e97565b935060608701356120b681611e97565b92506120c460808801611fb4565b915060a087013567ffffffffffffffff8111156120e057600080fd5b8701601f810189136120f157600080fd5b80356121046120ff8261204c565b61201b565b8181528a602083850101111561211957600080fd5b816020840160208301376000602083830101528093505050509295509295509295565b60005b8381101561215757818101518382015260200161213f565b50506000910152565b6000815180845261217881602086016020860161213c565b601f01601f19169290920160200192915050565b602081526000611f3c6020830184612160565b634e487b7160e01b600052603260045260246000fd5b6000602082840312156121c757600080fd5b5051919050565b634e487b7160e01b600052602160045260246000fd5b60006002851061220457634e487b7160e01b600052602160045260246000fd5b84825283602083015260606040830152610e206060830184612160565b63ffffffff881681526001600160a01b0387811660208301528681166040830152851660608201526080810184905260a0810183905260e060c0820181905260009061226f90830184612160565b9998505050505050505050565b634e487b7160e01b600052601160045260246000fd5b6000600182016122a4576122a461227c565b5060010190565b6000602082840312156122bd57600080fd5b8151611f3c81611e97565b801515811461148357600080fd5b81356122e181611e97565b81546001600160a01b031981166001600160a01b03929092169182178355602084013561230d816122c8565b6001600160a81b03199190911690911790151560a01b60ff60a01b1617905550565b81810381811115610a2e57610a2e61227c565b60006020828403121561235457600080fd5b8135611f3c816122c8565b60008060006060848603121561237457600080fd5b83516002811061238357600080fd5b60208501516040860151919450925067ffffffffffffffff8111156123a757600080fd5b8401601f810186136123b857600080fd5b80516123c66120ff8261204c565b8181528760208385010111156123db57600080fd5b6123ec82602083016020860161213c565b8093505050509250925092565b6000806040838503121561240c57600080fd5b825161241781611e97565b602084015190925061242881611e97565b809150509250929050565b600080600080600060a0868803121561244b57600080fd5b8551945060208601519350604086015161246481611e97565b606087015190935061247581611e97565b608087015190925061248681611e97565b809150509295509295909350565b6000602082840312156124a657600080fd5b8151611f3c816122c8565b600082516124c381846020870161213c565b919091019291505056fea2646970667358221220719594c62d966d52d4898b30e4bd7b537bc30eac86f6bd5a50d74499a19005e564736f6c63430008110033";

type RegistryConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: RegistryConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Registry__factory extends ContractFactory {
  constructor(...args: RegistryConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _connext: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<Registry> {
    return super.deploy(_connext, overrides || {}) as Promise<Registry>;
  }
  override getDeployTransaction(
    _connext: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_connext, overrides || {});
  }
  override attach(address: string): Registry {
    return super.attach(address) as Registry;
  }
  override connect(signer: Signer): Registry__factory {
    return super.connect(signer) as Registry__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): RegistryInterface {
    return new utils.Interface(_abi) as RegistryInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): Registry {
    return new Contract(address, _abi, signerOrProvider) as Registry;
  }
}
