import { ProductUpdate, ValidatorReturn } from "../../../domain/models";
import { ServerError } from "../../errors";
import { ValidateProductController } from "./validate-product";
import { HttpRequest, ValidateProduct } from "./validate-product-protocols";

const UPDATE: ProductUpdate = {
  code: 30,
  salesPrice: 234.54
}

const INVALID: ValidatorReturn = {
  isValid: false,
  notFound: true,
  allFieldIsValid: false,
  priceIsGreaterThanCost: false,
  rightDifferanceBetweenPrices: false
}

const VALIDATED: ValidatorReturn = {
  isValid: true,
  notFound: false,
  allFieldIsValid: true,
  priceIsGreaterThanCost: true,
  rightDifferanceBetweenPrices: true
}

const HTTP_REQUEST: HttpRequest = {
  body: UPDATE
};

interface SutTypes {
  sut: ValidateProductController,
  validateProductStub: ValidateProduct
}

const makeValidateProduct = (): ValidateProduct => {
  class ValidateProductStub implements ValidateProduct {
    handle(_data: ProductUpdate): Promise<ValidatorReturn> {
      return new Promise(resolve => resolve(VALIDATED));
    }
  }

  return new ValidateProductStub();
}

const makeSut = (): SutTypes => {
  const validateProductStub = makeValidateProduct();
  const sut = new ValidateProductController(validateProductStub);

  return {
    sut,
    validateProductStub
  }
}

describe("ValidateProduct Controller", () => {
  it("Should call ValidateProduct", async () => {
    const { sut, validateProductStub} = makeSut();

    const validateProductSpy = jest.spyOn(validateProductStub, "handle");
    await sut.handle(HTTP_REQUEST);

    expect(validateProductSpy).toHaveBeenCalledWith(UPDATE);
  });

  it("Should return 400 with Update is invalid", async () => {
    const { sut, validateProductStub } = makeSut();

    jest.spyOn(validateProductStub, "handle").mockReturnValueOnce(new Promise(resolve => resolve(INVALID)));
    const response = await sut.handle(HTTP_REQUEST);

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual(INVALID);
  })

  it("Should throw if ValidateProduct throws", async () => {
    const { sut, validateProductStub } = makeSut();

    jest.spyOn(validateProductStub, "handle").mockImplementationOnce(() => {
      throw new Error();
    })
    const response = await sut.handle(HTTP_REQUEST);

    expect(response.statusCode).toBe(500);
    expect(response.body).toEqual(new ServerError());
  });

  it("Should return 204 on success", async () => {
    const { sut } = makeSut();

    const response = await sut.handle(HTTP_REQUEST);

    expect(response.statusCode).toBe(204);
  });
});