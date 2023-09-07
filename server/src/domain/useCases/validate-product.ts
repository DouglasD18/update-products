import { ProductUpdate, ValidatorReturn } from "../models";

export interface ValidateProduct {
  handle(data: ProductUpdate): Promise<ValidatorReturn>
}
