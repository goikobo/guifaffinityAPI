import Lowdb, { LowdbSync } from "lowdb"
import { DatabaseSchema } from "../interfaces/DatabaseSchema"

class MemesService {
  constructor(private db: LowdbSync<DatabaseSchema>) {}

  public get() {
    return this.db.get("memes").take(50).value()
  }
}

export default MemesService
