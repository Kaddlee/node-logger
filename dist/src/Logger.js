"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const Colors_1 = __importDefault(require("./Colors"));
class Logger {
    /**
     *
     * Logger constructor
     *
     * @param {LoggerArgs | null} args logger args. default is null
     */
    constructor(args = null) {
        this.placeholders = {};
        this.colors = {};
        this.stream = null;
        this.colors = args?.colors || Colors_1.default.default;
        this.stream = args?.WriteStream?.stream || null;
    }
    useLogger(message, format, ...args) {
        if (typeof (message) === 'string') {
            message = this.replacePlaceholders(format.replace('%msg%', message));
            this.writeToStream(this.clearColors(message));
            console.log(this.replaceColors(message) + Colors_1.default.Reset, ...args);
        }
        else
            console.log(message);
    }
    writeToStream(message) {
        this.stream?.write(this.clearColors(message) + '\n');
    }
    replacePlaceholders(message) {
        return message.replace(/%\w+%/g, (placeholder) => this.placeholders[placeholder]() || placeholder);
    }
    clearColors(message) {
        return message.replace(/&\w+&/g, "");
    }
    replaceColors(message) {
        return message.replace(/&\w+&/g, (color) => this.colors[color] || color);
    }
    /**
     *
     * This method just render placeholders and colors
     *
     * @param {string} message raw string for render
     * @returns {string} rendered string with placeholders and colors
     */
    render(message) {
        return this.replacePlaceholders(this.replaceColors(message) + Colors_1.default.Reset);
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
    createLogger(name, format) {
        this[name] = (message, ...args) => this.useLogger(message, format, ...args);
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
    createPlaceholder(name, callback) {
        this.placeholders['%' + name + '%'] = callback;
    }
}
exports.Logger = Logger;
