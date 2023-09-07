import { ValidateProductAdapter } from "./validate-product";
import { FindAllRepository, Product, ProductUpdate, ValidatorReturn } from "./validate-product-protocols";

const VALID: ValidatorReturn = {
  isValid: true,
  notFound: false,
  allFieldIsValid: true,
  priceIsGreaterThanCost: true,
  rightDifferanceBetweenPrices: true
}

const DATA: ProductUpdate = {
  code: 21,
  salesPrice: 12.25,
  costPrice: 11.05
}

const PRODUCT: Product = {
  code: 21,
  name: "ENERGETICO RED BULL",
  costPrice: 10.71,
  salesPrice: 11.71
}

interface SutTypes {
  sut: ValidateProductAdapter
  findAllRepository: FindAllRepository
}

const makeFindAllRepository = (): FindAllRepository => {
  class FindAllRepositoryStub implements FindAllRepository {
    handle(): Promise<Product[]> {
      return new Promise(resolve => resolve([PRODUCT]));
    }
  }

  return new FindAllRepositoryStub();
}

const makeSut = (): SutTypes => {
  const findAllRepository = makeFindAllRepository();
  const sut = new ValidateProductAdapter(findAllRepository);

  return {
    sut,
    findAllRepository
  }
}

describe("ValidateProduct Adapter", () => {
  it("Should return isValid = false if no code is provided", async () => {
    const { sut } = makeSut();
    const data: ProductUpdate = {
      code: 0,
      salesPrice: 12
    }

    const response = await sut.handle(data);
    const invalid: ValidatorReturn = {
      isValid: false,
      notFound: false,
      allFieldIsValid: false,
      priceIsGreaterThanCost: true,
      rightDifferanceBetweenPrices: true
    }

    expect(response).toEqual(invalid);
  });

  it("Should return isValid = false if salesPrice and costPrice is no provided", async () => {
    const { sut } = makeSut();
    const data: ProductUpdate = {
      code: 21
    }

    const response = await sut.handle(data);
    const invalid: ValidatorReturn = {
      isValid: false,
      notFound: false,
      allFieldIsValid: false,
      priceIsGreaterThanCost: true,
      rightDifferanceBetweenPrices: true
    }

    expect(response).toEqual(invalid);
  });

  it("Should call FindAllRepository", async  () => {
    const { sut, findAllRepository } = makeSut();

    const FindAllRepositorySpy = jest.spyOn(findAllRepository, "handle");
    await sut.handle(DATA);

    expect(FindAllRepositorySpy).toHaveBeenCalled();
  });

  it("Should return notFound = true if have no product if the code", async () => {
    const { sut } = makeSut();
    const data: ProductUpdate = {
      code: 12,
      salesPrice: 23.43
    }

    const response = await sut.handle(data);
    const invalid: ValidatorReturn = {
      isValid: false,
      notFound: true,
      allFieldIsValid: true,
      priceIsGreaterThanCost: true,
      rightDifferanceBetweenPrices: true
    }

    expect(response).toEqual(invalid);
  });

  it("Should return priceIsGreaterThanCost = false if salesPrice is lower than costPrice", async () => {
    // First case
    const { sut } = makeSut();
    let data: ProductUpdate = {
      code: 21,
      salesPrice: 10
    }

    let response = await sut.handle(data);
    const invalid: ValidatorReturn = {
      isValid: false,
      notFound: false,
      allFieldIsValid: true,
      priceIsGreaterThanCost: false,
      rightDifferanceBetweenPrices: true
    }

    expect(response).toEqual(invalid);

    // Second case
    data = {
      code: 21,
      costPrice: 12.13
    }

    response = await sut.handle(data);

    expect(response).toEqual(invalid);

    // Third case
    data = {
      code: 21,
      salesPrice: 12.12,
      costPrice: 12.13
    }

    response = await sut.handle(data);

    expect(response).toEqual(invalid);
  });

  it("Should return notFound = true and priceIsGreaterThanCost = false if have no product if the code and priceSales is lower than costPrice", async () => {
    const { sut } = makeSut();
    const data: ProductUpdate = {
      code: 12,
      salesPrice: 23.43,
      costPrice: 25.36
    }

    const response = await sut.handle(data);
    const invalid: ValidatorReturn = {
      isValid: false,
      notFound: true,
      allFieldIsValid: true,
      priceIsGreaterThanCost: false,
      rightDifferanceBetweenPrices: true
    }

    expect(response).toEqual(invalid);
  });

  it("Should throw if FindAllRepository throws", async  () => {
    const { sut, findAllRepository } = makeSut();

    jest.spyOn(findAllRepository, "handle").mockReturnValueOnce(
      new Promise((_r, reject) => reject(new Error()))
    );
    const promise = sut.handle(DATA);

    await expect(promise).rejects.toThrow()
  })

  it("Should return the correct value on success", async () => {
    const { sut } = makeSut();

    const result = await sut.handle(DATA);

    expect(result).toEqual(VALID);
  })
});