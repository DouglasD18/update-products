import { FindAllAdapter } from "./find-all";
import { FindAllRepository, Product } from "./find-all-protocols";

const PRODUCT: Product = {
  code: 21,
  name: "ENERGETICO RED BULL",
  costPrice: 10.71,
  salesPrice: 11.71
}

interface SutTypes {
  sut: FindAllAdapter
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
  const sut = new FindAllAdapter(findAllRepository);

  return {
    sut,
    findAllRepository
  }
}

describe("FindAll Adapter", () => {
  it("Should call FindAllRepository", async  () => {
    const { sut, findAllRepository } = makeSut();

    const FindAllRepositorySpy = jest.spyOn(findAllRepository, "handle");
    await sut.handle();

    expect(FindAllRepositorySpy).toHaveBeenCalled();
  })

  it("Should throw if FindAllRepository throws", async  () => {
    const { sut, findAllRepository } = makeSut();

    jest.spyOn(findAllRepository, "handle").mockReturnValueOnce(
      new Promise((_r, reject) => reject(new Error()))
    );
    const promise = sut.handle();

    await expect(promise).rejects.toThrow()
  })

  it("Should return the correct value on success", async () => {
    const { sut } = makeSut();

    const result = await sut.handle();

    expect(result).toEqual([PRODUCT]);
  })
});