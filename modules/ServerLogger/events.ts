import { Client, Events, EmbedBuilder, TextChannel } from 'discord.js';
import { getEnv } from '../../utils/env.ts';
import { Logging } from '../../utils/logging';
import { ColorEnum } from '@enums/ColorEnum';

export default class ServerLoggerEvents {
	private client: Client;
	private logChannel!: TextChannel;
	
	constructor(client: Client) {
		this.client = client;
		// @ts-ignore
		this.logChannel = this.client.channels.cache.get(getEnv('LOG') !== undefined ? getEnv('LOG') : Logging.error(('LOG env not found'))) as TextChannel;
		this.messageLog();
		void this.startUpLog();
	}

	async startUpLog(): Promise<void> {
		const embed = new EmbedBuilder()
			.setColor(ColorEnum.AeroBytesBlue)
			.setTitle('Assistent is opnieuw opgestart!')

		await this.logChannel.send({embeds: [embed]});
	}

	messageLog(): void {
		this.client.on(Events.MessageDelete, async (message): Promise<void> => {
			const embed = new EmbedBuilder()
				.setColor(ColorEnum.Red)
				.setTitle('Bericht verwijderd!')
				.setDescription(`Van: <@${message.author?.id}> | Kanaal: <#${message.channel.id}>.`)
				.setAuthor({
					name: this.client.user ? this.client.user.displayName : 'Unknown',
					iconURL: this.client.user ? this.client.user.displayAvatarURL() : 'https://placehold.co/30x30',
				})
				.addFields({ name: 'Content', value: message.content ?? 'Niet gevonden...' });
			
			await this.logChannel.send({ embeds: [embed] });
		});
		
		this.client.on(Events.MessageUpdate, async (oldMessage, newMessage): Promise<void> => {
			const embed = new EmbedBuilder()
				.setColor(ColorEnum.Orange)
				.setTitle('Bericht aangepast!')
				.setDescription(`Van: <@${newMessage.author?.id}> | Kanaal: <#${newMessage.channel.id}>.`)
				.setAuthor({
					name: this.client.user ? this.client.user.displayName : 'Unknown',
					iconURL: this.client.user ? this.client.user.displayAvatarURL() : 'https://placehold.co/30x30',
				})
				.addFields(
					{name: 'Voor', value: oldMessage.content ?? 'Niet gevonden'},
					{name: 'Na', value: newMessage.content ?? 'Niet gevonden'}
				);
			
			await this.logChannel.send({ embeds: [embed] });
		});
	}
}
