'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { TreePalm, Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';

interface StoreSettings {
  store_name: string;
  support_email: string;
  phone: string;
  address_line1: string;
  address_line2: string;
  city: string;
  postal_code: string;
  country: string;
  facebook_url: string;
  instagram_url: string;
  twitter_url: string;
  tiktok_url: string;
  pinterest_url: string;
}

export default function Footer() {
  const [settings, setSettings] = useState<StoreSettings | null>(null);

  useEffect(() => {
    // Fetch store settings
    fetch('/api/settings')
      .then(res => res.json())
      .then(data => setSettings(data))
      .catch(err => console.error('Error fetching settings:', err));
  }, []);

  // Use settings if available, otherwise use defaults
  const storeName = settings?.store_name || 'JungleeToys';
  const email = settings?.support_email || 'grace@jungleetoys.com';
  const phone = settings?.phone || '+44 7342224136';
  const address = settings ? `${settings.address_line1}${settings.address_line2 ? '\n' + settings.address_line2 : ''}\n${settings.city}${settings.postal_code ? ', ' + settings.postal_code : ''}${settings.country ? ', ' + settings.country : ''}` : '483 Green Lanes\nLondon, N13 4BS\nUK';

  return (
    <footer className="bg-gradient-to-b from-jungle-900 to-jungle-950 text-white">
      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-jungle-600 to-parrot-600 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-display font-bold">
                🎁 Join the Jungle Club!
              </h3>
              <p className="text-jungle-100 mt-1">
                Get 10% off your first order + exclusive deals
              </p>
            </div>
            <form className="flex gap-2 w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 md:w-72 px-4 py-3 rounded-full text-gray-900 
                         focus:ring-4 focus:ring-white/30 outline-none"
              />
              <button
                type="submit"
                className="bg-banana-400 hover:bg-banana-500 text-jungle-900 font-bold 
                         px-6 py-3 rounded-full transition-colors whitespace-nowrap"
              >
                Subscribe 🐵
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <TreePalm className="h-8 w-8 text-jungle-400" />
              <span className="font-display text-2xl font-bold">{storeName}</span>
            </Link>
            <p className="text-jungle-300 mb-4">
              Your one-stop shop for amazing toys! We bring joy to children of all ages with our
              carefully curated collection of fun and educational toys.
            </p>
            <div className="flex gap-4">
              {settings?.facebook_url && (
                <a
                  href={settings.facebook_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-jungle-800 hover:bg-jungle-700 rounded-full transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="h-5 w-5" />
                </a>
              )}
              {settings?.instagram_url && (
                <a
                  href={settings.instagram_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-jungle-800 hover:bg-jungle-700 rounded-full transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </a>
              )}
              {settings?.twitter_url && (
                <a
                  href={settings.twitter_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-jungle-800 hover:bg-jungle-700 rounded-full transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="h-5 w-5" />
                </a>
              )}
              {settings?.tiktok_url && (
                <a
                  href={settings.tiktok_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-jungle-800 hover:bg-jungle-700 rounded-full transition-colors"
                  aria-label="TikTok"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                  </svg>
                </a>
              )}
              {settings?.pinterest_url && (
                <a
                  href={settings.pinterest_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-jungle-800 hover:bg-jungle-700 rounded-full transition-colors"
                  aria-label="Pinterest"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.237 2.636 7.855 6.356 9.312-.088-.791-.167-2.005.035-2.868.181-.78 1.172-4.97 1.172-4.97s-.299-.6-.299-1.486c0-1.39.806-2.428 1.81-2.428.852 0 1.264.64 1.264 1.408 0 .858-.545 2.14-.828 3.33-.236.995.5 1.807 1.48 1.807 1.778 0 3.144-1.874 3.144-4.58 0-2.393-1.72-4.068-4.177-4.068-2.845 0-4.515 2.135-4.515 4.34 0 .859.331 1.781.745 2.281a.3.3 0 01.069.288l-.278 1.133c-.044.183-.145.223-.335.134-1.249-.581-2.03-2.407-2.03-3.874 0-3.154 2.292-6.052 6.608-6.052 3.469 0 6.165 2.473 6.165 5.776 0 3.447-2.173 6.22-5.19 6.22-1.013 0-1.965-.525-2.291-1.148l-.623 2.378c-.226.869-.835 1.958-1.244 2.621.937.29 1.931.446 2.962.446 5.523 0 10-4.477 10-10S17.523 2 12 2z"/>
                  </svg>
                </a>
              )}
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-display text-lg font-bold mb-4">Shop</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/products" className="text-jungle-300 hover:text-white transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/products?filter=new" className="text-jungle-300 hover:text-white transition-colors">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link href="/products?filter=sale" className="text-jungle-300 hover:text-white transition-colors">
                  Sale Items
                </Link>
              </li>
              <li>
                <Link href="/products?filter=featured" className="text-jungle-300 hover:text-white transition-colors">
                  Best Sellers
                </Link>
              </li>
              <li>
                <Link href="/products?category=educational" className="text-jungle-300 hover:text-white transition-colors">
                  Educational Toys
                </Link>
              </li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="font-display text-lg font-bold mb-4">Help</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/shipping" className="text-jungle-300 hover:text-white transition-colors">
                  Shipping & Delivery
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-jungle-300 hover:text-white transition-colors">
                  Returns & Refunds
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-jungle-300 hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-jungle-300 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/age-guide" className="text-jungle-300 hover:text-white transition-colors">
                  Age Guide
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-lg font-bold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-jungle-400 mt-0.5 shrink-0" />
                <span className="text-jungle-300" style={{ whiteSpace: 'pre-line' }}>
                  {address}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-jungle-400 shrink-0" />
                <a href={`tel:${phone.replace(/\s/g, '')}`} className="text-jungle-300 hover:text-white transition-colors">
                  {phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-jungle-400 shrink-0" />
                <a href={`mailto:${email}`} className="text-jungle-300 hover:text-white transition-colors">
                  {email}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-jungle-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-jungle-400 text-sm text-center md:text-left">
              © {new Date().getFullYear()} {storeName}. All rights reserved. 🌴
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <Link href="/legal/privacy" className="text-jungle-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/legal/terms" className="text-jungle-400 hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="/legal/cookies" className="text-jungle-400 hover:text-white transition-colors">
                Cookie Policy
              </Link>
            </div>
            {/* Payment Icons */}
            <div className="flex items-center gap-2 text-jungle-400">
              <span className="text-xs">We accept:</span>
              <div className="flex gap-1">
                <span className="bg-jungle-800 px-2 py-1 rounded text-xs">Visa</span>
                <span className="bg-jungle-800 px-2 py-1 rounded text-xs">Mastercard</span>
                <span className="bg-jungle-800 px-2 py-1 rounded text-xs">PayPal</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
