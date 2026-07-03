const { SlashCommandBuilder, EmbedBuilder, ChannelType } = require('discord.js');
const Style = require('../../utils/style');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('serverinfo')
        .setDescription('Displays information about the server'),
    async execute(interaction) {
        const guild = interaction.guild;
        const owner = await guild.fetchOwner();

        const embed = new EmbedBuilder()
            .setColor(Style.colors.default)
            .setThumbnail(guild.iconURL({ dynamic: true, size: 512 }))
            .setTitle(guild.name)
            .addFields(
                { name: '👑 Owner', value: `${owner.user.tag}`, inline: true },
                { name: '🆔 Server ID', value: `\`${guild.id}\``, inline: true },
                { name: '📅 Created', value: `<t:${Math.floor(guild.createdTimestamp / 1000)}:R>`, inline: true },
                { name: '👥 Members', value: `${guild.memberCount}`, inline: true },
                { name: '💬 Channels', value: `${guild.channels.cache.size}`, inline: true },
                { name: '🎭 Roles', value: `${guild.roles.cache.size}`, inline: true }
            )
            .setFooter(Style.footer);

        await interaction.reply({ embeds: [embed] });
    }
};
