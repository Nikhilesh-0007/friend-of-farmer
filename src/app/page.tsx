'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Leaf, ShieldCheck, Truck, Clock, Star, Camera, Coins, Heart, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PageWrapper from '@/components/layout/PageWrapper';
import { vegetables } from '@/data/vegetables';
import ProductCard from '@/components/ui/ProductCard';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const featuredVegetables = vegetables.slice(0, 4);
  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Animations
      gsap.from('.hero-badge', { y: 20, opacity: 0, duration: 0.6, delay: 0.2 });
      gsap.from('.hero-title', { y: 30, opacity: 0, duration: 0.8, delay: 0.3 });
      gsap.from('.hero-desc', { y: 20, opacity: 0, duration: 0.6, delay: 0.5 });
      gsap.from('.hero-cta', { y: 20, opacity: 0, duration: 0.6, delay: 0.7, stagger: 0.1 });
      
      // Features Scroll Trigger
      if (featuresRef.current) {
        gsap.from('.feature-card', {
          scrollTrigger: {
            trigger: featuresRef.current,
            start: 'top 80%',
          },
          y: 40,
          opacity: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power2.out',
        });
      }

      // Timeline Scroll Trigger
      if (timelineRef.current) {
        gsap.from('.timeline-step', {
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top 75%',
          },
          x: -30,
          opacity: 0,
          duration: 0.5,
          stagger: 0.2,
          ease: 'power2.out',
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <PageWrapper>
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-32 pb-24">
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1974&auto=format&fit=crop"
            alt="Farm Fresh Vegetables"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-black/65" />
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background/40 to-transparent pointer-events-none" />
        </div>

        <div className="container relative z-20 mx-auto px-4 text-center mt-8">
          <div className="hero-badge inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-dark text-white mb-8 border border-white/10 shadow-sm">
            <Leaf className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium tracking-wide uppercase">100% Organic Farmers Market</span>
          </div>
          <h1 className="hero-title font-heading text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 max-w-5xl mx-auto leading-tight text-balance drop-shadow-lg">
            Fresh harvest, <br className="hidden md:block" /> straight to your <span className="text-primary drop-shadow-xl">kitchen.</span>
          </h1>
          <p className="hero-desc text-lg md:text-xl lg:text-2xl text-white/90 mb-12 max-w-2xl mx-auto text-balance font-medium drop-shadow-md">
            Hand-picked daily in Bengaluru. Experience the true taste of nature with free next-day delivery.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <Link href="/products" className="hero-cta w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white rounded-full px-12 h-16 text-lg shadow-xl shadow-primary/30 transition-transform hover:scale-105 active:scale-95 border-none">
                Shop Fresh Produce <ArrowRight className="ml-2 h-6 w-6" />
              </Button>
            </Link>
            <Link href="/about" className="hero-cta w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full sm:w-auto bg-black/20 hover:bg-black/40 text-white border-white/30 rounded-full px-12 h-16 text-lg backdrop-blur-md shadow-lg transition-transform hover:scale-105 active:scale-95">
                Our Farm Story
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section ref={featuresRef} className="py-24 bg-background relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl font-bold mb-4">Why Friends of Farmer?</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">We cut out the middlemen so you get fresher vegetables while supporting local farmers directly.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Leaf, title: 'Farm Fresh', desc: 'Fresh vegetables sourced daily directly from farms.' },
              { icon: Truck, title: 'Free Home Delivery', desc: 'Fast doorstep delivery across Bengaluru on all orders.' },
              { icon: Coins, title: 'Wholesale Prices', desc: 'Affordable pricing without middlemen or markups.' },
              { icon: ShieldCheck, title: 'Quality Assured', desc: 'Every vegetable is carefully inspected for quality.' },
              { icon: Heart, title: 'Support Local Farmers', desc: 'Helping local farmers grow and thrive sustainably.' },
              { icon: Smartphone, title: 'Easy WhatsApp Ordering', desc: 'Quick and seamless ordering in just a few taps.' },
            ].map((feature, i) => (
              <div key={i} className="feature-card flex flex-col items-center text-center p-10 h-full rounded-3xl bg-card shadow-sm border border-border hover:shadow-xl transition-all duration-500 hover:-translate-y-2 group">
                <div className="h-20 w-20 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-500">
                  <feature.icon className="h-10 w-10 text-primary" />
                </div>
                <h3 className="font-heading text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-muted-foreground text-[15px] leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <h2 className="font-heading text-4xl font-bold mb-4">Best Sellers</h2>
              <p className="text-muted-foreground text-lg">Our most loved vegetables this season.</p>
            </div>
            <Link href="/products">
              <Button variant="outline" className="rounded-full px-6 bg-white hover:text-primary">
                View All Products <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredVegetables.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* How it Works Timeline */}
      <section ref={timelineRef} className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 leaf-pattern opacity-30" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <h2 className="font-heading text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground text-lg">From our farms to your plate in 4 simple steps.</p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            {[
              { num: '01', title: 'You Place an Order', desc: 'Browse our catalog and order easily via WhatsApp or website.' },
              { num: '02', title: 'We Harvest', desc: 'Farmers harvest your vegetables fresh early in the morning.' },
              { num: '03', title: 'Quality Check', desc: 'We clean, sort, and carefully pack your order.' },
              { num: '04', title: 'Doorstep Delivery', desc: 'Your fresh produce arrives at your home exactly when needed.' },
            ].map((step, i) => (
              <div key={i} className="timeline-step flex items-start gap-6 mb-12 last:mb-0 relative">
                {i !== 3 && <div className="absolute left-6 top-16 bottom-[-3rem] w-px bg-border hidden md:block" />}
                <div className="shrink-0 w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xl relative z-10 shadow-lg shadow-primary/20">
                  {step.num}
                </div>
                <div className="pt-2">
                  <h3 className="font-heading text-2xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground text-lg">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-primary text-primary-foreground text-center">
        <div className="container mx-auto px-4 max-w-4xl">
          <Star className="h-12 w-12 mx-auto mb-8 text-accent fill-accent" />
          <h2 className="font-heading text-3xl md:text-5xl font-bold mb-10 leading-tight text-balance">
            &quot;The vegetables are incredibly fresh, and the delivery is always on time. Friends of Farmer has completely changed how I shop for groceries!&quot;
          </h2>
          <div className="flex items-center justify-center gap-4">
            <div className="w-14 h-14 rounded-full bg-white/20 overflow-hidden">
              <Image src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80" alt="Customer" width={56} height={56} className="object-cover" />
            </div>
            <div className="text-left">
              <p className="font-semibold text-lg">Priya Sharma</p>
              <p className="text-primary-foreground/70 text-sm">Indiranagar, Bengaluru</p>
            </div>
          </div>
        </div>
      </section>

      {/* Instagram Gallery */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center mb-12">
            <Camera className="h-10 w-10 text-primary mb-4" />
            <h2 className="font-heading text-4xl font-bold mb-4">Join our Community</h2>
            <p className="text-muted-foreground text-lg">Follow us on Instagram @friendsoffarmer for daily fresh updates.</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=500&q=80',
              'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=500&q=80',
              'https://images.unsplash.com/photo-1557844352-761f2565b576?w=500&q=80',
              'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=500&q=80'
            ].map((img, i) => (
              <div key={i} className="relative aspect-square rounded-2xl overflow-hidden group cursor-pointer">
                <Image src={img} alt="Instagram post" fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Camera className="text-white h-8 w-8" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
