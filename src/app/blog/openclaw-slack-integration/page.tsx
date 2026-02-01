"use client";

import { BlogLayout } from "@/components/blog-layout";

export default function OpenClawSlackIntegration() {
  return (
    <BlogLayout
      title="Connect OpenClaw to Slack — Workspace AI Assistant"
      description="Add OpenClaw as an AI assistant in your Slack workspace."
      date="January 28, 2025"
    >
      <p>
        If your team lives in Slack, you already know the pain of context-switching between chat,
        docs, and terminal windows. What if your AI assistant lived right there in your channels?
        That is exactly what the OpenClaw Slack integration gives you — a bot that can answer
        questions, run tasks, and surface information without anyone leaving the conversation.
      </p>

      <p>
        This guide walks you through setting up OpenClaw as a Slack bot from scratch. The whole
        process takes about fifteen minutes, and by the end your entire workspace will have access
        to a self-hosted AI assistant.
      </p>

      <h2>Prerequisites</h2>

      <p>
        Before you start, you need a running OpenClaw instance. The fastest way to get one is
        with <a href="/">EasyClaw</a> — a single command handles the entire installation:
      </p>

      <pre><code>curl -fsSL https://openclaw.ai/install.sh | bash</code></pre>

      <p>
        Once OpenClaw is running and you have confirmed it responds to prompts locally, you are
        ready to connect it to Slack.
      </p>

      <h2>Step 1: Create a Slack App</h2>

      <p>
        Head to <a href="https://api.slack.com/apps">api.slack.com/apps</a> and click{" "}
        <strong>Create New App</strong>. Choose <strong>From scratch</strong>, give it a name like
        &quot;OpenClaw Assistant&quot;, and select the workspace you want to install it in.
      </p>

      <p>
        Under <strong>OAuth &amp; Permissions</strong>, scroll down to <strong>Bot Token Scopes</strong>{" "}
        and add the following:
      </p>

      <ul>
        <li><code>chat:write</code> — lets the bot post messages</li>
        <li><code>app_mentions:read</code> — lets the bot respond when someone @-mentions it</li>
        <li><code>channels:history</code> — lets the bot read channel context for better replies</li>
        <li><code>im:history</code> — enables direct message conversations</li>
        <li><code>im:write</code> — lets the bot respond in DMs</li>
      </ul>

      <h2>Step 2: Install and Grab Your Tokens</h2>

      <p>
        Click <strong>Install to Workspace</strong> at the top of the OAuth page. After authorizing,
        Slack gives you a <strong>Bot User OAuth Token</strong> that starts with{" "}
        <code>xoxb-</code>. Copy that token — you will need it in the next step.
      </p>

      <p>
        Next, go to <strong>Basic Information</strong> and copy the <strong>Signing Secret</strong>.
        This is how OpenClaw verifies that incoming requests genuinely come from Slack and not a
        third party.
      </p>

      <h2>Step 3: Configure OpenClaw</h2>

      <p>
        Open your OpenClaw configuration file, typically located at{" "}
        <code>~/.openclaw/config.yaml</code>, and add the Slack integration block:
      </p>

      <pre><code>{`integrations:
  slack:
    bot_token: "xoxb-your-token-here"
    signing_secret: "your-signing-secret"
    default_channel: "#general"
    enable_threads: true`}</code></pre>

      <p>
        Restart OpenClaw to pick up the changes. The bot should come online in your workspace
        within a few seconds — you will see it appear in the sidebar under Apps.
      </p>

      <h2>Step 4: Enable Event Subscriptions</h2>

      <p>
        Back in the Slack API dashboard, go to <strong>Event Subscriptions</strong> and toggle it
        on. Set the Request URL to your OpenClaw instance&apos;s webhook endpoint — by default
        that is <code>http://your-server:3377/webhooks/slack</code>. Slack will send a challenge
        request and OpenClaw will respond automatically.
      </p>

      <p>
        Subscribe to the <code>app_mention</code> and <code>message.im</code> bot events, then
        save your changes.
      </p>

      <h2>What Your Team Can Do Now</h2>

      <p>
        With the integration live, your team can interact with OpenClaw directly in Slack:
      </p>

      <ul>
        <li>Ask questions in any channel by @-mentioning the bot</li>
        <li>Run OpenClaw skills and plugins from threaded conversations</li>
        <li>Get automated summaries of long channel discussions</li>
        <li>Pipe CI/CD alerts through OpenClaw for intelligent triage</li>
        <li>Use DMs for private queries that should not be visible to the whole team</li>
      </ul>

      <blockquote>
        Tip: Set up a dedicated <code>#openclaw</code> channel so team members have a shared space
        to interact with the assistant without cluttering project channels.
      </blockquote>

      <h2>Keeping It Secure</h2>

      <p>
        Because OpenClaw runs on your own infrastructure, messages never leave your network unless
        you explicitly configure an external LLM provider. The Slack signing secret ensures that
        only verified Slack payloads are processed, and the bot token should be treated like any
        other secret — store it in an environment variable or a secrets manager rather than
        committing it to version control.
      </p>

      <hr />

      <p>
        That is everything you need. Your Slack workspace now has a self-hosted AI assistant that
        stays under your control. If you have not installed OpenClaw yet, the quickest path is
        through <a href="/">EasyClaw</a> — one command and you are ready to connect.
      </p>
    </BlogLayout>
  );
}
