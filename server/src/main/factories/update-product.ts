import { UpdateProductAdapter } from "../../data/useCases/update-product/update-product";
import { FindAllPacksMySqlRepository } from "../../infra/db/repositories/find-all-packs/find-all-packs";
import { FindAllMySqlReposiroty } from "../../infra/db/repositories/find-all/find-all";
import { UpdateProductMySqlRepository } from "../../infra/db/repositories/update-product/update-product";
import { UpdateProductController } from "../../presentation/controllers/update-product/update-product";

export const makeUpdateProductController = (): UpdateProductController => {
  const findAllRepository = new FindAllMySqlReposiroty();
  const findAllPacksRepository = new FindAllPacksMySqlRepository();
  const updateProductRepository = new UpdateProductMySqlRepository();
  const updateProduct = new UpdateProductAdapter(findAllRepository, findAllPacksRepository, updateProductRepository);
  return new UpdateProductController(updateProduct);
}
