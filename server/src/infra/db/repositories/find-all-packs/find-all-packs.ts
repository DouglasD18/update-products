import { FindAllPacksRepository } from "../../../../data/protocols";
import { Pack, PackDB } from "../../../../domain/models";

import createConnection from "../../helpers/mysql-helper";

export class FindAllPacksMySqlRepository implements FindAllPacksRepository {
  private async query(): Promise<PackDB[]> {
    const query = 'SELECT * FROM packs';
    const connection = await createConnection();
    const [rows] = await connection.execute(query);
    await connection.end();
    return rows as PackDB[];
  }

  async handle(): Promise<Pack[]> {
    const packsDb = await this.query();
    const packs: Pack[] = packsDb.map(pack => ({
      id: pack.id,
      qty: pack.qty,
      packId: Number(pack.pack_id),
      productId: Number(pack.product_id)
    }));

    return packs;
  }
  
}