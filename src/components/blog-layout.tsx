"use client";

import { Nav } from "@/components/nav";
import { CopyButton } from "@/components/copy-button";
import Image from "next/image";
import Link from "next/link";

const INSTALL_CMD = "curl -fsSL https://openclaw.ai/install.sh | bash";

interface BlogLayoutProps {
  title: string;
  description: string;
  date: string;
  children: React.ReactNode;
}

export function BlogLayout({ title, description, date, children }: BlogLayoutProps) {
  return (
    <>
      <Nav />

      <article className="max-w-2xl mx-auto px-6 pt-28 pb-20">
        {/* Header */}
        <header className="mb-12">
          <time className="text-xs font-medium tracking-widest uppercase text-[var(--color-text-tertiary)]">
            {date}
          </time>
          <h1
            className="text-4xl sm:text-5xl italic leading-tight mt-3 mb-4"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            {title}
          </h1>
          <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed">
            {description}
          </p>
          <div className="border-b border-[var(--color-border)] mt-8" />
        </header>

        {/* Article body */}
        <div
          className="
            text-base leading-relaxed text-[var(--color-text)]
            [&>p]:mb-6
            [&>p]:leading-relaxed
            [&>h2]:text-2xl [&>h2]:font-semibold [&>h2]:mt-12 [&>h2]:mb-4 [&>h2]:tracking-tight
            [&>h3]:text-xl [&>h3]:font-semibold [&>h3]:mt-10 [&>h3]:mb-3 [&>h3]:tracking-tight
            [&>ul]:mb-6 [&>ul]:pl-5 [&>ul]:list-disc [&>ul]:space-y-2
            [&>ol]:mb-6 [&>ol]:pl-5 [&>ol]:list-decimal [&>ol]:space-y-2
            [&>li]:text-[var(--color-text-secondary)]
            [&>blockquote]:border-l-2 [&>blockquote]:border-[var(--color-border)] [&>blockquote]:pl-5 [&>blockquote]:my-6 [&>blockquote]:text-[var(--color-text-secondary)] [&>blockquote]:italic
            [&>pre]:bg-[var(--color-code-bg)] [&>pre]:text-[var(--color-code-text)] [&>pre]:px-5 [&>pre]:py-4 [&>pre]:my-6 [&>pre]:overflow-x-auto [&>pre]:font-mono [&>pre]:text-sm
            [&>code]:bg-[var(--color-bg-alt)] [&>code]:px-1.5 [&>code]:py-0.5 [&>code]:text-sm [&>code]:font-mono
            [&>a]:text-[var(--color-text)] [&>a]:underline [&>a]:underline-offset-4 [&>a]:decoration-[var(--color-border)] [&>a]:hover:decoration-[var(--color-text-secondary)] [&>a]:transition-colors
            [&>hr]:border-[var(--color-border)] [&>hr]:my-10
            [&>img]:my-8 [&>img]:w-full
          "
        >
          {children}
        </div>

        {/* CTA */}
        <section className="mt-16 border border-[var(--color-border)] bg-[var(--color-bg-alt)] p-8 sm:p-10">
          <div className="flex flex-col items-center text-center">
            <Image
              src="/logo.png"
              alt="EasyClaw"
              width={40}
              height={40}
              className="mb-5"
            />
            <h2
              className="text-2xl sm:text-3xl italic tracking-tight mb-2"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Get started with EasyClaw
            </h2>
            <p className="text-sm text-[var(--color-text-secondary)] mb-6 max-w-md">
              One command to install OpenClaw, ClawdBot, and MoltBot on your machine.
            </p>
            <div className="relative group w-full max-w-xl">
              <div className="relative bg-[var(--color-code-bg)] border border-white/10 font-mono text-[var(--color-code-text)] px-5 py-4 text-sm">
                <span className="text-[var(--color-text-tertiary)] select-none">
                  ${" "}
                </span>
                <span className="select-all">{INSTALL_CMD}</span>
                <CopyButton text={INSTALL_CMD} />
              </div>
            </div>
            <Link
              href="/"
              className="mt-6 text-xs font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors underline underline-offset-4 decoration-[var(--color-border)]"
            >
              Back to homepage
            </Link>
          </div>
        </section>
      </article>

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
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-[var(--color-text-tertiary)] hover:text-[var(--color-text-secondary)] transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
