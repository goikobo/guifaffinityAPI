import Lowdb, { LowdbSync } from "lowdb"
import { DatabaseSchema } from "../interfaces/DatabaseSchema"

class GifsService {
  constructor(private db: LowdbSync<DatabaseSchema>) {}

  public get() {
    return this.db.get("gifs").take(50).value()
  }
}

export default GifsService
