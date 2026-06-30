import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Phone, Mail } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-white pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Info */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <div className="relative h-32 w-80">
                <Image src="/logo2.png" alt="Friends of Farmer Logo" fill className="object-contain" />
              </div>
            </Link>
            <p className="text-white/80 mt-4 leading-relaxed">
              Fresh Vegetables at Wholesale Prices. Bringing farm-fresh goodness directly to your doorstep in Bengaluru.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/" className="text-white/80 hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/about" className="text-white/80 hover:text-white transition-colors">About Us</Link>
              </li>
              <li>
                <Link href="/products" className="text-white/80 hover:text-white transition-colors">Products</Link>
              </li>
              <li>
                <Link href="/contact" className="text-white/80 hover:text-white transition-colors">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-white/80">
                <MapPin className="h-5 w-5 shrink-0 mt-0.5 text-[#81C784]" />
                <span>Bhuvaneshwari Nagar, Bengaluru</span>
              </li>
              <li className="flex items-center gap-3 text-white/80">
                <Phone className="h-5 w-5 shrink-0 text-[#81C784]" />
                <span>+91 8050777342</span>
              </li>
              <li className="flex items-center gap-3 text-white/80">
                <Mail className="h-5 w-5 shrink-0 text-[#81C784]" />
                <span>chanduchandan@gmail.com</span>
              </li>
            </ul>
          </div>

          {/* Business Hours */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-6">Business Hours</h3>
            <ul className="space-y-4 text-white/80">
              <li className="flex justify-between border-b border-white/10 pb-2">
                <span>Monday - Sunday</span>
                <span>9:00 AM - 9:00 PM</span>
              </li>
              <li className="pt-4">
                <a
                  href="https://www.instagram.com/friends_of_farmer"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 transition-colors px-4 py-2 rounded-lg text-white"
                >
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <rect height="20" rx="5" ry="5" width="20" x="2" y="2" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                  <span>Follow on Instagram</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between text-white/60 text-sm">
          <p>Friends of Farmer © {currentYear}. All rights reserved.</p>
          <p className="mt-2 md:mt-0">Designed for freshness.</p>
        </div>
      </div>
    </footer>
  );
}
