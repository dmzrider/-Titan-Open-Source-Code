module.exports = {
    name: 'dm',
    async execute(message, args, client) {
        if (message.deletable) await message.delete().catch(() => { });

        if (args.length < 1) {
            return message.channel.send('Usage: dm <user_id> <message>').then(m => setTimeout(() => m.delete(), 5000));
        }

        const targetId = args.shift();
        const content = args.join(' ');

        let user;
        try {
            const id = targetId.replace(/[<@!>]/g, '');
            user = await client.users.fetch(id);
        } catch {
            return message.channel.send('❌ Invalid user ID or mention.').then(m => setTimeout(() => m.delete(), 5000));
        }

        const files = message.attachments.map(a => a);
        if (!content && files.length === 0) {
            return message.channel.send('❌ Cannot send an empty DM.').then(m => setTimeout(() => m.delete(), 5000));
        }

        try {
            await user.send({ content: content || null, files: files });
            message.channel.send(`✅ DM sent to **${user.tag}**`).then(m => setTimeout(() => m.delete(), 5000));
        } catch (err) {
            message.channel.send(`❌ Failed to DM **${user.tag}**. They might have DMs closed.`).then(m => setTimeout(() => m.delete(), 5000));
        }
    }
};
