import { UpdateProductRepository } from "../../../../data/protocols";
import { Product, ProductDB } from "../../../../domain/models";

import createConnection from "../../helpers/mysql-helper";

export class UpdateProductMySqlRepository implements UpdateProductRepository {
  async handle(product: Product): Promise<void> {
    const { code, costPrice, salesPrice } = product;

    const query = `UPDATE products
                   SET cost_price = ?, sales_price = ? 
                   WHERE code = ?`;
    const values = [Number(costPrice.toFixed(2)), Number(salesPrice.toFixed(2)), code];

    const connection = await createConnection();
    await connection.query(query, values);
    await connection.end();
  }
  
}