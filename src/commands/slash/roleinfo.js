const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const Style = require('../../utils/style');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('roleinfo')
        .setDescription('Displays information about a role')
        .addRoleOption(option => option.setName('role').setDescription('The role').setRequired(true)),
    async execute(interaction) {
        const role = interaction.options.getRole('role');
        const embed = new EmbedBuilder()
            .setColor(role.color || Style.colors.default)
            .setTitle(`Role: ${role.name}`)
            .addFields(
                { name: '🆔 Role ID', value: `\`${role.id}\``, inline: true },
                { name: '🎨 Color', value: `#${role.color ? role.color.toString(16).toUpperCase() : '000000'}`, inline: true },
                { name: '👥 Members', value: `${role.members.size}`, inline: true },
                { name: '📅 Created', value: `<t:${Math.floor(role.createdTimestamp / 1000)}:R>`, inline: true },
                { name: '⬆️ Position', value: `${role.position}`, inline: true },
                { name: '🔐 Mentionable', value: role.mentionable ? 'Yes' : 'No', inline: true }
            )
            .setFooter(Style.footer);
        await interaction.reply({ embeds: [embed] });
    }
};
