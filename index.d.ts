import { WriteStream } from "fs";

declare module "node-logger" {
	export interface LoggerArgs {
		colors?: {
			[key: string]: string
		},
		env?: string[],
		keys?: {
			placeholders?: string,
			colors?: string
		},
		WriteStream?: {
			stream: WriteStream
		}
	}

	export class Logger {

		[index: string]: any;

		/**
		 * 
		 * Logger constructor
		 * 
		 * @param {LoggerArgs | null} args logger args. default is null 
		 */
		constructor(args: LoggerArgs | null);

		/**
		 * 
		 * This method just render placeholders and colors
		 * 
		 * @param {string} message raw string for render
		 * @returns {string} rendered string with placeholders and colors
		 */
		public render: (message: string) => string;

		/**
		 * Logs all the messages using the specified logger.
		 *
		 * @param {string} logger - The name of the logger to use.
		 * @param {string[]} messages - An array of messages to be logged.
		 * @throws {Error} Throws an error if the specified logger is not found.
		 */
		public logAll: (logger: string, messages: string[]) => void;

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
		 * @throws {Error} Throws an error if name for logger busy.
		 */
		public createLogger: (name: string, format: string, env: string) => void;

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
		public createPlaceholder: (name: string, callback: object) => void;
	}
}