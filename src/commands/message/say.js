const Logger = require('../../utils/logger');

module.exports = {
    name: 'say',
    async execute(message, args, client) {
        if (message.deletable) await message.delete().catch(() => { });

        const content = args.join(' ');
        const files = message.attachments.map(a => a);

        if (!content && files.length === 0) return;

        await message.channel.send({
            content: content || null,
            files: files
        });
    }
};
