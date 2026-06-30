'use client';

import Link from 'next/link';
import { ArrowRight, Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PageWrapper from '@/components/layout/PageWrapper';

export default function NotFound() {
  return (
    <PageWrapper>
      <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4 relative overflow-hidden bg-background">
        <div className="absolute inset-0 leaf-pattern opacity-30" />
        
        <div className="relative z-10 space-y-8 max-w-2xl mx-auto">
          <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Leaf className="h-12 w-12 text-primary" />
          </div>
          
          <h1 className="font-heading text-6xl md:text-8xl font-bold text-foreground">404</h1>
          <h2 className="font-heading text-2xl md:text-3xl font-semibold text-foreground/80">Oops! We couldn&apos;t find that leaf.</h2>
          
          <p className="text-muted-foreground text-lg text-balance leading-relaxed">
            It looks like the page you are looking for has been harvested or moved. Don&apos;t worry, there&apos;s plenty of fresh produce waiting for you back home.
          </p>
          
          <div className="pt-8">
            <Link href="/">
              <Button size="lg" className="rounded-full px-10 h-14 text-lg shadow-xl shadow-primary/20 hover:scale-105 transition-transform">
                Back to Home <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
