# 🛡️ Titan Open Source Discord Bot

Welcome to **Titan**! Titan is a modern, highly performant, and flexible open-source template tailored for startups, communities, and developers looking to deploy a personal server utility bot. It supports both prefix-less **Keyword Commands** and native **Slash Commands** with clean channel-logging features and environment-configured permissions.

---

## 🚀 Step-by-Step Setup Guide

### Phase 1: Discord Developer Portal Setup
Before running the bot, you need to register it on the Discord Developer Portal:

1. Open the [Discord Developer Portal](https://discord.com/developers/applications).
2. Click **New Application** in the top-right corner, enter a name for your bot, and click **Create**.
3. Under the **Settings** menu on the left side, click **Bot**.
4. Scroll down to the **Privileged Gateway Intents** section. This is critical for the bot to read messages and members:
   - Enable **Presence Intent**
   - Enable **Server Members Intent**
   - Enable **Message Content Intent**
5. Click **Save Changes**.
6. Under the **Token** section, click **Reset Token** and copy the token. This is your `TOKEN` environment variable. Keep it secret!
7. Under the **Settings** menu, click **General Information** and copy the **Application ID**. This is your `CLIENT_ID` environment variable.

---

### Phase 2: Generating the Bot Invite Link
To invite the bot to your personal or startup server:

1. In the Discord Developer Portal, navigate to **OAuth2** -> **URL Generator** on the left menu.
2. Under **Scopes**, select:
   - `bot`
   - `applications.commands` (enables Slash Commands)
3. Under **Bot Permissions**, select the permissions your bot needs. For full utility functionality, select:
   - `Administrator` (Recommended for easy setup)
   - *Or select custom permissions like: Send Messages, Read Message History, Embed Links, Manage Messages, etc.*
4. Scroll down to the bottom and copy the generated URL.
5. Paste this URL into a browser window, select your Discord server, and click **Authorize**.

---

### Phase 3: Configuration Settings
Configure your credentials and settings using the local `.env` and `config.json` files.

#### 1. Configuring `.env`
Rename `.env.example` to `.env` or create a new `.env` file in the root directory:
```env
# Discord Bot Credentials
TOKEN=YOUR_DISCORD_BOT_TOKEN
CLIENT_ID=YOUR_APPLICATION_ID_FROM_PORTAL
GUILD_ID=YOUR_OPTIONAL_TESTING_GUILD_ID

# Access Controls & Permissions (comma-separated lists of IDs)
OWNERS=YOUR_DISCORD_USER_ID,ANOTHER_OWNER_ID
ADMIN_ROLE_ID=YOUR_ADMIN_ROLE_ID
MOD_ROLE_ID=YOUR_MOD_ROLE_ID
```
*Note: If `GUILD_ID` is defined, Slash commands will register instantly to that specific server (great for testing). If left blank, they will register globally (which may take a few minutes).*

#### 2. Configuring `config.json`
Configure fallback values and channel IDs for logging in `config.json`:
```json
{
  "owners": ["YOUR_DISCORD_USER_ID"],
  "roles": {
    "admin": "YOUR_ADMIN_ROLE_ID",
    "mod": "YOUR_MOD_ROLE_ID"
  },
  "channels": {
    "logs": {
      "combined": "YOUR_LOGGING_CHANNEL_ID",
      "commands": "YOUR_MESSAGE_COMMAND_LOG_CHANNEL_ID",
      "slash": "YOUR_SLASH_COMMAND_LOG_CHANNEL_ID"
    }
  },
  "logging": {
    "combinedType": true
  }
}
```
*   `channels.logs.combined`: The Channel ID where both keyword and slash command logs are posted if `combinedType` is set to `true`.
*   If `combinedType` is `false`, logs are split between `commands` and `slash` channel IDs.

---

### Phase 4: Installation & Running

1. **Install Dependencies**:
   Open a terminal in the project directory and run:
   ```bash
   npm install
   ```

2. **Start the Bot**:
   Run the bot with:
   ```bash
   npm start
   ```

---

## 🛠️ Features and Commands

### Message (Keyword) Commands
Message commands trigger directly via keyword (no prefix is required for these). *Requires Guild execution.*
*   `help`: Displays the visual embed showing all commands.
*   `say <text>`: Repeats the input text in the channel (deletes original message).
*   `saye <text>`: Repeats the input text inside a clean Embed.
*   `ann <text>`: Creates a standard announcement embed.
*   `ann2 <text>`: Creates an author-focused guild update announcement embed with server icon.
*   `dm <user_id> <text>`: Sends a Direct Message to a specific user.
*   `dmall <text>`: Broadcasts a DM message to all non-bot members in the server (throttled).

### Native Slash Commands
*   `/ping`: Checks the bot latency and API latency.
*   `/botinfo`: Displays system resources, memory usage, node version, and uptime.
*   `/userinfo [@user]`: Displays user creation date, join date, roles, and avatar.
*   `/serverinfo`: Displays server owner, ID, created date, member counts, and channels.
*   `/channelinfo [#channel]`: Displays ID, creation date, and topic of a channel.
*   `/roleinfo [@role]`: Displays ID, members size, permission position, and color.
*   `/avatar [@user]`: Displays the avatar of a user.
*   `/banner [@user]`: Displays the banner of a user.
*   `/uptime`: Displays the bot's system uptime.

---

## 📄 License
This project is licensed under the **Creative Commons Attribution-NonCommercial 4.0 International (CC BY-NC 4.0)** license.
- **You are free to**: Use, modify, and distribute this codebase for free.
- **Under the following terms**: You must provide attribution. Commercial use (selling this code, or package-selling it) is strictly prohibited.
- Details can be found in the [LICENSE](file:///c:/Users/LENOVO/Downloads/A-Basic-Discord-Bot/LICENSE) file.
