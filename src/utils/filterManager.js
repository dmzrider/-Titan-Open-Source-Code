const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../../data/filter.json');

// Ensure database file exists
function ensureFile() {
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, JSON.stringify({
            enabled: true,
            bannedWords: [],
            blockLinks: false,
            blockInvites: false
        }, null, 2));
    }
}

class FilterManager {
    static load() {
        ensureFile();
        try {
            const data = fs.readFileSync(filePath, 'utf8');
            return JSON.parse(data);
        } catch (err) {
            console.error('Failed to load filter.json, using defaults:', err);
            return {
                enabled: true,
                bannedWords: [],
                blockLinks: false,
                blockInvites: false
            };
        }
    }

    static save(data) {
        ensureFile();
        try {
            fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
            return true;
        } catch (err) {
            console.error('Failed to save filter.json:', err);
            return false;
        }
    }

    static addWord(word) {
        const data = this.load();
        const lowerWord = word.toLowerCase().trim();
        if (!data.bannedWords.includes(lowerWord)) {
            data.bannedWords.push(lowerWord);
            this.save(data);
            return true;
        }
        return false;
    }

    static removeWord(word) {
        const data = this.load();
        const lowerWord = word.toLowerCase().trim();
        const index = data.bannedWords.indexOf(lowerWord);
        if (index !== -1) {
            data.bannedWords.splice(index, 1);
            this.save(data);
            return true;
        }
        return false;
    }

    static setEnabled(enabled) {
        const data = this.load();
        data.enabled = !!enabled;
        return this.save(data);
    }

    static setBlockLinks(block) {
        const data = this.load();
        data.blockLinks = !!block;
        return this.save(data);
    }

    static setBlockInvites(block) {
        const data = this.load();
        data.blockInvites = !!block;
        return this.save(data);
    }

    static checkMessage(content) {
        const data = this.load();
        if (!data.enabled) {
            return { isViolated: false, reason: null, word: null };
        }

        const cleanedContent = content.toLowerCase().trim();

        // 1. Check for Discord Invite Links
        if (data.blockInvites) {
            const inviteRegex = /(discord\.(gg|io|me|li)|discordapp\.com\/invite|discord\.com\/invite)\/[a-zA-Z0-9\-]+/i;
            if (inviteRegex.test(cleanedContent)) {
                return { isViolated: true, reason: 'Discord Invite Link', word: 'invite-link' };
            }
        }

        // 2. Check for General Links
        if (data.blockLinks) {
            const urlRegex = /(https?:\/\/[^\s]+)/gi;
            if (urlRegex.test(cleanedContent)) {
                return { isViolated: true, reason: 'External Link', word: 'link' };
            }
        }

        // 3. Check for Banned Words (using case-insensitive word boundaries)
        for (const word of data.bannedWords) {
            const escapedWord = word.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
            const regex = new RegExp(`\\b${escapedWord}\\b`, 'i');
            if (regex.test(cleanedContent)) {
                return { isViolated: true, reason: 'Banned Word', word: word };
            }
        }

        return { isViolated: false, reason: null, word: null };
    }
}

module.exports = FilterManager;
