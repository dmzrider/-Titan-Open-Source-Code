const { SlashCommandBuilder, EmbedBuilder, ChannelType } = require('discord.js');
const Style = require('../../utils/style');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('channelinfo')
        .setDescription('Displays information about a channel')
        .addChannelOption(option => option.setName('channel').setDescription('The channel')),
    async execute(interaction) {
        const channel = interaction.options.getChannel('channel') || interaction.channel;
        const embed = new EmbedBuilder()
            .setColor(Style.colors.default)
            .setTitle(`#${channel.name}`)
            .addFields(
                { name: '🆔 Channel ID', value: `\`${channel.id}\``, inline: true },
                { name: '📅 Created', value: `<t:${Math.floor(channel.createdTimestamp / 1000)}:R>`, inline: true }
            )
            .setFooter(Style.footer);

        // Topic is not available on all channel types
        if ('topic' in channel && channel.topic) {
            embed.setDescription(`**Topic:** ${channel.topic}`);
        }

        await interaction.reply({ embeds: [embed] });
    }
};
