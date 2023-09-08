import { FindAllMySqlReposiroty } from "../../infra/db/repositories/find-all/find-all";
import { ValidateProductController } from "../../presentation/controllers/validate-product/validate-product";
import { ValidateProductAdapter } from '../../data/useCases/validate-product/validate-product';

export const makeValidateProductController = (): ValidateProductController => {
  const findAllRepository = new FindAllMySqlReposiroty();
  const validateProduct = new ValidateProductAdapter(findAllRepository);
  return new ValidateProductController(validateProduct);
}
