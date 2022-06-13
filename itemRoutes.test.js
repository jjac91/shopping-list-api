process.env.NODE_ENV = "test";
const app = require("./app");
const request = require("supertest");
let items = require("./fakeDb");

let ramen = { name: "ramen", price: 0.99 };

beforeEach(function () {
  items.push(ramen);
});
afterEach(function () {
  items.length = 0;
});

describe("GET /items", function () {
  test("Gets a list of items", async function () {
    const response = await request(app).get(`/items`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ items: [ramen] });
  });
});

describe("POST /items", function () {
  test("Posts a new item", async function () {
    const response = await request(app)
      .post(`/items`)
      .send({ name: "ramune", price: 5 });

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ added: { name: "ramune", price: 5 } });
  });
});
describe("GET /items/:name", function () {
  test("Gets a single item", async function () {
    const response = await request(app).get(`/items/${ramen.name}`);
    expect(response.statusCode).toBe(200);

    expect(response.body).toEqual({ items: ramen });
  });
  test("Returns 404 for nonexistant item", async function () {
    const response = await request(app).get(`/items/$`);
    expect(response.statusCode).toBe(404);
  });
});

describe("PATCH /items/:name", function() {
  test("Updates a single item", async function() {
    const resp = await request(app)
      .patch(`/items/${ramen.name}`)
      .send({
        name: "Raoh", price: 5
      });
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({
      items: { name: "Raoh", price: 5 }
    });
  });

  test("Responds with 404 if name invalid", async function() {
    const resp = await request(app).patch(`/items/4`);
    expect(resp.statusCode).toBe(404);
  });
});

describe("DELETE /items/:name", function() {
  test("Deletes a single item", async function() {
    const resp = await request(app).delete(`/items/${ramen.name}`);
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({ message: "deleted" });
    expect(items.length).toEqual(0)
  });
  test("Responds with 404 if name invalid", async function() {
    const resp = await request(app).delete(`/items/4`);
    expect(resp.statusCode).toBe(404);
  });
});