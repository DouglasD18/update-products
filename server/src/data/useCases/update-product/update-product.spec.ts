import { UpdateProductAdapter } from "./update-product"
import { ProductUpdate, Product, Pack, FindAllRepository, FindAllPacksRepository, UpdateProductRepository } from "./update-products-protocols"

const DATA: ProductUpdate = {
  code: 21,
  salesPrice: 12.25,
  costPrice: 11.05
}

const ENERGETICO: Product = {
  code: 18,
  name: "ENERGETICO VIBE",
  costPrice: 8.09,
  salesPrice: 8.99
}

const ROLO: Product = {
  code: 26,
  name: "ROLO",
  costPrice: 5.21,
  salesPrice: 5.79
}

const FILME: Product = {
  code: 24,
  name: "FILME",
  costPrice: 3.59,
  salesPrice: 3.99
}

const PACK_ENERGETICO_PRODUCT: Product = {
  code: 1000,
  name: "VIBE 2L - 6 UNIDADES",
  costPrice: 51.81,
  salesPrice: 57.00
}

const PACK_PRODUCT: Product = {
  code: 1010,
  name: "PACK",
  costPrice: 8.80,
  salesPrice: 9.78
}

const PRODUCTS: Product[] = [
  ENERGETICO,
  ROLO,
  FILME,
  PACK_ENERGETICO_PRODUCT,
  PACK_PRODUCT
]

const PACK_ENERGETICO: Pack = {
  id: 1,
  pack_id: 1000,
  product_id: 18,
  qty: 6
}

const PACK_1: Pack = {
  id: 2,
  pack_id: 1010,
  product_id: 24,
  qty: 1
}

const PACK_2: Pack = {
  id: 3,
  pack_id: 1010,
  product_id: 26,
  qty: 1
}

const PACKS: Pack[] = [
  PACK_ENERGETICO,
  PACK_1,
  PACK_2
];

interface SutTypes {
  sut: UpdateProductAdapter
  findAllRepository: FindAllRepository,
  findAllPacksRepository: FindAllPacksRepository,
  updateProductRepository: UpdateProductRepository
}

const makeUpdateProductRepository = (): UpdateProductRepository => {
  class UpdateProductRepositoryStub implements UpdateProductRepository {
    handle(_product: Product): Promise<void> {
      return new Promise(resolve => resolve());
    }
  }

  return new UpdateProductRepositoryStub();
}

const makeFindAllPacksRepository = (): FindAllPacksRepository => {
  class FindAllPacksRepositoryStub implements FindAllPacksRepository {
    handle(): Promise<Pack[]> {
      return new Promise(resolve => resolve(PACKS));
    }
  }

  return new FindAllPacksRepositoryStub();
}

const makeFindAllRepository = (): FindAllRepository => {
  class FindAllRepositoryStub implements FindAllRepository {
    handle(): Promise<Product[]> {
      return new Promise(resolve => resolve(PRODUCTS));
    }
  }

  return new FindAllRepositoryStub();
}

const makeSut = (): SutTypes => {
  const updateProductRepository = makeUpdateProductRepository();
  const findAllPacksRepository = makeFindAllPacksRepository();
  const findAllRepository = makeFindAllRepository();
  const sut = new UpdateProductAdapter(findAllRepository, findAllPacksRepository, updateProductRepository);

  return {
    sut,
    findAllRepository,
    findAllPacksRepository,
    updateProductRepository
  }
}

describe("UpdateProduct Adapter", () => {
  it("Should call FindAllRepository", async () => {
    const { sut, findAllRepository } = makeSut();

    const findAllRepositorySpy = jest.spyOn(findAllRepository, "handle");
    await sut.handle(DATA);

    expect(findAllRepositorySpy).toHaveBeenCalled();
  });

  it("Should call FindAllPacksRepository", async () => {
    const { sut, findAllPacksRepository } = makeSut();

    const findAllPacksRepositorySpy = jest.spyOn(findAllPacksRepository, "handle");
    await sut.handle(DATA);

    expect(findAllPacksRepositorySpy).toHaveBeenCalled();
  });

  it("Should throw if FindAllRepository throws", async  () => {
    const { sut, findAllRepository } = makeSut();

    jest.spyOn(findAllRepository, "handle").mockReturnValueOnce(
      new Promise((_r, reject) => reject(new Error()))
    );
    const promise = sut.handle(DATA);

    await expect(promise).rejects.toThrow()
  });

  it("Should call UpdateProduct only one time if a PackProduct is updated", async () => {
    const { sut, updateProductRepository } = makeSut();
    const data: ProductUpdate = {
      code: 1000,
      costPrice: 52.71
    }

    const updateProductRepositorySpy = jest.spyOn(updateProductRepository, "handle");
    await sut.handle(data);

    const newProduct: Product = {
      code: data.code,
      name: PACK_ENERGETICO_PRODUCT.name,
      costPrice: data.costPrice,
      salesPrice: PACK_ENERGETICO_PRODUCT.salesPrice
    }
    expect(updateProductRepositorySpy).toHaveBeenCalledWith(newProduct);
  });

  it("Should call UpdateProduct two times if a Product that exists in a pack is updated", async () => {
    const { sut, updateProductRepository } = makeSut();
    const data: ProductUpdate = {
      code: 24,
      costPrice: 3.69,
      salesPrice: 4.15
    }

    const updateProductRepositorySpy = jest.spyOn(updateProductRepository, "handle");
    await sut.handle(data);

    const newProduct: Product = {
      code: data.code,
      name: FILME.name,
      costPrice: data.costPrice,
      salesPrice: data.salesPrice
    }
    const newPackProduct: Product = {
      code: PACK_PRODUCT.code,
      name: PACK_PRODUCT.name,
      costPrice: newProduct.costPrice * PACK_1.qty + ROLO.costPrice * PACK_2.qty,
      salesPrice: newProduct.salesPrice * PACK_1.qty + ROLO.salesPrice * PACK_2.qty
    }
    expect(updateProductRepositorySpy).toBeCalledTimes(2);
    expect(updateProductRepositorySpy).toHaveBeenCalledWith(newProduct);
    expect(updateProductRepositorySpy).toBeCalledWith(newPackProduct);
  });

  it("Should throw if FindAllPacksRepository throws", async  () => {
    const { sut, findAllPacksRepository } = makeSut();

    jest.spyOn(findAllPacksRepository, "handle").mockReturnValueOnce(
      new Promise((_r, reject) => reject(new Error()))
    );
    const promise = sut.handle(DATA);

    await expect(promise).rejects.toThrow()
  })

  it("Should throw if UpdateProductRepository throws", async  () => {
    const { sut, updateProductRepository } = makeSut();

    jest.spyOn(updateProductRepository, "handle").mockReturnValueOnce(
      new Promise((_r, reject) => reject(new Error()))
    );
    const promise = sut.handle(DATA);

    await expect(promise).rejects.toThrow()
  })
});