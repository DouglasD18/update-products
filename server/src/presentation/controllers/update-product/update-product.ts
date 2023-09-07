import { Controller, UpdateProduct, HttpRequest, HttpResponse, noContent, serverError } from "./update-product-protocols";

export class UpdateProductController implements Controller {
  constructor(private updateProduct: UpdateProduct) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const data = httpRequest.body;

    try {
      await this.updateProduct.handle(data);

      return noContent();
    } catch (error) {
      return serverError();
    }
  }
}