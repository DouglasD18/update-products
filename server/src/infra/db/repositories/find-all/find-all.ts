import { FindAllRepository } from "../../../../data/protocols";
import { Product } from "../../../../domain/models";
import createConnection from "../../helpers/mysql-helper";

export class FindAllMySqlReposiroty implements FindAllRepository {
  async handle(): Promise<Product[]> {
    const query = 'SELECT * FROM products';
    const connection = await createConnection();
    const [rows] = await connection.execute(query);
    return rows as Product[];
  }
  
}