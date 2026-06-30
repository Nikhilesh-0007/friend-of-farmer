'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Leaf, Heart, Sprout } from 'lucide-react';
import PageWrapper from '@/components/layout/PageWrapper';
import { Button } from '@/components/ui/button';

export default function AboutPage() {
  return (
    <PageWrapper>
      {/* Hero Banner */}
      <section className="relative py-24 bg-[#1B4332] text-white overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />
        <div className="container relative z-10 mx-auto px-4 text-center max-w-3xl">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-6">Our Story</h1>
          <p className="text-lg md:text-xl text-white/80 leading-relaxed">
            Connecting local farmers to Bengaluru homes. We believe in fresh, healthy, and affordable vegetables for everyone.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
            <div className="w-full md:w-1/2">
              <div className="relative aspect-square md:aspect-[4/3] rounded-3xl overflow-hidden shadow-lg border border-border">
                <img 
                  src="https://images.unsplash.com/photo-1595856402179-88062886f67f?q=80&w=1471&auto=format&fit=crop" 
                  alt="Farmer harvesting" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="w-full md:w-1/2 space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-2">
                <Sprout className="h-4 w-4" />
                <span className="text-sm font-medium">How it started</span>
              </div>
              <h2 className="font-heading text-3xl md:text-4xl font-bold">Bringing the Farm to Your Table</h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Friends of Farmer started with a simple idea: to provide fresh, wholesale-priced vegetables directly to families in Bengaluru. By cutting out the middleman, we ensure that you get the freshest produce while supporting local agricultural communities.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Every morning, our team handpicks the best vegetables from local wholesale markets and delivers them to your doorstep with care.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Our Values</h2>
            <p className="text-muted-foreground text-lg">The principles that guide everything we do.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Leaf, title: 'Freshness First', desc: 'Sourced daily to ensure maximum nutrition and taste.' },
              { icon: Heart, title: 'Customer Health', desc: '100% natural and safe produce for your family.' },
              { icon: Sprout, title: 'Sustainable', desc: 'Supporting local ecosystems and farming communities.' }
            ].map((value, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl shadow-sm text-center border border-border hover:shadow-md transition-shadow">
                <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-6">
                  <value.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-heading text-xl font-bold mb-3">{value.title}</h3>
                <p className="text-muted-foreground">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary text-white text-center">
        <div className="container mx-auto px-4 max-w-2xl">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">Taste the Difference</h2>
          <p className="text-white/90 text-lg mb-8">
            Experience the freshest vegetables in Bengaluru today. Free delivery on your first order.
          </p>
          <Link href="/products">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90 rounded-full px-8 h-14 text-lg font-semibold">
              Shop Fresh Vegetables
            </Button>
          </Link>
        </div>
      </section>
    </PageWrapper>
  );
}
