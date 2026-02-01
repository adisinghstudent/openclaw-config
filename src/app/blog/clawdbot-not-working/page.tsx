"use client";

import { BlogLayout } from "@/components/blog-layout";

export default function ClawdBotNotWorking() {
  return (
    <BlogLayout
      title="ClawdBot Not Working? Here's How to Fix It"
      description="Common ClawdBot errors and how to fix them — or just reinstall the easy way."
      date="January 26, 2025"
    >
      <p>
        ClawdBot is great when it works. When it does not, the error messages can be cryptic and
        the fixes are not always obvious. This guide walks through the most common problems people
        run into, with both the manual fix and the nuclear option: wiping everything and
        reinstalling cleanly with EasyClaw.
      </p>

      <h2>EACCES Permission Errors</h2>

      <p>
        This is the single most common ClawdBot issue. You see something like:
      </p>

      <pre><code>Error: EACCES: permission denied, access &apos;/usr/local/lib/node_modules&apos;</code></pre>

      <p>
        It means you installed Node.js or ClawdBot with <code>sudo</code> at some point, and now
        your user account does not have write access to the global modules directory.
      </p>

      <h3>Manual Fix</h3>

      <p>
        Reclaim ownership of the npm directory:
      </p>

      <pre><code>sudo chown -R $(whoami) /usr/local/lib/node_modules</code></pre>

      <p>
        Or better yet, configure npm to use a directory in your home folder:
      </p>

      <pre><code>{`mkdir -p ~/.npm-global
npm config set prefix '~/.npm-global'`}</code></pre>

      <p>
        Then add <code>~/.npm-global/bin</code> to your <code>PATH</code>.
      </p>

      <h3>The Easier Way</h3>

      <p>
        EasyClaw installs its own isolated Node.js runtime, so global permission issues simply
        do not apply. One command resets everything:
      </p>

      <pre><code>curl -fsSL https://openclaw.ai/install.sh | bash</code></pre>

      <h2>Wrong Node.js Version</h2>

      <p>
        ClawdBot requires Node.js 18 or later. If you are on an older version, you will see
        errors about unsupported syntax or missing APIs, often something like:
      </p>

      <pre><code>SyntaxError: Unexpected token &apos;?&apos;</code></pre>

      <h3>Manual Fix</h3>

      <p>
        Check your version with <code>node -v</code>. If it is below 18, upgrade using nvm:
      </p>

      <pre><code>{`nvm install 20
nvm use 20`}</code></pre>

      <h3>The Easier Way</h3>

      <p>
        EasyClaw bundles a compatible Node.js version automatically. You do not need to think
        about nvm, Homebrew, or system packages. Just run the installer.
      </p>

      <h2>Port 3777 Already in Use</h2>

      <p>
        If ClawdBot fails to start with a message like <code>EADDRINUSE :::3777</code>, another
        process is sitting on that port. Maybe a previous ClawdBot instance did not shut down
        cleanly.
      </p>

      <h3>Manual Fix</h3>

      <p>
        Find and kill the rogue process:
      </p>

      <pre><code>{`lsof -i :3777
kill -9 <PID>`}</code></pre>

      <p>
        Or pick a different port by setting the <code>PORT</code> environment variable before
        starting ClawdBot.
      </p>

      <h3>The Easier Way</h3>

      <p>
        EasyClaw detects port conflicts during installation and handles cleanup for you. It will
        stop any existing ClawdBot processes before starting a fresh instance.
      </p>

      <h2>Corrupted config.json</h2>

      <p>
        If you hand-edited <code>~/.clawdbot/config.json</code> and introduced a syntax error,
        ClawdBot will refuse to start. The error usually looks like:
      </p>

      <pre><code>SyntaxError: Unexpected token in JSON at position 42</code></pre>

      <h3>Manual Fix</h3>

      <p>
        Open the file, find the bad comma or missing bracket, and correct it. You can validate
        the file with:
      </p>

      <pre><code>cat ~/.clawdbot/config.json | python3 -m json.tool</code></pre>

      <h3>The Easier Way</h3>

      <p>
        Rename the broken config and reinstall. EasyClaw generates a fresh, valid config file:
      </p>

      <pre><code>{`mv ~/.clawdbot/config.json ~/.clawdbot/config.json.bak
curl -fsSL https://openclaw.ai/install.sh | bash`}</code></pre>

      <h2>When in Doubt, Start Fresh</h2>

      <p>
        Most ClawdBot problems come down to environment drift: old Node versions, permission
        tangles, stale config files. Instead of debugging each layer, you can nuke the whole
        thing and start over in sixty seconds:
      </p>

      <pre><code>curl -fsSL https://openclaw.ai/install.sh | bash</code></pre>

      <p>
        EasyClaw installs a clean Node.js runtime, pulls the latest ClawdBot release, writes a
        fresh config, and starts the server. It is the fastest way to get back to a working setup.
      </p>

      <hr />

      <p>
        Still stuck? Head to the{" "}
        <a href="/">EasyClaw homepage</a> for more resources, or drop a message in the OpenClaw
        community forums.
      </p>
    </BlogLayout>
  );
}
