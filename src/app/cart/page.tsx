'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingCart, Trash2, Plus, Minus, ArrowRight, MessageCircle, AlertCircle } from 'lucide-react';
import PageWrapper from '@/components/layout/PageWrapper';
import { useCartStore } from '@/store/useCartStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function CartPage() {
  const { items, removeItem, updateQuantity, getCartTotal } = useCartStore();
  const [mounted, setMounted] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    notes: '',
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const generateWhatsAppMessage = () => {
    const productsList = items
      .map((item) => `${item.name} - ${item.quantity} `)
      .join('\n');
      
    const message = `Hello Friends of Farmer,

I would like to place an order.

*Name:* ${formData.name}
*Phone:* ${formData.phone}
*Address:* ${formData.address}
${formData.notes ? `*Delivery Notes:* ${formData.notes}\n` : ''}
*Products:*
${productsList}

*Total Price:* ₹${getCartTotal()}

Please confirm my order.`;

    return encodeURIComponent(message);
  };

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    const message = generateWhatsAppMessage();
    const whatsappUrl = `https://wa.me/916360881181?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  if (!mounted) return null;

  return (
    <PageWrapper>
      <div className="bg-muted/30 py-8 md:py-16">
        <div className="container mx-auto px-4">
          <h1 className="font-heading text-3xl md:text-4xl font-bold mb-8">Your Shopping Cart</h1>

          {items.length === 0 ? (
            <div className="bg-white p-12 rounded-3xl text-center shadow-sm border border-border">
              <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShoppingCart className="h-12 w-12 text-primary" />
              </div>
              <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
              <p className="text-muted-foreground mb-8">Looks like you haven't added any fresh vegetables yet.</p>
              <Link href="/products">
                <Button size="lg" className="rounded-full px-8">
                  Start Shopping
                </Button>
              </Link>
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Cart Items */}
              <div className="w-full lg:w-2/3 space-y-6">
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-border">
                  <div className="flex justify-between font-semibold border-b border-border pb-4 mb-4 text-muted-foreground hidden md:flex">
                    <div className="w-1/2">Product</div>
                    <div className="w-1/4 text-center">Quantity</div>
                    <div className="w-1/4 text-right">Total</div>
                  </div>
                  
                  <div className="space-y-6">
                    {items.map((item) => (
                      <div key={item.id} className="flex flex-col md:flex-row items-center gap-4 py-4 border-b border-border last:border-0 last:pb-0">
                        <div className="flex items-center gap-4 w-full md:w-1/2">
                          <div className="h-24 w-24 rounded-xl overflow-hidden bg-muted shrink-0">
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg">{item.name}</h3>
                            <p className="text-muted-foreground">₹{item.price}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between w-full md:w-1/2">
                          <div className="flex items-center gap-3 bg-muted/50 rounded-full p-1 border border-border">
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                              className="w-8 h-8 flex items-center justify-center rounded-full bg-white shadow-sm hover:text-primary transition-colors"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="w-8 text-center font-medium">{item.quantity}</span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-8 h-8 flex items-center justify-center rounded-full bg-white shadow-sm hover:text-primary transition-colors"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                          
                          <div className="flex items-center gap-4">
                            <span className="font-semibold text-lg">₹{item.price * item.quantity}</span>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="text-muted-foreground hover:text-destructive transition-colors p-2"
                              aria-label="Remove item"
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Order Summary & Checkout */}
              <div className="w-full lg:w-1/3">
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-border sticky top-24">
                  <h2 className="font-heading text-xl font-semibold mb-6 pb-4 border-b border-border">Order Summary</h2>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-muted-foreground">
                      <span>Subtotal</span>
                      <span>₹{getCartTotal()}</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Delivery</span>
                      <span className="text-primary font-medium">Free</span>
                    </div>
                    <div className="flex justify-between text-xl font-bold pt-4 border-t border-border">
                      <span>Total</span>
                      <span>₹{getCartTotal()}</span>
                    </div>
                  </div>

                  <form onSubmit={handleCheckout} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        className="bg-muted/50"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="9876543210"
                        className="bg-muted/50"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="address">Delivery Address *</Label>
                      <Textarea
                        id="address"
                        name="address"
                        required
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="Complete address in Bengaluru"
                        className="bg-muted/50 resize-none"
                        rows={3}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="notes">Delivery Notes (Optional)</Label>
                      <Input
                        id="notes"
                        name="notes"
                        value={formData.notes}
                        onChange={handleInputChange}
                        placeholder="Landmark or specific instructions"
                        className="bg-muted/50"
                      />
                    </div>
                    
                    <div className="pt-4 space-y-3">
                      <div className="flex items-start gap-2 text-xs text-muted-foreground bg-blue-50 text-blue-800 p-3 rounded-lg border border-blue-100">
                        <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                        <p>We process all orders via WhatsApp. Clicking below will open WhatsApp with your order details.</p>
                      </div>
                      
                      <Button 
                        type="submit" 
                        size="lg" 
                        className="w-full rounded-full gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white h-14 text-lg font-semibold"
                      >
                        <MessageCircle className="h-5 w-5" />
                        Place Order on WhatsApp
                      </Button>
                      
                      <Link href="/products" className="block text-center mt-4">
                        <span className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center justify-center gap-1">
                          Continue Shopping <ArrowRight className="h-4 w-4" />
                        </span>
                      </Link>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </PageWrapper>
  );
}
