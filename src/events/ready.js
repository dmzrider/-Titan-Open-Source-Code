const { Events } = require('discord.js');
const Logger = require('../utils/logger');

module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(client) {
        Logger.log(`Ready! Logged in as ${client.user.tag}`);
        client.user.setActivity('Titan Utility', { type: 4 }); 
    },
};
