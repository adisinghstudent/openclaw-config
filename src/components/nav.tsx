"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Nav() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[var(--color-bg)]/80 backdrop-blur-xl border-b border-[var(--color-border)]">
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <Image src="/logo.png" alt="EasyClaw" width={28} height={28} />
          <span className="text-sm font-semibold tracking-tight text-[var(--color-text)] group-hover:text-[var(--color-text-secondary)] transition-colors">
            easyclaw
          </span>
        </Link>

        <div className="flex items-center gap-6">
          <Link
            href="/#features"
            className="text-xs font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors"
          >
            Features
          </Link>
          <Link
            href="/#how"
            className="text-xs font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors"
          >
            How it works
          </Link>
          <Link
            href="/install"
            className={`text-xs font-medium px-3.5 py-1.5 transition-all ${
              pathname === "/install"
                ? "bg-[var(--color-accent)] text-[var(--color-bg)]"
                : "bg-[var(--color-accent)] text-[var(--color-bg)] hover:bg-[var(--color-accent-hover)]"
            }`}
          >
            Install
          </Link>
        </div>
      </div>
    </nav>
  );
}
