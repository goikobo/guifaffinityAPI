import http, { Server } from "http"
import { createApp } from "./app"
import { createDB } from "./services/dbService"

const port: string = process.env.PORT || "3000"
const dbPath: string = process.env.DBPATH || "./data/db.json"

const db = createDB(dbPath)
const app = createApp(db)

app.set("port", port)

const server: Server = http.createServer(app)

server.listen(port)
server.on("error", onError)
server.on("listening", onListening)

interface ListeningError extends Error {
  syscall?: string
  code?: string
}

function onError(error: ListeningError) {
  if (error.syscall !== "listen") {
    throw error
  }

  switch (error.code) {
    case "EACCES":
      console.error(`${port} requires elevated privileges`)
      process.exit(1)
    case "EADDRINUSE":
      console.error(`${port} is already in use`)
      process.exit(1)
    default:
      throw error
  }
}

function onListening() {
  console.log(`Listening on ${port}`)
}
