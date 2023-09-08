import { Router } from "express";
import { expressAdapter } from "../../adapter/express-adapter";
import { makeUpdateProductController } from "../../factories/update-product";

export default (router: Router): void => {
  router.put("/", expressAdapter(makeUpdateProductController()));
}
