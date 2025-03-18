import { Client } from 'discord.js';

export default class BumpReminderTasks {
	private client: Client;
	
	constructor(client: Client) {
		this.client = client;
	}
}