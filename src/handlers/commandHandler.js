const fs = require('fs');
const path = require('path');
const { REST, Routes } = require('discord.js');
const Logger = require('../utils/logger');

module.exports = (client) => {
    const loadedMessageCommands = [];
    const loadedSlashCommands = [];

    // Message Commands
    const messageCommandsPath = path.join(__dirname, '../commands/message');
    if (fs.existsSync(messageCommandsPath)) {
        const messageCommandFiles = fs.readdirSync(messageCommandsPath).filter(file => file.endsWith('.js'));
        for (const file of messageCommandFiles) {
            try {
                const command = require(path.join(messageCommandsPath, file));
                if ('name' in command && 'execute' in command) {
                    client.commands.set(command.name, command);
                    loadedMessageCommands.push({ name: command.name, status: '[LOADED]' });
                } else {
                    loadedMessageCommands.push({ name: file, status: '[INVALID]' });
                }
            } catch (err) {
                loadedMessageCommands.push({ name: file, status: '[ERROR]' });
            }
        }
    }

    // Slash Commands
    const slashCommands = [];
    const slashCommandsPath = path.join(__dirname, '../commands/slash');
    if (fs.existsSync(slashCommandsPath)) {
        const slashCommandFiles = fs.readdirSync(slashCommandsPath).filter(file => file.endsWith('.js'));
        for (const file of slashCommandFiles) {
            try {
                const command = require(path.join(slashCommandsPath, file));
                if ('data' in command && 'execute' in command) {
                    client.slashCommands.set(command.data.name, command);
                    slashCommands.push(command.data.toJSON());
                    loadedSlashCommands.push({ name: `/${command.data.name}`, status: '[LOADED]' });
                } else {
                    loadedSlashCommands.push({ name: file, status: '[INVALID]' });
                }
            } catch (err) {
                loadedSlashCommands.push({ name: file, status: '[ERROR]' });
            }
        }
    }

    // Register Slash Commands
    if (process.env.TOKEN && process.env.CLIENT_ID) {
        const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);
        (async () => {
            try {
                if (process.env.GUILD_ID) {
                    await rest.put(
                        Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
                        { body: slashCommands },
                    );
                } else {
                    await rest.put(
                        Routes.applicationCommands(process.env.CLIENT_ID),
                        { body: slashCommands },
                    );
                }
            } catch (error) {
                Logger.error('Failed to register slash commands:', error);
            }
        })();
    }

    // Draw Dashboard Box
    const width = 64;
    const borderTop     = '┌' + '─'.repeat(width - 2) + '┐';
    const borderDivider = '├' + '─'.repeat(width - 2) + '┤';
    const borderBottom  = '└' + '─'.repeat(width - 2) + '┘';

    console.log('\n' + borderTop);
    console.log('│' + ' '.repeat(width - 2) + '│');

    const titanArt = [
        '████████╗██╗████████╗ █████╗ ███╗   ██╗',
        '╚══██╔══╝██║╚══██╔══╝██╔══██╗████╗  ██║',
        '   ██║   ██║   ██║   ███████║██╔██╗ ██║',
        '   ██║   ██║   ██║   ██╔══██║██║╚██╗██║',
        '   ██║   ██║   ██║   ██║  ██║██║ ╚████║',
        '   ╚═╝   ╚═╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═══╝'
    ];

    for (const line of titanArt) {
        const paddingLeft = Math.floor((width - 2 - line.length) / 2);
        const paddingRight = width - 2 - line.length - paddingLeft;
        console.log('│' + ' '.repeat(paddingLeft) + line + ' '.repeat(paddingRight) + '│');
    }

    console.log('│' + ' '.repeat(width - 2) + '│');
    console.log(borderDivider);
    
    const title = '🤖 CORE SYSTEM STATUS 🤖';
    const titlePadding = Math.floor((width - 2 - title.length) / 2);
    console.log('│' + ' '.repeat(titlePadding) + title + ' '.repeat(width - 2 - title.length - titlePadding) + '│');
    
    console.log(borderDivider);
    console.log('│' + ' '.repeat(width - 2) + '│');

    const groups = [
        { title: 'EVENTS LOADER', list: client.loadedEvents || [] },
        { title: 'MESSAGE COMMANDS', list: loadedMessageCommands },
        { title: 'SLASH COMMANDS', list: loadedSlashCommands }
    ];

    for (const group of groups) {
        const groupHeader = `  [${group.title}]`;
        console.log('│' + groupHeader + ' '.repeat(width - 2 - groupHeader.length) + '│');

        if (group.list.length === 0) {
            const emptyLine = '    (None loaded)';
            console.log('│' + emptyLine + ' '.repeat(width - 2 - emptyLine.length) + '│');
        } else {
            for (const item of group.list) {
                const left = `  • ${item.name}`;
                const right = item.status;
                const targetWidth = width - 4;
                const dotLength = targetWidth - left.length - right.length;
                const dots = dotLength > 0 ? ' ' + '.'.repeat(dotLength - 2) + ' ' : ' ';
                const line = left + dots + right;
                console.log('│ ' + line + ' │');
            }
        }
        console.log('│' + ' '.repeat(width - 2) + '│');
    }

    console.log(borderDivider);
    
    const guildText = process.env.GUILD_ID ? `Guild Mode (${process.env.GUILD_ID})` : 'Global Mode';
    const footer = `⚡ ${client.loadedEvents ? client.loadedEvents.length : 0} Events | ${client.commands.size} Keywords | ${client.slashCommands.size} Slash | ${guildText}`;
    const footerPadding = Math.floor((width - 2 - footer.length) / 2);
    console.log('│' + ' '.repeat(footerPadding) + footer + ' '.repeat(width - 2 - footer.length - footerPadding) + '│');
    console.log(borderBottom + '\n');
};
