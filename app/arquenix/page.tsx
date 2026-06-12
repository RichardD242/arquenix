'use client';

import React, { useEffect, useState } from 'react';

const nav_links = [
  { href: "/arquenix", label: "arquenix" },
  { href: "/dashboard", label: "dashboard" },
  { href: "/analytics", label: "analytics" },
  { href: "/docs", label: "docs" },
  { href: "/github", label: "github" },
];

const products = [
  { id:'p1', name: 'tshirt', price: 299, category: 'clothing'},
  { id:'p2', name: 'hoodie', price: 499, category: 'clothing'},
  { id:'p3', name: 'cap', price: 199, category: 'clothing'},
  { id:'p4', name: 'socks', price: 99, category: 'clothing'},
];

function FloatingNav({ cartCount }: { cartCount: number }) {
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

        <div className="ml-2 rounded-full bg-white px-4 py-1.5 text-[13px] font-medium text-black transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:scale-[1.04] active:scale-[0.97]">
          basket ({cartCount})
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
    <footer className="border-t border-white/[0.06] px-6 py-8 mt-20" >
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

interface CartItem {
  id:string;
  name:string;
  price:number;
  quantity:number;
}

export default function SubPage() {
  const [basket, setBasket] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedBasket = localStorage.getItem('arquenix_basket');
    if (savedBasket) {
      try {
        setBasket(JSON.parse(savedBasket));
      } catch (e) {
        console.error("error basket", e);
      }
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('arquenix_basket', JSON.stringify(basket));
    }
  }, [basket, isLoaded]);

  const addToBasket = (product: typeof products[0]) => {
    setBasket((prevBasket) => {
      const existingItem = prevBasket.find(item => item.id === product.id);
      if (existingItem) {
        return prevBasket.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevBasket, { id: product.id, name: product.name, price: product.price, quantity: 1 }];
    });
  };

  const removeFromBasket = (id: string) => {
    setBasket((prevBasket) => prevBasket.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setBasket((prevBasket) =>
      prevBasket.map(item => {
        if (item.id === id) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : item;
        }
        return item;
      })
    );
  };

  const totalItemCount = basket.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = basket.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <div className="flex min-h-screen flex-col bg-[#0a0a0c] text-white antialiased selection:bg-white selection:text-black">
      <FloatingNav cartCount={totalItemCount} />
      
      <main className="flex flex-1 flex-col items-center justify-start px-6 pt-32 max-w-6xl mx-auto w-full">
        {/* Header Block */}
        <div className="text-center mb-16">
          <h1 className="text-balance text-5xl font-semibold leading-[1.05] tracking-[-0.03em] text-white sm:text-6xl md:text-7xl lowercase drop-shadow-[0_0_40px_rgba(255,255,255,0.2)]">
            arquenix shop
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-balance text-lg leading-relaxed text-white/50">
            simple preview shop; after adding things to basket go to dashboard
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 w-full items-start text-left">
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {products.map((product) => (
              <div 
                key={product.id}
                className="bg-[#101013] border border-white/[0.06] rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 hover:border-white/20"
              >
                <div>
                  <span className="text-[11px] text-white/35 uppercase tracking-wider font-mono">{product.category}</span>
                  <h3 className="text-xl font-medium tracking-tight mt-1 text-white/90">{product.name}</h3>
                </div>
                <div className="flex items-center justify-between mt-8">
                  <span className="text-lg font-semibold text-white">{product.price}€</span>
                  <button
                    onClick={() => addToBasket(product)}
                    className="rounded-full bg-white/[0.06] border border-white/[0.08] px-4 py-1.5 text-[13px] font-medium text-white transition-all duration-200 hover:bg-white hover:text-black"
                  >
                    add to basket
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-[#101013] border border-white/[0.06] rounded-2xl p-6 sticky top-28">
            <h2 className="text-xl font-semibold tracking-tight mb-4">your basket</h2>
            
            {basket.length === 0 ? (
              <p className="text-[13px] text-white/35 py-12 text-center border border-solid border-white/[0.06] rounded-xl">
                your basket is empty
              </p>
            ) : (
              <div className="space-y-4">
                <div className="max-h-[280px] overflow-y-auto space-y-3 pr-1">
                  {basket.map((item) => (
                    <div key={item.id} className="flex items-center justify-between border-b border-white/[0.04] pb-3">
                      <div>
                        <h4 className="text-[14px] font-medium text-white/80">{item.name}</h4>
                        <span className="text-[12px] text-white/45">{item.price}€</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1 bg-white/[0.04] rounded-full p-0.5 border border-white/[0.04]">
                          <button 
                            onClick={() => updateQuantity(item.id, -1)}
                            className="w-5 h-5 flex items-center justify-center text-xs text-white/50 hover:text-white"
                          >
                            -
                          </button>
                          <span className="text-xs px-1 font-mono">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, 1)}
                            className="w-5 h-5 flex items-center justify-center text-xs text-white/50 hover:text-white"
                          >
                            +
                          </button>
                        </div>
                        <button 
                          onClick={() => removeFromBasket(item.id)}
                          className="text-[11px] text-white/45 hover:text-white transition-colors"
                        >
                          remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-white/[0.08] pt-4 mt-2 space-y-2">
                  <div className="flex justify-between text-[13px]">
                    <span className="text-white/45">items count:</span>
                    <span className="font-mono">{totalItemCount}</span>
                  </div>
                  <div className="flex justify-between text-base font-medium">
                    <span>total balance:</span>
                    <span className="font-mono text-white">{totalPrice}€</span>
                  </div>
                </div>

                <button 
                  onClick={() => alert('checkout sequence initiated')}
                  className="w-full mt-2 rounded-xl bg-white py-2 text-[13px] font-semibold text-black text-center transition-transform active:scale-[0.98]"
                >
                  checkout
                </button>
              </div>
            )}
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}