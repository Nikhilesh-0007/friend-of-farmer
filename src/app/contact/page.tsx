'use client';

import { useState } from 'react';
import PageWrapper from '@/components/layout/PageWrapper';
import { MapPin, Phone, Mail, Camera, MessageCircle, ChevronDown, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function ContactPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: "Where do you deliver?",
      a: "We currently deliver across all major pin codes in Bengaluru. Check out our cart page to see if your pin code is serviceable."
    },
    {
      q: "Is there a minimum order value?",
      a: "No! However, orders below ₹500 have a nominal delivery fee of ₹50. Orders above ₹500 get free delivery."
    },
    {
      q: "When will my order arrive?",
      a: "Orders placed before 8 PM are harvested the next morning and delivered to your doorstep by 2 PM."
    },
    {
      q: "Are the vegetables organic?",
      a: "Yes, 100%. We work directly with certified organic farmers who use zero chemical pesticides or synthetic fertilizers."
    }
  ];

  return (
    <PageWrapper>
      {/* Header */}
      <div className="bg-primary/5 pt-40 pb-28 relative overflow-hidden">
        <div className="absolute inset-0 leaf-pattern opacity-50" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4 text-foreground">Get in Touch</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-balance">
            Have a question about our farm, an order, or just want to say hi? We&apos;d love to hear from you.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Contact Info & Cards */}
          <div className="space-y-8">
            <h2 className="font-heading text-3xl font-bold mb-8">Contact Information</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <a href="tel:+918792036725" className="flex flex-col items-center text-center p-8 bg-white rounded-3xl shadow-sm border border-border hover:shadow-lg transition-shadow group">
                <div className="w-14 h-14 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Phone className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-lg mb-1">Call Us</h3>
                <p className="text-muted-foreground">+91 87920 36725</p>
              </a>

              <a href="https://wa.me/918792036725" target="_blank" rel="noreferrer" className="flex flex-col items-center text-center p-8 bg-white rounded-3xl shadow-sm border border-border hover:shadow-lg transition-shadow group">
                <div className="w-14 h-14 bg-[#25D366]/10 text-[#25D366] rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <MessageCircle className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-lg mb-1">WhatsApp</h3>
                <p className="text-muted-foreground">Instant Reply</p>
              </a>

              <a href="mailto:bojjanikhilesh9@gmail.com" className="flex flex-col items-center text-center p-8 bg-white rounded-3xl shadow-sm border border-border hover:shadow-lg transition-shadow group">
                <div className="w-14 h-14 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Mail className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-lg mb-1">Email</h3>
                <p className="text-muted-foreground break-all">bojjanikhilesh9@gmail.com</p>
              </a>

              <a href="https://instagram.com/friendsoffarmer" target="_blank" rel="noreferrer" className="flex flex-col items-center text-center p-8 bg-white rounded-3xl shadow-sm border border-border hover:shadow-lg transition-shadow group">
                <div className="w-14 h-14 bg-[#E1306C]/10 text-[#E1306C] rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Camera className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-lg mb-1">Instagram</h3>
                <p className="text-muted-foreground">@friendsoffarmer</p>
              </a>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-border mt-8 flex items-start gap-4">
              <Clock className="h-6 w-6 text-primary shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-lg mb-2">Business Hours</h3>
                <p className="text-muted-foreground">Monday - Friday: 8:00 AM - 8:00 PM</p>
                <p className="text-muted-foreground">Saturday: 8:00 AM - 5:00 PM</p>
                <p className="text-muted-foreground">Sunday: Closed</p>
              </div>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-border flex items-start gap-4">
              <MapPin className="h-6 w-6 text-primary shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-lg mb-2">Farm & Office</h3>
                <p className="text-muted-foreground leading-relaxed">
                  123 Organic Lane, Farm District<br />
                  Bengaluru, Karnataka 560001<br />
                  India
                </p>
              </div>
            </div>
          </div>

          {/* FAQ & Map */}
          <div className="space-y-12">
            <div>
              <h2 className="font-heading text-3xl font-bold mb-8">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div 
                    key={index} 
                    className={cn(
                      "border border-border rounded-2xl bg-white overflow-hidden transition-all duration-300",
                      openFaq === index ? "shadow-md" : "shadow-sm hover:border-primary/50"
                    )}
                  >
                    <button
                      className="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none"
                      onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    >
                      <span className="font-semibold text-lg pr-4">{faq.q}</span>
                      <ChevronDown className={cn("h-5 w-5 text-muted-foreground transition-transform duration-300", openFaq === index && "rotate-180 text-primary")} />
                    </button>
                    <div 
                      className={cn(
                        "px-6 overflow-hidden transition-all duration-300 ease-in-out",
                        openFaq === index ? "max-h-48 pb-5 opacity-100" : "max-h-0 opacity-0"
                      )}
                    >
                      <p className="text-muted-foreground">{faq.a}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Google Map Placeholder */}
            <div>
              <h2 className="font-heading text-3xl font-bold mb-8">Find Us</h2>
              <div className="w-full h-[300px] rounded-3xl overflow-hidden shadow-sm border border-border bg-muted">
                {/* Embedded Google Map iframe - using a placeholder for now */}
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d248849.886539092!2d77.4908543!3d12.9539599!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfc3e8517e4fe0!2sBengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1709800000000!5m2!1sen!2sin" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Google Maps Location"
                />
              </div>
            </div>

          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
