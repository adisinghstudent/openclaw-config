"use client";

import { BlogLayout } from "@/components/blog-layout";

export default function OpenClawTelegramBot() {
  return (
    <BlogLayout
      title="Set Up OpenClaw as a Telegram Bot"
      description="Turn OpenClaw into your personal Telegram AI assistant. Full setup guide."
      date="January 28, 2025"
    >
      <p>
        Telegram is one of the cleanest platforms to run an AI bot on. The Bot
        API is well documented, there are no approval hoops to jump through, and
        your bot gets its own dedicated chat thread. Here is how to connect
        OpenClaw to Telegram from scratch.
      </p>

      <h2>Step 1: Install OpenClaw</h2>

      <p>
        First, make sure you have the full OpenClaw stack on your machine. The
        EasyClaw installer handles everything in one shot:
      </p>

      <pre><code>curl -fsSL https://openclaw.ai/install.sh | bash</code></pre>

      <p>
        This installs OpenClaw along with ClawdBot and MoltBot. MoltBot is the
        component that manages messaging platform connections, and it includes a
        Telegram adapter out of the box. Run <code>openclaw init</code> after
        the install to set up your base configuration and API keys.
      </p>

      <h2>Step 2: Create Your Bot with BotFather</h2>

      <p>
        Every Telegram bot starts with BotFather. Open Telegram and search
        for <strong>@BotFather</strong>, then start a conversation with it. The
        commands you need:
      </p>

      <ul>
        <li>Send <code>/newbot</code> to start the creation flow</li>
        <li>Choose a display name for your bot (this can be anything, like &quot;My AI Assistant&quot;)</li>
        <li>Choose a username that ends in &quot;bot&quot; (like <code>myopenclawbot</code>)</li>
      </ul>

      <p>
        BotFather will respond with an API token. It looks something like{" "}
        <code>7123456789:AAH0x...</code> &mdash; copy this token, you will need
        it in the next step. Keep it private. Anyone with this token can control
        your bot.
      </p>

      <blockquote>
        Treat your bot token like a password. Do not commit it to version
        control or share it in public channels.
      </blockquote>

      <h2>Step 3: Connect the Token to OpenClaw</h2>

      <p>
        Now feed the token into OpenClaw. You can do this interactively or by
        editing the config directly. The interactive way:
      </p>

      <pre><code>openclaw adapter enable telegram</code></pre>

      <p>
        This will prompt you for the bot token and write it to your config file
        at <code>~/.openclaw/config.yaml</code>. If you prefer to edit the
        config manually, add a section like this:
      </p>

      <pre><code>{`adapters:
  telegram:
    enabled: true
    token: "YOUR_BOT_TOKEN_HERE"
    allowed_users: []`}</code></pre>

      <p>
        The <code>allowed_users</code> array is optional but recommended. If you
        leave it empty, anyone who finds your bot can talk to it. Add Telegram
        user IDs to restrict access to just yourself or a specific group of
        people.
      </p>

      <h2>Step 4: Start and Test</h2>

      <p>
        Launch OpenClaw with the Telegram adapter active:
      </p>

      <pre><code>openclaw start</code></pre>

      <p>
        Then open Telegram, find your bot by its username, and send it a
        message. You should see a response within a few seconds. If everything
        is wired up correctly, you now have a personal AI assistant living
        inside Telegram.
      </p>

      <h2>Useful BotFather Customizations</h2>

      <p>
        While you are in BotFather, there are a few settings worth tweaking:
      </p>

      <ul>
        <li><code>/setdescription</code> &mdash; what users see before they start chatting</li>
        <li><code>/setabouttext</code> &mdash; the short bio that appears on the bot profile</li>
        <li><code>/setuserpic</code> &mdash; give your bot a profile picture</li>
        <li><code>/setcommands</code> &mdash; define slash commands like <code>/reset</code> or <code>/help</code> that OpenClaw can respond to</li>
      </ul>

      <h2>Running as a Background Service</h2>

      <p>
        If you want the bot running all the time without keeping a terminal
        open, set it up as a service:
      </p>

      <pre><code>openclaw service install</code></pre>

      <p>
        This creates a system-level service that starts on boot and keeps MoltBot
        connected to Telegram in the background. Your bot will be responsive
        around the clock as long as the host machine is running.
      </p>

      <h2>Common Issues</h2>

      <h3>Bot Not Responding</h3>
      <p>
        Check that no other application is polling the same bot token. Telegram
        only allows one active polling connection per token. If you have another
        script or service using the same token, disconnect it first.
      </p>

      <h3>Slow Responses</h3>
      <p>
        If responses take more than a few seconds, the bottleneck is usually
        the upstream AI model API, not Telegram or MoltBot. Check your API
        key quotas and consider switching to a faster model for conversational
        use.
      </p>

      <hr />

      <p>
        That covers the full Telegram setup. Check the{" "}
        <a href="/">EasyClaw homepage</a> for guides on connecting to other
        platforms like WhatsApp and Discord.
      </p>

      <pre><code>curl -fsSL https://openclaw.ai/install.sh | bash</code></pre>
    </BlogLayout>
  );
}
