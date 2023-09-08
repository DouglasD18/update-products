import request from 'supertest';
import app from '../../config/app';

import { ProductUpdate } from '../../../domain/models';

describe("ValidateProduct Route", () => {
  it("Should return isValid = false if no code is provided", async () => {
    const product: ProductUpdate = {
      code: 0,
      costPrice: 2,
    }

    const response = await request(app)
      .post('/products/')
      .send({ product });

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      isValid: false,
      notFound: false,
      allFieldIsValid: false,
      priceIsGreaterThanCost: true,
      rightDifferanceBetweenPrices: true
    })
  })

  it("Should return isValid = false if salesPrice and costPrice is no provided", async () => {
    const product: ProductUpdate = {
      code: 2
    }

    const response = await request(app)
      .post('/products/')
      .send({ product });

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      isValid: false,
      notFound: false,
      allFieldIsValid: false,
      priceIsGreaterThanCost: true,
      rightDifferanceBetweenPrices: true
    })
  })

  it("Should return notFound = true if have no product if the code", async () => {
    const product: ProductUpdate = {
      code: 12,
      salesPrice: 23.43
    }

    const response = await request(app)
      .post('/products/')
      .send(product);

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      isValid: false,
      notFound: true,
      allFieldIsValid: true,
      priceIsGreaterThanCost: true,
      rightDifferanceBetweenPrices: true
    })
  })

  it("Should return priceIsGreaterThanCost = false if salesPrice is lower than costPrice", async () => {
    const invalid = {
      isValid: false,
      notFound: false,
      allFieldIsValid: true,
      priceIsGreaterThanCost: false,
      rightDifferanceBetweenPrices: true
    }
    let product: ProductUpdate = {
      code: 21,
      salesPrice: 10
    }

    let response = await request(app)
      .post('/products/')
      .send(product);

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual(invalid)

    product = {
      code: 21,
      costPrice: 12.13
    }

    response = await request(app)
      .post('/products/')
      .send(product);

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual(invalid)

    product = {
      code: 21,
      salesPrice: 12.12,
      costPrice: 12.13
    }

    response = await request(app)
      .post('/products/')
      .send(product);

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual(invalid)
  })

  it("Should return notFound = true and priceIsGreaterThanCost = false if have no product if the code and priceSales is lower than costPrice", async () => {
    const product: ProductUpdate = {
      code: 12,
      salesPrice: 23.43,
      costPrice: 25.36
    }

    const response = await request(app)
      .post('/products/')
      .send(product);

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      isValid: false,
      notFound: true,
      allFieldIsValid: true,
      priceIsGreaterThanCost: false,
      rightDifferanceBetweenPrices: true
    })
  })

  it("Should return 204 on success", async () => {
    const product: ProductUpdate = {
      code: 18,
      salesPrice: 234.54
    }

    const response = await request(app)
      .post('/products/')
      .send(product)

    expect(response.statusCode).toBe(204);
  })
})