import { Client } from 'discord.js';

export default class ServerLoggerCommands {
	private client: Client;
	
	constructor(client: Client) {
		this.client = client;
	}
}