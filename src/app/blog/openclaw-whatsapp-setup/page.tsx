"use client";

import { BlogLayout } from "@/components/blog-layout";

export default function OpenClawWhatsAppSetup() {
  return (
    <BlogLayout
      title="How to Connect OpenClaw to WhatsApp"
      description="Use your AI assistant from WhatsApp. Here's how to set up the connection."
      date="January 30, 2025"
    >
      <p>
        One of the most popular ways to use OpenClaw is through WhatsApp. You
        get your AI assistant right inside the app you already use every day, no
        separate interface needed. This guide walks through the full setup from
        a fresh install to a working WhatsApp connection.
      </p>

      <h2>Step 1: Install OpenClaw with EasyClaw</h2>

      <p>
        Before you can connect anything to WhatsApp, you need the OpenClaw
        stack running on your machine. If you have not installed it yet, the
        fastest path is the one-liner:
      </p>

      <pre><code>curl -fsSL https://openclaw.ai/install.sh | bash</code></pre>

      <p>
        This pulls down OpenClaw, ClawdBot (the AI engine), and MoltBot (the
        messaging layer that actually talks to WhatsApp). Everything gets wired
        together automatically. Once the install finishes, run{" "}
        <code>openclaw init</code> to set up your API keys and base config.
      </p>

      <h2>Step 2: Enable the WhatsApp Adapter</h2>

      <p>
        MoltBot ships with adapters for several messaging platforms. The
        WhatsApp adapter uses the WhatsApp Web multi-device protocol, which
        means it connects through your existing WhatsApp account rather than
        requiring a business API setup. Enable it with:
      </p>

      <pre><code>openclaw adapter enable whatsapp</code></pre>

      <p>
        This updates your config file and downloads any additional dependencies
        the WhatsApp adapter needs, including the Chromium runtime used for the
        web protocol bridge.
      </p>

      <h2>Step 3: Scan the QR Code</h2>

      <p>
        Now start the WhatsApp connection process:
      </p>

      <pre><code>openclaw whatsapp link</code></pre>

      <p>
        A QR code will appear in your terminal. Open WhatsApp on your phone, go
        to <strong>Settings &rarr; Linked Devices &rarr; Link a Device</strong>,
        and scan the code. This is exactly the same flow as linking WhatsApp Web
        or WhatsApp Desktop, so it should feel familiar.
      </p>

      <p>
        Once you scan it, give the system about ten to fifteen seconds to
        complete the handshake. You will see a confirmation message in your
        terminal when the link is established.
      </p>

      <h2>Step 4: Configure Who Gets Responses</h2>

      <p>
        By default, OpenClaw will not reply to every single message in every
        chat. That would be chaos. You need to tell it which conversations to
        monitor. In your config file at <code>~/.openclaw/config.yaml</code>,
        set up your response rules:
      </p>

      <ul>
        <li><strong>allowlist</strong> &mdash; only respond in specific chats or to specific contacts</li>
        <li><strong>trigger word</strong> &mdash; only respond when a message starts with a keyword like &quot;hey claw&quot;</li>
        <li><strong>DM only</strong> &mdash; only respond in direct messages, not group chats</li>
      </ul>

      <p>
        Most people start with the trigger word approach so they can test it in
        a group chat without the bot jumping into every conversation.
      </p>

      <h2>Common Issues</h2>

      <h3>QR Code Expired</h3>
      <p>
        The QR code is only valid for about sixty seconds. If it expires before
        you scan it, just press Enter in the terminal to generate a fresh one.
      </p>

      <h3>Connection Drops After Sleep</h3>
      <p>
        If your machine goes to sleep, the WhatsApp session will disconnect.
        When you wake it back up, MoltBot usually reconnects automatically
        within a minute. If it does not, run{" "}
        <code>openclaw whatsapp reconnect</code> to force a fresh session
        without needing to re-scan the QR code.
      </p>

      <h3>Multi-Device Limit</h3>
      <p>
        WhatsApp allows up to four linked devices. If you are already at the
        limit, you will need to unlink one of your existing devices before
        adding the OpenClaw connection.
      </p>

      <h2>Running It Long-Term</h2>

      <p>
        For a persistent connection, you will want to run OpenClaw as a
        background service rather than keeping a terminal open. The installer
        includes a launch config for this:
      </p>

      <pre><code>openclaw service install</code></pre>

      <p>
        This sets up a system service that starts automatically on boot and
        keeps MoltBot running in the background. Your WhatsApp connection
        will stay active as long as the machine is on.
      </p>

      <hr />

      <p>
        That is it. Your AI assistant is now reachable from WhatsApp. Visit the{" "}
        <a href="/">EasyClaw homepage</a> for more integration guides and
        troubleshooting tips.
      </p>

      <pre><code>curl -fsSL https://openclaw.ai/install.sh | bash</code></pre>
    </BlogLayout>
  );
}
