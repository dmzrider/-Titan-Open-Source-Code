const { Events, EmbedBuilder } = require('discord.js');
const Style = require('../utils/style');

module.exports = {
    name: Events.GuildMemberAdd,
    async execute(member, client) {
        const config = require('../../config.json');
        const welcomeChannelId = process.env.WELCOME_CHANNEL_ID || (config.channels && config.channels.welcome);
        
        if (!welcomeChannelId || welcomeChannelId === 'id') return;

        const channel = member.guild.channels.cache.get(welcomeChannelId);
        if (!channel) return;

        // Custom parameters
        const rulesChannelId = process.env.RULES_CHANNEL_ID || (config.channels && config.channels.rules);
        const rulesText = rulesChannelId && rulesChannelId !== 'id' ? `<#${rulesChannelId}>` : 'our rules channel';
        const bannerUrl = process.env.WELCOME_IMAGE_URL || null;

        // Build Embed
        const embed = new EmbedBuilder()
            .setColor('#E91E63') // Pink/Magenta border matching the reference image
            .setAuthor({
                name: `${member.guild.name} Official`,
                iconURL: member.guild.iconURL() || client.user.displayAvatarURL()
            })
            .setTitle(`Welcome to ${member.guild.name}!`)
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 256 }))
            .setDescription(
                `**WELCOME TO ${member.guild.name.toUpperCase()}!**\n\n` +
                `• **Name:** <@${member.id}>\n` +
                `• **ID:** ${member.id}\n` +
                `• **Go through our Discord Rules:** ${rulesText}\n\n` +
                `---`
            )
            .addFields(
                {
                    name: 'RULES',
                    value: `• **Joined From:** <t:${Math.floor(member.user.createdTimestamp / 1000)}:R>\n\n---`,
                    inline: false
                },
                {
                    name: `WELCOME TO ${member.guild.name.toUpperCase()}`,
                    value: 'Please review our guidelines, verify your account (if required), and enjoy your stay!',
                    inline: false
                }
            )
            .setFooter(Style.footer)
            .setTimestamp();

        if (bannerUrl && bannerUrl.trim() !== '') {
            embed.setImage(bannerUrl);
        }

        // Send message with user ping outside embed for notification matching the image
        await channel.send({ content: `<@${member.id}>`, embeds: [embed] }).catch(err => {
            console.error('Failed to send welcome message:', err);
        });
    }
};
