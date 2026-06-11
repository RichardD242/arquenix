import React from 'react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">

      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold tracking-tight">Arquenix</span>

          </div>

          <nav className="flex items-center space-x-6 text-sm font-medium">
            <a href="/dashboard" className="transition-colors hover:text-foreground/80 text-foreground">dashboard</a>
            <a href="/analytics" className="transition-colors hover:text-foreground/80 text-foreground">analytics</a>
            <a href="/docs" className="transition-colors hover:text-foreground/80 text-foreground">docs</a>
            <a href="/github" className="transition-colors hover:text-foreground/80 text-foreground">github</a>
          </nav>

          <div className="flex items-center space-x-4">
            <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2">
              admin
            </button>
            
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-12 flex flex-col items-center justify-center text-center">
        <div className="max-w-2xl space-y-4">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
            welcome to <span className="text-primary">arquenix</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            full-stack e-commerce and financial platform
          </p>
        </div>
      </main>

      <footer className="border-t py-6 md:px-8 md:py-0">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row px-4">
          <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
            © 2026 Arquenix made by richardd242
          </p>
          <nav className="flex items-center space-x-4">
            <a href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">about</a>
            <a href="/docs" className="text-sm text-muted-foreground hover:text-foreground transition-colors">docs</a>
            <a href="/source" className="text-sm text-muted-foreground hover:text-foreground transition-colors">source</a>
          </nav>
        </div>
      </footer>
    </div>
  );
}