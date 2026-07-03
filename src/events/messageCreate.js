const { Events } = require('discord.js');
const Logger = require('../utils/logger');
const Permissions = require('../utils/permissions');

module.exports = {
    name: Events.MessageCreate,
    async execute(message, client) {
        if (message.author.bot) return;

        // Auto-Moderation Filter Check (Guild Only)
        if (message.guild) {
            const FilterManager = require('../utils/filterManager');
            const check = FilterManager.checkMessage(message.content);
            if (check.isViolated) {
                const isStaff = Permissions.canRunCommand(message.member, 'say'); // Checks if member is owner/staff
                if (!isStaff) {
                    await message.delete().catch(() => {});
                    return message.channel.send(`⚠️ **Auto-Mod:** ${message.author}, your message was deleted because it contained a **${check.reason.toLowerCase()}**.`)
                        .then(msg => setTimeout(() => msg.delete().catch(() => {}), 5000));
                }
            }
        }

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
