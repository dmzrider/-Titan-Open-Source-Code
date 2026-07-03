const { EmbedBuilder } = require('discord.js');
const Style = require('../../utils/style');

module.exports = {
    name: 'ann2',
    async execute(message, args, client) {
        if (message.deletable) await message.delete().catch(() => { });

        const content = args.join(' ');
        const files = message.attachments.map(a => a);

        if (!content && files.length === 0) return;

      
        const embed = new EmbedBuilder()
            .setColor(Style.colors.warning)
            .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL() })
            .setTitle('Important Update')
            .setDescription(`\n${content}`) 
            .setThumbnail(message.guild.iconURL()) 
            .setTimestamp()
            .setFooter(Style.footer);

        await message.channel.send({
            embeds: [embed],
            files: files
        });
    }
};
