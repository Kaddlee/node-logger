# node-logger

Flexible logging enhancement for your NodeJS project with colors and placeholders

```js
const {Logger} = require("node-logger");
const logger = new Logger();

logger.createPlaceholder("date", () => new Date().toLocaleString());
logger.createLogger("test", "%date% &cyan&[log]&reset& %msg%"); // %msg% default placeholder

logger.test("test message");
```

# Install

```
npm i --save https://github.com/Kaddlee/node-logger.git
```

## Environments

Only loggers selected in the config will be called

```js
const logger = new Logger({
  env: ["test", "dev"]
});

logger.createLogger("test", "&cyan&[log]&reset& %msg%", "test");
logger.createLogger("other", "&green&[other]&reset& %msg%") // you can leave the env field

logger.test("test message");
logger.other("other message"); // no call
```

## WriteStream

Write log to file using fs

```js
const logger = new Logger({
  env: ["test"],
  WriteStream: {
    stream: fs.createWriteStream("text.txt", {flags: "a"})
  }
});

logger.createLogger("test", "&cyan&[log]&reset& %msg%", "test");
logger.test("test message", {name: "Kaddlee"}); // everything will be recorded
```

## Colors

you can used default colors or create own colors

### Default colors

```js
const {Logger} = require("node-logger");

const logger = new Logger(); // setup with Colors.default
```

```
"&reset&": Colors.Reset,
"&bright&": Colors.Bright,
"&dim&": Colors.Dim,
"&underscore&": Colors.Underscore,
"&black&": Colors.FgBlack,
"&red&": Colors.FgRed,
"&green&": Colors.FgGreen,
"&yellow&": Colors.FgYellow,
"&blue&": Colors.FgBlue,
"&magenta&": Colors.FgMagenta,
"&cyan&": Colors.FgCyan,
"&white&": Colors.FgWhite,
"&BgBlack&": Colors.BgBlack,
"&BgRed&": Colors.BgRed,
"&BgGreen&": Colors.BgGreen,
"&BgYellow&": Colors.BgYellow,
"&BgBlue&": Colors.BgBlue,
"&BgMagenta&": Colors.BgMagenta,
"&BgCyan&": Colors.BgCyan,
"&BgWhite&": Colors.BgWhite,
```

### Custom colors

```js
const {Logger, Colors} = require("node-logger");

const logger = new Logger({
  colors: {
    "red": Colors.FgRed // "\x1b[31m"
  }
});
```

## Regex keys

You can change the keys to custom, but this is not recommended

```js
const logger = new Logger({
  keys: {
    placeholders: "#", // default %
    colors: "%"        // default &
  }
});

logger.createPlaceholder("port", () => process.env.PORT);

const rendered = logger.render("%cyan%just render string, port: %underscore%%red%#port#");

```


