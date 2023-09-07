import { Product } from "../../domain/models";

export interface UpdateProductRepository {
  handle(product: Product): Promise<void>;
}