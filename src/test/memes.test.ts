import { createApp } from "../app"
import { createMemoryDB } from "../services/dbService"
import request from "supertest"
import { Express } from "express"

describe("Memes endpoint", function () {
  let app: Express

  beforeEach(() => {
    const db = createMemoryDB("../fixtures/db.json")
    app = createApp(db)
  })

  it("exists", async () => await request(app).get("/api/memes").expect(200))

  it("return json", async () =>
    await request(app)
      .get("/api/memes")
      .expect(200)
      .expect("Content-Type", /application\/json/))

  it("response is array", async () => {
    const response = await request(app).get("/api/memes").expect(200)
    expect(response.body).toBeInstanceOf(Array)
  })

  it("response returns 50 memes", async () => {
    const response = await request(app).get("/api/memes").expect(200)
    expect(response.body).toHaveLength(50)
  })
})
