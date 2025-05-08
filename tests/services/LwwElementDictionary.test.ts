import { LwwElementDictionary } from "../../src/services/LwwElementDictionary";

const wait = async (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

describe("LwwElementDictionary", () => {
  let dict: LwwElementDictionary;

  beforeEach(() => {
    dict = new LwwElementDictionary();
  });

  it("should add a key-value pair and allow lookup", () => {
    dict.add("key1", "value1");

    const result = dict.lookup("key1");
    expect(result?.value).toBe("value1");
  });

  it("should update a key's value", () => {
    dict.add("key1", "value1");

    const resultBefore = dict.lookup("key1");
    expect(resultBefore?.value).toBe("value1");

    dict.update("key1", "newValue1");

    const resultAfter = dict.lookup("key1");
    expect(resultAfter?.value).toBe("newValue1");
  });

  it("should remove a key and return undefined on lookup", () => {
    dict.add("key1", "value1");

    expect(dict.lookup("key1")?.value).toBe("value1");

    dict.remove("key1");
    expect(dict.lookup("key1")).toBeUndefined();
    expect(dict.getAll().tombstones).toContain("key1");
  });

  it("should merge another dictionary", async () => {
    dict.add("key1", "value1");
    dict.add("key2", "value2");
    dict.add("key6", "value6");
    dict.remove("key6");

    await wait(1); // wait for a millisecond to ensure timestamp difference

    const otherDict = new LwwElementDictionary();
    otherDict.add("key1", "newValue1");
    otherDict.add("key3", "value3");

    dict.merge(otherDict);

    expect(dict.lookup("key1")?.value).toBe("newValue1");
    expect(dict.lookup("key2")?.value).toBe("value2");
    expect(dict.lookup("key3")?.value).toBe("value3");
    expect(dict.lookup("key6")).toBeUndefined();
    expect(dict.getAll().tombstones).toContain("key6");
  });

  it("should return proper output via getAll", () => {
    dict.add("key1", "value1");
    dict.remove("key1");

    const result = dict.getAll();
    expect(Array.isArray(result.store)).toBe(true);
    expect(Array.isArray(result.tombstones)).toBe(true);

    expect(result.tombstones).toContain("key1");
  });
});
