'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { Plus, Minus, ShoppingCart, Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/store/useCartStore';
import { Product } from '@/data/vegetables';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import gsap from 'gsap';

interface ProductCardProps {
  product: Product;
  isListView?: boolean;
}

export default function ProductCard({ product, isListView = false }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  const items = useCartStore((state) => state.items);
  const addItem = useCartStore((state) => state.addItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);

  const cartItem = items.find((item) => item.id === product.id);
  const quantity = cartItem?.quantity || 0;

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (cardRef.current) {
      gsap.to(cardRef.current, { y: -8, duration: 0.3, ease: 'power2.out' });
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (cardRef.current) {
      gsap.to(cardRef.current, { y: 0, duration: 0.3, ease: 'power2.out' });
    }
  };

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image,
    });
    toast.success(`${product.name} added to cart!`);
  };

  const handleIncrement = () => {
    updateQuantity(product.id, quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      updateQuantity(product.id, quantity - 1);
    } else {
      removeItem(product.id);
      toast.info(`${product.name} removed from cart.`);
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "group flex bg-white rounded-3xl overflow-hidden shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] transition-shadow duration-500 border border-border w-full",
        isListView ? "flex-col sm:flex-row sm:h-56" : "flex-col"
      )}
    >
      {/* Image Container */}
      <div className={cn(
        "relative overflow-hidden bg-muted/50 flex items-center justify-center shrink-0",
        isListView ? "aspect-square sm:aspect-auto sm:w-56 sm:h-56" : "aspect-square p-6"
      )}>
        <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
          <span className="inline-flex items-center gap-1 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-primary shadow-sm border border-white/40">
            <Leaf className="h-3 w-3" /> Fresh Today
          </span>
          {!product.inStock && (
            <span className="inline-flex items-center bg-destructive/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-white shadow-sm">
              Out of Stock
            </span>
          )}
        </div>
        
        <div className="absolute top-4 right-4 z-10">
          <span className="inline-flex items-center bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-sm font-bold text-foreground shadow-sm border border-white/40">
            ₹{product.price}<span className="text-muted-foreground text-xs font-normal ml-0.5">/{product.unit}</span>
          </span>
        </div>

        <Image
          src={product.image}
          alt={product.name}
          fill
          className={cn(
            "object-cover transition-transform duration-700 ease-out",
            isHovered ? "scale-110" : "scale-100"
          )}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
      </div>

      {/* Content */}
      <div className={cn(
        "p-6 flex flex-col flex-1",
        isListView ? "justify-center gap-2" : ""
      )}>
        <div className={cn(isListView ? "" : "mb-4")}>
          <h3 className="font-heading text-xl font-semibold mb-1 text-foreground">{product.name}</h3>
          <p className="text-muted-foreground text-sm line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        <div className={cn(
          "mt-auto pt-4 flex items-center justify-between gap-4 border-t border-border/50",
          isListView ? "border-t-0 pt-2 mt-0 max-w-xs" : ""
        )}>
          {quantity === 0 ? (
            <Button
              className="w-full rounded-2xl h-12 bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 transition-all active:scale-95"
              onClick={handleAddToCart}
              disabled={!product.inStock}
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to Cart
            </Button>
          ) : (
            <div className="flex items-center justify-between w-full h-12 bg-muted/50 rounded-2xl p-1 border border-border">
              <Button
                variant="ghost"
                size="icon"
                className="h-full aspect-square rounded-xl hover:bg-white hover:shadow-sm"
                onClick={handleDecrement}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="font-semibold text-lg w-12 text-center">{quantity}</span>
              <Button
                variant="ghost"
                size="icon"
                className="h-full aspect-square rounded-xl hover:bg-white hover:shadow-sm text-primary"
                onClick={handleIncrement}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
