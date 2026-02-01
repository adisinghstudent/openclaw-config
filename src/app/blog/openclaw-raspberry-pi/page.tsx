"use client";

import { BlogLayout } from "@/components/blog-layout";

export default function OpenClawRaspberryPi() {
  return (
    <BlogLayout
      title="Run OpenClaw on a Raspberry Pi — Full Guide"
      description="Turn a $35 Raspberry Pi into your always-on AI assistant with OpenClaw."
      date="January 30, 2025"
    >
      <p>
        A Raspberry Pi sitting on your desk running OpenClaw 24/7 is one of the coolest
        home-lab setups you can build right now. It is cheap, silent, sips power, and gives you
        a private AI assistant that is always available. Here is how to set it up from scratch.
      </p>

      <h2>Which Raspberry Pi Do You Need?</h2>

      <p>
        Not every Pi will cut it. Here is the breakdown:
      </p>

      <ul>
        <li>
          <strong>Raspberry Pi 5 (8 GB):</strong> The best option. The faster CPU and improved
          memory bandwidth make a noticeable difference in token generation speed. Expect 3 to 5
          tokens per second with a small model.
        </li>
        <li>
          <strong>Raspberry Pi 5 (4 GB):</strong> Works, but you are limited to smaller models
          (3B parameters or under). The 4 GB of RAM fills up fast once the OS and OpenClaw
          are loaded.
        </li>
        <li>
          <strong>Raspberry Pi 4 (8 GB):</strong> Usable but noticeably slower. The Pi 4&apos;s
          older Cortex-A72 cores struggle compared to the Pi 5&apos;s Cortex-A76. Budget 2 to 3
          tokens per second.
        </li>
        <li>
          <strong>Raspberry Pi 4 (4 GB or less):</strong> Not recommended. You will run out of
          memory for any meaningful model.
        </li>
      </ul>

      <blockquote>
        Recommendation: Get the Raspberry Pi 5 with 8 GB. At around $80, it is the sweet spot
        for running a small language model locally.
      </blockquote>

      <h2>OS Setup</h2>

      <p>
        Start with Raspberry Pi OS Lite (64-bit). The Lite variant skips the desktop environment,
        freeing up RAM for the model. Flash it to a microSD card (or better, an NVMe SSD via the
        Pi 5&apos;s M.2 HAT) using the Raspberry Pi Imager.
      </p>

      <p>
        During the imaging process, enable SSH and set your username and password so you can
        configure the Pi headlessly. Once it boots, SSH in:
      </p>

      <pre><code>ssh pi@raspberrypi.local</code></pre>

      <p>
        Update the system first:
      </p>

      <pre><code>{`sudo apt update && sudo apt upgrade -y`}</code></pre>

      <h2>Installing OpenClaw With EasyClaw</h2>

      <p>
        This is the easy part. EasyClaw supports ARM64 out of the box, which is exactly what the
        Pi runs. One command does everything:
      </p>

      <pre><code>curl -fsSL https://openclaw.ai/install.sh | bash</code></pre>

      <p>
        The installer detects the ARM architecture, downloads the correct Node.js binary, pulls
        OpenClaw, and sets up a default small model optimized for low-memory devices. On a Pi 5
        with a decent internet connection, the whole process takes about three minutes.
      </p>

      <h2>Performance Expectations</h2>

      <p>
        Let us be realistic. A Raspberry Pi is not a gaming PC. Here is what you can expect on
        the Pi 5 with 8 GB:
      </p>

      <ul>
        <li>
          <strong>TinyLlama (1.1B):</strong> Roughly 5 to 8 tokens per second. Snappy enough for
          quick questions and short tasks.
        </li>
        <li>
          <strong>Phi-3 Mini (3.8B):</strong> About 2 to 4 tokens per second. Noticeably slower
          but much more capable. Good for writing and code help.
        </li>
        <li>
          <strong>Llama 3 (8B, Q4 quantized):</strong> Around 1 to 2 tokens per second. Usable
          for batch tasks or when you are patient, but too slow for interactive chat.
        </li>
      </ul>

      <p>
        For most people, the Phi-3 Mini at Q4 quantization hits the right balance. It is smart
        enough to be genuinely useful and fast enough that you do not lose your train of thought
        waiting for a response.
      </p>

      <h2>Keeping It Running With systemd</h2>

      <p>
        You want OpenClaw to start automatically when the Pi boots and restart if it crashes.
        Create a systemd service file:
      </p>

      <pre><code>{`sudo tee /etc/systemd/system/openclaw.service << 'EOF'
[Unit]
Description=OpenClaw AI Assistant
After=network.target

[Service]
Type=simple
User=pi
WorkingDirectory=/home/pi/.easyclaw
ExecStart=/home/pi/.easyclaw/bin/node /home/pi/.easyclaw/openclaw/server.js
Restart=on-failure
RestartSec=5

[Install]
WantedBy=multi-user.target
EOF`}</code></pre>

      <p>
        Enable and start the service:
      </p>

      <pre><code>{`sudo systemctl enable openclaw
sudo systemctl start openclaw`}</code></pre>

      <p>
        Now OpenClaw survives reboots, power outages, and SSH disconnects. Check its status
        anytime with <code>sudo systemctl status openclaw</code>.
      </p>

      <h2>Accessing It From Other Devices</h2>

      <p>
        By default, OpenClaw listens on <code>localhost:3777</code>. To access it from your phone
        or another computer on the same network, start it with the host flag set to{" "}
        <code>0.0.0.0</code>, or simply visit <code>http://raspberrypi.local:3777</code> from
        any device on your LAN.
      </p>

      <h2>Wrapping Up</h2>

      <p>
        A Raspberry Pi running OpenClaw is not going to replace a cloud-hosted GPT-4. But as a
        private, always-on assistant for quick lookups, drafting messages, and light coding help,
        it is genuinely useful and surprisingly fun to build. Total cost: under $100 for the
        hardware and zero dollars per month to run.
      </p>

      <hr />

      <p>
        Ready to build yours? Grab the installer and get started:
      </p>

      <pre><code>curl -fsSL https://openclaw.ai/install.sh | bash</code></pre>

      <p>
        Or visit the{" "}
        <a href="/">EasyClaw homepage</a> for more guides and documentation.
      </p>
    </BlogLayout>
  );
}
