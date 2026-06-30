'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ShoppingCart, Menu, X, ChevronRight } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import gsap from 'gsap';
import { AnimatePresence, motion } from 'framer-motion';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  // Hydration safety for cart count
  const [mounted, setMounted] = useState(false);
  const cartItems = useCartStore((state) => state.items);
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (navRef.current) {
      const ctx = gsap.context(() => {
        gsap.from(navRef.current, { y: -100, opacity: 0, duration: 0.8, ease: "power3.out" });
        if (logoRef.current) {
          gsap.from(logoRef.current, { opacity: 0, x: -20, duration: 0.6, delay: 0.3 });
        }
        if (linksRef.current?.children) {
          gsap.from(linksRef.current.children, {
            opacity: 0,
            y: -10,
            duration: 0.5,
            stagger: 0.1,
            delay: 0.4
          });
        }
      });
      return () => ctx.revert();
    }
  }, []);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Products', href: '/products' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <>
      <header
        ref={navRef}
        className={cn(
          'fixed left-0 right-0 z-50 w-full transition-all duration-500 ease-in-out',
          isScrolled
            ? 'top-4 px-4 md:px-8'
            : 'top-0 px-0'
        )}
      >
        <div className={cn(
          "w-full mx-auto transition-all duration-500 ease-in-out border border-transparent",
          isScrolled 
            ? "glass shadow-[0_8px_30px_rgb(0,0,0,0.06)] border-white/20 rounded-full px-6 max-w-5xl" 
            : "bg-transparent py-4 px-4 md:px-6 max-w-7xl"
        )}>
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center group" onClick={() => setIsMobileMenuOpen(false)}>
              <div ref={logoRef} className="relative h-14 w-48 md:h-16 md:w-56 transition-transform duration-300 group-hover:scale-105">
                <Image src="/image1.png" alt="Friends of Farmer Logo" fill className="object-contain" priority />
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-10" ref={linksRef}>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'relative text-[15px] font-medium transition-colors hover:text-primary group py-2',
                    pathname === link.href ? 'text-primary font-semibold' : 'text-foreground/80'
                  )}
                >
                  {link.name}
                  <span 
                    className={cn(
                      'absolute bottom-0 left-0 w-full h-0.5 bg-primary transform origin-left transition-transform duration-300 ease-out',
                      pathname === link.href ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    )}
                  />
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-3 md:gap-5">
              <Link href="/cart">
                <Button variant="ghost" size="icon" className="relative hover:bg-primary/5 hover:text-primary rounded-full transition-transform hover:scale-110 active:scale-95">
                  <ShoppingCart className="h-[22px] w-[22px]" />
                  {mounted && cartCount > 0 && (
                    <Badge
                      className="absolute -top-1 -right-1 h-[22px] w-[22px] flex items-center justify-center p-0 bg-accent text-white border-2 border-background shadow-sm"
                    >
                      {cartCount}
                    </Badge>
                  )}
                </Button>
              </Link>

              <Button
                variant="ghost"
                size="icon"
                className="md:hidden relative z-50 rounded-full hover:bg-black/5"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-[80%] max-w-sm bg-background border-l border-border shadow-2xl z-50 md:hidden flex flex-col"
            >
              <div className="flex items-center justify-between p-6 border-b border-border">
                <div className="relative h-12 w-32">
                  <Image src="/image1.png" alt="Friends of Farmer" fill className="object-contain" />
                </div>
                <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                  <X className="h-6 w-6" />
                </Button>
              </div>
              <div className="flex-1 overflow-y-auto py-8 px-6 flex flex-col gap-6">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.1 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        'flex items-center justify-between text-lg font-medium p-4 rounded-2xl transition-all',
                        pathname === link.href
                          ? 'bg-primary/10 text-primary shadow-sm'
                          : 'text-foreground hover:bg-muted'
                      )}
                    >
                      {link.name}
                      <ChevronRight className={cn("h-5 w-5", pathname === link.href ? "text-primary" : "text-muted-foreground")} />
                    </Link>
                  </motion.div>
                ))}
              </div>
              <div className="p-6 border-t border-border bg-muted/30">
                <p className="text-sm text-center text-muted-foreground mb-4">Need help with an order?</p>
                <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button className="w-full rounded-xl bg-primary hover:bg-primary/90 text-white h-12 text-base shadow-lg shadow-primary/20 transition-transform active:scale-95">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
