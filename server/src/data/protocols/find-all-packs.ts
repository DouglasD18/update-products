import { Pack } from "../../domain/models";

export interface FindAllPacksRepository {
  handle(): Promise<Pack[]>
}