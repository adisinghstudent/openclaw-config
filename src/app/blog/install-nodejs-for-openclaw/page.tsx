"use client";

import { BlogLayout } from "@/components/blog-layout";

export default function InstallNodeJsForOpenClaw() {
  return (
    <BlogLayout
      title="Do You Need to Install Node.js for OpenClaw?"
      description="Short answer: not if you use EasyClaw. Here's why."
      date="January 27, 2025"
    >
      <p>
        You found OpenClaw, you are excited to try it, and then you see the requirements:
        Node.js 18 or later. If you have never touched Node.js before, that can feel like a
        roadblock. The good news is you do not actually need to install it yourself.
      </p>

      <pre><code>curl -fsSL https://openclaw.ai/install.sh | bash</code></pre>

      <p>
        That command, the EasyClaw installer, handles Node.js for you. But if you are curious
        about why Node.js matters and what can go wrong when you manage it manually, read on.
      </p>

      <h2>Why OpenClaw Needs Node.js</h2>

      <p>
        OpenClaw&apos;s interface, plugin system, and local API server are all written in
        JavaScript and TypeScript. Node.js is the runtime that executes that code outside of a
        browser. Without it, OpenClaw cannot start.
      </p>

      <p>
        Think of Node.js like the engine in a car. OpenClaw is the car. You need the engine to
        drive, but you do not need to understand how the engine works to get where you are going.
      </p>

      <h2>The Version Compatibility Problem</h2>

      <p>
        This is where things get messy for people who install Node.js manually. There are
        currently three major versions in active circulation:
      </p>

      <ul>
        <li>
          <strong>Node.js 18 (LTS):</strong> The minimum version OpenClaw supports. Reaches
          end-of-life in April 2025, so it is on the way out.
        </li>
        <li>
          <strong>Node.js 20 (LTS):</strong> The recommended version right now. Stable and
          well-tested with OpenClaw.
        </li>
        <li>
          <strong>Node.js 22 (Current):</strong> Works fine with OpenClaw but occasionally has
          edge cases with newer APIs that plugins might not handle yet.
        </li>
      </ul>

      <p>
        If you have an old system Node.js (v16 or earlier), OpenClaw will not run at all. You
        will get syntax errors or missing API errors that look completely unrelated to the actual
        problem.
      </p>

      <h2>The nvm Approach</h2>

      <p>
        The standard advice in the Node.js community is to use nvm (Node Version Manager). It
        lets you install multiple Node versions and switch between them:
      </p>

      <pre><code>{`curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
nvm install 20
nvm use 20`}</code></pre>

      <p>
        This works, but it adds another tool to manage. You need to remember to run{" "}
        <code>nvm use 20</code> in every new terminal session, or set a default with{" "}
        <code>nvm alias default 20</code>. If you are not a developer, this is unnecessary
        friction.
      </p>

      <h3>Common nvm Gotchas</h3>

      <ul>
        <li>
          Forgetting to source your shell profile after installing nvm, so the <code>nvm</code>{" "}
          command is not found.
        </li>
        <li>
          Having both Homebrew Node and nvm Node installed simultaneously, leading to path
          conflicts.
        </li>
        <li>
          Global npm packages disappearing when you switch Node versions, because each version
          has its own global modules directory.
        </li>
      </ul>

      <h2>How EasyClaw Solves This</h2>

      <p>
        EasyClaw takes a different approach. Instead of relying on whatever Node.js version you
        have (or do not have) installed, it ships a standalone Node.js binary as part of the
        installation. This binary lives inside the EasyClaw directory and does not interfere
        with any system-level Node.js installation.
      </p>

      <p>
        That means:
      </p>

      <ul>
        <li>You do not need Node.js installed on your system at all.</li>
        <li>If you already have Node.js, EasyClaw will not touch it or conflict with it.</li>
        <li>The version is always correct. No compatibility surprises.</li>
        <li>Updates to EasyClaw include the right Node.js version automatically.</li>
      </ul>

      <p>
        This is especially helpful on machines where you do not have admin access, like a work
        laptop with locked-down IT policies. EasyClaw installs entirely in your home directory.
      </p>

      <h2>The Bottom Line</h2>

      <p>
        If you are a developer who already manages Node.js with nvm or Volta, you can absolutely
        install OpenClaw manually with <code>npm install -g openclaw</code>. But if you just want
        the AI assistant running with zero fuss, EasyClaw is the path of least resistance:
      </p>

      <pre><code>curl -fsSL https://openclaw.ai/install.sh | bash</code></pre>

      <p>
        No Node.js installation. No version juggling. No permission headaches. It just works.
      </p>

      <hr />

      <p>
        For more details, check out the{" "}
        <a href="/">EasyClaw homepage</a> or read the full installation documentation.
      </p>
    </BlogLayout>
  );
}
