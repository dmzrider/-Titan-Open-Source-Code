const { EmbedBuilder } = require('discord.js');
const Style = require('../../utils/style');

module.exports = {
    name: 'saye',
    async execute(message, args, client) {
        if (message.deletable) await message.delete().catch(() => { });

        const content = args.join(' ');
        const files = message.attachments.map(a => a);

        if (!content && files.length === 0) return;

        const embed = new EmbedBuilder()
            .setColor(Style.colors.default)
            .setDescription(content || null); 

        await message.channel.send({
            embeds: [embed],
            files: files
        });
    }
};
