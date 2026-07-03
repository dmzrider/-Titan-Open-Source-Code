const { Events, EmbedBuilder } = require('discord.js');
const Style = require('../utils/style');

module.exports = {
    name: Events.GuildMemberRemove,
    async execute(member, client) {
        const config = require('../../config.json');
        const goodbyeChannelId = process.env.GOODBYE_CHANNEL_ID || (config.channels && config.channels.goodbye);
        
        if (!goodbyeChannelId || goodbyeChannelId === 'id') return;

        const channel = member.guild.channels.cache.get(goodbyeChannelId);
        if (!channel) return;

        // Build Embed
        const embed = new EmbedBuilder()
            .setColor(Style.colors.error)
            .setAuthor({
                name: `${member.guild.name} Departures`,
                iconURL: member.guild.iconURL() || client.user.displayAvatarURL()
            })
            .setTitle('👋 Member Left')
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 256 }))
            .setDescription(
                `**${member.user.username}** has left the server.\n\n` +
                `• **User:** <@${member.id}> (${member.user.tag})\n` +
                `• **ID:** ${member.id}\n` +
                `• **Remaining Members:** ${member.guild.memberCount}`
            )
            .setFooter(Style.footer)
            .setTimestamp();

        // Send message
        await channel.send({ embeds: [embed] }).catch(err => {
            console.error('Failed to send goodbye message:', err);
        });
    }
};
