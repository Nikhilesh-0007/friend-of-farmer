import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Phone, Mail, Camera, MessageSquare, ThumbsUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Footer() {
  return (
    <footer className="bg-[#1A1A1A] text-white pt-20 pb-10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Col */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative h-14 w-14 bg-white/10 rounded-2xl p-2 shrink-0 transition-transform duration-300 group-hover:scale-105">
                <Image 
                  src="/logo5.png" 
                  alt="Friends of Farmer Logo" 
                  fill 
                  className="object-contain p-2"
                  style={{ filter: 'brightness(0) invert(1)' }} 
                />
              </div>
              <span className="font-heading font-bold text-xl text-white tracking-tight transition-colors group-hover:text-primary">
                Friend of Farmer
              </span>
            </Link>
            <p className="text-white/60 leading-relaxed max-w-sm text-balance text-sm">
              Premium organic vegetables harvested daily and delivered fresh to your doorstep. Supporting local farmers, building healthier communities.
            </p>
            <div className="flex gap-4">
              <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full bg-white/5 hover:bg-primary hover:text-white transition-colors">
                <Camera className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full bg-white/5 hover:bg-primary hover:text-white transition-colors">
                <ThumbsUp className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full bg-white/5 hover:bg-primary hover:text-white transition-colors">
                <MessageSquare className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-lg font-semibold mb-6 text-white">Quick Links</h4>
            <ul className="space-y-4">
              {['Home', 'Products', 'Cart', 'Contact', 'About'].map((link) => (
                <li key={link}>
                  <Link 
                    href={link === 'Home' ? '/' : `/${link.toLowerCase()}`} 
                    className="text-white/60 hover:text-primary transition-colors text-sm font-medium inline-flex items-center gap-2 group"
                  >
                    <span className="h-px w-0 bg-primary group-hover:w-4 transition-all duration-300" />
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Business Hours */}
          <div>
            <h4 className="font-heading text-lg font-semibold mb-6 text-white">Business Hours</h4>
            <ul className="space-y-4 text-sm text-white/60">
              <li className="flex justify-between border-b border-white/10 pb-2">
                <span>Everyday</span>
                <span className="text-white/90 font-medium">9:00 AM - 9:00 PM</span>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading text-lg font-semibold mb-6 text-white">Get in Touch</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-4">
                <div className="mt-1 bg-white/10 p-2 rounded-lg">
                  <MapPin className="h-4 w-4 text-primary" />
                </div>
                <span className="text-white/60 text-sm leading-relaxed">
                  Bhuvaneshwari Nagar, Bengaluru,<br />
                  Karnataka, India
                </span>
              </li>
              <li className="flex items-center gap-4">
                <div className="bg-white/10 p-2 rounded-lg">
                  <Phone className="h-4 w-4 text-primary" />
                </div>
                <span className="text-white/60 text-sm">+91 80507 77342</span>
              </li>
              <li className="flex items-center gap-4">
                <div className="bg-white/10 p-2 rounded-lg">
                  <Mail className="h-4 w-4 text-primary" />
                </div>
                <span className="text-white/60 text-sm">chanduchandan@gmail.com</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-sm">
            © {new Date().getFullYear()} Friends of Farmer. All rights reserved.
          </p>
          <p className="text-white/40 text-sm flex items-center gap-1">
            Developed by{' '}
            <Link 
              href="https://www.instagram.com/staffarc?igsh=NGI1ajBjank5aWF3" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-primary transition-colors font-medium underline"
            >
              StaffArc
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
