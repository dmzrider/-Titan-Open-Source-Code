const { Events } = require('discord.js');
const Logger = require('../utils/logger');

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction, client) {
        if (!interaction.isChatInputCommand()) return;

        const command = client.slashCommands.get(interaction.commandName);

        if (!command) {
            console.error(`No command matching ${interaction.commandName} was found.`);
            return;
        }

        const guildOnlyCommands = ['serverinfo', 'userinfo', 'roleinfo', 'channelinfo'];
        if (!interaction.guild && guildOnlyCommands.includes(interaction.commandName)) {
            return interaction.reply({ content: '❌ **Server Only:** This command can only be used inside a server.', ephemeral: true });
        }

        const startTime = Date.now();

        try {
            await command.execute(interaction, client);
            await Logger.logCommand(client, startTime, interaction, interaction.commandName, 'Success');
        } catch (error) {
            console.error(error);
            await Logger.logCommand(client, startTime, interaction, interaction.commandName, 'Failed', error);

            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
            } else {
                await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
            }
        }
    },
};
