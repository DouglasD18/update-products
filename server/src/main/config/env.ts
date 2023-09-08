import 'dotenv/config';

export default {
  db_host: process.env.DB_HOST,
  db_user: process.env.DB_USER,
  db_pass: process.env.DB_PASS,
  db_name: process.env.DB_NAME,
  db_port: Number(process.env.DB_PORT),
  port: Number(process.env.PORT)
}
