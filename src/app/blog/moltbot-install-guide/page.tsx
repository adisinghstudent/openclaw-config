"use client";

import { BlogLayout } from "@/components/blog-layout";

export default function MoltBotInstallGuide() {
  return (
    <BlogLayout
      title="MoltBot Install Guide — From Zero to Running in 60 Seconds"
      description="MoltBot is powerful but the install can be painful. Here's how to skip the pain entirely."
      date="January 27, 2025"
    >
      <p>
        MoltBot has quietly become one of the most useful tools in the OpenClaw ecosystem.
        It handles automated schema migrations, data transformations, and environment syncing
        — things that used to require three or four separate scripts. The problem? Getting
        MoltBot installed has historically been a nightmare.
      </p>

      <h2>What Is MoltBot?</h2>

      <p>
        If you're new to MoltBot, here's the short version: it's a CLI tool that watches your
        project for configuration and schema changes, then automatically applies the right
        migrations. Think of it as a smart assistant that keeps your local environment,
        staging, and production configs in sync without manual intervention.
      </p>

      <p>
        MoltBot works alongside ClawdBot and the broader OpenClaw toolkit. It reads from
        your <code>.openclaw/</code> directory and applies transformations based on rules
        you define — or uses sensible defaults if you don't want to customize anything.
      </p>

      <h2>Why the MoltBot Install Is Painful</h2>

      <p>
        MoltBot has a few characteristics that make standalone installation tricky:
      </p>

      <ul>
        <li>It depends on a specific version of <code>libsqlite3</code> with JSON support enabled</li>
        <li>It requires ClawdBot to be installed first, since they share a config format</li>
        <li>The npm package (<code>@openclaw/moltbot</code>) uses postinstall scripts that fail silently on some systems</li>
        <li>On macOS, it needs Rosetta 2 on Apple Silicon machines for one of its native dependencies</li>
      </ul>

      <p>
        I've seen people spend hours debugging a <code>MODULE_NOT_FOUND</code> error that
        turns out to be a missing SQLite extension. The error message doesn't tell you that,
        of course — it just says the module failed to load.
      </p>

      <h3>The Typical Manual Process</h3>

      <p>
        If you want to install MoltBot by hand, here's roughly what you're looking at:
      </p>

      <pre><code>{`# Install system dependencies first
# On macOS:
brew install sqlite3
# On Ubuntu:
sudo apt-get install libsqlite3-dev

# Make sure ClawdBot is already installed
# (see our ClawdBot install guide)

# Then install MoltBot
npm install -g @openclaw/moltbot

# Initialize the config
moltbot init

# Verify
moltbot status`}</code></pre>

      <p>
        That looks reasonable on paper. In practice, the <code>npm install -g</code> step
        is where things fall apart. Permission errors on Linux, PATH issues on Windows,
        and native compilation failures on machines without a full C toolchain are all
        common.
      </p>

      <hr />

      <h2>The Fast Way: Let EasyClaw Handle It</h2>

      <p>
        <a href="/">EasyClaw</a> bundles MoltBot, ClawdBot, and the entire OpenClaw
        toolkit into a single install. You don't need to worry about install order,
        system dependencies, or SQLite versions. Just run:
      </p>

      <pre><code>curl -fsSL https://openclaw.ai/install.sh | bash</code></pre>

      <p>
        The installer detects what's missing on your system and handles it. On macOS
        it'll install the right Homebrew packages. On Ubuntu it'll run the apt commands.
        On Windows it uses the appropriate package manager. You end up with a working
        MoltBot — plus everything else — in about a minute.
      </p>

      <h2>What You Get After Install</h2>

      <p>
        Once EasyClaw finishes, you'll have these commands available:
      </p>

      <ul>
        <li><code>moltbot status</code> — check your environment health</li>
        <li><code>moltbot sync</code> — apply pending migrations</li>
        <li><code>moltbot watch</code> — auto-apply changes as you work</li>
        <li><code>moltbot diff</code> — preview what would change before applying</li>
      </ul>

      <p>
        The <code>moltbot watch</code> command is especially useful during development.
        It monitors your config files and automatically runs the right migrations whenever
        something changes. No more forgetting to run a sync after pulling new changes.
      </p>

      <h2>MoltBot + ClawdBot Together</h2>

      <p>
        One of the biggest advantages of using EasyClaw is that MoltBot and ClawdBot
        are guaranteed to be compatible versions. When you install them separately,
        version mismatches are the number one cause of weird errors. EasyClaw pins
        them to tested, compatible releases.
      </p>

      <blockquote>
        I used to keep a shell script that installed everything in the right order.
        Now I just paste the one-liner on every new machine and I'm done.
      </blockquote>

      <p>
        If you've been putting off trying MoltBot because the install looked daunting,
        this is your chance. Run the <a href="/">EasyClaw installer</a>, and you'll be
        up and running before your coffee gets cold.
      </p>
    </BlogLayout>
  );
}
