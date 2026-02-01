"use client";

import { BlogLayout } from "@/components/blog-layout";

export default function OpenClawUbuntuInstall() {
  return (
    <BlogLayout
      title="Install OpenClaw on Ubuntu — Complete Linux Guide"
      description="Get OpenClaw running on Ubuntu 20.04, 22.04, or 24.04 in one command."
      date="January 30, 2025"
    >
      <p>
        Ubuntu is the most popular Linux distribution for development, and it's where
        OpenClaw runs best. That said, getting everything set up from scratch still
        involves a few steps that trip people up — especially around Node.js versions
        and native dependencies. Let me walk you through both the manual approach and
        the shortcut.
      </p>

      <h2>The Manual Ubuntu Setup</h2>

      <p>
        If you want to understand what goes into a full OpenClaw install on Ubuntu,
        here's every step. I'll cover Ubuntu 20.04 (Focal), 22.04 (Jammy), and
        24.04 (Noble) since there are minor differences between them.
      </p>

      <h3>Step 1: System Dependencies</h3>

      <p>
        OpenClaw's native modules require build tools that aren't included in a minimal
        Ubuntu install. Start with:
      </p>

      <pre><code>{`sudo apt update
sudo apt install -y build-essential curl git libsqlite3-dev python3`}</code></pre>

      <p>
        This gives you <code>gcc</code>, <code>g++</code>, <code>make</code>, and the
        other essentials that <code>node-gyp</code> needs to compile native addons.
        The <code>libsqlite3-dev</code> package is specifically required by MoltBot.
      </p>

      <h3>Step 2: Node.js — Don't Use the Default Package</h3>

      <p>
        This is where most Ubuntu users go wrong. The <code>nodejs</code> package in
        Ubuntu's default repositories is outdated:
      </p>

      <ul>
        <li>Ubuntu 20.04 ships Node 10.x</li>
        <li>Ubuntu 22.04 ships Node 12.x</li>
        <li>Ubuntu 24.04 ships Node 18.x (finally usable, but still not ideal)</li>
      </ul>

      <p>
        OpenClaw needs Node 18 or 20. The recommended approach is to use NodeSource's
        repository or a version manager like <code>nvm</code>:
      </p>

      <pre><code>{`# Using nvm (recommended)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
source ~/.bashrc
nvm install 20
nvm use 20`}</code></pre>

      <h3>Step 3: Install OpenClaw via npm</h3>

      <p>
        With the right Node version in place, you'd typically run:
      </p>

      <pre><code>{`npm install -g openclaw @openclaw/clawdbot @openclaw/moltbot`}</code></pre>

      <p>
        But this is where you'll often hit permission errors with npm's global directory,
        or find that <code>node-gyp</code> fails because of a missing header file. On
        Ubuntu 20.04 in particular, you may also need <code>libssl-dev</code> for
        certain cryptographic modules.
      </p>

      <hr />

      <h2>The One-Command Alternative</h2>

      <p>
        Everything I just described — the apt packages, Node version management, npm
        permissions, and the actual install — is handled by the <a href="/">EasyClaw</a> installer
        script. One line:
      </p>

      <pre><code>curl -fsSL https://openclaw.ai/install.sh | bash</code></pre>

      <p>
        On Ubuntu, the script detects your distribution version and does the right thing:
      </p>

      <ul>
        <li>Installs <code>build-essential</code>, <code>libsqlite3-dev</code>, and other apt packages</li>
        <li>Installs Node.js 20.x via NodeSource if your current version is too old</li>
        <li>Sets up npm to use a user-local directory (no <code>sudo</code> for global installs)</li>
        <li>Installs OpenClaw, ClawdBot, and MoltBot as a tested, compatible set</li>
        <li>Adds shell completions for Bash and Zsh</li>
      </ul>

      <p>
        The script will ask for your <code>sudo</code> password once — to install the
        apt packages — and then does everything else without elevated permissions.
      </p>

      <h2>Ubuntu-Specific Tips</h2>

      <h3>Firewall Considerations</h3>

      <p>
        If you're running <code>ufw</code>, OpenClaw's local development server uses
        port 3100 by default. You'll want to allow it if you're accessing it from
        another machine on your network:
      </p>

      <pre><code>sudo ufw allow 3100</code></pre>

      <h3>Running on a Server (Headless)</h3>

      <p>
        OpenClaw works fine on headless Ubuntu servers. The EasyClaw installer detects
        that there's no display server and skips any GUI-related optional dependencies.
        If you're setting up a CI/CD pipeline or a remote dev server, the same install
        command works without modification.
      </p>

      <h2>Verifying Your Install</h2>

      <pre><code>{`openclaw --version
clawdbot --version
moltbot status
openclaw doctor`}</code></pre>

      <p>
        All four commands should succeed. The <code>openclaw doctor</code> command is
        particularly useful on Linux — it checks that all system libraries are present,
        Node is the right version, and file permissions are correct.
      </p>

      <p>
        Whether you're on a fresh Ubuntu desktop or a headless cloud VM, <a href="/">EasyClaw</a> gets
        you from zero to a working OpenClaw environment in about a minute. No manual
        dependency juggling required.
      </p>
    </BlogLayout>
  );
}
