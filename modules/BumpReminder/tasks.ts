import { Client, TextChannel } from 'discord.js';
import { getEnv } from '@helpers/env.ts';
import { Logging } from "@helpers/logging.ts";

export default class BumpReminderTasks {
	private client: Client;
	private bumpChannel: TextChannel;
	
	constructor(client: Client) {
		this.client = client;
		this.bumpChannel = this.client.channels.cache.get(
			// @ts-ignore
			getEnv('BUMP') !== undefined ? getEnv('BUMP') : Logging.error('BUMP channel not found in env!')
		) as TextChannel;
		
		this.bumpReminderTask();
	}
	
	bumpReminderTask(): void {
		setInterval(() => {
			Logging.debug('Checking if the server can be bumped again!');
			const messages = this.bumpChannel.messages.fetch({limit: 20});
			
			messages.then(messages => {
				if (messages.size === 0) return;
				
				const lastMessage = messages.first(); // === Last message...
				if (!lastMessage) return;
				
				if (lastMessage?.author.id === this.client.user?.id) return;
				
				// @ts-ignore
				if (lastMessage.createdTimestamp < Date.now() - (2 * 60 * 60 * 1000)) {
					this.bumpChannel.send('De server kan weer gebumped worden!');
				}
			});
		}, 20000);
	}
}