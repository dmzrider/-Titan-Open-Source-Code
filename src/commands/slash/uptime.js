const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const Style = require('../../utils/style');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('uptime')
        .setDescription('Displays the bot uptime'),
    async execute(interaction) {
        const uptime = process.uptime();
        const days = Math.floor(uptime / 86400);
        const hours = Math.floor(uptime / 3600) % 24;
        const minutes = Math.floor(uptime / 60) % 60;
        const seconds = Math.floor(uptime % 60);

        const embed = new EmbedBuilder()
            .setColor(Style.colors.info)
            .setTitle('⏱️ System Uptime')
            .setDescription(`\`${days}d ${hours}h ${minutes}m ${seconds}s\``)
            .setFooter(Style.footer);

        await interaction.reply({ embeds: [embed] });
    }
};
