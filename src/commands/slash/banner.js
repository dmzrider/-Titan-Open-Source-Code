const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const Style = require('../../utils/style');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('banner')
        .setDescription('Displays a user\'s banner')
        .addUserOption(option => option.setName('target').setDescription('The user')),
    async execute(interaction) {
        const target = interaction.options.getUser('target') || interaction.user;
        const user = await interaction.client.users.fetch(target.id, { force: true });

        if (!user.banner) {
            return interaction.reply({ content: '❌ This user does not have a banner.', ephemeral: true });
        }

        const url = user.bannerURL({ dynamic: true, size: 4096 });
        const embed = new EmbedBuilder()
            .setColor(Style.colors.default)
            .setTitle(`${user.username}'s Banner`)
            .setImage(url)
            .setFooter(Style.footer);

        await interaction.reply({ embeds: [embed] });
    }
};
