"use client";

import { BlogLayout } from "@/components/blog-layout";

export default function OpenClawSkillsPlugins() {
  return (
    <BlogLayout
      title="Best OpenClaw Skills & Plugins in 2025"
      description="Extend your AI assistant with community skills — browser control, web search, file management, and more."
      date="January 30, 2025"
    >
      <p>
        Out of the box, OpenClaw is a capable AI assistant. But its real power comes from the
        plugin ecosystem — hundreds of community-built skills that let you extend what the
        assistant can do. Think of skills as small, focused modules that give OpenClaw new
        abilities: browsing the web, managing files, querying databases, controlling your browser,
        and much more.
      </p>

      <p>
        Before you start installing plugins, you need OpenClaw running on your machine. The
        fastest way to get set up is with <a href="/">EasyClaw</a>:
      </p>

      <pre><code>curl -fsSL https://openclaw.ai/install.sh | bash</code></pre>

      <p>
        Once that finishes, you are ready to explore what the community has built.
      </p>

      <h2>What Are Skills?</h2>

      <p>
        A skill is a self-contained module that registers one or more capabilities with OpenClaw.
        When you ask the assistant to do something, it checks which installed skills match the
        request and delegates the work accordingly. Skills can access the filesystem, make network
        requests, run shell commands, or interact with external APIs — all subject to the
        permission system you configure.
      </p>

      <p>
        Each skill ships as a package with a manifest file (<code>skill.yaml</code>) that
        declares its name, description, required permissions, and entry point. The manifest is
        what OpenClaw reads to understand what the skill does and when to invoke it.
      </p>

      <h2>How to Install Skills</h2>

      <p>
        The built-in plugin manager handles installation. From your terminal:
      </p>

      <pre><code>{`# Install a single skill
openclaw plugin install web-search

# Install multiple skills at once
openclaw plugin install browser-control file-manager code-runner

# List installed skills
openclaw plugin list

# Remove a skill
openclaw plugin remove web-search`}</code></pre>

      <p>
        Skills are pulled from the OpenClaw Plugin Registry by default, but you can also install
        from a local directory or a Git repository URL.
      </p>

      <h2>Top Community Skills in 2025</h2>

      <p>
        The registry has grown rapidly. Here are the most popular and genuinely useful skills
        as of early 2025:
      </p>

      <h3>web-search</h3>
      <p>
        Gives OpenClaw the ability to search the web in real time. It uses configurable backends
        — SearXNG for privacy-focused self-hosted search, or commercial APIs like Brave Search
        and Google. Essential for any assistant that needs to answer questions about current events
        or look up documentation.
      </p>

      <h3>browser-control</h3>
      <p>
        Launches a headless Chromium instance that OpenClaw can drive programmatically. It can
        navigate to URLs, fill out forms, click buttons, take screenshots, and extract page
        content. Useful for scraping, testing, and automating repetitive web tasks.
      </p>

      <h3>file-manager</h3>
      <p>
        A comprehensive file operations skill. OpenClaw can read, write, rename, move, and search
        files on your system. It respects the permission boundaries you set in your config — you
        can restrict it to specific directories so it never touches files outside your project
        folders.
      </p>

      <h3>code-runner</h3>
      <p>
        Executes code snippets in sandboxed environments. Supports Python, JavaScript, TypeScript,
        Go, and Rust. The sandbox uses lightweight containers to prevent any code from affecting
        your host system. Great for testing ideas, running data analysis, or validating generated
        code.
      </p>

      <h3>db-query</h3>
      <p>
        Connects to PostgreSQL, MySQL, or SQLite databases and lets you query them through
        natural language. Ask &quot;how many users signed up this week&quot; and get a SQL query,
        results, and a plain-English summary. Supports read-only mode for safety.
      </p>

      <h3>git-assistant</h3>
      <p>
        Understands your Git repositories. It can summarize recent commits, generate changelogs,
        suggest commit messages, review diffs, and help resolve merge conflicts. Pairs especially
        well with the code-runner skill.
      </p>

      <h3>clipboard-sync</h3>
      <p>
        Monitors your clipboard and lets OpenClaw act on whatever you copy. Copy a URL and it
        can summarize the page. Copy an error message and it can diagnose the problem. Lightweight
        but surprisingly useful in daily workflows.
      </p>

      <h2>Building Your Own Skill</h2>

      <p>
        The plugin architecture is designed to be approachable. A minimal skill needs two files:
      </p>

      <pre><code>{`# skill.yaml
name: my-custom-skill
version: 1.0.0
description: "Does something useful"
permissions:
  - filesystem:read
  - network:outbound
entry: index.ts`}</code></pre>

      <pre><code>{`// index.ts
import { Skill, Context } from "@openclaw/sdk";

export default class MyCustomSkill extends Skill {
  name = "my-custom-skill";
  description = "Does something useful";

  async execute(ctx: Context, input: string): Promise<string> {
    // Your logic here
    return "Result from my custom skill";
  }
}`}</code></pre>

      <p>
        Run <code>openclaw plugin dev ./my-custom-skill</code> to test it locally, and{" "}
        <code>openclaw plugin publish</code> when you are ready to share it with the community.
      </p>

      <blockquote>
        Tip: Browse the source code of existing skills on GitHub before writing your own. The
        patterns are consistent, and most skills can be adapted to new use cases with small changes.
      </blockquote>

      <hr />

      <p>
        The plugin ecosystem is what transforms OpenClaw from a chat interface into a genuine
        productivity tool. Start with the essentials — web-search, file-manager, and code-runner
        — and branch out from there. And if you have not installed OpenClaw yet, head to{" "}
        <a href="/">the homepage</a> to get started with a single command.
      </p>
    </BlogLayout>
  );
}
