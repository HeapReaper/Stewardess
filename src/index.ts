import { Client, GatewayIntentBits, ActivityType } from 'discord.js';
import loadModules from '@utils/moduleLoader';
import { Logging } from '@utils/logging';
import { getEnv } from '@utils/env';
import { runMigrations } from '@utils/migrations.ts';
import QueryBuilder from '@utils/database.ts';

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
	]}
);

client.on('ready', async client => {
	try {
		await loadModules(client);
	} catch (error) {
		Logging.error(`Error while loading modules: ${error}`);
	}

	try {
		await runMigrations();
	} catch (error) {
		Logging.error(`Error while running migrations: ${error}`);
	}

	try {
		setInterval(async (): Promise<void> => {
			Logging.debug('Keeping the database connection active in index.ts...');
			await QueryBuilder.select('migrations').limit(1).execute();
		}, 60000);
	} catch (error) {
		Logging.error(`Error while keeping the DB active: ${error}`);
	}
	
	client?.user.setActivity('Wilt u koffie of thee?', {type: ActivityType.Listening})
	
	Logging.info(`Client ready! Signed in as ${client.user.tag}!`);
})

void client.login(getEnv('DISCORD_TOKEN'));