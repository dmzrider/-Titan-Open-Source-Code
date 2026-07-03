const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const Style = require('../../utils/style');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('avatar')
        .setDescription('Displays a user\'s avatar')
        .addUserOption(option => option.setName('target').setDescription('The user')),
    async execute(interaction) {
        const user = interaction.options.getUser('target') || interaction.user;
        const url = user.displayAvatarURL({ dynamic: true, size: 4096 });

        const embed = new EmbedBuilder()
            .setColor(Style.colors.default)
            .setTitle(`${user.username}'s Avatar`)
            .setImage(url)
            .setFooter(Style.footer);

        await interaction.reply({ embeds: [embed] });
    }
};
