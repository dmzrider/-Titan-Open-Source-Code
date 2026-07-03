require('dotenv').config();
const { Client, GatewayIntentBits, Collection } = require('discord.js');
const Logger = require('./utils/logger');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.DirectMessages
    ]
});

client.commands = new Collection();
client.slashCommands = new Collection();

// Load Handlers
require('./handlers/eventHandler')(client);
require('./handlers/commandHandler')(client);

client.login(process.env.TOKEN).then(() => {
    Logger.log('Bot logged in successfully');
}).catch(err => {
    Logger.error('Failed to login', err);
});

module.exports = client;
