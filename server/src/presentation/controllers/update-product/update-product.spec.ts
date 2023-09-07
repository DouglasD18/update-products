import { ProductUpdate, ValidatorReturn } from "../../../domain/models";
import { ServerError } from "../../errors";
import { UpdateProductController } from "./update-product";
import { HttpRequest, UpdateProduct } from "./update-product-protocols";

const DATA: ProductUpdate = {
  code: 30,
  salesPrice: 234.54
}

const HTTP_REQUEST: HttpRequest = {
  body: DATA
};

interface SutTypes {
  sut: UpdateProductController,
  updateProductStub: UpdateProduct
}

const makeUpdateProduct = (): UpdateProduct => {
  class UpdateProductStub implements UpdateProduct {
    handle(_data: ProductUpdate): Promise<void> {
      return new Promise(resolve => resolve());
    }
  }

  return new UpdateProductStub();
}

const makeSut = (): SutTypes => {
  const updateProductStub = makeUpdateProduct();
  const sut = new UpdateProductController(updateProductStub);

  return {
    sut,
    updateProductStub
  }
}

describe("UpdateProduct Controller", () => {
  it("Should call UpdateProduct", async () => {
    const { sut, updateProductStub} = makeSut();

    const updateProductSpy = jest.spyOn(updateProductStub, "handle");
    await sut.handle(HTTP_REQUEST);

    expect(updateProductSpy).toHaveBeenCalledWith(DATA);
  });

  it("Should throw if UpdateProduct throws", async () => {
    const { sut, updateProductStub } = makeSut();

    jest.spyOn(updateProductStub, "handle").mockImplementationOnce(() => {
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