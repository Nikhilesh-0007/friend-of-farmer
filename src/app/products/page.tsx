'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, LayoutGrid, List, SlidersHorizontal, ArrowDownUp } from 'lucide-react';
import PageWrapper from '@/components/layout/PageWrapper';
import { vegetables } from '@/data/vegetables';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import ProductCard from '@/components/ui/ProductCard';
import gsap from 'gsap';
import { cn } from '@/lib/utils';

const categories = ['All', 'Root Vegetables', 'Leafy Vegetables', 'Gourds', 'Exotic Vegetables'];

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const gridRef = useRef<HTMLDivElement>(null);

  const filteredProducts = vegetables
    .filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
      if (sortBy === 'name-desc') return b.name.localeCompare(a.name);
      return 0; // featured/default
    });

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    if (gridRef.current && filteredProducts.length > 0) {
      const cards = gridRef.current.children;
      gsap.fromTo(cards, 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.05, ease: 'power2.out', clearProps: 'all' }
      );
    }
  }, [activeCategory, searchTerm, sortBy, viewMode]);

  return (
    <PageWrapper>
      {/* Hero Section */}
      <div className="relative pt-40 pb-28 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1608686207856-001b95cf60ca?q=80&w=1920&auto=format&fit=crop"
            alt="Fresh Organic Vegetables Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-white drop-shadow-md">
            Farm Fresh <span className="text-primary drop-shadow-lg">Produce</span>
          </h1>
          <p className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed text-balance drop-shadow">
            Browse our hand-picked selection of organic vegetables. Sourced directly from local farmers and delivered to your doorstep within 24 hours.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Sticky Filters and Search */}
        <div className="sticky top-20 md:top-24 z-40 glass -mx-4 px-4 py-5 md:mx-0 md:rounded-3xl mb-10 flex flex-col gap-5 shadow-sm border border-white/20">
          {/* Top Row: Categories & Search */}
          <div className="flex flex-col lg:flex-row gap-5 justify-between items-start lg:items-center w-full">
            <div className="flex flex-wrap gap-2 justify-start flex-1">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={cn(
                    "px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300",
                    activeCategory === category
                      ? "bg-primary text-white shadow-md shadow-primary/20 scale-105"
                      : "bg-white/60 text-muted-foreground hover:bg-white hover:text-foreground hover:shadow-sm border border-transparent hover:border-border"
                  )}
                >
                  {category}
                </button>
              ))}
            </div>
            
            <div className="relative w-full lg:w-96 shrink-0">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search vegetables..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-12 rounded-full bg-white border-border shadow-sm focus-visible:ring-primary/50 text-base"
              />
            </div>
          </div>

          {/* Bottom Row: Sort & View Toggles */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-center w-full pt-5 border-t border-border/40">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <span className="text-sm font-medium text-muted-foreground flex items-center gap-2 whitespace-nowrap">
                <ArrowDownUp className="h-4 w-4" /> Sort By:
              </span>
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="h-11 w-full sm:w-auto rounded-full border border-border bg-white pl-4 pr-10 py-2 text-sm font-medium text-foreground hover:border-primary/50 hover:shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer shadow-sm appearance-none"
                style={{ 
                  backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%232E7D32' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`, 
                  backgroundRepeat: 'no-repeat', 
                  backgroundPosition: 'right 1rem center', 
                  backgroundSize: '1em' 
                }}
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name-asc">Name: A to Z</option>
                <option value="name-desc">Name: Z to A</option>
              </select>
            </div>

            <div className="flex items-center justify-center gap-2 bg-white/60 p-1.5 rounded-full border border-border shadow-sm">
              <button
                onClick={() => setViewMode('grid')}
                className={cn(
                  "p-2 rounded-full transition-all duration-300 flex items-center justify-center",
                  viewMode === 'grid' ? "bg-white shadow-sm text-primary scale-105" : "text-muted-foreground hover:text-foreground"
                )}
                title="Grid View"
              >
                <LayoutGrid className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={cn(
                  "p-2 rounded-full transition-all duration-300 flex items-center justify-center",
                  viewMode === 'list' ? "bg-white shadow-sm text-primary scale-105" : "text-muted-foreground hover:text-foreground"
                )}
                title="List View"
              >
                <List className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div 
            ref={gridRef} 
            className={cn(
              viewMode === 'grid' 
                ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8" 
                : "flex flex-col max-w-4xl mx-auto gap-6"
            )}
          >
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} isListView={viewMode === 'list'} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-white/50 backdrop-blur-sm rounded-3xl border border-white">
            <div className="bg-primary/10 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="h-10 w-10 text-primary" />
            </div>
            <h3 className="font-heading text-3xl font-bold mb-3 text-foreground">No products found</h3>
            <p className="text-muted-foreground text-lg mb-8">We couldn&apos;t find anything matching your search.</p>
            <Button 
              size="lg"
              className="rounded-full px-8 h-12 shadow-lg shadow-primary/20"
              onClick={() => { setSearchTerm(''); setActiveCategory('All'); setSortBy('featured'); }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </PageWrapper>
  );
}
