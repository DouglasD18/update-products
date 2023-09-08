import { ValidateProduct, FindAllRepository, Product, ProductUpdate, ValidatorReturn } from "./validate-product-protocols";

export class ValidateProductAdapter implements ValidateProduct {
  constructor(
    private findAllRepository: FindAllRepository,
  ) {}

  async handle(data: ProductUpdate): Promise<ValidatorReturn> {
    const { code } = data;

    const VALIDATED: ValidatorReturn = {
      isValid: true,
      notFound: false,
      allFieldIsValid: true,
      priceIsGreaterThanCost: true,
      rightDifferanceBetweenPrices: true
    }

    if (!code || isNaN(code)) {
      VALIDATED.allFieldIsValid = false;
      VALIDATED.isValid = false;
    } else {
      if (!data.costPrice && !data.salesPrice) {
        VALIDATED.allFieldIsValid = false;
        VALIDATED.isValid = false;
      }

      if (data.salesPrice && isNaN(data.salesPrice) || data.costPrice && isNaN(data.costPrice)) {
        VALIDATED.allFieldIsValid = false;
        VALIDATED.isValid = false;
      }

      const products = await this.findAllRepository.handle();
      const product = products.find(product => product.code === Number(code));
      
      if (!product) {
        VALIDATED.notFound = true;
        VALIDATED.isValid = false;
      } 
      if (data.costPrice && data.salesPrice && data.costPrice > data.salesPrice) {
        VALIDATED.priceIsGreaterThanCost = false;
        VALIDATED.isValid = false;
      } else if (product && data.costPrice && data.costPrice > product.salesPrice) {
        VALIDATED.priceIsGreaterThanCost = false;
        VALIDATED.isValid = false;
      } else if (product && data.salesPrice && data.salesPrice < product.costPrice) {
        VALIDATED.priceIsGreaterThanCost = false;
        VALIDATED.isValid = false;
      }
    }

    return VALIDATED;
  }

}
