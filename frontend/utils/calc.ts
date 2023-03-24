import { ethers } from 'ethers';
import { BigNumber, ZERO, bnum } from './poolCalc/utils/bignumber';
import { numberConstants } from './constants';
import { intlFormatNumber } from 'utils/formatNumber';

import { CurrencyId, CurrencySymbol } from 'enums';

// TODO: Remove this
export const getAccInterest = (accInterest, conversionRate) => {
  return bnum(accInterest).multipliedBy(conversionRate);
};

/**
 * To calculate and return fixed APR
 *
 * @dev Formula : convergingPointConstant / timeStretch
 * @param timeStretch
 * @returns {BigNumber} fixedAPR
 */
export const calcOtFixedAPR = (timeStretch) => {
  return numberConstants.convergingPointConstant.div(timeStretch);
};

/**
 * To calculate the price of yt
 *
 * @param ytToken yt token from balancer
 * @param underlyingToken underlying token for the corresponding yt pool from balancer
 * @returns {BigNumber} price of yt
 */
export const getYtPrice = (ytToken, underlyingToken) => {
  const yieldPrice =
    ytToken && underlyingToken && Number(ytToken?.balance) > 0
      ? bnum(underlyingToken?.balance).div(ytToken?.balance)
      : ZERO;

  return yieldPrice;
};

export const getConversionRate = (rate, symbol) => {
  const currencySymbol = CurrencySymbol[symbol?.toUpperCase()];
  const currencyId = CurrencyId[currencySymbol];
  return currencyId ? rate?.[currencyId]?.[CurrencyId.USD] : 0;
};

/**
 * To calculate and return principal liquidity
 *
 * @param otToken ot token from balancer
 * @param underlyingToken underlying token of the corresponding pool from balancer
 * @param otPrice price of 1 ot
 * @param conversionRate price of underlying in dollars
 * @returns {BigNumber} principalLiquidity
 */
export const getOtPoolLiquidity = (otToken, underlyingToken, otPrice, conversionRate): BigNumber => {
  let principalLiquidity = ZERO;

  if (otToken && underlyingToken) {
    principalLiquidity = otPrice
      .multipliedBy(otToken?.balance)
      .plus(bnum(underlyingToken?.balance).multipliedBy(conversionRate));
  }

  return principalLiquidity;
};

/**
 * To calculate and return yield liquidity
 *
 * @Dev Formula : Weighted pool
 * @param ytToken
 * @param underlyingToken
 * @param ytPrice
 * @param conversionRate
 * @returns {BigNumber} yieldLiquidity
 */
export const getYtPoolLiquidity = (ytToken, underlyingToken, ytPrice, conversionRate): BigNumber => {
  let yieldLiquidity = ZERO;

  if (ytToken && underlyingToken) {
    yieldLiquidity = ytPrice
      .multipliedBy(ytToken?.balance)
      .plus(bnum(underlyingToken?.balance).multipliedBy(conversionRate));
  }

  return yieldLiquidity;
};

/**
 * To calculate and return yield LP APY
 *
 * @param ytPoolLiquidity
 * @param totalSwapFee
 * @returns {BigNumber} yieldLPAPY
 */
export const calcYtLPAPY = (ytPoolLiquidity, totalSwapFee): BigNumber => {
  if (totalSwapFee && Number(ytPoolLiquidity)) {
    return bnum(totalSwapFee).dividedBy(ytPoolLiquidity).multipliedBy(numberConstants.daysPerYear);
  }

  return ZERO;
};

/**
 * To calculate and return yield LP APY
 *
 * @param otPoolTokens
 * @param underlyingAddress
 * @param timeStretch
 * @param startTimestamp
 * @param durationSeconds
 * @param rate
 * @param otSymbol
 * @param totalSwapFee
 * @returns {BigNumber} principalLPAPY
 */
export const calcOtLPAPY = (otPoolLiquidity, totalSwapFee): BigNumber => {
  if (totalSwapFee && Number(otPoolLiquidity)) {
    return bnum(totalSwapFee).dividedBy(otPoolLiquidity).multipliedBy(numberConstants.daysPerYear);
  }

  return ZERO;
};

export const isIncorrectNumberFormat = (param) => {
  const format = /[!@#$%^&*()_+\-=e\[\]{};':"\\|,<>\/?]+/;
  return format.test(param);
};

export const escapeRegExp = (value: string): string => {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
};

export const getEnumKeyByEnumValue = (myEnum, enumValue): string => {
  return Object.keys(myEnum).find((x) => myEnum[x] == enumValue);
};

export const getAPR = (apr: BigNumber, duration: string): string => {
  switch (duration) {
    case 'YEARLY':
      return `${intlFormatNumber(apr.dp(2, 1).toString(), 2)} %`;
    case 'MONTHLY':
      return `${intlFormatNumber(apr.div(numberConstants.monthsPerYear).dp(2, 1).toString(), 2)} %`;
    case 'DAILY':
      return `${intlFormatNumber(apr.div(numberConstants.daysPerYear).dp(2, 1).toString(), 2)} %`;
    default:
      return '';
  }
};

export const getVaultApy = (vaultApy: ethers.BigNumber, duration: string): string => {
  switch (duration) {
    case 'YEARLY':
      return `${intlFormatNumber(bnum(ethers.utils.formatEther(vaultApy)).dp(3, 1).toString(), 3)} %`;
    case 'MONTHLY':
      return `${intlFormatNumber(
        bnum(ethers.utils.formatEther(vaultApy)).div(numberConstants.monthsPerYear).dp(3, 1).toString(),
        3
      )} %`;
    case 'DAILY':
      return `${intlFormatNumber(
        bnum(ethers.utils.formatEther(vaultApy)).div(numberConstants.daysPerYear).dp(3, 1).toString(),
        3
      )} %`;
    default:
      return '';
  }
};
