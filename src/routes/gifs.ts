import express, { Express, Router, Request, Response } from "express"
import GifsService from "../services/gifs"
import { LowdbSync } from "lowdb"
import { DatabaseSchema } from "../interfaces/DatabaseSchema"
import { Gif } from "../interfaces/Gif"

function createRouter(db: LowdbSync<DatabaseSchema>) {
  const router: Router = express.Router()
  router.get("/", async (req: Request, res: Response) => {
    const gifsService = new GifsService(db)
    const response = gifsService.get()

    res.setHeader("Content-Type", "application/json")
    res.json(response)
  })

  type SearchRequest = Request<{}, Gif[], {}, { searchedText: string }>
  router.get("/search", async (req: SearchRequest, res: Response) => {
    const { searchedText } = req.query
    const gifsService = new GifsService(db)

    const response = searchedText.startsWith("#")
      ? gifsService.searchByTag(searchedText)
      : gifsService.search(searchedText)

    res.setHeader("Content-Type", "application/json")
    res.json(response)
  })

  type ByIdRequest = Request<{}, Gif[], {}, { id: string }>
  router.get("/getById", async (req: ByIdRequest, res: Response) => {
    const { id } = req.query
    const gifsService = new GifsService(db)
    const response = gifsService.searchById(id)

    if (!response) {
      res.sendStatus(404)
      return
    }

    res.setHeader("Content-Type", "application/json")
    res.json(response)
  })
  return router
}

export default createRouter
