'use client';

import React, { useEffect, useRef, useState } from 'react';

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

function Hero() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const onMouseMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty('--spot-x', `${e.clientX - r.left}px`);
      el.style.setProperty('--spot-y', `${e.clientY - r.top}px`);
    };

    el.addEventListener('mousemove', onMouseMove);
    return () => el.removeEventListener('mousemove', onMouseMove);
  }, []);

  return (
    <main
      ref={ref}
      className="relative flex flex-1 flex-col items-center justify-center overflow-hidden px-6 text-center"
      style={{
        background:
          'radial-gradient(560px circle at var(--spot-x, 50%) var(--spot-y, 35%), rgba(255,255,255,0.05), transparent 70%)',
      }}
    >

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center select-none"
      >
        <img
          src="/arquenix-logo-trans.png"
          alt=""
          className="w-[650px] h-auto opacity-10 blur-md select-none"
        />
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.35] z-10"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
          backgroundSize: '88px 88px',
          maskImage: 'radial-gradient(ellipse 70% 60% at 50% 45%, black, transparent)',
        }}
      />

      <div className="relative max-w-3xl space-y-7 animate-rise z-20">
        <p className="text-[13px] font-medium lowercase tracking-[0.22em] text-white/40">
          cold , clean , calculated 
        </p>

        <h1 className="text-balance text-5xl font-semibold leading-[1.05] tracking-[-0.03em] text-white sm:text-6xl md:text-7xl">
          introducing {''}
          <span className="bg-gradient-to-b from-white to-white/55 bg-clip-text text-transparent">
            arquenix
          </span>
        </h1>

        <p className="mx-auto max-w-xl text-balance text-lg leading-relaxed text-white/50">
          full-stack e-commerce and financial platform
        </p>

        <div className="flex items-center justify-center gap-3 pt-2">
          <a
            href="/dashboard"
            className="rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:scale-[1.03] active:scale-[0.97] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/60"
          >
            open dashboard
          </a>

          <a
            href="/docs"
            className="rounded-full border border-white/[0.12] px-6 py-3 text-sm font-medium text-white/70 transition-colors duration-200 hover:border-white/25 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/60"
          >
            read docs
          </a>
        </div>
      </div>
    </main>
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
            { href: "/source", label: "source" },
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

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#0a0a0c] text-white antialiased selection:bg-white selection:text-black">
      <FloatingNav />
      <Hero />
      <Footer />
    </div>
  );
}