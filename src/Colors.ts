export default class Colors {
  static Reset = "\x1b[0m"
  static Bright = "\x1b[1m"
  static Dim = "\x1b[2m"
  static Underscore = "\x1b[4m"
  static Blink = "\x1b[5m"

  static FgBlack = "\x1b[30m"
  static FgRed = "\x1b[31m"
  static FgGreen = "\x1b[32m"
  static FgYellow = "\x1b[33m"
  static FgBlue = "\x1b[34m"
  static FgMagenta = "\x1b[35m"
  static FgCyan = "\x1b[36m"
  static FgWhite = "\x1b[37m"

  static BgBlack = "\x1b[40m"
  static BgRed = "\x1b[41m"
  static BgGreen = "\x1b[42m"
  static BgYellow = "\x1b[43m"
  static BgBlue = "\x1b[44m"
  static BgMagenta = "\x1b[45m"
  static BgCyan = "\x1b[46m"
  static BgWhite = "\x1b[47m"

  static default = {
    "&reset&": Colors.Reset,
    "&dright&": Colors.Bright,
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
  }
}