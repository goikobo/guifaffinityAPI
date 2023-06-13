import express, { Express } from "express"
import morgan from "morgan"
import { LowdbSync } from "lowdb"
import { DatabaseSchema } from "./interfaces/DatabaseSchema"

/* routers */
import createMemesRouter from "./routes/memes"

export function createApp(db: LowdbSync<DatabaseSchema>) {
  const app: Express = express()
  if (process.env.NODE_ENV !== "test") app.use(morgan("dev"))
  app.use(express.json())
  app.use(express.urlencoded({ extended: false }))
  createRoutes(app, db)
  return app
}

function createRoutes(app: Express, db: LowdbSync<DatabaseSchema>) {
  app.use("/api/memes", createMemesRouter(db))
}

export default { createApp }
