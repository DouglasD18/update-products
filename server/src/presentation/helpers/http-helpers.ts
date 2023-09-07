import { ServerError } from "../errors";
import { HttpResponse } from "../protocols";

export const serverError = (): HttpResponse => ({
  statusCode: 500,
  body: new ServerError()
});

export const badRequest = (data: any): HttpResponse => ({
  statusCode: 400,
  body: data
});

export const noContent = (): HttpResponse => ({
  statusCode: 204
});

export const ok = (result: any): HttpResponse => ({
  statusCode: 200,
  body: result
});
