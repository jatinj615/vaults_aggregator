/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  Signer,
  utils,
} from "ethers";
import type { EventFragment } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../../../../../../common";

export declare namespace IDiamondCut {
  export type FacetCutStruct = {
    facetAddress: PromiseOrValue<string>;
    action: PromiseOrValue<BigNumberish>;
    functionSelectors: PromiseOrValue<BytesLike>[];
  };

  export type FacetCutStructOutput = [string, number, string[]] & {
    facetAddress: string;
    action: number;
    functionSelectors: string[];
  };
}

export interface LibDiamondInterface extends utils.Interface {
  functions: {};

  events: {
    "DiamondCut(tuple[],address,bytes)": EventFragment;
    "DiamondCutProposed(tuple[],address,bytes,uint256)": EventFragment;
    "DiamondCutRescinded(tuple[],address,bytes)": EventFragment;
    "OwnershipTransferred(address,address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "DiamondCut"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "DiamondCutProposed"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "DiamondCutRescinded"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
}

export interface DiamondCutEventObject {
  _diamondCut: IDiamondCut.FacetCutStructOutput[];
  _init: string;
  _calldata: string;
}
export type DiamondCutEvent = TypedEvent<
  [IDiamondCut.FacetCutStructOutput[], string, string],
  DiamondCutEventObject
>;

export type DiamondCutEventFilter = TypedEventFilter<DiamondCutEvent>;

export interface DiamondCutProposedEventObject {
  _diamondCut: IDiamondCut.FacetCutStructOutput[];
  _init: string;
  _calldata: string;
  deadline: BigNumber;
}
export type DiamondCutProposedEvent = TypedEvent<
  [IDiamondCut.FacetCutStructOutput[], string, string, BigNumber],
  DiamondCutProposedEventObject
>;

export type DiamondCutProposedEventFilter =
  TypedEventFilter<DiamondCutProposedEvent>;

export interface DiamondCutRescindedEventObject {
  _diamondCut: IDiamondCut.FacetCutStructOutput[];
  _init: string;
  _calldata: string;
}
export type DiamondCutRescindedEvent = TypedEvent<
  [IDiamondCut.FacetCutStructOutput[], string, string],
  DiamondCutRescindedEventObject
>;

export type DiamondCutRescindedEventFilter =
  TypedEventFilter<DiamondCutRescindedEvent>;

export interface OwnershipTransferredEventObject {
  previousOwner: string;
  newOwner: string;
}
export type OwnershipTransferredEvent = TypedEvent<
  [string, string],
  OwnershipTransferredEventObject
>;

export type OwnershipTransferredEventFilter =
  TypedEventFilter<OwnershipTransferredEvent>;

export interface LibDiamond extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: LibDiamondInterface;

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

  functions: {};

  callStatic: {};

  filters: {
    "DiamondCut(tuple[],address,bytes)"(
      _diamondCut?: null,
      _init?: null,
      _calldata?: null
    ): DiamondCutEventFilter;
    DiamondCut(
      _diamondCut?: null,
      _init?: null,
      _calldata?: null
    ): DiamondCutEventFilter;

    "DiamondCutProposed(tuple[],address,bytes,uint256)"(
      _diamondCut?: null,
      _init?: null,
      _calldata?: null,
      deadline?: null
    ): DiamondCutProposedEventFilter;
    DiamondCutProposed(
      _diamondCut?: null,
      _init?: null,
      _calldata?: null,
      deadline?: null
    ): DiamondCutProposedEventFilter;

    "DiamondCutRescinded(tuple[],address,bytes)"(
      _diamondCut?: null,
      _init?: null,
      _calldata?: null
    ): DiamondCutRescindedEventFilter;
    DiamondCutRescinded(
      _diamondCut?: null,
      _init?: null,
      _calldata?: null
    ): DiamondCutRescindedEventFilter;

    "OwnershipTransferred(address,address)"(
      previousOwner?: PromiseOrValue<string> | null,
      newOwner?: PromiseOrValue<string> | null
    ): OwnershipTransferredEventFilter;
    OwnershipTransferred(
      previousOwner?: PromiseOrValue<string> | null,
      newOwner?: PromiseOrValue<string> | null
    ): OwnershipTransferredEventFilter;
  };

  estimateGas: {};

  populateTransaction: {};
}