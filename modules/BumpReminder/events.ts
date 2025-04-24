import {Client, TextChannel} from 'discord.js';
import { getEnv } from '../../utils/env.ts';
import { Logging } from '../../utils/logging.ts';

export default class BumpReminderEvents {
	private client: Client;
	
	constructor(client: Client) {
		this.client = client;
	}
}