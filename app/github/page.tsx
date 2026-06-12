'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { TopographicBackground } from '../components/TopographicBackground';

const nav_links = [
  { href: "/arquenix", label: "arquenix" },
  { href: "/dashboard", label: "dashboard" },
  { href: "/analytics", label: "analytics" },
  { href: "/docs", label: "docs" },
  { href: "/github", label: "github" },
];

function FloatingNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, {passive: true});
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4 pointer-events-none">
      <nav
        aria-label="Main"
        className={[
          'pointer-events-auto flex items-center gap-1 rounded-full border border-white/[0.08]',
          'bg-[#101013]/70 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.06)]',
          'transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]',
          'hover:scale-[1.015]',
          scrolled ? 'px-3 py-1.5 scale-[0.97]' : 'px-4 py-2.5',
        ].join(' ')}
      >
        <a
          href="/"
          className="mr-2 px-2 text-sm font-semibold tracking-tight text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/60 rounded-full"
        >
          home
        </a>

        <div className="hidden md:flex items-center">
          {nav_links.map((link) => ( 
            <a
              key={link.href}
              href={link.href}
              className="rounded-full px-3 py-1.5 text-[13px] text-white/55 transition-colors duration-200 hover:text-white hover:bg-white/[0.06] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/60"
            >
              {link.label}
            </a>
          ))}
        </div>

        <a
          href="/admin"
          className="ml-2 rounded-full bg-white px-4 py-1.5 text-[13px] font-medium text-black transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:scale-[1.04] active:scale-[0.97] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/60"
        >
          admin
        </a>
      </nav>
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/[0.06] px-6 py-8" >
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 md:flex-row" >
        <p className="text-[13px] text-white/35">
          © 2026 Arquenix made by richardd242
        </p>
        <nav aria-label="Footer" className="flex items-center gap-6" >
          {[
            { href: "/about", label: "about" },
            { href: "/docs", label: "docs" },
            { href: "/github", label: "github" },
          ].map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[13px] text-white/35 transition-colors duration-200 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/60"
            >
              {l.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}

export default function SubPage() {
  return (
    <div className="relative isolate flex min-h-screen flex-col bg-[#0a0a0c] text-white antialiased selection:bg-white selection:text-black">
      <TopographicBackground />

      <FloatingNav />
      
      <main className="flex flex-1 flex-col items-center justify-center px-6 text-center">
        <a
            href="https://github.com/richardd242/arquenix"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex flex-col items-center gap-6 rounded-3xl border border-white/[0.06] bg-white/[0.02] p-12 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:border-white/[0.15] hover:bg-white/[0.04] hover:scale-[1.02] shadow-[0_0_50px_rgba(0,0,0,0.5)]"
        >
        
            <div className="absolute inset-0 -z-10 rounded-3xl bg-white/[0.02] opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />

            <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-white/[0.08] bg-[#101013] text-white/70 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-110 group-hover:bg-white group-hover:border-white/[0.2] group-hover:shadow-[0_0_30px_rgba(255,255,255,0.05)]">
                <Image
                    src="/github.svg"
                    alt="GitHub Logo"
                    width={40}
                    height={40}

                />
            </div>

            <div>
                <h1 className="text-balance text-4xl font-semibold leading-[1.05] tracking-[-0.03em] text-white sm:text-4xl md:text-7xl lowercase">
                github
                </h1>
                <p className="mx-auto mt-4 max-w-xl text-balance text-lg leading-relaxed text-white/50">
                source code for this project
                </p>
            </div>
        </a>
      </main>
      <Footer />
    </div>
  );
}