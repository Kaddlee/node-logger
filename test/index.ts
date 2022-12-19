import { Logger } from "../src/Logger";
import { createWriteStream } from "fs";

const logger = new Logger({
  WriteStream: {
    stream: createWriteStream('test.txt', {flags: "a"})
  }
});

logger.createPlaceholder("date", () => new Date().toLocaleString("ru-RU"));

logger.createLogger("test", "%date% &magenta&[test]&reset& %msg%");

logger.test("test!")