import {
	Client,
	Events,
	EmbedBuilder,
	TextChannel
} from 'discord.js';
import { getEnv } from '@utils/env';
import { Logging } from '@utils/logging';
import { ColorEnum } from '@enums/ColorEnum';
import { Github } from '@utils/github';

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
		const currentVersion: string|null = await Github.getCurrentRelease();

		await new Promise<void>(resolve => {
			const interval = setInterval((): void => {
				if (this.client.ws.ping >= 0) {
					clearInterval(interval);
					resolve();
				}
			}, 500);
		});

		const embed: EmbedBuilder = new EmbedBuilder()
			.setColor(ColorEnum.AeroBytesBlue)
			.setTitle('Bot herstart')
			.setDescription(`Wie: <@${this.client.user?.id}>`)
			.addFields(
				{ name: 'Versie', value: `${currentVersion ? currentVersion : 'Rate limited'}` },
				{ name: 'Ping', value: `${this.client.ws.ping}ms` },
			)

		await this.logChannel.send({embeds: [embed]});
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
