import { Client } from 'discord.js';

export default class WelcomeTasks {
	private client: Client;
	
	constructor(client: Client) {
		this.client = client;
	}
}