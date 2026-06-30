'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, Plus, Minus, Trash2, ArrowRight } from 'lucide-react';
import PageWrapper from '@/components/layout/PageWrapper';
import { useCartStore } from '@/store/useCartStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart } = useCartStore();
  const [mounted, setMounted] = useState(false);
  
  // Checkout Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: ''
  });

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const deliveryFee = subtotal > 0 && subtotal < 500 ? 50 : 0;
  const total = subtotal + deliveryFee;

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Generate Professional WhatsApp Message
    let message = `*New Order - Friends of Farmer*%0A%0A`;
    message += `*Customer Details:*%0A`;
    message += `Name: ${formData.name}%0A`;
    message += `Phone: ${formData.phone}%0A`;
    message += `Address: ${formData.address}%0A%0A`;
    
    message += `*Order Items:*%0A`;
    items.forEach(item => {
      message += `- ${item.name} x ${item.quantity} (₹${item.price * item.quantity})%0A`;
    });
    
    message += `%0A*Summary:*%0A`;
    message += `Subtotal: ₹${subtotal}%0A`;
    if (deliveryFee > 0) message += `Delivery: ₹${deliveryFee}%0A`;
    message += `*Total Amount: ₹${total}*%0A%0A`;
    message += `Please confirm my order.`;

    const whatsappUrl = `https://wa.me/918792036725?text=${message}`;
    window.open(whatsappUrl, '_blank');
    clearCart();
  };

  return (
    <PageWrapper>
      <div className="bg-primary/5 pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 leaf-pattern opacity-50" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4 text-foreground">Your Shopping Cart</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-balance">
            Review your items and proceed to checkout securely via WhatsApp.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {items.length === 0 ? (
          <div className="bg-white/80 backdrop-blur-md rounded-3xl p-16 text-center border border-border shadow-sm max-w-2xl mx-auto">
            <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
              <ShoppingCart className="h-10 w-10 text-primary" />
            </div>
            <h2 className="font-heading text-3xl font-bold mb-4">Your cart is empty</h2>
            <p className="text-muted-foreground text-lg mb-10">Looks like you haven&apos;t added any fresh vegetables yet.</p>
            <Link href="/products">
              <Button size="lg" className="rounded-full px-10 h-14 text-lg shadow-lg shadow-primary/20 hover:scale-105 transition-transform">
                Start Shopping <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Cart Items List */}
            <div className="flex-1 space-y-6">
              <div className="bg-white rounded-3xl border border-border shadow-sm overflow-hidden">
                <div className="p-6 md:p-8 space-y-8">
                  {items.map((item) => (
                    <div key={item.id} className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pb-8 border-b border-border last:border-0 last:pb-0">
                      <div className="relative h-24 w-24 rounded-2xl overflow-hidden bg-muted shrink-0 border border-border">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      
                      <div className="flex-1 w-full">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-heading text-xl font-semibold">{item.name}</h3>
                          <span className="font-semibold text-lg text-primary">₹{item.price * item.quantity}</span>
                        </div>
                        <p className="text-muted-foreground text-sm mb-4">₹{item.price} / unit</p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center bg-muted/50 rounded-xl p-1 border border-border">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 rounded-lg hover:bg-white hover:shadow-sm"
                              onClick={() => {
                                if (item.quantity > 1) updateQuantity(item.id, item.quantity - 1);
                              }}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="font-semibold w-10 text-center">{item.quantity}</span>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 rounded-lg hover:bg-white hover:shadow-sm"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-destructive hover:bg-destructive/10 hover:text-destructive rounded-full"
                            onClick={() => removeItem(item.id)}
                          >
                            <Trash2 className="h-5 w-5" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Summary & Checkout Form */}
            <div className="w-full lg:w-[400px]">
              <div className="sticky top-28 bg-white rounded-3xl border border-border shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8">
                <h3 className="font-heading text-2xl font-bold mb-6 pb-4 border-b border-border">Order Summary</h3>
                
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span>₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Delivery Fee</span>
                    <span>{deliveryFee === 0 ? <span className="text-primary font-medium">Free</span> : `₹${deliveryFee}`}</span>
                  </div>
                  <div className="border-t border-border pt-4 flex justify-between font-bold text-xl">
                    <span>Total</span>
                    <span className="text-primary">₹{total}</span>
                  </div>
                </div>

                <form onSubmit={handleCheckout} className="space-y-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-lg border-b border-border pb-2">Delivery Details</h4>
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-muted-foreground">Full Name</Label>
                      <Input 
                        id="name" 
                        required 
                        className="rounded-xl h-12 bg-muted/30 focus-visible:ring-primary/50" 
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-muted-foreground">Phone Number</Label>
                      <Input 
                        id="phone" 
                        type="tel" 
                        required 
                        className="rounded-xl h-12 bg-muted/30 focus-visible:ring-primary/50" 
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address" className="text-muted-foreground">Full Address</Label>
                      <textarea
                        id="address"
                        required
                        className="w-full rounded-xl border border-input bg-muted/30 px-3 py-3 text-base shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 resize-none min-h-[100px]"
                        placeholder="House no, Street name, City, Pincode"
                        value={formData.address}
                        onChange={(e) => setFormData({...formData, address: e.target.value})}
                      />
                    </div>
                  </div>

                  <Button type="submit" size="lg" className="w-full rounded-2xl h-14 text-lg bg-[#25D366] hover:bg-[#25D366]/90 text-white shadow-lg shadow-[#25D366]/20 transition-transform active:scale-95">
                    Order via WhatsApp
                  </Button>
                  <p className="text-xs text-center text-muted-foreground">
                    Clicking this will open WhatsApp with your order details pre-filled.
                  </p>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </PageWrapper>
  );
}
