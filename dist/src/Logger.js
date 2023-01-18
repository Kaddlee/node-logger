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
        this.colors = args?.colors || Colors_1.default.default;
        this.stream = args?.WriteStream?.stream || null;
        this.env = args?.env || [];
        this.keys = {
            placeholders: args?.keys?.placeholders || "%",
            colors: args?.keys?.colors || "&"
        };
        this.createRegex();
    }
    createRegex() {
        try {
            this.regex = {
                placeholders: new RegExp(this.keys.placeholders + "\\w+" + this.keys.placeholders, "g"),
                colors: new RegExp(this.keys.colors + "\\w+" + this.keys.colors, "g"),
                clearColors: new RegExp(this.keys.colors, "g"),
            };
        }
        catch {
            throw new Error(`Regex key [${this.keys.placeholders} | ${this.keys.colors}] is invalid, please use another one`);
        }
    }
    useLogger(message, format, ...args) {
        if (typeof (message) === 'string' || message === undefined) {
            message = this.replacePlaceholders(format.replace('%msg%', message));
            this.writeToStream(this.clearColors(message), ...args);
            console.log(this.replaceColors(message) + Colors_1.default.Reset, ...args);
        }
        else
            console.log(message, ...args);
    }
    writeToStream(message, ...args) {
        this.stream?.write(this.clearColors(message) + (Object.keys(args).length !== 0 ? JSON.stringify(args) : "") + '\n');
    }
    replacePlaceholders(message) {
        return message.replace(this.regex.placeholders, (placeholder) => this.placeholders[placeholder]() || placeholder);
    }
    clearColors(message) {
        return message.replace(this.regex.colors, "");
    }
    replaceColors(message) {
        return message.replace(this.regex.colors, (color) => this.colors[color.replace(this.regex.clearColors, "")] || color);
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
     * @param {string | null} env logger env for make callable
     */
    createLogger(name, format, env = null) {
        if (this[name]) {
            throw new Error(`Name ${name} for logger is bisy`);
        }
        else {
            this[name] = (message, ...args) => {
                if (env === null || this.env.length === 0 || this.env.includes(env)) {
                    this.useLogger(message, format, ...args);
                }
            };
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
    createPlaceholder(name, callback) {
        this.placeholders[this.keys.placeholders + name + this.keys.placeholders] = callback;
    }
}
exports.Logger = Logger;
