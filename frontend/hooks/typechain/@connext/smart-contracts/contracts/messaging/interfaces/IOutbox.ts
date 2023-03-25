/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../../../../../common";

export interface IOutboxInterface extends utils.Interface {
  functions: {
    "dispatch(uint32,bytes32,bytes)": FunctionFragment;
  };

  getFunction(nameOrSignatureOrTopic: "dispatch"): FunctionFragment;

  encodeFunctionData(
    functionFragment: "dispatch",
    values: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BytesLike>,
      PromiseOrValue<BytesLike>
    ]
  ): string;

  decodeFunctionResult(functionFragment: "dispatch", data: BytesLike): Result;

  events: {
    "Dispatch(bytes32,uint256,uint64,bytes32,bytes)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "Dispatch"): EventFragment;
}

export interface DispatchEventObject {
  messageHash: string;
  leafIndex: BigNumber;
  destinationAndNonce: BigNumber;
  committedRoot: string;
  message: string;
}
export type DispatchEvent = TypedEvent<
  [string, BigNumber, BigNumber, string, string],
  DispatchEventObject
>;

export type DispatchEventFilter = TypedEventFilter<DispatchEvent>;

export interface IOutbox extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: IOutboxInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    dispatch(
      _destinationDomain: PromiseOrValue<BigNumberish>,
      _recipientAddress: PromiseOrValue<BytesLike>,
      _messageBody: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  dispatch(
    _destinationDomain: PromiseOrValue<BigNumberish>,
    _recipientAddress: PromiseOrValue<BytesLike>,
    _messageBody: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    dispatch(
      _destinationDomain: PromiseOrValue<BigNumberish>,
      _recipientAddress: PromiseOrValue<BytesLike>,
      _messageBody: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[string, string]>;
  };

  filters: {
    "Dispatch(bytes32,uint256,uint64,bytes32,bytes)"(
      messageHash?: PromiseOrValue<BytesLike> | null,
      leafIndex?: PromiseOrValue<BigNumberish> | null,
      destinationAndNonce?: PromiseOrValue<BigNumberish> | null,
      committedRoot?: null,
      message?: null
    ): DispatchEventFilter;
    Dispatch(
      messageHash?: PromiseOrValue<BytesLike> | null,
      leafIndex?: PromiseOrValue<BigNumberish> | null,
      destinationAndNonce?: PromiseOrValue<BigNumberish> | null,
      committedRoot?: null,
      message?: null
    ): DispatchEventFilter;
  };

  estimateGas: {
    dispatch(
      _destinationDomain: PromiseOrValue<BigNumberish>,
      _recipientAddress: PromiseOrValue<BytesLike>,
      _messageBody: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    dispatch(
      _destinationDomain: PromiseOrValue<BigNumberish>,
      _recipientAddress: PromiseOrValue<BytesLike>,
      _messageBody: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
