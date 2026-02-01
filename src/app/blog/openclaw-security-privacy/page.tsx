"use client";

import { BlogLayout } from "@/components/blog-layout";

export default function OpenClawSecurityPrivacy() {
  return (
    <BlogLayout
      title="Is OpenClaw Safe? Security & Privacy Guide"
      description="Everything you need to know about OpenClaw's security model and how to keep your data private."
      date="January 28, 2025"
    >
      <p>
        The first question most people ask before installing any AI tool is: where does my data
        go? With cloud-based assistants, the honest answer is usually &quot;to someone else&apos;s
        servers.&quot; OpenClaw takes a fundamentally different approach. This guide explains
        exactly how the security model works and what steps you can take to harden your setup.
      </p>

      <h2>The Local Execution Model</h2>

      <p>
        OpenClaw runs entirely on your machine. When you install it — the fastest way is through{" "}
        <a href="/">EasyClaw</a> with a single command:
      </p>

      <pre><code>curl -fsSL https://openclaw.ai/install.sh | bash</code></pre>

      <p>
        — you get a daemon process that listens on <code>localhost:3377</code> by default. Your
        prompts, conversation history, and any data processed by skills stay on your local
        filesystem. There is no OpenClaw cloud service that your installation phones home to.
        No telemetry, no analytics, no usage tracking.
      </p>

      <p>
        This is a deliberate architectural decision. The maintainers have been vocal about keeping
        the project free from any data collection, and the codebase is open source so anyone can
        verify that claim.
      </p>

      <h2>No Cloud Dependency</h2>

      <p>
        OpenClaw itself does not require an internet connection to function. If you pair it with
        a local model (via Ollama, llama.cpp, or vLLM), the entire pipeline — from prompt to
        response — runs on your hardware without a single packet leaving your network.
      </p>

      <p>
        Of course, many users choose to use cloud LLM providers like OpenAI or Anthropic for
        higher-quality responses. In that case, your prompts are sent to that provider&apos;s API.
        But this is an explicit choice you make by configuring an API key — OpenClaw never routes
        data externally without your configuration telling it to.
      </p>

      <blockquote>
        If privacy is your primary concern, pair OpenClaw with a local model. You get a fully
        air-gapped AI assistant that works even without internet access.
      </blockquote>

      <h2>API Key Management</h2>

      <p>
        If you do use a cloud provider, your API key is the most sensitive piece of configuration.
        OpenClaw stores it in <code>~/.openclaw/config.yaml</code> with file permissions set to
        owner-read-only (<code>600</code>). Here are best practices for keeping it safe:
      </p>

      <ul>
        <li>
          <strong>Never commit your config to version control.</strong> The default{" "}
          <code>.gitignore</code> that ships with OpenClaw already excludes the config directory,
          but double-check if you are managing dotfiles in a repo.
        </li>
        <li>
          <strong>Use environment variables.</strong> Instead of hardcoding the key in the config
          file, set <code>OPENCLAW_API_KEY</code> in your shell profile. OpenClaw reads it
          automatically.
        </li>
        <li>
          <strong>Rotate keys regularly.</strong> Most providers let you generate new keys and
          revoke old ones. Do this periodically, especially if you share your machine.
        </li>
        <li>
          <strong>Use provider-side spending limits.</strong> Set a monthly cap on your OpenAI
          or Anthropic account so a leaked key cannot run up an unlimited bill.
        </li>
      </ul>

      <h2>Network Isolation</h2>

      <p>
        By default, OpenClaw listens only on <code>127.0.0.1</code> (localhost). This means no
        other machine on your network can connect to it. If you need remote access — say, from
        a Slack integration running on a different server — you must explicitly change the bind
        address in your config:
      </p>

      <pre><code>{`server:
  host: "0.0.0.0"  # Listen on all interfaces
  port: 3377`}</code></pre>

      <p>
        If you do expose OpenClaw to your network, put it behind a reverse proxy (nginx, Caddy,
        or Traefik) with TLS termination and authentication. Never expose the raw OpenClaw port
        to the public internet.
      </p>

      <h3>Firewall Rules</h3>

      <p>
        On Linux, you can use <code>ufw</code> to restrict access even further:
      </p>

      <pre><code>{`# Allow only your local network
sudo ufw allow from 192.168.1.0/24 to any port 3377

# Deny everything else
sudo ufw deny 3377`}</code></pre>

      <h2>Plugin Permissions</h2>

      <p>
        Skills and plugins are the biggest potential attack surface in any extensible system.
        OpenClaw mitigates this with a granular permission model. Each skill declares the
        permissions it needs in its manifest, and you must explicitly approve them during
        installation. The available permission scopes are:
      </p>

      <ul>
        <li><code>filesystem:read</code> — read files on disk</li>
        <li><code>filesystem:write</code> — create or modify files</li>
        <li><code>network:outbound</code> — make HTTP requests to external services</li>
        <li><code>shell:execute</code> — run shell commands</li>
        <li><code>clipboard:read</code> — access clipboard contents</li>
        <li><code>clipboard:write</code> — write to the clipboard</li>
      </ul>

      <p>
        You can also scope filesystem permissions to specific directories. For example, granting{" "}
        <code>filesystem:read</code> only for <code>~/projects</code> ensures a skill cannot
        read your SSH keys or other sensitive files.
      </p>

      <h2>Hardening Tips</h2>

      <p>
        For users who want maximum security, here is a checklist:
      </p>

      <ul>
        <li>Run OpenClaw inside a Docker container with resource limits and a read-only root filesystem</li>
        <li>Use a local model to eliminate all external data transmission</li>
        <li>Disable the <code>shell:execute</code> permission globally if you do not need it</li>
        <li>Audit installed plugins periodically with <code>openclaw plugin list --verbose</code></li>
        <li>Keep OpenClaw updated — security patches ship in point releases</li>
        <li>Run the daemon under a dedicated user account with minimal system privileges</li>
        <li>Enable audit logging with <code>OPENCLAW_LOG_LEVEL=info</code> to track all skill invocations</li>
      </ul>

      <h2>Reporting Vulnerabilities</h2>

      <p>
        The OpenClaw project maintains a responsible disclosure policy. If you find a security
        issue, email <code>security@openclaw.ai</code> instead of opening a public GitHub issue.
        The maintainers typically respond within 48 hours and aim to ship patches within a week
        of confirmed vulnerabilities.
      </p>

      <hr />

      <p>
        OpenClaw is as secure as you configure it to be. The local-first architecture means your
        data stays on your machine by default, and the permission system gives you fine-grained
        control over what plugins can access. Start with the defaults, and tighten from there
        based on your threat model. If you are ready to get started, head to{" "}
        <a href="/">the homepage</a> and install with a single command.
      </p>
    </BlogLayout>
  );
}
