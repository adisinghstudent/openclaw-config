"use client";

import { BlogLayout } from "@/components/blog-layout";

export default function OpenClawWindowsSetup() {
  return (
    <BlogLayout
      title="How to Install OpenClaw on Windows 10 & 11"
      description="A step-by-step guide to getting OpenClaw running on Windows — no WSL required."
      date="January 29, 2025"
    >
      <p>
        Windows has come a long way for developer tooling, but installing command-line
        tools that were designed for Unix-like systems can still be rough. OpenClaw is
        no exception — the official docs lean heavily toward macOS and Linux, leaving
        Windows users to figure things out on their own. This guide fixes that.
      </p>

      <h2>The Windows-Specific Challenges</h2>

      <p>
        Before we get to the solution, let me explain what makes OpenClaw tricky on Windows
        specifically. Understanding the problems will help you appreciate why the automated
        approach works so much better.
      </p>

      <h3>PATH Configuration</h3>

      <p>
        Windows handles the system PATH differently than Linux or macOS. When you install
        Node.js, npm, and then global packages, you can end up with executables in three
        or four different directories. If the wrong one takes priority, you'll get version
        conflicts or "command not found" errors even though everything is technically installed.
      </p>

      <h3>PowerShell vs CMD vs Git Bash</h3>

      <p>
        OpenClaw's scripts assume a Bash-like shell. If you're running PowerShell (the
        default on modern Windows), some commands behave differently:
      </p>

      <ul>
        <li><code>curl</code> in PowerShell is actually an alias for <code>Invoke-WebRequest</code>, not real curl</li>
        <li>Environment variable syntax is completely different (<code>$env:VAR</code> vs <code>$VAR</code>)</li>
        <li>File paths use backslashes, which can break Unix-style scripts</li>
        <li>Line endings (CRLF vs LF) cause subtle issues in config files</li>
      </ul>

      <h3>The Node.js Installer Problem</h3>

      <p>
        The official Node.js Windows installer bundles an older version of npm and doesn't
        include <code>node-gyp</code> prerequisites. You'll need to check the box for
        "Automatically install the necessary tools" during setup — which most people skip
        because it looks optional. Without it, native module compilation fails.
      </p>

      <hr />

      <h2>The Simple Path: EasyClaw on Windows</h2>

      <p>
        Here's the good news. <a href="/">EasyClaw</a> has full Windows support and handles
        all of the above automatically. Open PowerShell and run:
      </p>

      <pre><code>curl -fsSL https://openclaw.ai/install.sh | bash</code></pre>

      <p>
        If you're in PowerShell and don't have real curl available, you can also use:
      </p>

      <pre><code>irm https://openclaw.ai/install.ps1 | iex</code></pre>

      <p>
        The installer detects that you're on Windows and adjusts accordingly. It handles
        PATH configuration, installs compatible Node.js if needed, and sets up OpenClaw,
        ClawdBot, and MoltBot with Windows-compatible configurations.
      </p>

      <h2>What EasyClaw Does on Windows</h2>

      <p>
        The Windows-specific steps that EasyClaw automates:
      </p>

      <ul>
        <li>Installs Node.js via the official Windows installer with native tools enabled</li>
        <li>Configures PATH entries in the correct order so there are no conflicts</li>
        <li>Generates config files with Windows-style paths and CRLF line endings where needed</li>
        <li>Sets up PowerShell aliases so commands work identically to Linux/macOS</li>
        <li>Installs Visual C++ Build Tools if they're missing (required for native modules)</li>
      </ul>

      <h2>Do I Need WSL?</h2>

      <p>
        No. While WSL is a great option if you want a full Linux environment on Windows,
        OpenClaw runs natively on Windows without it. EasyClaw installs native Windows
        binaries, so there's no translation layer and no performance overhead.
      </p>

      <p>
        That said, if you already use WSL for development, the standard Linux install
        command works perfectly inside your WSL environment. EasyClaw detects WSL and
        treats it as the Linux distribution it's running (usually Ubuntu).
      </p>

      <h2>Verifying the Install</h2>

      <p>
        After EasyClaw finishes, open a new PowerShell window (important — you need a
        fresh session for PATH changes to take effect) and run:
      </p>

      <pre><code>{`openclaw --version
clawdbot --version
moltbot status`}</code></pre>

      <p>
        All three should return version numbers without errors. If something looks off,
        check <code>%USERPROFILE%\\.easyclaw\\install.log</code> for details.
      </p>

      <p>
        Windows support has been a pain point for the OpenClaw community for a while.
        <a href="/">EasyClaw</a> finally makes it a non-issue. Give it a shot — the whole
        install takes about a minute, and you won't need to touch a single system setting manually.
      </p>
    </BlogLayout>
  );
}
