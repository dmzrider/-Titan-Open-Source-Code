const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const FilterManager = require('../../utils/filterManager');
const Style = require('../../utils/style');
const Permissions = require('../../utils/permissions');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('filter')
        .setDescription('Configure and manage auto-moderation word/link filters')
        .addSubcommand(sub => sub
            .setName('toggle')
            .setDescription('Enable or disable the word/link filter system')
            .addBooleanOption(opt => opt.setName('enabled').setDescription('Filter state').setRequired(true))
        )
        .addSubcommand(sub => sub
            .setName('add')
            .setDescription('Add a word to the filter blocklist')
            .addStringOption(opt => opt.setName('word').setDescription('The word to ban').setRequired(true))
        )
        .addSubcommand(sub => sub
            .setName('remove')
            .setDescription('Remove a word from the filter blocklist')
            .addStringOption(opt => opt.setName('word').setDescription('The word to unban').setRequired(true))
        )
        .addSubcommand(sub => sub
            .setName('list')
            .setDescription('List all currently banned words')
        )
        .addSubcommand(sub => sub
            .setName('links')
            .setDescription('Enable or disable blocking of all external links')
            .addBooleanOption(opt => opt.setName('block').setDescription('Block state').setRequired(true))
        )
        .addSubcommand(sub => sub
            .setName('invites')
            .setDescription('Enable or disable blocking of Discord invite links')
            .addBooleanOption(opt => opt.setName('block').setDescription('Block state').setRequired(true))
        ),
    async execute(interaction) {
        if (!Permissions.canRunCommand(interaction.member, 'ann')) {
            return interaction.reply({ content: '⛔ **Access Denied:** You do not have permission to manage the filter settings.', ephemeral: true });
        }

        const subcommand = interaction.options.getSubcommand();
        const embed = new EmbedBuilder().setFooter(Style.footer);

        if (subcommand === 'toggle') {
            const enabled = interaction.options.getBoolean('enabled');
            FilterManager.setEnabled(enabled);
            embed.setColor(enabled ? Style.colors.success : Style.colors.warning)
                 .setTitle('🛡️ Auto-Moderation Toggled')
                 .setDescription(`The auto-moderation system has been **${enabled ? 'enabled' : 'disabled'}**.`);
            return interaction.reply({ embeds: [embed] });
        }

        if (subcommand === 'add') {
            const word = interaction.options.getString('word');
            const added = FilterManager.addWord(word);
            if (added) {
                embed.setColor(Style.colors.success)
                     .setTitle('✅ Word Blocked')
                     .setDescription(`Added \`${word.toLowerCase()}\` to the blocklist.`);
            } else {
                embed.setColor(Style.colors.warning)
                     .setTitle('⚠️ Duplicate Word')
                     .setDescription(`\`${word.toLowerCase()}\` is already on the blocklist.`);
            }
            return interaction.reply({ embeds: [embed] });
        }

        if (subcommand === 'remove') {
            const word = interaction.options.getString('word');
            const removed = FilterManager.removeWord(word);
            if (removed) {
                embed.setColor(Style.colors.success)
                     .setTitle('✅ Word Unblocked')
                     .setDescription(`Removed \`${word.toLowerCase()}\` from the blocklist.`);
            } else {
                embed.setColor(Style.colors.error)
                     .setTitle('❌ Word Not Found')
                     .setDescription(`\`${word.toLowerCase()}\` was not found on the blocklist.`);
            }
            return interaction.reply({ embeds: [embed] });
        }

        if (subcommand === 'list') {
            const data = FilterManager.load();
            const words = data.bannedWords;
            embed.setColor(Style.colors.info)
                 .setTitle('📝 Banned Words List')
                 .addFields(
                     { name: 'System Enabled', value: data.enabled ? '🟢 Yes' : '🔴 No', inline: true },
                     { name: 'Block Links', value: data.blockLinks ? '🟢 Yes' : '🔴 No', inline: true },
                     { name: 'Block Invites', value: data.blockInvites ? '🟢 Yes' : '🔴 No', inline: true }
                 );

            if (words.length === 0) {
                embed.setDescription('There are no words currently banned.');
            } else {
                embed.setDescription(`**Banned Words (${words.length}):**\n\`\`\`text\n${words.join(', ')}\n\`\`\``);
            }
            return interaction.reply({ embeds: [embed], ephemeral: true });
        }

        if (subcommand === 'links') {
            const block = interaction.options.getBoolean('block');
            FilterManager.setBlockLinks(block);
            embed.setColor(block ? Style.colors.success : Style.colors.warning)
                 .setTitle('🔗 External Links Filter')
                 .setDescription(`Blocking of external links has been **${block ? 'enabled' : 'disabled'}**.`);
            return interaction.reply({ embeds: [embed] });
        }

        if (subcommand === 'invites') {
            const block = interaction.options.getBoolean('block');
            FilterManager.setBlockInvites(block);
            embed.setColor(block ? Style.colors.success : Style.colors.warning)
                 .setTitle('📨 Invite Links Filter')
                 .setDescription(`Blocking of Discord invite links has been **${block ? 'enabled' : 'disabled'}**.`);
            return interaction.reply({ embeds: [embed] });
        }
    }
};
