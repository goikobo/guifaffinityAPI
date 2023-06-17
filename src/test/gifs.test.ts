import { createApp } from "../app"
import { createMemoryDB } from "../services/dbService"
import request from "supertest"
import { Express, response } from "express"
import { Gif } from "../interfaces/Gif"

describe("Gifs endpoint", function () {
  let app: Express

  beforeEach(() => {
    const db = createMemoryDB("../fixtures/db.json")
    app = createApp(db)
  })

  it("exists", async () => await request(app).get("/api/gifs").expect(200))

  it("return json", async () =>
    await request(app)
      .get("/api/gifs")
      .expect(200)
      .expect("Content-Type", /application\/json/))

  it("response is array", async () => {
    const response = await request(app).get("/api/gifs").expect(200)
    expect(response.body).toBeInstanceOf(Array)
  })

  it("response returns 50 gifs", async () => {
    const response = await request(app).get("/api/gifs").expect(200)
    expect(response.body).toHaveLength(50)
  })

  it("endpoint 'gifs/search/' exists", async () => {
    const response = await request(app)
      .get("/api/gifs/search?searchedText=a")
      .expect(200)
  })

  it("can search and have results limited to 50", async () => {
    const response = await request(app)
      .get("/api/gifs/search?searchedText=a")
      .expect(200)
    expect(response.body.length).toBeLessThanOrEqual(50)
  })

  it("can search and results contains the searched text", async () => {
    const response = await request(app)
      .get("/api/gifs/search?searchedText=cat")
      .expect(200)
    expect(response.body.length).toBeGreaterThanOrEqual(1)
    response.body.forEach((gif: Gif) => {
      expect(gif.title.toLocaleLowerCase()).toContain("cat")
    })
  })
})
