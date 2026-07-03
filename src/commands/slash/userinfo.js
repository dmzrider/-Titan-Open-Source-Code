const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const Style = require('../../utils/style');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('userinfo')
        .setDescription('Displays information about a user')
        .addUserOption(option => option.setName('target').setDescription('The user')),
    async execute(interaction) {
        const user = interaction.options.getUser('target') || interaction.user;
        const member = await interaction.guild.members.fetch(user.id).catch(() => null);

        const embed = new EmbedBuilder()
            .setColor(Style.colors.default)
            .setThumbnail(user.displayAvatarURL({ dynamic: true, size: 512 }))
            .setAuthor({ name: user.tag, iconURL: user.displayAvatarURL() })
            .addFields(
                { name: '🆔 User ID', value: `\`${user.id}\``, inline: true },
                { name: '📅 Created', value: `<t:${Math.floor(user.createdTimestamp / 1000)}:R>`, inline: true },
                { name: '📥 Joined', value: member ? `<t:${Math.floor(member.joinedTimestamp / 1000)}:R>` : 'Not in server', inline: true }
            )
            .setFooter(Style.footer);

        if (member) {
            const roles = member.roles.cache
                .filter(r => r.name !== '@everyone')
                .sort((a, b) => b.position - a.position)
                .map(r => r)
                .slice(0, 5);

            embed.addFields({
                name: `🎭 Roles (${member.roles.cache.size - 1})`,
                value: roles.length > 0 ? roles.join(' ') + (member.roles.cache.size > 6 ? '...' : '') : 'None',
                inline: false
            });
        }

        await interaction.reply({ embeds: [embed] });
    }
};
