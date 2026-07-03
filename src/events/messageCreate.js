const { Events } = require('discord.js');
const Logger = require('../utils/logger');
const Permissions = require('../utils/permissions');

module.exports = {
    name: Events.MessageCreate,
    async execute(message, client) {
        if (message.author.bot) return;

        const args = message.content.trim().split(/ +/);
        const commandName = args.shift().toLowerCase(); 

        const command = client.commands.get(commandName);
        if (!command) return; 

        if (!message.guild) {
            return message.reply({ content: '❌ **Server Only:** Keyword commands can only be executed inside a server.' })
                .then(msg => setTimeout(() => msg.delete().catch(() => { }), 5000));
        }

        const startTime = Date.now();

      
        if (!Permissions.canRunCommand(message.member, commandName)) {
            
            return message.reply({ content: '⛔ **Access Denied:** You do not have permission to use this command.' })
                .then(msg => setTimeout(() => msg.delete().catch(() => { }), 5000));
        }

        try {
            await command.execute(message, args, client);
            await Logger.logCommand(client, startTime, message, commandName, 'Success');
        } catch (error) {
            console.error(error);
            await Logger.logCommand(client, startTime, message, commandName, 'Failed', error);

            message.reply({ content: '❌ An error occurred while executing this command.' })
                .then(msg => setTimeout(() => msg.delete().catch(() => { }), 5000));
        }
    },
};
