import request from "supertest";
import app from "../../src/app";

describe("Dictionary Routes", () => {
  const testKey = "testKey";
  const testValue = "testValue";

  it("POST /api/dictionary/add should add a key-value pair", async () => {
    const res = await request(app)
      .post("/api/dictionary/add")
      .send({ key: testKey, value: testValue });

    expect(res.status).toBe(201);
    expect(res.body.key).toBe(testKey);
    expect(res.body.value).toBe(testValue);
  });

  it("GET /api/dictionary/lookup/:key should retrieve the added key", async () => {
    const res = await request(app)
      .get(`/api/dictionary/lookup/${testKey}`);

    expect(res.status).toBe(200);
    expect(res.body.key).toBe(testKey);
    expect(res.body.value.value).toBe(testValue);
  });

  it("GET /api/dictionary/lookup should retrieve all keys", async () => {
    const res = await request(app).get("/api/dictionary/lookup");

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.store)).toBe(true);
  });

  it("PUT /api/dictionary/update should update the key-value pair", async () => {
    const newValue = "updatedValue";
    const res = await request(app)
      .put("/api/dictionary/update")
      .send({ key: testKey, value: newValue });

    expect(res.status).toBe(200);
    expect(res.body.value).toBe(newValue);
  });

  it("DELETE /api/dictionary/remove/:key should remove the key", async () => {
    const res = await request(app)
      .delete(`/api/dictionary/remove/${testKey}`);

    expect(res.status).toBe(200);
    expect(res.body.key).toBe(testKey);

    const lookupRes = await request(app)
      .get(`/api/dictionary/lookup/${testKey}`);

    expect(lookupRes.status).toBe(404);
  });

  it("POST /api/dictionary/merge should merge another dictionary", async () => {
    const mergeData = {
      dictionary: [
        { key: "mergeKey1", value: "mergeValue1" },
        { key: "mergeKey2", value: "mergeValue2" }
      ]
    };
    const res = await request(app)
      .post("/api/dictionary/merge")
      .send(mergeData);

    expect(res.status).toBe(200);

    const lookupRes = await request(app)
      .get(`/api/dictionary/lookup/mergeKey1`);

    expect(lookupRes.status).toBe(200);
    expect(lookupRes.body.key).toBe("mergeKey1");
    expect(lookupRes.body.value.value).toBe("mergeValue1");
  });
});
