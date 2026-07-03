const { SlashCommandBuilder, EmbedBuilder, version } = require('discord.js');
const Style = require('../../utils/style');
const os = require('os');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('botinfo')
        .setDescription('Displays information about the bot'),
    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setColor(Style.colors.default)
            .setTitle('🤖 Bot Information')
            .setThumbnail(interaction.client.user.displayAvatarURL())
            .addFields(
                { name: '📦 Node.js', value: process.version, inline: true },
                { name: '🛠️ Discord.js', value: `v${version}`, inline: true },
                { name: '💾 Memory Usage', value: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`, inline: true },
                { name: '🖥️ Platform', value: `${os.platform()} (${os.release()})`, inline: true },
                { name: '📊 Uptime', value: `<t:${Math.floor(interaction.client.readyTimestamp / 1000)}:R>`, inline: true }
            )
            .setFooter(Style.footer);

        await interaction.reply({ embeds: [embed] });
    }
};
