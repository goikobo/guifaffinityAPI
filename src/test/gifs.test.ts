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

  describe("/api/gifs", () => {
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
  })

  describe("gifs/search/", () => {
    it("endpoint exists", async () => {
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

    it("can search and results contains the searched text (cat)", async () => {
      const response = await request(app)
        .get("/api/gifs/search?searchedText=cat")
        .expect(200)
      expect(response.body.length).toBeGreaterThanOrEqual(1)
      response.body.forEach((gif: Gif) => {
        expect(gif.title.toLocaleLowerCase()).toContain("cat")
      })
    })

    it("can search and results contains the searched text (dog)", async () => {
      const response = await request(app)
        .get("/api/gifs/search?searchedText=dog")
        .expect(200)
      expect(response.body.length).toBeGreaterThanOrEqual(1)
      response.body.forEach((gif: Gif) => {
        expect(gif.title.toLocaleLowerCase()).toContain("dog")
      })
    })

    it("can search and results return 404 if not contains any result (Supercalifragilisticoexpialidoso)", async () => {
      const response = await request(app)
        .get("/api/gifs/search?searchedText=Supercalifragilisticoexpialidoso")
        .expect(200)
      expect(response.body).toHaveLength(0)
    })

    it("can search and results contains the searched tag #funny", async () => {
      const response = await request(app)
        .get("/api/gifs/search?searchedText=" + encodeURIComponent("#funny"))
        .expect(200)
      expect(response.body.length).toBeGreaterThanOrEqual(1)
      response.body.forEach((gif: Gif) => {
        expect(gif.tags.map((tag) => tag.toLocaleLowerCase())).toContain(
          "#funny"
        )
      })
    })

    it("can search and results contains the searched tag #movie", async () => {
      const response = await request(app)
        .get("/api/gifs/search?searchedText=" + encodeURIComponent("#movie"))
        .expect(200)
      expect(response.body.length).toBeGreaterThanOrEqual(1)
      response.body.forEach((gif: Gif) => {
        expect(gif.tags.map((tag) => tag.toLocaleLowerCase())).toContain(
          "#movie"
        )
      })
    })

    it("can search and results contains the searched tag #goiko", async () => {
      const response = await request(app)
        .get("/api/gifs/search?searchedText=" + encodeURIComponent("#goiko"))
        .expect(200)
      expect(response.body).toHaveLength(0)
    })
  })

  describe("/api/gifs/getById", () => {
    it("exists /api/gifs/getById", async () =>
      await request(app).get("/api/gifs/getById").expect(200))

    it("return json on /api/gifs/getById", async () =>
      await request(app)
        .get("/api/gifs/getById")
        .expect(200)
        .expect("Content-Type", /application\/json/))

    it("returns something when put an getById", async () => {
      const response = await request(app)
        .get("/api/gifs/getById?id=VDSIi6IB4727grnoIH")
        .expect(200)
        .expect("Content-Type", /application\/json/)
      expect(response.body?.id).toContain("VDSIi6IB4727grnoIH")
    })
  })
})
