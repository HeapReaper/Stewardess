import {Client, TextChannel} from 'discord.js';

export default class ServerLoggerEvents {
	private client: Client;
	
	constructor(client: Client) {
		this.client = client;
	}
	
}