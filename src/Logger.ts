import { WriteStream } from "fs";
import Colors from "./Colors";

export interface LoggerArgs {
  colors?: any,
  WriteStream?: {
    stream: WriteStream
  }
}

export class Logger {

  [name: string]: any;

  private placeholders: any = {};
  private colors: any = {};
  private stream: WriteStream | null = null;

  /**
   * 
   * Logger constructor
   * 
   * @param {LoggerArgs | null} args logger args. default is null 
   */
  constructor(args: LoggerArgs | null = null) {
    this.colors = args?.colors || Colors.default; 
    this.stream = args?.WriteStream?.stream || null;
  }

  private useLogger(message: any, format: string, ...args: any | null): void {
    if (typeof(message) === 'string') {
      message = this.replacePlaceholders(format.replace('%msg%', message));
      this.writeToStream(this.clearColors(message));
      console.log(this.replaceColors(message) + Colors.Reset, ...args)
    } else console.log(message);
  }

  private writeToStream(message: string): void {
    this.stream?.write(this.clearColors(message) + '\n');
  }

  private replacePlaceholders(message: string): string {
    return message.replace(/%\w+%/g, (placeholder: string) => this.placeholders[placeholder]() || placeholder);
  }

  private clearColors(message: string): string {
    return message.replace(/&\w+&/g, "");
  }

  private replaceColors(message: string): string {
    return message.replace(/&\w+&/g, (color: string) => this.colors[color] || color);
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
   */
  createLogger(name: string, format: string): void {
    this[name] = (message: string, ...args: any | null): void => this.useLogger(message, format, ...args);
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
    this.placeholders['%' + name + '%'] = callback;
  }
}