"use client";

import { BlogLayout } from "@/components/blog-layout";

export default function OpenClawDockerInstall() {
  return (
    <BlogLayout
      title="Run OpenClaw in Docker — Container Setup Guide"
      description="Deploy OpenClaw using Docker for clean isolation and easy updates."
      date="January 29, 2025"
    >
      <p>
        Docker is a natural fit for running OpenClaw. Containers give you clean isolation from
        your host system, reproducible builds, and dead-simple updates — just pull the new image
        and restart. This guide covers everything from a basic single-container setup to a full
        docker-compose configuration with persistent storage.
      </p>

      <p>
        Before we dive in, a quick note: if you are a developer who just wants OpenClaw running
        on your own machine with minimal fuss, <a href="/">EasyClaw</a> is the simpler path.
        One command handles installation, configuration, and updates:
      </p>

      <pre><code>curl -fsSL https://openclaw.ai/install.sh | bash</code></pre>

      <p>
        Docker makes more sense when you need network isolation, are deploying to a shared server,
        or want to run OpenClaw as part of a larger containerized stack.
      </p>

      <h2>Docker vs Bare Metal</h2>

      <p>
        Running OpenClaw directly on your machine (bare metal) is faster to set up and avoids
        the overhead of container networking. Docker, on the other hand, shines when you need:
      </p>

      <ul>
        <li>Clean separation from your host system&apos;s Node.js and Python versions</li>
        <li>Easy rollback — just point to a previous image tag</li>
        <li>Reproducible deployments across dev, staging, and production</li>
        <li>Resource limits via cgroups (CPU and memory caps)</li>
        <li>Integration with orchestrators like Kubernetes or Docker Swarm</li>
      </ul>

      <h2>Quick Start with Docker Run</h2>

      <p>
        The official OpenClaw image is published to Docker Hub. Pull and run it with:
      </p>

      <pre><code>{`docker run -d \\
  --name openclaw \\
  -p 3377:3377 \\
  -v openclaw-data:/home/openclaw/.openclaw \\
  -e OPENCLAW_API_KEY=your-llm-api-key \\
  openclaw/openclaw:latest`}</code></pre>

      <p>
        This starts OpenClaw in detached mode, maps port 3377 to your host, mounts a named volume
        for persistent data, and passes your LLM API key as an environment variable. You can
        verify it is running with <code>docker logs openclaw</code>.
      </p>

      <h2>Full Setup with Docker Compose</h2>

      <p>
        For a more maintainable configuration, use a <code>docker-compose.yml</code> file. This
        is especially useful when you want to run OpenClaw alongside other services like a local
        model server or a reverse proxy.
      </p>

      <pre><code>{`version: "3.8"

services:
  openclaw:
    image: openclaw/openclaw:latest
    container_name: openclaw
    restart: unless-stopped
    ports:
      - "3377:3377"
    volumes:
      - openclaw-data:/home/openclaw/.openclaw
      - openclaw-plugins:/home/openclaw/.openclaw/plugins
    environment:
      - OPENCLAW_API_KEY=\${OPENCLAW_API_KEY}
      - OPENCLAW_MODEL=gpt-4o
      - OPENCLAW_LOG_LEVEL=info
      - OPENCLAW_ENABLE_NETWORK=true
    deploy:
      resources:
        limits:
          memory: 2G
          cpus: "2.0"

volumes:
  openclaw-data:
  openclaw-plugins:`}</code></pre>

      <p>
        Save this file, create a <code>.env</code> file with your API key, and start everything
        with <code>docker compose up -d</code>.
      </p>

      <h2>Environment Variables</h2>

      <p>
        OpenClaw&apos;s Docker image supports all the same configuration options as the bare-metal
        install, exposed through environment variables:
      </p>

      <ul>
        <li><code>OPENCLAW_API_KEY</code> — your LLM provider API key (required for cloud models)</li>
        <li><code>OPENCLAW_MODEL</code> — the default model to use (e.g. <code>gpt-4o</code>, <code>claude-3-opus</code>, <code>ollama/llama3</code>)</li>
        <li><code>OPENCLAW_LOG_LEVEL</code> — logging verbosity: <code>debug</code>, <code>info</code>, <code>warn</code>, or <code>error</code></li>
        <li><code>OPENCLAW_ENABLE_NETWORK</code> — whether plugins can make outbound HTTP requests</li>
        <li><code>OPENCLAW_PORT</code> — override the default port (3377)</li>
        <li><code>OPENCLAW_DATA_DIR</code> — override the default data directory inside the container</li>
      </ul>

      <h2>Persistent Volumes</h2>

      <p>
        OpenClaw stores conversation history, plugin data, and configuration in its data directory.
        Without a volume mount, all of that disappears when the container stops. The examples above
        use named volumes, but you can also bind-mount a host directory:
      </p>

      <pre><code>{`volumes:
  - ./openclaw-data:/home/openclaw/.openclaw`}</code></pre>

      <p>
        Bind mounts are useful when you want to edit configuration files directly from your host
        or back them up with standard filesystem tools.
      </p>

      <h3>Updating</h3>

      <p>
        Updating a Docker-based OpenClaw deployment is straightforward. Pull the latest image,
        stop the old container, and start a new one. Your data persists in the volume:
      </p>

      <pre><code>{`docker compose pull
docker compose down
docker compose up -d`}</code></pre>

      <h2>Writing a Custom Dockerfile</h2>

      <p>
        If you need to bundle custom plugins or system dependencies, extend the official image:
      </p>

      <pre><code>{`FROM openclaw/openclaw:latest

# Install additional system packages
RUN apt-get update && apt-get install -y ffmpeg && rm -rf /var/lib/apt/lists/*

# Pre-install community plugins
RUN openclaw plugin install web-search browser-control

EXPOSE 3377`}</code></pre>

      <p>
        Build with <code>docker build -t my-openclaw .</code> and reference <code>my-openclaw</code>{" "}
        in your compose file.
      </p>

      <hr />

      <p>
        Docker gives you a clean, portable way to run OpenClaw on any machine or server. For
        personal development use, though, most people find that <a href="/">EasyClaw</a> is the
        faster path — it handles everything in a single command and keeps updates painless. Choose
        whichever approach fits your workflow best.
      </p>
    </BlogLayout>
  );
}
