import { FindAllMySqlReposiroty } from "./find-all";

const sut = new FindAllMySqlReposiroty();

describe("FindAll MySql Repository", () => {
  it("Should return all Products", async () => {
    const products = await sut.handle();

    expect(products).toBeTruthy();
    expect(products).toHaveLength(12);
  })
})