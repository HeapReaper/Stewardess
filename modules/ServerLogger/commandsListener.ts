import { Client } from 'discord.js';

export default class ServerLoggerCommandsListener {
	private client: Client;
	
	constructor(client: Client) {
		this.client = client;
	}
}