import low, { LowdbSync } from "lowdb"
import FileSync from "lowdb/adapters/FileSync"
import Memory from "lowdb/adapters/Memory"
import { DatabaseSchema } from "../interfaces/DatabaseSchema"

export function createDB(dbPath: string) {
  const adapter = new FileSync<DatabaseSchema>(dbPath)
  const db: LowdbSync<DatabaseSchema> = low(adapter)
  return db
}

export function createMemoryDB(dbPath: string) {
  const jsonData = require(dbPath)
  const adapter = new Memory<DatabaseSchema>("")
  const db: LowdbSync<DatabaseSchema> = low(adapter)
  db.defaults(jsonData).write()
  return db
}
