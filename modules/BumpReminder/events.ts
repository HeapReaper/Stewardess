import {Client, TextChannel} from 'discord.js';
import { getEnv } from '@helpers/env.ts';
import { Logging } from '@helpers/logging.ts';

export default class BumpReminderEvents {
	private client: Client;
	
	constructor(client: Client) {
		this.client = client;
	}
}