const { EmbedBuilder } = require('discord.js');
const Style = require('../../utils/style');

module.exports = {
    name: 'help',
    async execute(message, args, client) {
        if (message.deletable) await message.delete().catch(() => { });

        const msgCommands = client.commands.map(cmd => `\`${cmd.name}\``).join(', ');
        const slashCommands = client.slashCommands.map(cmd => `\`/${cmd.data.name}\``).join(', ');

        const embed = new EmbedBuilder()
            .setColor(Style.colors.info)
            .setTitle('🛡️ System Commands')
            .setDescription('List of available commands and their usage.')
            .addFields(
                { name: '📨 Message Commands', value: msgCommands || 'None', inline: false },
                { name: '⚡ Slash Commands', value: slashCommands || 'None', inline: false },
                { name: 'ℹ️ Note', value: 'Message commands trigger via keyword (no prefix). Slash commands use `/`.', inline: false }
            )
            .setFooter(Style.footer)
            .setTimestamp();

        await message.channel.send({ embeds: [embed] });
    }
};
