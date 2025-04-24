import {Client, TextChannel} from 'discord.js';
import { getEnv } from '../../utils/env.ts';
import { Logging } from '../../utils/logging.ts';

export default class WelcomeEvents {
	private client: Client;
	private welcomeMessages: Array<String> = [
		'🌤️ | {user}, welkom bij HobbyVliegers! \nMaak je klaar voor een vlucht vol gezelligheid en luchtvaartplezier!',
		'✈️ | {user}, welkom aan boord, piloot! \nKlaar om samen het luchtruim te verkennen?',
		'🛫 | {user}, welkom bij de crew van HobbyVliegers! \nWe wensen je een soepele landing in onze community.',
		'🔥 | {user}, welkom piloot! \nHier stijgen we samen op naar nieuwe hoogtes van RC-plezier!',
		'🚁 | {user}, welkom! \nOf je nu vliegt met vliegtuigen of drones, hier zit je goed. Tijd om je passie te delen!',
		'🛩️ | {user}, welkom aan boord! \nMaak jezelf comfortabel en deel je mooiste vliegavonturen met ons.',
		'🌪️ | {user}, welkom bij HobbyVliegers! \nWaar elke vlucht een nieuw avontuur is!',
		'✈️ | {user}, welkom, piloot! \nKlaar om te taxiën naar een geweldige community?',
		'📸 | {user}, welkom! \nVergeet niet je luchtfoto’s en projecten te delen – we zijn benieuwd!',
		'💬 | {user}, welkom bij HobbyVliegers! \nStel je even voor en deel je passie voor RC-vliegen!',
	];
	
	constructor(client: Client) {
		this.client = client;
		this.sendWelcomeMessage();
	}
	
	async sendWelcomeMessage(): Promise<void> {
		this.client.on('guildMemberAdd', async (member) => {
			// @ts-ignore
			const channel = this.client.channels.cache.get(getEnv('BRIEFING')) as TextChannel;
			// @ts-ignore
			const welcomeRole = member.guild.roles.cache.get(getEnv('PASSAGIER'));
			
			if (!channel || !channel.isTextBased()) {
				Logging.error(`Channel not found or is not a text channel in Welcome event`);
				return;
			}
			
			if (!welcomeRole) {
				Logging.error(`welcomeRole not found in Welcome event`);
				return;
			}
			
			await member.roles.add(welcomeRole);
			
			const welcomeMessage = this.welcomeMessages[Math.floor(Math.random() * this.welcomeMessages.length)];
			channel.send(welcomeMessage.replace(/{user}/g, `<@${member.user.id}>`));
		});
	}
}