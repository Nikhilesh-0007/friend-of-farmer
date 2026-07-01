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

const categories = ['All', 'Root Vegetables', 'Leafy Vegetables', 'Gourds', 'Exotic Vegetables', 'Seasonal Vegetables'];

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
      <div className="bg-primary/5 pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 leaf-pattern opacity-50" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="font-heading text-5xl md:text-6xl font-bold mb-6 text-foreground">
            Farm Fresh <span className="text-primary">Produce</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed text-balance">
            Browse our hand-picked selection of organic vegetables. Sourced directly from local farmers and delivered to your doorstep within 24 hours.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Sticky Filters and Search */}
        <div className="sticky top-20 md:top-24 z-40 glass -mx-4 px-4 py-4 md:mx-0 md:rounded-3xl mb-8 flex flex-col gap-4 shadow-sm border border-border">
          {/* Top Row: Categories & Search */}
          <div className="flex flex-col lg:flex-row gap-4 justify-between items-center w-full">
            <div className="flex flex-wrap gap-2 justify-center lg:justify-start flex-1">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300",
                    activeCategory === category
                      ? "bg-primary text-white shadow-md shadow-primary/20 scale-105"
                      : "bg-white/50 text-muted-foreground hover:bg-white hover:text-foreground hover:shadow-sm"
                  )}
                >
                  {category}
                </button>
              ))}
            </div>
            
            <div className="relative w-full lg:w-80 shrink-0">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search vegetables..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-12 rounded-full bg-white/80 border-white shadow-sm focus-visible:ring-primary/50 text-base"
              />
            </div>
          </div>

          {/* Bottom Row: Sort & View Toggles */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-center w-full pt-4 border-t border-border/50">
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <ArrowDownUp className="h-4 w-4" /> Sort By:
              </span>
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="h-10 rounded-full border border-input bg-white px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 cursor-pointer shadow-sm"
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name-asc">Name: A to Z</option>
                <option value="name-desc">Name: Z to A</option>
              </select>
            </div>

            <div className="flex items-center gap-2 bg-white/50 p-1 rounded-full border border-border">
              <button
                onClick={() => setViewMode('grid')}
                className={cn(
                  "p-2 rounded-full transition-colors flex items-center justify-center",
                  viewMode === 'grid' ? "bg-white shadow-sm text-primary" : "text-muted-foreground hover:text-foreground"
                )}
                title="Grid View"
              >
                <LayoutGrid className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={cn(
                  "p-2 rounded-full transition-colors flex items-center justify-center",
                  viewMode === 'list' ? "bg-white shadow-sm text-primary" : "text-muted-foreground hover:text-foreground"
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
              "gap-8",
              viewMode === 'grid' 
                ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4" 
                : "flex flex-col max-w-4xl mx-auto space-y-4"
            )}
          >
            {filteredProducts.map((product) => (
              <div key={product.id} className={cn(viewMode === 'list' && "flex items-center")}>
                <ProductCard product={product} isListView={viewMode === 'list'} />
              </div>
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
