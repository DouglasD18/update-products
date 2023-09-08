import { FindAllRepository } from "../../../../data/protocols";
import { Product, ProductDB } from "../../../../domain/models";

import createConnection from "../../helpers/mysql-helper";

export class FindAllMySqlReposiroty implements FindAllRepository {
  private async query(): Promise<ProductDB[]> {
    const query = 'SELECT * FROM products';
    const connection = await createConnection();
    const [rows] = await connection.execute(query);
    await connection.end();
    return rows as ProductDB[];
  }

  async handle(): Promise<Product[]> {
    const productsDB = await this.query();
    const products: Product[] = productsDB.map(product => ({
      code: product.code,
      name: product.name,
      costPrice: product.cost_price,
      salesPrice: product.sales_price
    }))

    return products;
  }
  
}