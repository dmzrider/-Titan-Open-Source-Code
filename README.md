<div align="center">

# ⚡ TITAN DISCORD BOT ⚡
### 🚀 A Premium & Robust Open-Source Server Utility Bot Template

[![Discord.js v14](https://img.shields.io/badge/discord.js-v14.25+-5865F2?style=for-the-badge&logo=discord&logoColor=white)](https://discord.js.org/)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D16.9.0-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![License: CC BY-NC 4.0](https://img.shields.io/badge/License-CC%20BY--NC%204.0-orange?style=for-the-badge)](https://creativecommons.org/licenses/by-nc/4.0/)

---
*Tailored for startups, gaming communities, and developer teams. Built on top of **Discord.js v14**.*
</div>

---

## 📖 Table of Contents
- [🌟 Key Highlights](#-key-highlights)
- [🧩 Project Structure Map](#-project-structure-map)
- [⚙️ Setup & Installation](#-setup--installation)
  - [Phase 1: Discord Portal Configuration](#phase-1-discord-portal-configuration)
  - [Phase 2: Inviting the Bot](#phase-2-inviting-the-bot)
  - [Phase 3: Setting up the environment](#phase-3-setting-up-the-environment)
- [🎮 Command Matrix](#-command-matrix)
  - [🌐 Message Keyword Commands](#-message-keyword-commands)
  - [⚡ Native Slash Commands](#-native-slash-commands)
- [🛡️ Permission & Auto-Mod Architecture](#-permission--auto-mod-architecture)
- [📄 License & Terms](#-license--terms)

---

## 🌟 Key Highlights

*   🤖 **Dual Command System:** Supports both traditional prefix-free **Keyword Message Commands** and native modern **Slash Commands**.
*   🛡️ **DM & Guild Crash Proofing:** Fully fortified handlers that prevent common DM-related crashes by intercepting and rejecting server-only commands safely.
*   💾 **Advanced Env Roles:** Supports direct `.env` configuration for `OWNERS`, `ADMIN_ROLE_ID`, and `MOD_ROLE_ID` with clean fallbacks.
*   📊 **Startup Console Dashboard:** Displays loaded components, events, and commands in a beautiful, structured console box on startup, complete with a custom centered ASCII art logo.
*   🚫 **Dynamic Auto-Moderation:** Banned words filter, link blocker, and Discord invite link blocker configurable directly from Discord via `/filter` commands. Exempts staff automatically.
*   👋 **Visual Welcomer System:** Custom join card embeds featuring user mentions, IDs, relative account age timestamps (e.g. `Joined From: a month ago`), rules channel integration, and customizable bottom graphics.

---

## 🧩 Project Structure Map

```text
 Titan-Open-Source-Code/
 ├── data/
 │   └── filter.json           # 🚫 Banned Words & Auto-Mod Database (Local)
 ├── .env                      # 🔑 Secret Credentials (Git ignored)
 ├── .env.example              # 📄 Config Template
 ├── config.json               # ⚙️ General Logging Config
 ├── LICENSE                   # 📄 CC BY-NC 4.0 Terms
 ├── package.json              # 📦 Node dependencies
 └── src/
     ├── index.js              # 🚀 Main entry point
     ├── commands/             
     │   ├── message/          # 📨 Keyword triggers (help, say, dm...)
     │   └── slash/            # ⚡ Native Slash commands (ping, filter, botinfo...)
     ├── events/               # 🔔 Listener scripts (guildMemberAdd, messageCreate...)
     ├── handlers/             # 🛠️ Command/Event dynamic loaders
     └── utils/                # 🧰 Styling, Logging, Auto-Mod, & Permission utilities
```

---

## ⚙️ Setup & Installation

### Phase 1: Discord Portal Configuration
To get your bot credentials:
1. Open the [Discord Developer Portal](https://discord.com/developers/applications).
2. Click **New Application** (top-right), choose a bot name, and click **Create**.
3. Navigate to the **Bot** tab on the left.
4. Scroll down to **Privileged Gateway Intents** and enable:
   *   `Presence Intent`
   *   `Server Members Intent`
   *   `Message Content Intent`
5. Click **Save Changes**.
6. Under **Token**, click **Reset Token** and copy the string (this is your `TOKEN`).
7. Go to **General Information** on the left and copy the **Application ID** (this is your `CLIENT_ID`).

---

### Phase 2: Inviting the Bot
To invite the bot to your guild:
1. Navigate to **OAuth2** -> **URL Generator** on the left menu.
2. Under **Scopes**, select:
   *   `bot`
   *   `applications.commands`
3. Under **Bot Permissions**, select:
   *   `Administrator` (Recommended for easy setup)
4. Copy the URL generated at the bottom, paste it into your browser, and authorize it for your server.

---

### Phase 3: Setting up the environment
1. Duplicate `.env.example` and rename it to `.env`:
   ```bash
   cp .env.example .env
   ```
2. Populate the `.env` configuration file:
   ```env
   # Credentials
   TOKEN=your_secret_bot_token_here
   CLIENT_ID=your_bot_client_id_here
   GUILD_ID=your_testing_server_id_here   # Registrations will be instant if set!

   # Permission Roles
   OWNERS=your_discord_user_id,another_user_id
   ADMIN_ROLE_ID=your_server_admin_role_id
   MOD_ROLE_ID=your_server_moderator_role_id

   # Welcomer System Configuration
   WELCOME_CHANNEL_ID=your_welcome_text_channel_id
   GOODBYE_CHANNEL_ID=your_goodbye_text_channel_id
   RULES_CHANNEL_ID=your_rules_text_channel_id
   WELCOME_IMAGE_URL=optional_bottom_banner_image_url
   ```
3. Customize falling configs inside `config.json`:
   ```json
   {
     "owners": ["your_discord_user_id"],
     "channels": {
       "logs": {
         "combined": "logging_channel_id"
       },
       "welcome": "fallback_welcome_channel_id",
       "goodbye": "fallback_goodbye_channel_id",
       "rules": "fallback_rules_channel_id"
     }
   }
   ```
4. Install all node packages and run:
   ```bash
   npm install
   npm start
   ```

---

## 🎮 Command Matrix

### 🌐 Message Keyword Commands
*These commands run prefix-less in text channels, and are restricted to servers.*

| Command | Arguments | Permissions Required | Description |
| :--- | :--- | :--- | :--- |
| `help` | None | Moderator / Admin / Owner | Displays this comprehensive help manual (self-destructs after 2 minutes). |
| `say` | `<text>` | Moderator / Admin / Owner | Repeats text in channel (deletes original message). |
| `saye` | `<text>` | Moderator / Admin / Owner | Repeats text inside a clean embedded message. |
| `ann` | `<text>` | Admin / Owner | Dispatches a standard announcement embed. |
| `ann2` | `<text>` | Admin / Owner | Dispatches an author-guild focused update embed. |
| `dm` | `<user_id> <text>`| Moderator / Admin / Owner | Sends a DM to a specific user using the bot. |
| `dmall` | `<text>` | Owner | Throttled broadcast message to all server members. |

---

### ⚡ Native Slash Commands
*Run globally or instantly in your testing guild via `/`.*

| Slash Command | Subcommands / Options | Context | Description |
| :--- | :--- | :--- | :--- |
| `/ping` | None | Guild / DM | Checks the websocket API & Bot latency. |
| `/botinfo` | None | Guild / DM | Shows NodeJS, Memory Usage, Platform, and Uptime. |
| `/userinfo` | `[target]` | Guild Only | Displays member info, joined timestamp, and server roles. |
| `/serverinfo`| None | Guild Only | Shows server owner details, channel counts, and member counts. |
| `/channelinfo`| `[channel]`| Guild Only | Displays channel IDs, topics, and creation timestamps. |
| `/roleinfo` | `<role>` | Guild Only | Shows role positions, permissions, size, and hex color. |
| `/avatar` | `[target]` | Guild / DM | Displays the profile avatar URL in high resolution. |
| `/banner` | `[target]` | Guild / DM | Displays the user banner background. |
| `/uptime` | None | Guild / DM | Shows exact bot process uptime counter. |
| `/filter` | `toggle <true/false>`<br>`add <word>`<br>`remove <word>`<br>`list`<br>`links <true/false>`<br>`invites <true/false>` | Guild Only *(Admin)* | Manages the Auto-Moderation settings and banned word blocklist. |

---

## 🛡️ Permission & Auto-Mod Architecture

### 🔐 Access Levels
```text
  ┌────────────────────────────────────────────────────────┐
  │                        1. OWNER                        │  <-- Access to dmall, ann, filter management, etc.
  └───────────┬────────────────────────────────────────────┘
              │
              ▼
  ┌────────────────────────────────────────────────────────┐
  │                    2. ADMINISTRATOR                    │  <-- Access to announcements, setup, and auto-mod
  └───────────┬────────────────────────────────────────────┘
              │
              ▼
  ┌────────────────────────────────────────────────────────┐
  │                      3. MODERATOR                      │  <-- Access to say, saye, help, dm
  └───────────┬────────────────────────────────────────────┘
              │
              ▼
  ┌────────────────────────────────────────────────────────┐
  │                       4. EVERYONE                      │  <-- Access to slash info (ping, avatar, info...)
  └────────────────────────────────────────────────────────┘
```
The permissions system dynamically extracts credentials from your `.env` file first, falling back to `config.json` properties. It cross-checks if members hold the configured role IDs or possess native guild capabilities (e.g., `Administrator` / `ManageMessages`).

### 🚫 Auto-Moderation System
When enabled, regular users' messages are filtered before keywords are parsed. If a message contains a banned word, links, or invite links (according to settings), the bot:
1. Deletes the message immediately.
2. Replies with a temporary warning notification (auto-deleted after 5 seconds).
3. Logs the violation details to your staff channels.
*Staff members bypass this filter automatically to prevent moderative disruptions.*

### 📝 Audit Logging
All commands trigger an audit event that is written to Discord log channels. If `combinedType` is set to `true`, the bot routes all interactions into a single channel. If `false`, messages and slash runs are split into dedicated logging feeds.

---

## 📄 License & Terms

This template is licensed under the **Creative Commons Attribution-NonCommercial 4.0 International (CC BY-NC 4.0)**.

*   **You may:** Copy, redistribute, modify, and build upon the source code for personal or community servers.
*   **You may NOT:** Sell this code, sell services based on this code, or use it for commercial gains without explicit consent.
*   Full terms can be viewed in the [LICENSE](file:///c:/Users/LENOVO/Downloads/A-Basic-Discord-Bot/LICENSE) file.

---
<div align="center">
  <sub>Developed with ❤️ by the Titan Bot Contributors</sub>
</div>
