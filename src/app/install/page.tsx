"use client";

import { motion } from "framer-motion";
import { Nav } from "@/components/nav";
import { InstallBlock } from "@/components/install-block";

const fade = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const stagger = {
  show: { transition: { staggerChildren: 0.08 } },
};

const methods = [
  {
    id: "curl",
    title: "Command line",
    desc: "The fastest way. Works on macOS, Windows, and Linux. Installs Node.js if needed.",
    available: true,
    content: "curl",
  },
  {
    id: "desktop",
    title: "Desktop app",
    desc: "Native app built with Tauri. Download, open, and you're running. No terminal required.",
    available: true,
    content: "desktop",
  },
  {
    id: "cloud",
    title: "Cloud hosted",
    desc: "Hosted on Supabase with S3 storage. Zero installation — sign in and start using OpenClaw.",
    available: false,
    badge: "Coming soon",
  },
];

const platforms = [
  { name: "macOS", versions: "Apple Silicon & Intel", icon: "apple" },
  { name: "Windows", versions: "10 & 11", icon: "windows" },
  { name: "Linux", versions: "Ubuntu, Debian, Fedora, Arch", icon: "linux" },
];

export default function InstallPage() {
  return (
    <>
      <Nav />

      <section className="min-h-[50vh] flex flex-col items-center justify-center px-6 pt-20 pb-12">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="text-center max-w-2xl mx-auto"
        >
          <motion.p
            variants={fade}
            className="text-xs font-medium tracking-widest uppercase text-[var(--color-text-tertiary)] mb-4"
          >
            Install
          </motion.p>
          <motion.h1
            variants={fade}
            className="text-3xl sm:text-4xl font-bold tracking-tight mb-3"
          >
            Get OpenClaw running
          </motion.h1>
          <motion.p
            variants={fade}
            className="text-sm text-[var(--color-text-secondary)] max-w-md mx-auto mb-10"
          >
            Choose how you want to install. The command line is the fastest
            path for any platform.
          </motion.p>
        </motion.div>
      </section>

      {/* Install methods */}
      <section className="px-6 pb-20">
        <div className="max-w-3xl mx-auto space-y-4">
          {methods.map((m, i) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
              className={`border p-6 transition-colors ${
                m.available
                  ? "bg-[var(--color-surface)] border-[var(--color-accent)]"
                  : "bg-[var(--color-bg-alt)] border-[var(--color-border)]"
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-sm font-semibold">{m.title}</h3>
                  <p className="text-xs text-[var(--color-text-secondary)] mt-1">
                    {m.desc}
                  </p>
                </div>
                {m.badge && (
                  <span className="text-[10px] font-medium uppercase tracking-wider text-[var(--color-text-tertiary)] border border-[var(--color-border)] px-2 py-0.5 shrink-0">
                    {m.badge}
                  </span>
                )}
                {m.available && (
                  <span className="text-[10px] font-medium uppercase tracking-wider text-[var(--color-success)] border border-[var(--color-success)]/30 px-2 py-0.5 shrink-0">
                    Available
                  </span>
                )}
              </div>

              {m.content === "curl" && (
                <div className="mt-4">
                  <InstallBlock size="sm" />
                </div>
              )}

              {m.content === "desktop" && (
                <div className="mt-4 flex items-center gap-3">
                  <a
                    href="https://owxlbqepqhmqsrdixthk.supabase.co/storage/v1/object/public/releases/EasyClaw_latest_aarch64.dmg"
                    className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium bg-[var(--color-accent)] text-white hover:opacity-90 transition-opacity"
                  >
                    Download for macOS (Apple Silicon)
                  </a>
                  <a
                    href="https://owxlbqepqhmqsrdixthk.supabase.co/storage/v1/object/public/releases/EasyClaw_latest_x64.dmg"
                    className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors"
                  >
                    Intel Mac
                  </a>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Platform support */}
      <section className="px-6 pb-24 bg-[var(--color-bg-alt)] py-20">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <p className="text-xs font-medium tracking-widest uppercase text-[var(--color-text-tertiary)] mb-3">
              Platform support
            </p>
            <h2 className="text-xl font-bold tracking-tight">
              Runs everywhere
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {platforms.map((p, i) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="bg-[var(--color-surface)] border border-[var(--color-border)] p-8 text-center"
              >
                <div className="mb-4">
                  {p.icon === "apple" && (
                    <svg className="w-10 h-10 mx-auto text-[var(--color-text)]" viewBox="0 0 814 1000" fill="currentColor">
                      <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76.5 0-103.7 40.8-165.9 40.8s-105.6-57.8-155.5-127.4c-58.3-81.4-105.6-207.5-105.6-327.4 0-192.8 125.5-295 248.8-295 65.5 0 120.1 43.1 161.2 43.1 39.2 0 100.2-45.7 174.5-45.7 28.2 0 129.6 2.6 196.7 99.4zM554.1 159.4c31.1-36.9 53.1-88.1 53.1-139.4 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.2 32.4-55.2 83.6-55.2 135.6 0 7.8.7 15.6 1.3 18.2 2.6.5 6.4.6 10.2.6 45.8 0 103.7-30.4 139.6-70.7z" />
                    </svg>
                  )}
                  {p.icon === "windows" && (
                    <svg className="w-10 h-10 mx-auto text-[var(--color-text)]" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801" />
                    </svg>
                  )}
                  {p.icon === "linux" && (
                    <svg className="w-10 h-10 mx-auto text-[var(--color-text)]" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12.503.587c-1.4 0-2.543.842-3.279 1.88-.32.452-.596.955-.81 1.482-.193.476-.335 1.013-.44 1.536-.17.86-.21 1.694-.37 2.398-.17.768-.41 1.314-.79 1.916-.382.597-.757 1.128-1.143 1.702-.387.577-.552 1.104-.588 1.578-.022.256-.005.445.013.642.017.196.03.356.03.675 0 .148-.036.38-.135.6-.098.22-.24.42-.408.532-.2.136-.528.176-.852.234-.325.063-.665.125-.925.26-.3.2-.357.4-.395.6l-.01.07c-.022.132-.04.265-.083.4-.098.4-.28.684-.466.87-.186.187-.41.326-.59.456-.261.19-.473.4-.628.727-.1.208-.14.384-.13.53a.478.478 0 00.098.33c.125.127.135.135.395.195.065.015.105.02.105.08 0 .066-.137.4-.16.465a2.417 2.417 0 00-.159.725c-.004.071-.004.142.005.27.035.502.265.975.56 1.405.51.747 1.306 1.192 2.174 1.127.771-.062 1.493-.652 1.884-1.43l.003-.003c.051-.135.09-.199.114-.333 1.003.067 1.878-.258 2.577-.2 1.03.065 1.673.331 2.26.334.238.482.682.83 1.208.946.75.2 1.69-.004 2.616-.47.864-.465 1.964-.4 2.774-.6.405-.131.766-.267.94-.601.174-.34.143-.804-.106-1.484-.076-.242-.018-.571.04-.97.028-.136.055-.337.055-.536.004-.208-.042-.413-.132-.602-.206-.411-.551-.544-.864-.68-.312-.133-.598-.201-.797-.4-.213-.239-.403-.571-.664-.839a.424.424 0 00-.11-.135c.123-.805-.009-1.657-.286-2.489-.59-1.771-1.831-3.47-2.716-4.521-.75-1.067-.974-1.928-1.05-3.02-.065-1.491 1.056-5.965-3.17-6.298a4.59 4.59 0 00-.48-.021zm-.003 1.025c.2 0 .388.018.56.055.684.144 1.26.554 1.76 1.09.196.21.38.446.55.7.157.234.298.488.407.747.068.161.12.329.165.5.135.86.18 1.689.337 2.383.17.765.41 1.312.787 1.91.383.597.756 1.127 1.142 1.701.387.577.525 1.104.56 1.577.023.256.005.445-.012.642-.017.196-.03.356-.03.675 0 .148.036.38.135.6.098.22.24.42.407.532.2.136.528.176.852.234.325.063.665.125.925.26.3.201.357.401.395.6l.01.07c.022.132.04.265.082.4.099.399.28.683.467.87.186.185.41.325.59.455.26.19.473.4.627.727.1.208.14.384.13.53a.478.478 0 01-.098.33c-.125.127-.135.135-.395.195-.065.015-.105.02-.105.08 0 .066.137.4.16.465.09.252.14.49.159.725.004.071.004.142-.005.271-.035.501-.265.974-.56 1.404-.511.747-1.306 1.192-2.174 1.127-.771-.062-1.493-.652-1.884-1.43l-.003-.003a1.786 1.786 0 01-.114-.333c-1.003.067-1.878-.258-2.577-.2-1.03.065-1.673.331-2.26.334-.238.482-.682.83-1.208.946-.75.2-1.69-.004-2.616-.47-.864-.465-1.964-.4-2.774-.6-.405-.131-.766-.267-.94-.601-.174-.339-.143-.804.106-1.484.076-.242.018-.571-.04-.97a3.31 3.31 0 01-.055-.536c-.004-.208.042-.413.132-.602.206-.411.551-.544.864-.68.312-.133.598-.201.797-.4.213-.239.403-.571.663-.839a.424.424 0 01.11-.135c-.123-.805.009-1.657.287-2.489.589-1.771 1.831-3.47 2.716-4.521.75-1.067.974-1.928 1.05-3.02.046-.663.004-1.744.373-2.926.17-.543.418-1.078.754-1.525.523-.696 1.173-1.16 2.05-1.233.092-.007.18-.016.265-.016z" />
                    </svg>
                  )}
                </div>
                <h3 className="text-base font-semibold">{p.name}</h3>
                <p className="text-sm text-[var(--color-text-tertiary)] mt-1">
                  {p.versions}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[var(--color-border)] py-8 px-6">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <span className="text-xs text-[var(--color-text-tertiary)]">
            easyclaw
          </span>
          <div className="flex items-center gap-4">
            <a
              href="https://openclaw.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-[var(--color-text-tertiary)] hover:text-[var(--color-text-secondary)] transition-colors"
            >
              OpenClaw
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
