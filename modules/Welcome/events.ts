import {Client, TextChannel} from 'discord.js';
import { getEnv } from '../../utils/env.ts';
import { Logging } from '../../utils/logging.ts';

export default class WelcomeEvents {
	private client: Client;
	private welcomeMessages: Array<string> = [
	  '🎮 | {user}, welkom bij RC Club Nederland! \nOf je nu rijdt, vaart of vliegt – met auto’s, helikopters, vliegtuigen, boten of drones – hier zit je goed!',
	  '🔥 | {user}, welkom in de wereld van RC! \nVan brullende motoren op de baan tot rustige landingen op het water – alle piloten en bestuurders zijn hier welkom.',
	  '🛩️ | {user}, welkom bij RC Club Nederland! \nOf je nu zweeft met een vliegtuig, drift met een auto, vliegt met een drone, spint met een heli of vaart met een boot – deel je passie!',
	  '🚁 | {user}, welkom, RC-liefhebber! \nAuto’s, helikopters, vliegtuigen, boten of drones – alles wat op afstand bestuurd wordt leeft hier.',
	  '💬 | {user}, welkom in de community! \nOf je nu over asfalt scheurt, door het luchtruim vliegt of over het water glijdt – wij zijn benieuwd naar jouw RC-verhaal.',
	  '✈️ | {user}, welkom aan boord! \nVan luchtacrobatiek met je heli tot high-speed bochten met je RC-auto – hier delen we het allemaal.',
	  '🛥️ | {user}, welkom in onze RC-haven! \nAuto, boot, drone, heli of vliegtuig – vaar, rij en vlieg met ons mee in deze hobbywereld.',
	  '🌪️ | {user}, welkom bij RC Club Nederland! \nWaar snelheid op vier wielen, precisie in de lucht en kracht op het water samenkomen.',
	  '📸 | {user}, welkom! \nLaat je projecten zien – of je nu sleutelt aan een auto, heli, vliegtuig, drone of boot. We zijn benieuwd naar je RC-creaties!',
	  '🧰 | {user}, welkom techneut! \nRC-auto’s, helikopters, vliegtuigen, boten en drones – elk project is welkom hier. Laat die setups maar zien!',
	];
	
	constructor(client: Client) {
		this.client = client;
		this.sendWelcomeMessage();
	}
	
	async sendWelcomeMessage(): Promise<void> {
		this.client.on('guildMemberAdd', async (member) => {
			const channel = this.client.channels.cache.get(<string>getEnv('BRIEFING')) as TextChannel;
			const welcomeRole = member.guild.roles.cache.get(<string>getEnv('PASSAGIER'));
			
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
			await channel.send(welcomeMessage.replace(/{user}/g, `<@${member.user.id}>`));
		});
	}
}