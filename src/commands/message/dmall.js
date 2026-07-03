const Logger = require('../../utils/logger');

module.exports = {
    name: 'dmall',
    async execute(message, args, client) {
        if (message.deletable) await message.delete().catch(() => { });

        const content = args.join(' ');
        const files = message.attachments.map(a => a);

        if (!content && files.length === 0) {
            return message.channel.send('❌ Cannot send an empty DM.').then(m => setTimeout(() => m.delete(), 5000));
        }

        const statusMsg = await message.channel.send('⏳ **Starting DM broadcast...** Fetching members...');

        await message.guild.members.fetch();
        const members = message.guild.members.cache.filter(m => !m.user.bot);

        let success = 0;
        let failed = 0;
        const total = members.size;
        let count = 0;

        await statusMsg.edit(`⏳ **Broadcasting to ${total} members...** This may take a while.`);

        for (const [id, member] of members) {
            count++;
            try {
                await member.send({ content: content || null, files: files });
                success++;
            } catch (err) {
                failed++;
            }

            if (count % 10 === 0) {
                await statusMsg.edit(`⏳ **Progress:** ${count}/${total} | ✅ ${success} | ❌ ${failed}`);
            }

            await new Promise(resolve => setTimeout(resolve, 1500));
        }

        await statusMsg.edit(`✅ **DM Broadcast Complete**\n> **Total:** ${total}\n> **Success:** ${success}\n> **Failed:** ${failed}`);
        Logger.log(`[DMALL] Finished. Success: ${success}, Failed: ${failed}`);
    }
};
