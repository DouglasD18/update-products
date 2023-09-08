import { FindAllPacksMySqlRepository} from "./find-all-packs";

const sut = new FindAllPacksMySqlRepository();

describe("FindAllPacks MySql Repository", () => {
  it("Should return all Packs", async () => {
    const packs = await sut.handle();

    expect(packs).toBeTruthy();
    expect(packs).toHaveLength(5);
  })
})