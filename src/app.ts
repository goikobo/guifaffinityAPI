import express, { Express } from "express"
import morgan from "morgan"
import { LowdbSync } from "lowdb"
import { DatabaseSchema } from "./interfaces/DatabaseSchema"
import cors from "cors"

/* routers */
import createGifsRouter from "./routes/gifs"

export function createApp(db: LowdbSync<DatabaseSchema>) {
  const app: Express = express()

  // allow request from our app
  const app_path: string = process.env.APP_PATH || "http://localhost:3000"
  app.use(cors({ origin: app_path }))

  if (process.env.NODE_ENV !== "test") app.use(morgan("dev"))

  app.use(express.json())
  app.use(express.urlencoded({ extended: false }))

  createRoutes(app, db)

  return app
}

function createRoutes(app: Express, db: LowdbSync<DatabaseSchema>) {
  app.use("/api/gifs", createGifsRouter(db))
}

export default { createApp }
