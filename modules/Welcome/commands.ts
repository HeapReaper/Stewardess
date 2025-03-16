import { Client } from 'discord.js';

export default class WelcomeCommands {
	private client: Client;
	
	constructor(client: Client) {
		this.client = client;
	}
}