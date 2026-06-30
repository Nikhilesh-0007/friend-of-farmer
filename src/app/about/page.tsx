'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import PageWrapper from '@/components/layout/PageWrapper';
import { Leaf, Heart, ShieldCheck, Users, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function AboutPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero
      gsap.from('.about-hero-title', { y: 30, opacity: 0, duration: 0.8, ease: 'power3.out' });
      gsap.from('.about-hero-desc', { y: 20, opacity: 0, duration: 0.8, delay: 0.2, ease: 'power3.out' });

      // Story
      if (storyRef.current) {
        gsap.from('.story-image', {
          scrollTrigger: { trigger: storyRef.current, start: 'top 75%' },
          x: -50, opacity: 0, duration: 0.8
        });
        gsap.from('.story-text', {
          scrollTrigger: { trigger: storyRef.current, start: 'top 75%' },
          x: 50, opacity: 0, duration: 0.8, delay: 0.2
        });
      }

      // Stats
      if (statsRef.current) {
        gsap.from('.stat-card', {
          scrollTrigger: { trigger: statsRef.current, start: 'top 80%' },
          y: 40, opacity: 0, duration: 0.6, stagger: 0.15
        });
      }

      // Values
      if (valuesRef.current) {
        gsap.from('.value-card', {
          scrollTrigger: { trigger: valuesRef.current, start: 'top 80%' },
          scale: 0.9, opacity: 0, duration: 0.5, stagger: 0.1
        });
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <PageWrapper>
      {/* Hero Section */}
      <section ref={heroRef} className="relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden bg-primary/5">
        <div className="absolute inset-0 leaf-pattern opacity-40" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="about-hero-title font-heading text-5xl md:text-7xl font-bold mb-6 text-foreground">
            Our <span className="text-primary">Roots</span>
          </h1>
          <p className="about-hero-desc text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed text-balance">
            We started with a simple belief: everyone deserves access to fresh, healthy, chemical-free food, and every farmer deserves a fair price for their hard work.
          </p>
        </div>
      </section>

      {/* The Story */}
      <section ref={storyRef} className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="story-image w-full lg:w-1/2 relative aspect-square md:aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
              <Image 
                src="https://images.unsplash.com/photo-1595841696677-6489ff3f8cd1?q=80&w=1000&auto=format&fit=crop" 
                alt="Farmer in a field" 
                fill 
                className="object-cover" 
              />
              <div className="absolute inset-0 bg-primary/10 mix-blend-overlay" />
            </div>
            
            <div className="story-text w-full lg:w-1/2 space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm">
                <Leaf className="h-4 w-4" /> Our Journey
              </div>
              <h2 className="font-heading text-4xl md:text-5xl font-bold leading-tight">
                Bridging the gap between farm and table.
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Friends of Farmer was born out of a desire to eliminate the complex supply chains that degrade vegetable quality and exploit farmers. We realized that by the time a vegetable reaches a city supermarket, it&apos;s often days old and has passed through multiple middlemen.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Today, we work directly with over 50 local farmers across Karnataka. We harvest early in the morning, sort with care, and deliver straight to your kitchen by afternoon. No warehouses. No middlemen. Just pure, farm-fresh goodness.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section ref={statsRef} className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center">
            {[
              { num: '50+', label: 'Local Farmers' },
              { num: '10k+', label: 'Happy Families' },
              { num: '24h', label: 'Farm to Table' },
              { num: '100%', label: 'Organic Promise' },
            ].map((stat, i) => (
              <div key={i} className="stat-card space-y-2">
                <h3 className="font-heading text-5xl md:text-6xl font-bold text-white drop-shadow-sm">{stat.num}</h3>
                <p className="text-primary-foreground/80 font-medium text-lg">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section ref={valuesRef} className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl font-bold mb-4">Our Core Values</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">The principles that guide every seed we plant and every box we deliver.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Heart, title: 'Community First', desc: 'We build lasting relationships with our farmers, ensuring they receive fair compensation and support.' },
              { icon: ShieldCheck, title: 'Uncompromising Quality', desc: 'If we wouldn\'t feed it to our own families, we won\'t deliver it to yours. Quality is our obsession.' },
              { icon: Users, title: 'Customer Delight', desc: 'From the ease of ordering to the unboxing experience, we strive to bring joy to your kitchen.' },
            ].map((val, i) => (
              <div key={i} className="value-card bg-white p-10 rounded-3xl shadow-sm border border-border text-center hover:shadow-xl transition-shadow duration-300">
                <div className="w-16 h-16 mx-auto bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-6">
                  <val.icon className="h-8 w-8" />
                </div>
                <h3 className="font-heading text-2xl font-semibold mb-4">{val.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-background relative overflow-hidden text-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl z-0" />
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6">Ready to taste the difference?</h2>
          <p className="text-muted-foreground text-xl mb-10 max-w-2xl mx-auto">Join thousands of families in Bengaluru who have made the switch to farm-fresh organic vegetables.</p>
          <Link href="/products">
            <Button size="lg" className="rounded-full px-12 h-14 text-lg shadow-xl shadow-primary/20 hover:scale-105 transition-transform">
              Start Shopping <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </PageWrapper>
  );
}
