import { Client, GatewayIntentBits } from 'discord.js';
import loadModules from '@helpers/moduleLoader';
import { Logging } from '@helpers/logging';
import { getEnv } from '@helpers/env';

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds
	]}
);

client.on('ready', async client => {
	try {
		await loadModules(client);
	} catch (error) {
		Logging.error(`Error while loading modules: ${error}`);
	}
	Logging.info(`Client ready! Singed in as ${client.user.tag}!`);
})

client.login(getEnv('DISCORD_TOKEN'));