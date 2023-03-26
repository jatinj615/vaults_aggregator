export const _abi = [
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
          internalType: "bytes32[]",
          name: "",
          type: "bytes32[]",
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
          name: "",
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