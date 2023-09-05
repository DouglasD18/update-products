import { Product } from "../../../domain/models";
import { ServerError } from "../../errors";
import { FindAllController } from "./find-all";
import { HttpRequest, FindAll } from "./find-all-protocols";

const HTTP_REQUEST: HttpRequest = {};

const PRODUCT: Product = {
  code: 21,
  name: "ENERGETICO RED BULL",
  costPrice: 10.71,
  salesPrice: 11.71
}

interface SutTypes {
  sut: FindAllController,
  findAllStub: FindAll
}

const makeFindAll = (): FindAll => {
  class FindAllStub implements FindAll {
    handle(): Promise<Product[]> {
      return new Promise(resolve => resolve([PRODUCT]));
    }
  }

  return new FindAllStub();
}

const makeSut = (): SutTypes => {
  const findAllStub = makeFindAll();
  const sut = new FindAllController(findAllStub);

  return {
    sut,
    findAllStub
  }
}

describe("FindAll Controller", () => {
  it("Should call FindAll", async () => {
    const { sut, findAllStub} = makeSut();

    const findAllSpy = jest.spyOn(findAllStub, "handle");
    await sut.handle(HTTP_REQUEST);

    expect(findAllSpy).toHaveBeenCalled();
  });

  it("Should throw if FindAll throws", async () => {
    const { sut, findAllStub } = makeSut();

    jest.spyOn(findAllStub, "handle").mockImplementationOnce(() => {
      throw new Error();
    })
    const response = await sut.handle(HTTP_REQUEST);

    expect(response.statusCode).toBe(500);
    expect(response.body).toEqual(new ServerError());
  });

  it("Should return 200 on success", async () => {
    const { sut } = makeSut();

    const response = await sut.handle(HTTP_REQUEST);

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([PRODUCT]);
  });
});