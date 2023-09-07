import { Controller, ValidateProduct, HttpRequest, HttpResponse, serverError, noContent, badRequest } from "./validate-product-protocols";
export class ValidateProductController implements Controller {
  constructor(private ValidateProduct: ValidateProduct) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const data = httpRequest.body;
      const result = await this.ValidateProduct.handle(data);

      if (!result.isValid) {
        return badRequest(result);
      }

      return noContent();
    } catch (error) {
      return serverError();
    }
  }
  
}