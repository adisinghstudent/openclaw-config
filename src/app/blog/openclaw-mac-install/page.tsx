"use client";

import { BlogLayout } from "@/components/blog-layout";

export default function OpenClawMacInstall() {
  return (
    <BlogLayout
      title="How to Install OpenClaw on Mac — M1, M2, M3 & Intel"
      description="Get OpenClaw running on your Mac in under a minute. Works on Apple Silicon and Intel."
      date="January 29, 2025"
    >
      <p>
        Getting OpenClaw running on macOS should take about sixty seconds,
        regardless of whether you are on an M1 MacBook Air, an M3 Pro, or an
        older Intel machine. The EasyClaw installer handles architecture
        detection automatically. But there are a few Mac-specific quirks worth
        knowing about before you run the command.
      </p>

      <h2>Before You Install</h2>

      <p>
        Let us get the common gotchas out of the way first so you do not hit
        them mid-install.
      </p>

      <h3>Homebrew Node vs System Node</h3>

      <p>
        If you installed Node.js through Homebrew, it lives in a different
        location than the system Node that ships with some Xcode setups. The
        EasyClaw installer checks both paths, but if you have multiple Node
        versions managed by <code>nvm</code>, <code>fnm</code>, or{" "}
        <code>volta</code>, make sure your preferred version is active in your
        current shell session before running the installer. A quick check:
      </p>

      <pre><code>node --version</code></pre>

      <p>
        You want Node 18 or higher. If you see an older version or
        &quot;command not found,&quot; install a current version through your
        preferred manager first.
      </p>

      <h3>Gatekeeper Warnings</h3>

      <p>
        macOS Gatekeeper may flag the OpenClaw binary the first time you run
        it because it is not signed with an Apple Developer certificate. If you
        see the &quot;cannot be opened because the developer cannot be verified&quot;
        dialog, you have two options:
      </p>

      <ul>
        <li>
          Open <strong>System Settings &rarr; Privacy &amp; Security</strong> and
          click &quot;Allow Anyway&quot; next to the blocked app notice
        </li>
        <li>
          Or right-click the binary in Finder and select &quot;Open&quot; to
          bypass the check for that specific file
        </li>
      </ul>

      <p>
        The EasyClaw installer tries to handle this automatically by using{" "}
        <code>xattr -d com.apple.quarantine</code> on the downloaded binaries,
        but on some macOS versions you may still need to approve it manually
        once.
      </p>

      <h3>Permissions</h3>

      <p>
        The installer writes to <code>~/.openclaw/</code> by default, so it
        does not need <code>sudo</code>. If you have customized your shell
        config to restrict write access to your home directory, or if you are
        running in a managed corporate environment, you may need to adjust
        permissions on that directory or set a custom install path using the{" "}
        <code>OPENCLAW_HOME</code> environment variable.
      </p>

      <h2>The Install</h2>

      <p>
        With those notes out of the way, here is the actual install. Open
        Terminal (or iTerm, Warp, Kitty, whatever you prefer) and run:
      </p>

      <pre><code>curl -fsSL https://openclaw.ai/install.sh | bash</code></pre>

      <p>
        The installer will detect whether you are on Apple Silicon (arm64) or
        Intel (x86_64) and pull the correct binaries. It installs the full
        OpenClaw stack including ClawdBot and MoltBot, sets up default configs,
        and adds the <code>openclaw</code> command to your PATH.
      </p>

      <p>
        Once it finishes, verify everything is working:
      </p>

      <pre><code>openclaw --version</code></pre>

      <p>You should see the version number and a list of installed components.</p>

      <h2>Post-Install Setup</h2>

      <p>
        After installation, run the interactive setup wizard:
      </p>

      <pre><code>openclaw init</code></pre>

      <p>
        This walks you through setting your API keys, choosing which messaging
        platforms to enable, and configuring basic preferences. The config file
        lands at <code>~/.openclaw/config.yaml</code> and you can edit it
        directly any time.
      </p>

      <h2>Apple Silicon Performance Note</h2>

      <p>
        If you are on an M1, M2, or M3 Mac, OpenClaw runs natively on ARM. No
        Rosetta translation layer, no performance penalty. The local inference
        features in particular benefit from the unified memory architecture on
        Apple Silicon, so if you plan to run smaller models locally alongside
        API-based models, a Mac with 16GB or more of unified memory is a
        genuinely great setup for it.
      </p>

      <hr />

      <p>
        That is the full Mac install walkthrough. If you hit any issues, the{" "}
        <a href="/">EasyClaw homepage</a> has troubleshooting links and a
        community Discord where people are quick to help.
      </p>

      <pre><code>curl -fsSL https://openclaw.ai/install.sh | bash</code></pre>
    </BlogLayout>
  );
}
