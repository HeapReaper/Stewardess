import { Client } from 'discord.js';

export default class WelcomeEvents {
	private client: Client;
	
	constructor(client: Client) {
		this.client = client;
	}
}