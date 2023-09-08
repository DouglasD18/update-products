import { createConnection, Connection } from "mysql2/promise";

import env from "../../../main/config/env";

export default async (): Promise<Connection> => createConnection({
  host: env.db_host,
  user: env.db_user,
  password: env.db_pass,
  database: env.db_name
});
