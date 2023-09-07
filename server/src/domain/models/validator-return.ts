export interface ValidatorReturn {
  isValid: boolean;
  notFound: boolean;
  allFieldIsValid: boolean;
  priceIsGreaterThanCost: boolean;
  rightDifferanceBetweenPrices: boolean;
}
