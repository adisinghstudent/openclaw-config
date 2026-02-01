"use client";

import { BlogLayout } from "@/components/blog-layout";

export default function NpmInstallOpenClaw() {
  return (
    <BlogLayout
      title="npm Install OpenClaw — Why It Fails and What to Do Instead"
      description="Getting npm errors trying to install OpenClaw? You're not alone. Here's the fix."
      date="January 26, 2025"
    >
      <p>
        You typed <code>npm install -g openclaw</code>, hit enter, and got a wall of red
        error text. Welcome to the club. This is by far the most common question in the
        OpenClaw community, and the answer is simpler than you'd expect.
      </p>

      <h2>Why npm Install Alone Doesn't Work</h2>

      <p>
        OpenClaw isn't a simple JavaScript package. It includes native binaries, requires
        specific system libraries, and depends on a particular project structure to function
        correctly. Running <code>npm install</code> only handles the JavaScript dependencies
        — it can't install system libraries, manage Node versions, or set up the config
        directory that OpenClaw expects.
      </p>

      <p>
        Here are the most common errors you'll hit:
      </p>

      <h3>EACCES Permission Errors</h3>

      <pre><code>{`npm ERR! Error: EACCES: permission denied, mkdir '/usr/local/lib/node_modules/openclaw'`}</code></pre>

      <p>
        This happens when npm's global directory requires root access. The typical advice
        is to either run with <code>sudo</code> (don't — it creates more problems) or
        change npm's default directory. Neither is a great solution.
      </p>

      <h3>node-gyp Build Failures</h3>

      <pre><code>{`gyp ERR! build error
gyp ERR! stack Error: \`make\` failed with exit code: 2
gyp ERR! not ok`}</code></pre>

      <p>
        OpenClaw's native modules need to be compiled during install. This requires
        Python 3, a C++ compiler, and <code>make</code> — tools that aren't installed by
        default on most systems. On macOS you need Xcode Command Line Tools. On Windows
        you need Visual C++ Build Tools. On Linux you need <code>build-essential</code>.
      </p>

      <h3>Node Version Conflicts</h3>

      <pre><code>{`npm ERR! engine Unsupported engine
npm ERR! notsup Required: {"node":">=18.0.0 <21.0.0"}
npm ERR! notsup Actual:   {"node":"16.20.2"}`}</code></pre>

      <p>
        OpenClaw requires Node 18 or 20. If you're on an older version — or a newer
        unsupported one — npm will refuse to install, or worse, it'll install but the
        package won't work at runtime.
      </p>

      <h3>Missing Peer Dependencies</h3>

      <p>
        Even when npm succeeds, you'll often see warnings about missing peer dependencies.
        OpenClaw expects ClawdBot and MoltBot to be present as peers, not bundled
        dependencies. Installing them separately in the right order is error-prone.
      </p>

      <hr />

      <h2>What to Do Instead</h2>

      <p>
        The OpenClaw team built an install script that handles all of this.
        <a href="/">EasyClaw</a> resolves system dependencies, manages Node versions,
        installs native build tools, and sets up the complete toolkit in one step:
      </p>

      <pre><code>curl -fsSL https://openclaw.ai/install.sh | bash</code></pre>

      <p>
        This single command does what <code>npm install</code> cannot:
      </p>

      <ul>
        <li>Checks your Node version and installs a compatible one if needed</li>
        <li>Installs system-level build dependencies (Python, make, gcc/clang)</li>
        <li>Sets correct file permissions — no <code>sudo</code> needed</li>
        <li>Installs OpenClaw, ClawdBot, and MoltBot as a coordinated set</li>
        <li>Creates the <code>~/.openclaw/</code> config directory with working defaults</li>
        <li>Adds all binaries to your PATH</li>
      </ul>

      <h2>But I Want to Use npm</h2>

      <p>
        Fair enough. If you prefer managing packages through npm, you can still do that
        after the initial setup. Once EasyClaw has installed the system dependencies and
        set up the config directory, <code>npm update -g openclaw</code> will work fine
        for future updates. The first install is the hard part — that's what EasyClaw solves.
      </p>

      <h2>Verifying It Worked</h2>

      <p>
        After running the install script, check that everything is in place:
      </p>

      <pre><code>{`openclaw --version
which openclaw
openclaw doctor`}</code></pre>

      <p>
        The <code>openclaw doctor</code> command runs a self-diagnostic that checks all
        dependencies, config files, and permissions. If anything is wrong, it tells you
        exactly what and how to fix it.
      </p>

      <blockquote>
        I spent two hours fighting npm errors on a fresh MacBook before someone pointed
        me to the install script. It took 45 seconds. I wish I'd found it first.
      </blockquote>

      <p>
        Stop fighting npm. Run the <a href="/">EasyClaw one-liner</a>, get a working
        install, and move on to actually building things.
      </p>
    </BlogLayout>
  );
}
