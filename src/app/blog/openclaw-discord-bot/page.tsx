"use client";

import { BlogLayout } from "@/components/blog-layout";

export default function OpenClawDiscordBot() {
  return (
    <BlogLayout
      title="Run OpenClaw as a Discord Bot — Complete Guide"
      description="Add your own AI assistant to any Discord server with OpenClaw."
      date="January 27, 2025"
    >
      <p>
        Discord is a great place to run an AI bot. You get persistent channels,
        thread support, role-based permissions, and a massive user base that
        already knows how to interact with bots. This guide covers setting up
        OpenClaw as a Discord bot from zero to a working deployment.
      </p>

      <h2>Step 1: Install OpenClaw</h2>

      <p>
        If you do not already have OpenClaw installed, start with the EasyClaw
        one-liner. This pulls down the entire stack including MoltBot, which
        handles the Discord connection:
      </p>

      <pre><code>curl -fsSL https://openclaw.ai/install.sh | bash</code></pre>

      <p>
        After installation, run <code>openclaw init</code> to configure your
        base settings and API keys. Once that is done, you are ready to set up
        the Discord side.
      </p>

      <h2>Step 2: Create a Discord Application</h2>

      <p>
        Head to the{" "}
        <a href="https://discord.com/developers/applications" target="_blank" rel="noopener noreferrer">
          Discord Developer Portal
        </a>{" "}
        and click <strong>New Application</strong>. Give it a name that makes
        sense for your use case, something like &quot;OpenClaw AI&quot; or
        whatever fits your server.
      </p>

      <p>
        Once the application is created, go to the <strong>Bot</strong> section
        in the left sidebar and click <strong>Add Bot</strong>. This is where
        you will find your bot token. Click <strong>Reset Token</strong> to
        generate one and copy it immediately. Discord only shows it once.
      </p>

      <blockquote>
        Your bot token is a secret. Do not paste it in public channels, commit
        it to a repository, or share it with anyone you do not trust with full
        control of the bot.
      </blockquote>

      <h2>Step 3: Configure Bot Permissions</h2>

      <p>
        Still in the Developer Portal, go to the <strong>OAuth2 &rarr; URL
        Generator</strong> section. You need to select the right scopes and
        permissions for your bot to function properly:
      </p>

      <ul>
        <li><strong>Scopes:</strong> select <code>bot</code> and <code>applications.commands</code></li>
        <li><strong>Bot Permissions:</strong> select <code>Send Messages</code>, <code>Read Message History</code>, <code>Use Slash Commands</code>, <code>Embed Links</code>, and <code>Attach Files</code></li>
      </ul>

      <p>
        Copy the generated URL at the bottom of the page. Open it in your
        browser, select the server you want to add the bot to, and authorize
        it. The bot will appear in your server member list as offline until you
        connect it.
      </p>

      <h2>Step 4: Connect OpenClaw to Discord</h2>

      <p>
        Now wire up the bot token to OpenClaw. The quick way:
      </p>

      <pre><code>openclaw adapter enable discord</code></pre>

      <p>
        This prompts you for the bot token and writes it to your config. If you
        want to edit the config file directly at{" "}
        <code>~/.openclaw/config.yaml</code>, the Discord section looks like:
      </p>

      <pre><code>{`adapters:
  discord:
    enabled: true
    token: "YOUR_BOT_TOKEN_HERE"
    respond_in_threads: true
    allowed_channels: []`}</code></pre>

      <p>
        Setting <code>respond_in_threads</code> to true means the bot will
        create a thread for each conversation, keeping channels clean. The{" "}
        <code>allowed_channels</code> array lets you restrict the bot to
        specific channels. Leave it empty to allow it everywhere.
      </p>

      <h2>Step 5: Start the Bot</h2>

      <pre><code>openclaw start</code></pre>

      <p>
        Your bot should come online in Discord within a few seconds. Send it a
        message in one of the allowed channels or mention it with an @ to start
        a conversation.
      </p>

      <h2>Gateway Intents</h2>

      <p>
        Discord requires you to explicitly enable certain gateway intents for
        bots that read message content. Back in the Developer Portal under the{" "}
        <strong>Bot</strong> section, make sure you toggle on:
      </p>

      <ul>
        <li><strong>Message Content Intent</strong> &mdash; required for reading messages that do not mention the bot</li>
        <li><strong>Server Members Intent</strong> &mdash; only needed if you want the bot to reference user profiles</li>
      </ul>

      <p>
        Without the Message Content Intent enabled, your bot will only see
        messages where it is directly mentioned or slash commands.
      </p>

      <h2>Running as a Service</h2>

      <p>
        For a bot that stays online all the time, set it up as a background
        service:
      </p>

      <pre><code>openclaw service install</code></pre>

      <p>
        This ensures MoltBot starts on boot and keeps the Discord gateway
        connection alive. The adapter handles reconnects automatically if the
        websocket drops.
      </p>

      <hr />

      <p>
        Your Discord server now has its own AI assistant. Check the{" "}
        <a href="/">EasyClaw homepage</a> for more platform guides covering
        Telegram, WhatsApp, and other integrations.
      </p>

      <pre><code>curl -fsSL https://openclaw.ai/install.sh | bash</code></pre>
    </BlogLayout>
  );
}
