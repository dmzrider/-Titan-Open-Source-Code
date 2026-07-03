const fs = require('fs');
const path = require('path');
const Logger = require('../utils/logger');

module.exports = (client) => {
    const eventsPath = path.join(__dirname, '../events');
    const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));
    client.loadedEvents = [];

    for (const file of eventFiles) {
        try {
            const filePath = path.join(eventsPath, file);
            const event = require(filePath);
            if (event.once) {
                client.once(event.name, (...args) => event.execute(...args, client));
            } else {
                client.on(event.name, (...args) => event.execute(...args, client));
            }
            client.loadedEvents.push({ name: `${event.name || file} (${event.once ? 'Once' : 'On'})`, status: '[ACTIVE]' });
        } catch (err) {
            client.loadedEvents.push({ name: file, status: '[ERROR]' });
            Logger.error(`Failed to load event ${file}:`, err);
        }
    }
};
