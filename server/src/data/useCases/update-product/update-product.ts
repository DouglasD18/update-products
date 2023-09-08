import { UpdateProduct, FindAllRepository, FindAllPacksRepository, UpdateProductRepository, ProductUpdate, Product } from "./update-products-protocols";

export class UpdateProductAdapter implements  UpdateProduct {
  constructor(
    private findAllRepository: FindAllRepository,
    private findAllPacksRepository: FindAllPacksRepository,
    private updateProductRepository: UpdateProductRepository
  ) {}

  async handle(data: ProductUpdate): Promise<void> {
    const { code } = data;

    const products = await this.findAllRepository.handle();
    const packs = await this.findAllPacksRepository.handle();

    const oldProduct = products.find(product => product.code === code);
    const newProduct = { ...oldProduct, ...data };
    await this.updateProductRepository.handle(newProduct);

    const pack = packs.find(pack => pack.productId === code);
    if (pack) {
      const { qty } = pack;
      const oldPack = products.find(product => product.code === pack.packId);
      const oldPacks = packs.filter(product => product.packId === oldPack.code);

      if (oldPacks.length > 1) {
        const otherProductCode = oldPacks.map(product => product.productId).find(product => product !== newProduct.code);
        
        const otherProduct = products.find(product => product.code === otherProductCode);
        const otherPack = oldPacks.find(element => element.productId === otherProduct.code);

        const newPackProduct: Product = {
          code: oldPack.code,
          name: oldPack.name,
          costPrice: newProduct.costPrice * qty + otherProduct.costPrice * otherPack.qty,
          salesPrice: newProduct.salesPrice * qty + otherProduct.salesPrice * otherPack.qty
        }

        await this.updateProductRepository.handle(newPackProduct);
      } else {
        oldPack.costPrice = qty * newProduct.costPrice;
        oldPack.salesPrice = qty * newProduct.salesPrice;

        await this.updateProductRepository.handle(oldPack);
      }

    }
  }
  
}