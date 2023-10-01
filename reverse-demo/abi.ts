export default {
	"Batch": [
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "index",
					"type": "uint256"
				}
			],
			"name": "SubcallFailed",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "index",
					"type": "uint256"
				}
			],
			"name": "SubcallSucceeded",
			"type": "event"
		},
		{
			"inputs": [
				{
					"internalType": "address[]",
					"name": "to",
					"type": "address[]"
				},
				{
					"internalType": "uint256[]",
					"name": "value",
					"type": "uint256[]"
				},
				{
					"internalType": "bytes[]",
					"name": "callData",
					"type": "bytes[]"
				},
				{
					"internalType": "uint64[]",
					"name": "gasLimit",
					"type": "uint64[]"
				}
			],
			"name": "batchAll",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address[]",
					"name": "to",
					"type": "address[]"
				},
				{
					"internalType": "uint256[]",
					"name": "value",
					"type": "uint256[]"
				},
				{
					"internalType": "bytes[]",
					"name": "callData",
					"type": "bytes[]"
				},
				{
					"internalType": "uint64[]",
					"name": "gasLimit",
					"type": "uint64[]"
				}
			],
			"name": "batchSome",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address[]",
					"name": "to",
					"type": "address[]"
				},
				{
					"internalType": "uint256[]",
					"name": "value",
					"type": "uint256[]"
				},
				{
					"internalType": "bytes[]",
					"name": "callData",
					"type": "bytes[]"
				},
				{
					"internalType": "uint64[]",
					"name": "gasLimit",
					"type": "uint64[]"
				}
			],
			"name": "batchSomeUntilFailure",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		}
	],
    "IERC20": [
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": true,
					"internalType": "address",
					"name": "owner",
					"type": "address"
				},
				{
					"indexed": true,
					"internalType": "address",
					"name": "spender",
					"type": "address"
				},
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "value",
					"type": "uint256"
				}
			],
			"name": "Approval",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": true,
					"internalType": "address",
					"name": "from",
					"type": "address"
				},
				{
					"indexed": true,
					"internalType": "address",
					"name": "to",
					"type": "address"
				},
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "value",
					"type": "uint256"
				}
			],
			"name": "Transfer",
			"type": "event"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "owner",
					"type": "address"
				},
				{
					"internalType": "address",
					"name": "spender",
					"type": "address"
				}
			],
			"name": "allowance",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "spender",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "amount",
					"type": "uint256"
				}
			],
			"name": "approve",
			"outputs": [
				{
					"internalType": "bool",
					"name": "",
					"type": "bool"
				}
			],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "account",
					"type": "address"
				}
			],
			"name": "balanceOf",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "totalSupply",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "to",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "amount",
					"type": "uint256"
				}
			],
			"name": "transfer",
			"outputs": [
				{
					"internalType": "bool",
					"name": "",
					"type": "bool"
				}
			],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "from",
					"type": "address"
				},
				{
					"internalType": "address",
					"name": "to",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "amount",
					"type": "uint256"
				}
			],
			"name": "transferFrom",
			"outputs": [
				{
					"internalType": "bool",
					"name": "",
					"type": "bool"
				}
			],
			"stateMutability": "nonpayable",
			"type": "function"
		}
	],
    "ITokenBridge": [
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": true,
					"internalType": "address",
					"name": "oldContract",
					"type": "address"
				},
				{
					"indexed": true,
					"internalType": "address",
					"name": "newContract",
					"type": "address"
				}
			],
			"name": "ContractUpgraded",
			"type": "event"
		},
		{
			"inputs": [],
			"name": "WETH",
			"outputs": [
				{
					"internalType": "contract IWETH",
					"name": "",
					"type": "address"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "bytes",
					"name": "encoded",
					"type": "bytes"
				}
			],
			"name": "_parseTransferCommon",
			"outputs": [
				{
					"components": [
						{
							"internalType": "uint8",
							"name": "payloadID",
							"type": "uint8"
						},
						{
							"internalType": "uint256",
							"name": "amount",
							"type": "uint256"
						},
						{
							"internalType": "bytes32",
							"name": "tokenAddress",
							"type": "bytes32"
						},
						{
							"internalType": "uint16",
							"name": "tokenChain",
							"type": "uint16"
						},
						{
							"internalType": "bytes32",
							"name": "to",
							"type": "bytes32"
						},
						{
							"internalType": "uint16",
							"name": "toChain",
							"type": "uint16"
						},
						{
							"internalType": "uint256",
							"name": "fee",
							"type": "uint256"
						}
					],
					"internalType": "struct ITokenBridge.Transfer",
					"name": "transfer",
					"type": "tuple"
				}
			],
			"stateMutability": "pure",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "tokenAddress",
					"type": "address"
				},
				{
					"internalType": "uint32",
					"name": "nonce",
					"type": "uint32"
				}
			],
			"name": "attestToken",
			"outputs": [
				{
					"internalType": "uint64",
					"name": "sequence",
					"type": "uint64"
				}
			],
			"stateMutability": "payable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint16",
					"name": "chainId_",
					"type": "uint16"
				}
			],
			"name": "bridgeContracts",
			"outputs": [
				{
					"internalType": "bytes32",
					"name": "",
					"type": "bytes32"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "chainId",
			"outputs": [
				{
					"internalType": "uint16",
					"name": "",
					"type": "uint16"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "bytes",
					"name": "encodedVm",
					"type": "bytes"
				}
			],
			"name": "completeTransfer",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "bytes",
					"name": "encodedVm",
					"type": "bytes"
				}
			],
			"name": "completeTransferAndUnwrapETH",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "bytes",
					"name": "encodedVm",
					"type": "bytes"
				}
			],
			"name": "completeTransferAndUnwrapETHWithPayload",
			"outputs": [
				{
					"internalType": "bytes",
					"name": "",
					"type": "bytes"
				}
			],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "bytes",
					"name": "encodedVm",
					"type": "bytes"
				}
			],
			"name": "completeTransferWithPayload",
			"outputs": [
				{
					"internalType": "bytes",
					"name": "",
					"type": "bytes"
				}
			],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "bytes",
					"name": "encodedVm",
					"type": "bytes"
				}
			],
			"name": "createWrapped",
			"outputs": [
				{
					"internalType": "address",
					"name": "token",
					"type": "address"
				}
			],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"components": [
						{
							"internalType": "uint8",
							"name": "payloadID",
							"type": "uint8"
						},
						{
							"internalType": "bytes32",
							"name": "tokenAddress",
							"type": "bytes32"
						},
						{
							"internalType": "uint16",
							"name": "tokenChain",
							"type": "uint16"
						},
						{
							"internalType": "uint8",
							"name": "decimals",
							"type": "uint8"
						},
						{
							"internalType": "bytes32",
							"name": "symbol",
							"type": "bytes32"
						},
						{
							"internalType": "bytes32",
							"name": "name",
							"type": "bytes32"
						}
					],
					"internalType": "struct ITokenBridge.AssetMeta",
					"name": "meta",
					"type": "tuple"
				}
			],
			"name": "encodeAssetMeta",
			"outputs": [
				{
					"internalType": "bytes",
					"name": "encoded",
					"type": "bytes"
				}
			],
			"stateMutability": "pure",
			"type": "function"
		},
		{
			"inputs": [
				{
					"components": [
						{
							"internalType": "uint8",
							"name": "payloadID",
							"type": "uint8"
						},
						{
							"internalType": "uint256",
							"name": "amount",
							"type": "uint256"
						},
						{
							"internalType": "bytes32",
							"name": "tokenAddress",
							"type": "bytes32"
						},
						{
							"internalType": "uint16",
							"name": "tokenChain",
							"type": "uint16"
						},
						{
							"internalType": "bytes32",
							"name": "to",
							"type": "bytes32"
						},
						{
							"internalType": "uint16",
							"name": "toChain",
							"type": "uint16"
						},
						{
							"internalType": "uint256",
							"name": "fee",
							"type": "uint256"
						}
					],
					"internalType": "struct ITokenBridge.Transfer",
					"name": "transfer",
					"type": "tuple"
				}
			],
			"name": "encodeTransfer",
			"outputs": [
				{
					"internalType": "bytes",
					"name": "encoded",
					"type": "bytes"
				}
			],
			"stateMutability": "pure",
			"type": "function"
		},
		{
			"inputs": [
				{
					"components": [
						{
							"internalType": "uint8",
							"name": "payloadID",
							"type": "uint8"
						},
						{
							"internalType": "uint256",
							"name": "amount",
							"type": "uint256"
						},
						{
							"internalType": "bytes32",
							"name": "tokenAddress",
							"type": "bytes32"
						},
						{
							"internalType": "uint16",
							"name": "tokenChain",
							"type": "uint16"
						},
						{
							"internalType": "bytes32",
							"name": "to",
							"type": "bytes32"
						},
						{
							"internalType": "uint16",
							"name": "toChain",
							"type": "uint16"
						},
						{
							"internalType": "bytes32",
							"name": "fromAddress",
							"type": "bytes32"
						},
						{
							"internalType": "bytes",
							"name": "payload",
							"type": "bytes"
						}
					],
					"internalType": "struct ITokenBridge.TransferWithPayload",
					"name": "transfer",
					"type": "tuple"
				}
			],
			"name": "encodeTransferWithPayload",
			"outputs": [
				{
					"internalType": "bytes",
					"name": "encoded",
					"type": "bytes"
				}
			],
			"stateMutability": "pure",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "evmChainId",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "finality",
			"outputs": [
				{
					"internalType": "uint8",
					"name": "",
					"type": "uint8"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "bytes32",
					"name": "hash",
					"type": "bytes32"
				}
			],
			"name": "governanceActionIsConsumed",
			"outputs": [
				{
					"internalType": "bool",
					"name": "",
					"type": "bool"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "governanceChainId",
			"outputs": [
				{
					"internalType": "uint16",
					"name": "",
					"type": "uint16"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "governanceContract",
			"outputs": [
				{
					"internalType": "bytes32",
					"name": "",
					"type": "bytes32"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "implementation",
			"outputs": [
				{
					"internalType": "address",
					"name": "",
					"type": "address"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "initialize",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "isFork",
			"outputs": [
				{
					"internalType": "bool",
					"name": "",
					"type": "bool"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "impl",
					"type": "address"
				}
			],
			"name": "isInitialized",
			"outputs": [
				{
					"internalType": "bool",
					"name": "",
					"type": "bool"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "bytes32",
					"name": "hash",
					"type": "bytes32"
				}
			],
			"name": "isTransferCompleted",
			"outputs": [
				{
					"internalType": "bool",
					"name": "",
					"type": "bool"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "token",
					"type": "address"
				}
			],
			"name": "isWrappedAsset",
			"outputs": [
				{
					"internalType": "bool",
					"name": "",
					"type": "bool"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "token",
					"type": "address"
				}
			],
			"name": "outstandingBridged",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "bytes",
					"name": "encoded",
					"type": "bytes"
				}
			],
			"name": "parseAssetMeta",
			"outputs": [
				{
					"components": [
						{
							"internalType": "uint8",
							"name": "payloadID",
							"type": "uint8"
						},
						{
							"internalType": "bytes32",
							"name": "tokenAddress",
							"type": "bytes32"
						},
						{
							"internalType": "uint16",
							"name": "tokenChain",
							"type": "uint16"
						},
						{
							"internalType": "uint8",
							"name": "decimals",
							"type": "uint8"
						},
						{
							"internalType": "bytes32",
							"name": "symbol",
							"type": "bytes32"
						},
						{
							"internalType": "bytes32",
							"name": "name",
							"type": "bytes32"
						}
					],
					"internalType": "struct ITokenBridge.AssetMeta",
					"name": "meta",
					"type": "tuple"
				}
			],
			"stateMutability": "pure",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "bytes",
					"name": "encoded",
					"type": "bytes"
				}
			],
			"name": "parsePayloadID",
			"outputs": [
				{
					"internalType": "uint8",
					"name": "payloadID",
					"type": "uint8"
				}
			],
			"stateMutability": "pure",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "bytes",
					"name": "encodedRecoverChainId",
					"type": "bytes"
				}
			],
			"name": "parseRecoverChainId",
			"outputs": [
				{
					"components": [
						{
							"internalType": "bytes32",
							"name": "module",
							"type": "bytes32"
						},
						{
							"internalType": "uint8",
							"name": "action",
							"type": "uint8"
						},
						{
							"internalType": "uint256",
							"name": "evmChainId",
							"type": "uint256"
						},
						{
							"internalType": "uint16",
							"name": "newChainId",
							"type": "uint16"
						}
					],
					"internalType": "struct ITokenBridge.RecoverChainId",
					"name": "rci",
					"type": "tuple"
				}
			],
			"stateMutability": "pure",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "bytes",
					"name": "encoded",
					"type": "bytes"
				}
			],
			"name": "parseRegisterChain",
			"outputs": [
				{
					"components": [
						{
							"internalType": "bytes32",
							"name": "module",
							"type": "bytes32"
						},
						{
							"internalType": "uint8",
							"name": "action",
							"type": "uint8"
						},
						{
							"internalType": "uint16",
							"name": "chainId",
							"type": "uint16"
						},
						{
							"internalType": "uint16",
							"name": "emitterChainID",
							"type": "uint16"
						},
						{
							"internalType": "bytes32",
							"name": "emitterAddress",
							"type": "bytes32"
						}
					],
					"internalType": "struct ITokenBridge.RegisterChain",
					"name": "chain",
					"type": "tuple"
				}
			],
			"stateMutability": "pure",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "bytes",
					"name": "encoded",
					"type": "bytes"
				}
			],
			"name": "parseTransfer",
			"outputs": [
				{
					"components": [
						{
							"internalType": "uint8",
							"name": "payloadID",
							"type": "uint8"
						},
						{
							"internalType": "uint256",
							"name": "amount",
							"type": "uint256"
						},
						{
							"internalType": "bytes32",
							"name": "tokenAddress",
							"type": "bytes32"
						},
						{
							"internalType": "uint16",
							"name": "tokenChain",
							"type": "uint16"
						},
						{
							"internalType": "bytes32",
							"name": "to",
							"type": "bytes32"
						},
						{
							"internalType": "uint16",
							"name": "toChain",
							"type": "uint16"
						},
						{
							"internalType": "uint256",
							"name": "fee",
							"type": "uint256"
						}
					],
					"internalType": "struct ITokenBridge.Transfer",
					"name": "transfer",
					"type": "tuple"
				}
			],
			"stateMutability": "pure",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "bytes",
					"name": "encoded",
					"type": "bytes"
				}
			],
			"name": "parseTransferWithPayload",
			"outputs": [
				{
					"components": [
						{
							"internalType": "uint8",
							"name": "payloadID",
							"type": "uint8"
						},
						{
							"internalType": "uint256",
							"name": "amount",
							"type": "uint256"
						},
						{
							"internalType": "bytes32",
							"name": "tokenAddress",
							"type": "bytes32"
						},
						{
							"internalType": "uint16",
							"name": "tokenChain",
							"type": "uint16"
						},
						{
							"internalType": "bytes32",
							"name": "to",
							"type": "bytes32"
						},
						{
							"internalType": "uint16",
							"name": "toChain",
							"type": "uint16"
						},
						{
							"internalType": "bytes32",
							"name": "fromAddress",
							"type": "bytes32"
						},
						{
							"internalType": "bytes",
							"name": "payload",
							"type": "bytes"
						}
					],
					"internalType": "struct ITokenBridge.TransferWithPayload",
					"name": "transfer",
					"type": "tuple"
				}
			],
			"stateMutability": "pure",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "bytes",
					"name": "encoded",
					"type": "bytes"
				}
			],
			"name": "parseUpgrade",
			"outputs": [
				{
					"components": [
						{
							"internalType": "bytes32",
							"name": "module",
							"type": "bytes32"
						},
						{
							"internalType": "uint8",
							"name": "action",
							"type": "uint8"
						},
						{
							"internalType": "uint16",
							"name": "chainId",
							"type": "uint16"
						},
						{
							"internalType": "bytes32",
							"name": "newContract",
							"type": "bytes32"
						}
					],
					"internalType": "struct ITokenBridge.UpgradeContract",
					"name": "chain",
					"type": "tuple"
				}
			],
			"stateMutability": "pure",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "bytes",
					"name": "encodedVM",
					"type": "bytes"
				}
			],
			"name": "registerChain",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "bytes",
					"name": "encodedVM",
					"type": "bytes"
				}
			],
			"name": "submitRecoverChainId",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "tokenImplementation",
			"outputs": [
				{
					"internalType": "address",
					"name": "",
					"type": "address"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "token",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "amount",
					"type": "uint256"
				},
				{
					"internalType": "uint16",
					"name": "recipientChain",
					"type": "uint16"
				},
				{
					"internalType": "bytes32",
					"name": "recipient",
					"type": "bytes32"
				},
				{
					"internalType": "uint256",
					"name": "arbiterFee",
					"type": "uint256"
				},
				{
					"internalType": "uint32",
					"name": "nonce",
					"type": "uint32"
				}
			],
			"name": "transferTokens",
			"outputs": [
				{
					"internalType": "uint64",
					"name": "sequence",
					"type": "uint64"
				}
			],
			"stateMutability": "payable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "token",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "amount",
					"type": "uint256"
				},
				{
					"internalType": "uint16",
					"name": "recipientChain",
					"type": "uint16"
				},
				{
					"internalType": "bytes32",
					"name": "recipient",
					"type": "bytes32"
				},
				{
					"internalType": "uint32",
					"name": "nonce",
					"type": "uint32"
				},
				{
					"internalType": "bytes",
					"name": "payload",
					"type": "bytes"
				}
			],
			"name": "transferTokensWithPayload",
			"outputs": [
				{
					"internalType": "uint64",
					"name": "sequence",
					"type": "uint64"
				}
			],
			"stateMutability": "payable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "bytes",
					"name": "encodedVm",
					"type": "bytes"
				}
			],
			"name": "updateWrapped",
			"outputs": [
				{
					"internalType": "address",
					"name": "token",
					"type": "address"
				}
			],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "bytes",
					"name": "encodedVM",
					"type": "bytes"
				}
			],
			"name": "upgrade",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "wormhole",
			"outputs": [
				{
					"internalType": "contract IWormhole",
					"name": "",
					"type": "address"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint16",
					"name": "recipientChain",
					"type": "uint16"
				},
				{
					"internalType": "bytes32",
					"name": "recipient",
					"type": "bytes32"
				},
				{
					"internalType": "uint256",
					"name": "arbiterFee",
					"type": "uint256"
				},
				{
					"internalType": "uint32",
					"name": "nonce",
					"type": "uint32"
				}
			],
			"name": "wrapAndTransferETH",
			"outputs": [
				{
					"internalType": "uint64",
					"name": "sequence",
					"type": "uint64"
				}
			],
			"stateMutability": "payable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint16",
					"name": "recipientChain",
					"type": "uint16"
				},
				{
					"internalType": "bytes32",
					"name": "recipient",
					"type": "bytes32"
				},
				{
					"internalType": "uint32",
					"name": "nonce",
					"type": "uint32"
				},
				{
					"internalType": "bytes",
					"name": "payload",
					"type": "bytes"
				}
			],
			"name": "wrapAndTransferETHWithPayload",
			"outputs": [
				{
					"internalType": "uint64",
					"name": "sequence",
					"type": "uint64"
				}
			],
			"stateMutability": "payable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint16",
					"name": "tokenChainId",
					"type": "uint16"
				},
				{
					"internalType": "bytes32",
					"name": "tokenAddress",
					"type": "bytes32"
				}
			],
			"name": "wrappedAsset",
			"outputs": [
				{
					"internalType": "address",
					"name": "",
					"type": "address"
				}
			],
			"stateMutability": "view",
			"type": "function"
		}
	],
	"TokenRelayer": [
		{
			"inputs": [
				{
					"internalType": "uint16",
					"name": "targetChainId",
					"type": "uint16"
				},
				{
					"internalType": "address",
					"name": "token",
					"type": "address"
				},
				{
					"internalType": "uint8",
					"name": "decimals",
					"type": "uint8"
				}
			],
			"name": "calculateRelayerFee",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "feeInTokenDenomination",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "token",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "amount",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "toNativeTokenAmount",
					"type": "uint256"
				},
				{
					"internalType": "uint16",
					"name": "targetChain",
					"type": "uint16"
				},
				{
					"internalType": "bytes32",
					"name": "targetRecipient",
					"type": "bytes32"
				},
				{
					"internalType": "uint32",
					"name": "batchId",
					"type": "uint32"
				}
			],
			"name": "transferTokensWithRelay",
			"outputs": [
				{
					"internalType": "uint64",
					"name": "messageSequence",
					"type": "uint64"
				}
			],
			"stateMutability": "payable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "toNativeTokenAmount",
					"type": "uint256"
				},
				{
					"internalType": "uint16",
					"name": "targetChain",
					"type": "uint16"
				},
				{
					"internalType": "bytes32",
					"name": "targetRecipient",
					"type": "bytes32"
				},
				{
					"internalType": "uint32",
					"name": "batchId",
					"type": "uint32"
				}
			],
			"name": "wrapAndTransferEthWithRelay",
			"outputs": [
				{
					"internalType": "uint64",
					"name": "messageSequence",
					"type": "uint64"
				}
			],
			"stateMutability": "payable",
			"type": "function"
		}
	]
}