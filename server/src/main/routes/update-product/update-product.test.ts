import request from 'supertest';
import app from '../../config/app';

import { Product } from '../../../domain/models';
import { FindAllMySqlReposiroty } from '../../../infra/db/repositories/find-all/find-all';

const findAll = new FindAllMySqlReposiroty();

describe("UpdateProduct Route", () => {
  it("Should return 204 on success", async () => {
    let products = await findAll.handle();
    const oldProduct = products.find(element => element.code === 18);
    const { code, name, costPrice, salesPrice } = oldProduct;

    const product: Product = {
      code,
      salesPrice: salesPrice + 3,
      name,
      costPrice: costPrice + 1.5
    }
    
    const response = await request(app)
      .put('/products/')
      .send(product)

    expect(response.statusCode).toBe(204);

    products = await findAll.handle();
    const newProduct = products.find(element => element.code === 18);

    expect(newProduct.costPrice).toBe(costPrice + 1.5);
    expect(newProduct.salesPrice).toBe(salesPrice + 3);
  })
})
