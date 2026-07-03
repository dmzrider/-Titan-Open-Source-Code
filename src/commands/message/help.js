const { EmbedBuilder } = require('discord.js');
const Style = require('../../utils/style');

module.exports = {
    name: 'help',
    async execute(message, args, client) {
        if (message.deletable) await message.delete().catch(() => { });

        const embed = new EmbedBuilder()
            .setColor(Style.colors.info)
            .setTitle('🛡️ Titan Command Dashboard')
            .setDescription(
                '**Complete System manual detailing all features and commands.**\n' +
                '⚠️ *Note: This message is ephemeral and will self-destruct in **2 minutes**.*'
            )
            .addFields(
                { 
                    name: '📨 Keyword Commands (Message Context)', 
                    value: 
                        '• `help` — Opens this manual.\n' +
                        '• `say <text>` — Repeats text (deletes original).\n' +
                        '• `saye <text>` — Repeats text inside an embed.\n' +
                        '• `ann <text>` — Sends a standard announcement embed.\n' +
                        '• `ann2 <text>` — Sends a styled announcement with server thumbnail.\n' +
                        '• `dm <user_id> <text>` — Sends a DM to a specific user.\n' +
                        '• `dmall <text>` — Broadcasts a DM to all server members (Owner Only).', 
                    inline: false 
                },
                { 
                    name: '⚡ Slash Commands', 
                    value: 
                        '• `/ping` — Checks WebSocket and Bot latency.\n' +
                        '• `/botinfo` — Displays host OS, NodeJS, Memory, and Uptime.\n' +
                        '• `/userinfo [user]` — Displays account details and roles.\n' +
                        '• `/serverinfo` — Displays owner and channel/member stats.\n' +
                        '• `/channelinfo [channel]` — Displays ID, creation date, and topic.\n' +
                        '• `/roleinfo <role>` — Displays role ID, size, position, and color.\n' +
                        '• `/avatar [user]` — Displays user profile picture.\n' +
                        '• `/banner [user]` — Displays user banner background.\n' +
                        '• `/uptime` — Displays bot system active process uptime.\n' +
                        '• `/filter <toggle|add|remove|list|links|invites>` — Configures Auto-Mod settings.', 
                    inline: false 
                },
                {
                    name: '⚙️ Usage Details',
                    value: '• Keyword commands trigger prefix-less in text channels.\n• Staff permissions (Owner/Admin/Mod) are configured inside `.env`.',
                    inline: false
                }
            )
            .setFooter(Style.footer)
            .setTimestamp();

        const sentMessage = await message.channel.send({ embeds: [embed] }).catch(err => {
            console.error('Failed to send help embed:', err);
        });

        if (sentMessage) {
            setTimeout(() => {
                sentMessage.delete().catch(() => {});
            }, 120000); // 2 minutes
        }
    }
};
