import { FindAll, FindAllRepository, Product } from "./find-all-protocols";

export class FindAllAdapter implements FindAll {
  constructor(private findAllRepository: FindAllRepository) {}

  async handle(): Promise<Product[]> {
    const products = await this.findAllRepository.handle();
    return products;
  }

}
