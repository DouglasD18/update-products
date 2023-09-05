import { Product } from "../models";

export interface FindAll {
  handle(): Promise<Product[]>
}
