import { Client, Events, EmbedBuilder, TextChannel } from 'discord.js';
import { getEnv } from '@helpers/env.ts';
import { Logging } from '@helpers/logging';
import { ColorEnum } from '@enums/ColorEnum';

export default class ServerLoggerEvents {
	private client: Client;
	private logChannel!: TextChannel;
	
	constructor(client: Client) {
		this.client = client;
		// @ts-ignore
		this.logChannel = this.client.channels.cache.get(getEnv('LOG') !== undefined ? getEnv('LOG') : Logging.error(('LOG env not found'))) as TextChannel;
		this.messageLog();
	}
	
	messageLog(): void {
		this.client.on(Events.MessageDelete, async (message): Promise<void> => {
			const embed = new EmbedBuilder()
				.setColor(ColorEnum.Red)
				.setTitle('Bericht verwijderd!')
				.setDescription(`Van: <@${message.author?.id}> | Kanaal: <#${message.channel.id}>.`)
				.addFields({ name: 'Content', value: message.content ?? 'Niet gevonden...' });
			
			await this.logChannel.send({ embeds: [embed] });
		});
		
		this.client.on(Events.MessageUpdate, async (oldMessage, newMessage): Promise<void> => {
			const embed = new EmbedBuilder()
				.setColor(ColorEnum.Orange)
				.setTitle('Bericht aangepast!')
				.setDescription(`Van: <@${newMessage.author?.id}> | Kanaal: <#${newMessage.channel.id}>.`)
				.addFields(
					{name: 'Voor', value: oldMessage.content ?? 'Niet gevonden'},
					{name: 'Na', value: newMessage.content ?? 'Niet gevonden'}
				);
			
			await this.logChannel.send({ embeds: [embed] });
		});
	}
}
