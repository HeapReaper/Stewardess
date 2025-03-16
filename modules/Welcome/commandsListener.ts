import { Client } from 'discord.js';

export default class WelcomeCommandsListener {
	private client: Client;
	
	constructor(client: Client) {
		this.client = client;
	}
}