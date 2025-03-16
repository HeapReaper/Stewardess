import { Client, GatewayIntentBits } from 'discord.js';
import { getEnv } from '../helpers/env';

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds
	]}
);

client.on('ready', async client => {
	console.log(`Client ready! Singed in as ${client.user.tag}!`);
})

client.login(getEnv('DISCORD_TOKEN'));