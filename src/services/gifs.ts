import Lowdb, { LowdbSync } from "lowdb";
import { DatabaseSchema } from "../interfaces/DatabaseSchema";
import { Gif } from "../interfaces/Gif";

class GifsService {
  constructor(private db: LowdbSync<DatabaseSchema>) {}

  public get() {
    return this.db.get("gifs").take(50).value();
  }

  public search(text: string) {
    const gifs: Gif[] = this.db.get("gifs").value();

    return gifs
      .filter((gif) => gif.title.toLowerCase().includes(text))
      .slice(0, 50);
  }
}

export default GifsService;
