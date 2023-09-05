import { Controller, FindAll, HttpRequest, HttpResponse, ok, serverError } from "./find-all-protocols";

export class FindAllController implements Controller {
  constructor(private findAll: FindAll) {}

  async handle(_httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const products = await this.findAll.handle();

      return ok(products);
    } catch (error) {
      return serverError();
    }
  }
  
}