import { WriteStream } from "fs";
import Colors from "./Colors";

export interface LoggerArgs {
  colors?: any,
  env?: any[],
  keys?: {
    placeholders?: string,
    colors?: string
  },
  WriteStream?: {
    stream: WriteStream
  }
}

export class Logger {

  [name: string]: any;

  private placeholders: any = {};
  private colors!: any;
  private env!: any[];
  private keys!: any;
  private regex!: any;
  private stream!: WriteStream | null;

  /**
   * 
   * Logger constructor
   * 
   * @param {LoggerArgs | null} args logger args. default is null 
   */
  constructor(args: LoggerArgs | null = null) {
    this.colors = args?.colors || Colors.default; 
    this.stream = args?.WriteStream?.stream || null;
    this.env = args?.env || [];
    this.keys = { // keys for generate regex
      placeholders: args?.keys?.placeholders || "%",
      colors: args?.keys?.colors || "&" 
    }
    this.createRegex();
  }

  private createRegex(): void {
    try {
      this.regex = {
        placeholders: new RegExp(this.keys.placeholders + "\\w+" + this.keys.placeholders, "g"),
        colors: new RegExp(this.keys.colors + "\\w+" + this.keys.colors, "g"),
        clearColors: new RegExp(this.keys.colors, "g"),
      }
    } catch {
      throw new Error(`Regex key [${this.keys.placeholders} | ${this.keys.colors}] is invalid, please use another one`);
    }
  }

  private useLogger(message: any, format: string, ...args: any | null): void {
    if (typeof(message) === 'string' || message === undefined) {
      message = this.replacePlaceholders(format.replace('%msg%', message));
      this.writeToStream(this.clearColors(message), ...args);
      console.log(this.replaceColors(message) + Colors.Reset, ...args)
    } else console.log(message, ...args);
  }

  private writeToStream(message: string, ...args: any | null): void {
    this.stream?.write(this.clearColors(message) + (Object.keys(args).length !== 0 ? JSON.stringify(args) : "") + '\n');
  }

  private replacePlaceholders(message: string): string {
    return message.replace(this.regex.placeholders, (placeholder: string) => this.placeholders[placeholder]() || placeholder);
  }

  private clearColors(message: string): string {
    return message.replace(this.regex.colors, "");
  }

  private replaceColors(message: string): string {
    return message.replace(this.regex.colors, (color: string) => this.colors[color.replace(this.regex.clearColors, "")] || color);
  }

  /**
   * 
   * This method just render placeholders and colors
   * 
   * @param {string} message raw string for render
   * @returns {string} rendered string with placeholders and colors
   */
  render(message: string): string {
    return this.replacePlaceholders(this.replaceColors(message) + Colors.Reset);
  }

  /**
   * 
   * Create logger
   * 
   * ```js
   * logger.createLogger("name", "[test]: %msg%");
   * logger.name("test data %randomplaceholder%");
   * ```
   * 
   * @param {string} name logger name
   * @param {string} format logger format
   * @param {string | null} env logger env for make callable
   */
  createLogger(name: string, format: string, env: string | null = null): void {
    if (this[name]) {
      throw new Error(`Name ${name} for logger is bisy`);
    } else {
      this[name] = (message: string, ...args: any | null): void => {
        if (env === null || this.env.length === 0 || this.env.includes(env)) {
          this.useLogger(message, format, ...args);
        }
      }
    }
  }

  /**
   * 
   * Create placeholder
   * 
   * Placeholders may add to msg as %placeholdername%
   * 
   * ```js
   * logger.createPlaceholder("date", () => new Date());
   * logger.name("test date %date%");
   * ```
   * 
   * @param {string} name placeholder name
   * @param {object} callback placeholder callback with return placeholder value
   */
  createPlaceholder(name: string, callback: object): void {
    this.placeholders[this.keys.placeholders + name + this.keys.placeholders] = callback;
  }
}