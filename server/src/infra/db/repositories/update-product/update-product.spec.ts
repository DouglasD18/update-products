import { Product, ProductDB } from "../../../../domain/models";
import { UpdateProductMySqlRepository } from "./update-product";
import { FindAllMySqlReposiroty } from '../find-all/find-all';

const product: Product = {
  code: 16,
  name: 'AZEITE  PORTUGU�S  EXTRA VIRGEM GALLO 500ML',
  costPrice: 18.44,
  salesPrice: 21
}

const sut = new UpdateProductMySqlRepository();
const findAll = new FindAllMySqlReposiroty();

describe("UpdateProduct MySql Repository", () => {
  it("Should change the correct product", async () => {
    await sut.handle(product);

    const products = await findAll.handle();
    const updated = products.find(element => element.code === product.code);

    expect(Number(updated.costPrice)).toBe(product.costPrice);
    expect(Number(updated.salesPrice)).toBe(product.salesPrice);
  })
});