import express, { Express, Router, Request, Response } from "express"
import MemesService from "../services/memes"
import { LowdbSync } from "lowdb"
import { DatabaseSchema } from "../interfaces/DatabaseSchema"

function createRouter(db: LowdbSync<DatabaseSchema>) {
  const router: Router = express.Router()
  router.get("/", async (req: Request, res: Response) => {
    const memesService = new MemesService(db)
    const response = memesService.get()

    res.setHeader("Content-Type", "application/json")
    res.json(response)
  })
  return router
}

export default createRouter
