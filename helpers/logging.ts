import { getEnv } from '@helpers/env.ts';
import chalk from 'chalk';

export class Logging {
	/**
	 * Logs info messages to the terminal.
	 *
	 * @param {string} message - The message that needs to be logged.
	 * @returns void - Returns nothing.
	 */
	static info(message: string): void {
		const now = new Date();

		console.log(`[${String(now.getDate()).padStart(2, '0')}-${String(now.getMonth() + 1).padStart(2, '0')}-${now.getFullYear()} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getUTCSeconds()).padStart(2, '0')}] [${chalk.green('INFO')}]  ${message}`);
	}
	
	/**
	 * Logs warning messages to the terminal.
	 *
	 * @param {string} message - The message that needs to be logged.
	 * @returns void - Returns nothing.
	 */
	static warn(message: string): void {
		const now = new Date();

		console.log(`[${String(now.getDate()).padStart(2, '0')}-${String(now.getMonth() + 1).padStart(2, '0')}-${now.getFullYear()} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getUTCSeconds()).padStart(2, '0')}] [${chalk.yellow('WARN')}]  ${message}`);
	}
	
	/**
	 * Logs error messages to the terminal.
	 *
	 * @param {string} message - The message that needs to be logged.
	 * @returns void - Returns nothing.
	 */
	static error(message: string): void {
		const now = new Date();

		console.log(`[${String(now.getDate()).padStart(2, '0')}-${String(now.getMonth() + 1).padStart(2, '0')}-${now.getFullYear()} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getUTCSeconds()).padStart(2, '0')}] [${chalk.red('ERROR')}] ${message}`);	}
	
	/**
	 * Logs debug messages to the terminal.
	 * It display the error message only if environment is set to 'debug'.
	 *
	 * @param {string} message - The message that needs to be logged.
	 * @returns void - Returns nothing.
	 */
	static debug(message: string): void {
		if (getEnv('ENVIRONMENT') !== 'debug') return;
		const now = new Date();

		console.log(`[${String(now.getDate()).padStart(2, '0')}-${String(now.getMonth() + 1).padStart(2, '0')}-${now.getFullYear()} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getUTCSeconds()).padStart(2, '0')}] [${chalk.blue('DEBUG')}] ${message}`);	}
}