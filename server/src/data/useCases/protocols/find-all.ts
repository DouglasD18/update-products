import { Product } from "../../../domain/models";

export interface FindAllRepository {
  handle(): Promise<Product[]>
}
