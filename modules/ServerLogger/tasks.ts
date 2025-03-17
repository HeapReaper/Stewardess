import { Client } from 'discord.js';

export default class ServerLoggerTasks {
	private client: Client;
	
	constructor(client: Client) {
		this.client = client;
	}
}