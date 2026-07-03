const config = require('../../config.json');

class Permissions {
    static canRunCommand(member, commandName) {
        if (!member) return false;

        const owners = process.env.OWNERS 
            ? process.env.OWNERS.split(',').map(id => id.trim()) 
            : (config.owners || []);

        if (owners.includes(member.id)) return true;

        const adminRoleId = process.env.ADMIN_ROLE_ID || (config.roles && config.roles.admin);
        const modRoleId = process.env.MOD_ROLE_ID || (config.roles && config.roles.mod);

        const adminCommands = ['dmall', 'ann', 'ann2'];
        const modCommands = ['dm', 'say', 'saye', 'help'];

        if (adminCommands.includes(commandName)) {
            return member.permissions.has('Administrator') || 
                   (adminRoleId && member.roles.cache.has(adminRoleId));
        }

        if (modCommands.includes(commandName)) {
            return member.permissions.has('ManageMessages') || 
                   (adminRoleId && member.roles.cache.has(adminRoleId)) || 
                   (modRoleId && member.roles.cache.has(modRoleId));
        }

        return true;
    }

    static isOwner(userId) {
        const owners = process.env.OWNERS 
            ? process.env.OWNERS.split(',').map(id => id.trim()) 
            : (config.owners || []);
        return owners.includes(userId);
    }
}

module.exports = Permissions;

