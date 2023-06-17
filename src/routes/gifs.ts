import express, { Express, Router, Request, Response } from "express"
import GifsService from "../services/gifs"
import { LowdbSync } from "lowdb"
import { DatabaseSchema } from "../interfaces/DatabaseSchema"

function createRouter(db: LowdbSync<DatabaseSchema>) {
  const router: Router = express.Router()
  router.get("/", async (req: Request, res: Response) => {
    const gifsService = new GifsService(db)
    const response = gifsService.get()

    res.setHeader("Content-Type", "application/json")
    res.json(response)
  })
  router.get("/search", async (req: Request, res: Response) => {
    res.sendStatus(200)
  })
  return router
}

export default createRouter
