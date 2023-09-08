import { Router, Express } from "express";

import findAllRouter from "../routes/validate-product/validate-product";

export default (app: Express): void => {
  const router = Router();
  app.use("/products/", router);
  findAllRouter(router);
}
