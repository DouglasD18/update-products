import { ProductUpdate } from "../models";

export interface UpdateProduct {
  handle(data: ProductUpdate): Promise<void>;
}
