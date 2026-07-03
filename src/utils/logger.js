const { EmbedBuilder } = require('discord.js');
const config = require('../../config.json');
class Logger {
    static log(message) {
        console.log(`[LOG] ${message}`);
    }
    static error(message, error) {
        console.error(`[ERROR] ${message}`, error);
    }
    static async logCommand(client, startTimestamp, interactionOrMessage, commandName, status = 'Success', error = null) {
        try {
            const config = require('../../config.json'); 
            const isInteraction = !!interactionOrMessage.isCommand;
            const guild = interactionOrMessage.guild;
            const user = isInteraction ? interactionOrMessage.user : interactionOrMessage.author;
            const channel = interactionOrMessage.channel;
            // Determine Log Channel
            let logChannelId = config.channels.logs.combined;
            if (!config.logging.combinedType) {
                logChannelId = isInteraction ? config.channels.logs.slash : config.channels.logs.commands;
            }
            if (!logChannelId) return; 
            const logChannel = await client.channels.fetch(logChannelId).catch(() => null);
            if (!logChannel) return;
  
            const timeTaken = Date.now() - startTimestamp;
            const timeString = new Date().toLocaleString();
            let logContent = '';
            if (isInteraction) {
              
                logContent =
                    `**[SLASH COMMAND LOG]**
> **Command:** \`/${commandName}\`
> **User:** ${user.tag} (\`${user.id}\`)
> **Channel:** ${channel.name} (\`${channel.id}\`)
> **Time:** ${timeString}
> **Status:** ${status === 'Success' ? '✅ Success' : '❌ Failed'}
> **Duration:** ${timeTaken}ms`;
            } else {
               
                const roles = interactionOrMessage.member.roles.cache
                    .filter(r => r.name !== '@everyone')
                    .map(r => r.name)
                    .slice(0, 3)
                    .join(', ') || 'None';
                logContent =
                    `**[MESSAGE COMMAND LOG]**
> **Command:** \`${commandName}\`
> **User:** ${user.tag} (\`${user.id}\`)
> **Roles:** ${roles}
> **Channel:** ${channel.name} (\`${channel.id}\`)
> **Content:** \`${interactionOrMessage.content}\`
> **Status:** ${status === 'Success' ? '✅ Success' : '❌ Failed'}
> **Time:** ${timeString}`;
            }
            if (error) {
                logContent += `\n> **Error:** \`${error.message}\``;
            }
            await logChannel.send({ content: logContent, allowedMentions: { parse: [] } });
        } catch (err) {
            console.error('Failed to send log:', err);
        }
    }
}
module.exports = Logger;
