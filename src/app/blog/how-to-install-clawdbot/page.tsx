"use client";

import { BlogLayout } from "@/components/blog-layout";

export default function HowToInstallClawdBot() {
  return (
    <BlogLayout
      title="How to Install ClawdBot in 2025 — The Complete Guide"
      description="Skip the hours of troubleshooting. Here's the fastest way to get ClawdBot running on any machine."
      date="January 28, 2025"
    >
      <p>
        If you've tried to install ClawdBot recently, you know the pain. What should be a
        straightforward setup turns into an afternoon of debugging Node version mismatches,
        chasing down missing native dependencies, and wondering why the config file format
        changed again. I've been there — multiple times — and I finally found a better way.
      </p>

      <h2>The Manual ClawdBot Install (The Hard Way)</h2>

      <p>
        Let me walk you through what the "official" ClawdBot install looks like, so you
        can appreciate why most people give up halfway through.
      </p>

      <h3>Step 1: Get the Right Node Version</h3>

      <p>
        ClawdBot requires Node.js 18.x or 20.x. Not 16, not 21 — and definitely not 22,
        which introduces breaking changes to the native module API that ClawdBot depends on.
        If you're on the wrong version, you'll see something like this:
      </p>

      <pre><code>Error: The module was compiled against a different Node.js version</code></pre>

      <p>
        You'll need <code>nvm</code> or <code>fnm</code> to manage Node versions, then switch
        to a compatible release before proceeding.
      </p>

      <h3>Step 2: Install Global Dependencies</h3>

      <p>
        ClawdBot expects a handful of global npm packages to already exist on your system:
      </p>

      <ul>
        <li><code>node-gyp</code> for compiling native addons</li>
        <li><code>typescript</code> at version 5.x or higher</li>
        <li>Python 3.x (yes, really — node-gyp needs it)</li>
        <li>A C++ compiler toolchain (build-essential on Linux, Xcode CLI tools on macOS)</li>
      </ul>

      <p>
        Miss any one of these and you'll hit cryptic errors deep in the install log.
      </p>

      <h3>Step 3: Clone, Configure, Build</h3>

      <p>
        After all that, you still need to clone the repo, copy the example config,
        edit it with your API keys and preferences, then run the build step. The config
        format changed between v2 and v3, so half the tutorials you find online are wrong.
      </p>

      <pre><code>{`git clone https://github.com/openclaw/clawdbot.git
cd clawdbot
cp config.example.json config.json
# edit config.json with your settings
npm install
npm run build`}</code></pre>

      <p>
        If everything goes perfectly, that works. In my experience, it almost never
        goes perfectly on the first try.
      </p>

      <hr />

      <h2>The Easy Way: Install ClawdBot with EasyClaw</h2>

      <p>
        Here's what I actually recommend now. <a href="/">EasyClaw</a> is a single install
        script that handles all of the above — Node version management, native dependencies,
        config generation, and the build step. One command:
      </p>

      <pre><code>curl -fsSL https://openclaw.ai/install.sh | bash</code></pre>

      <p>
        That's it. EasyClaw detects your operating system, installs the correct Node version
        if needed, pulls ClawdBot along with MoltBot and the full OpenClaw toolkit, compiles
        native modules, and drops you into a working setup. The whole process takes about
        60 seconds on a decent connection.
      </p>

      <h2>What EasyClaw Handles for You</h2>

      <ul>
        <li>Detects your OS and architecture (x64, ARM64, etc.)</li>
        <li>Installs or switches to a compatible Node.js version automatically</li>
        <li>Resolves native dependencies — no manual node-gyp or Python setup</li>
        <li>Generates a default config file that actually works out of the box</li>
        <li>Installs ClawdBot, MoltBot, and OpenClaw together so they're all in sync</li>
      </ul>

      <h2>Verifying Your Install</h2>

      <p>
        After the script finishes, confirm everything is working:
      </p>

      <pre><code>{`clawdbot --version
clawdbot health`}</code></pre>

      <p>
        You should see the version number and a green health check. If something went wrong,
        EasyClaw writes a detailed log to <code>~/.easyclaw/install.log</code> that's actually
        useful for debugging — unlike the wall of npm error text you'd get otherwise.
      </p>

      <h2>Should You Still Install Manually?</h2>

      <p>
        If you're contributing to ClawdBot's source code, sure — clone the repo and set up a dev
        environment. For everyone else, there's no reason to fight the manual process.
        The <a href="/">EasyClaw installer</a> does the same thing, just without the headaches.
      </p>

      <p>
        I've been using this workflow on macOS, Ubuntu, and even Windows (via PowerShell) for
        months now. It just works. Give it a try and save yourself the afternoon I'll never get back.
      </p>
    </BlogLayout>
  );
}
