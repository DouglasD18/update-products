import { Router, Express } from "express";

import findAllRouter from "../routes/validate-product/validate-product";
import updateProductRouter from "../routes/update-product/update-product";

export default (app: Express): void => {
  const router = Router();
  app.use("/products/", router);
  findAllRouter(router);
  updateProductRouter(router);
}
