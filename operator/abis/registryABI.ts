export const registryABI = [
    {
      type: "constructor",
      inputs: [
        {
          name: "_delegationManager",
          type: "address",
          internalType: "contract IDelegationManager",
        },
      ],
      stateMutability: "nonpayable",
    },
    {
      type: "function",
      name: "deregisterOperator",
      inputs: [],
      outputs: [],
      stateMutability: "nonpayable",
    },
    {
      type: "function",
      name: "getLastCheckpointOperatorWeight",
      inputs: [
        {
          name: "_operator",
          type: "address",
          internalType: "address",
        },
      ],
      outputs: [
        {
          name: "",
          type: "uint256",
          internalType: "uint256",
        },
      ],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "getLastCheckpointThresholdWeight",
      inputs: [],
      outputs: [
        {
          name: "",
          type: "uint256",
          internalType: "uint256",
        },
      ],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "getLastCheckpointThresholdWeightAtBlock",
      inputs: [
        {
          name: "_blockNumber",
          type: "uint32",
          internalType: "uint32",
        },
      ],
      outputs: [
        {
          name: "",
          type: "uint256",
          internalType: "uint256",
        },
      ],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "getLastCheckpointTotalWeight",
      inputs: [],
      outputs: [
        {
          name: "",
          type: "uint256",
          internalType: "uint256",
        },
      ],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "getLastCheckpointTotalWeightAtBlock",
      inputs: [
        {
          name: "_blockNumber",
          type: "uint32",
          internalType: "uint32",
        },
      ],
      outputs: [
        {
          name: "",
          type: "uint256",
          internalType: "uint256",
        },
      ],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "getOperatorWeight",
      inputs: [
        {
          name: "_operator",
          type: "address",
          internalType: "address",
        },
      ],
      outputs: [
        {
          name: "",
          type: "uint256",
          internalType: "uint256",
        },
      ],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "getOperatorWeightAtBlock",
      inputs: [
        {
          name: "_operator",
          type: "address",
          internalType: "address",
        },
        {
          name: "_blockNumber",
          type: "uint32",
          internalType: "uint32",
        },
      ],
      outputs: [
        {
          name: "",
          type: "uint256",
          internalType: "uint256",
        },
      ],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "initialize",
      inputs: [
        {
          name: "_serviceManager",
          type: "address",
          internalType: "address",
        },
        {
          name: "_thresholdWeight",
          type: "uint256",
          internalType: "uint256",
        },
        {
          name: "_quorum",
          type: "tuple",
          internalType: "struct Quorum",
          components: [
            {
              name: "strategies",
              type: "tuple[]",
              internalType: "struct StrategyParams[]",
              components: [
                {
                  name: "strategy",
                  type: "address",
                  internalType: "contract IStrategy",
                },
                {
                  name: "multiplier",
                  type: "uint96",
                  internalType: "uint96",
                },
              ],
            },
          ],
        },
      ],
      outputs: [],
      stateMutability: "nonpayable",
    },
    {
      type: "function",
      name: "isValidSignature",
      inputs: [
        {
          name: "_dataHash",
          type: "bytes32",
          internalType: "bytes32",
        },
        {
          name: "_signatureData",
          type: "bytes",
          internalType: "bytes",
        },
      ],
      outputs: [
        {
          name: "",
          type: "bytes4",
          internalType: "bytes4",
        },
      ],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "minimumWeight",
      inputs: [],
      outputs: [
        {
          name: "",
          type: "uint256",
          internalType: "uint256",
        },
      ],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "operatorRegistered",
      inputs: [
        {
          name: "_operator",
          type: "address",
          internalType: "address",
        },
      ],
      outputs: [
        {
          name: "",
          type: "bool",
          internalType: "bool",
        },
      ],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "owner",
      inputs: [],
      outputs: [
        {
          name: "",
          type: "address",
          internalType: "address",
        },
      ],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "quorum",
      inputs: [],
      outputs: [
        {
          name: "",
          type: "tuple",
          internalType: "struct Quorum",
          components: [
            {
              name: "strategies",
              type: "tuple[]",
              internalType: "struct StrategyParams[]",
              components: [
                {
                  name: "strategy",
                  type: "address",
                  internalType: "contract IStrategy",
                },
                {
                  name: "multiplier",
                  type: "uint96",
                  internalType: "uint96",
                },
              ],
            },
          ],
        },
      ],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "registerOperatorWithSignature",
      inputs: [
        {
          name: "_operator",
          type: "address",
          internalType: "address",
        },
        {
          name: "_operatorSignature",
          type: "tuple",
          internalType: "struct ISignatureUtils.SignatureWithSaltAndExpiry",
          components: [
            {
              name: "signature",
              type: "bytes",
              internalType: "bytes",
            },
            {
              name: "salt",
              type: "bytes32",
              internalType: "bytes32",
            },
            {
              name: "expiry",
              type: "uint256",
              internalType: "uint256",
            },
          ],
        },
      ],
      outputs: [],
      stateMutability: "nonpayable",
    },
    {
      type: "function",
      name: "renounceOwnership",
      inputs: [],
      outputs: [],
      stateMutability: "nonpayable",
    },
    {
      type: "function",
      name: "transferOwnership",
      inputs: [
        {
          name: "newOwner",
          type: "address",
          internalType: "address",
        },
      ],
      outputs: [],
      stateMutability: "nonpayable",
    },
    {
      type: "function",
      name: "updateMinimumWeight",
      inputs: [
        {
          name: "_newMinimumWeight",
          type: "uint256",
          internalType: "uint256",
        },
        {
          name: "_operators",
          type: "address[]",
          internalType: "address[]",
        },
      ],
      outputs: [],
      stateMutability: "nonpayable",
    },
    {
      type: "function",
      name: "updateOperators",
      inputs: [
        {
          name: "_operators",
          type: "address[]",
          internalType: "address[]",
        },
      ],
      outputs: [],
      stateMutability: "nonpayable",
    },
    {
      type: "function",
      name: "updateOperatorsForQuorum",
      inputs: [
        {
          name: "operatorsPerQuorum",
          type: "address[][]",
          internalType: "address[][]",
        },
        {
          name: "",
          type: "bytes",
          internalType: "bytes",
        },
      ],
      outputs: [],
      stateMutability: "nonpayable",
    },
    {
      type: "function",
      name: "updateQuorumConfig",
      inputs: [
        {
          name: "_quorum",
          type: "tuple",
          internalType: "struct Quorum",
          components: [
            {
              name: "strategies",
              type: "tuple[]",
              internalType: "struct StrategyParams[]",
              components: [
                {
                  name: "strategy",
                  type: "address",
                  internalType: "contract IStrategy",
                },
                {
                  name: "multiplier",
                  type: "uint96",
                  internalType: "uint96",
                },
              ],
            },
          ],
        },
        {
          name: "_operators",
          type: "address[]",
          internalType: "address[]",
        },
      ],
      outputs: [],
      stateMutability: "nonpayable",
    },
    {
      type: "function",
      name: "updateStakeThreshold",
      inputs: [
        {
          name: "_thresholdWeight",
          type: "uint256",
          internalType: "uint256",
        },
      ],
      outputs: [],
      stateMutability: "nonpayable",
    },
    {
      type: "event",
      name: "Initialized",
      inputs: [
        {
          name: "version",
          type: "uint8",
          indexed: false,
          internalType: "uint8",
        },
      ],
      anonymous: false,
    },
    {
      type: "event",
      name: "MinimumWeightUpdated",
      inputs: [
        {
          name: "_old",
          type: "uint256",
          indexed: false,
          internalType: "uint256",
        },
        {
          name: "_new",
          type: "uint256",
          indexed: false,
          internalType: "uint256",
        },
      ],
      anonymous: false,
    },
    {
      type: "event",
      name: "OperatorDeregistered",
      inputs: [
        {
          name: "_operator",
          type: "address",
          indexed: true,
          internalType: "address",
        },
        {
          name: "_avs",
          type: "address",
          indexed: true,
          internalType: "address",
        },
      ],
      anonymous: false,
    },
    {
      type: "event",
      name: "OperatorRegistered",
      inputs: [
        {
          name: "_operator",
          type: "address",
          indexed: true,
          internalType: "address",
        },
        {
          name: "_avs",
          type: "address",
          indexed: true,
          internalType: "address",
        },
      ],
      anonymous: false,
    },
    {
      type: "event",
      name: "OperatorWeightUpdated",
      inputs: [
        {
          name: "_operator",
          type: "address",
          indexed: true,
          internalType: "address",
        },
        {
          name: "oldWeight",
          type: "uint256",
          indexed: false,
          internalType: "uint256",
        },
        {
          name: "newWeight",
          type: "uint256",
          indexed: false,
          internalType: "uint256",
        },
      ],
      anonymous: false,
    },
    {
      type: "event",
      name: "OwnershipTransferred",
      inputs: [
        {
          name: "previousOwner",
          type: "address",
          indexed: true,
          internalType: "address",
        },
        {
          name: "newOwner",
          type: "address",
          indexed: true,
          internalType: "address",
        },
      ],
      anonymous: false,
    },
    {
      type: "event",
      name: "QuorumUpdated",
      inputs: [
        {
          name: "_old",
          type: "tuple",
          indexed: false,
          internalType: "struct Quorum",
          components: [
            {
              name: "strategies",
              type: "tuple[]",
              internalType: "struct StrategyParams[]",
              components: [
                {
                  name: "strategy",
                  type: "address",
                  internalType: "contract IStrategy",
                },
                {
                  name: "multiplier",
                  type: "uint96",
                  internalType: "uint96",
                },
              ],
            },
          ],
        },
        {
          name: "_new",
          type: "tuple",
          indexed: false,
          internalType: "struct Quorum",
          components: [
            {
              name: "strategies",
              type: "tuple[]",
              internalType: "struct StrategyParams[]",
              components: [
                {
                  name: "strategy",
                  type: "address",
                  internalType: "contract IStrategy",
                },
                {
                  name: "multiplier",
                  type: "uint96",
                  internalType: "uint96",
                },
              ],
            },
          ],
        },
      ],
      anonymous: false,
    },
    {
      type: "event",
      name: "ThresholdWeightUpdated",
      inputs: [
        {
          name: "_thresholdWeight",
          type: "uint256",
          indexed: false,
          internalType: "uint256",
        },
      ],
      anonymous: false,
    },
    {
      type: "event",
      name: "TotalWeightUpdated",
      inputs: [
        {
          name: "oldTotalWeight",
          type: "uint256",
          indexed: false,
          internalType: "uint256",
        },
        {
          name: "newTotalWeight",
          type: "uint256",
          indexed: false,
          internalType: "uint256",
        },
      ],
      anonymous: false,
    },
    {
      type: "event",
      name: "UpdateMinimumWeight",
      inputs: [
        {
          name: "oldMinimumWeight",
          type: "uint256",
          indexed: false,
          internalType: "uint256",
        },
        {
          name: "newMinimumWeight",
          type: "uint256",
          indexed: false,
          internalType: "uint256",
        },
      ],
      anonymous: false,
    },
    {
      type: "error",
      name: "InsufficientSignedStake",
      inputs: [],
    },
    {
      type: "error",
      name: "InsufficientWeight",
      inputs: [],
    },
    {
      type: "error",
      name: "InvalidLength",
      inputs: [],
    },
    {
      type: "error",
      name: "InvalidQuorum",
      inputs: [],
    },
    {
      type: "error",
      name: "InvalidSignature",
      inputs: [],
    },
    {
      type: "error",
      name: "InvalidSignedWeight",
      inputs: [],
    },
    {
      type: "error",
      name: "InvalidThreshold",
      inputs: [],
    },
    {
      type: "error",
      name: "LengthMismatch",
      inputs: [],
    },
    {
      type: "error",
      name: "MustUpdateAllOperators",
      inputs: [],
    },
    {
      type: "error",
      name: "NotSorted",
      inputs: [],
    },
    {
      type: "error",
      name: "OperatorAlreadyRegistered",
      inputs: [],
    },
    {
      type: "error",
      name: "OperatorNotRegistered",
      inputs: [],
    },
  ];