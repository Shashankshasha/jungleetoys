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
  const email = settings?.support_email || 'hello@jungleetoys.com';
  const phone = settings?.phone || '+44 1234 567 890';
  const address = settings ? `${settings.address_line1}${settings.address_line2 ? '\n' + settings.address_line2 : ''}\n${settings.city}${settings.postal_code ? ', ' + settings.postal_code : ''}${settings.country ? ', ' + settings.country : ''}` : '123 Toy Street\nCrawley, West Sussex\nRH10 1AB, UK';

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
                <Link href="/help/delivery" className="text-jungle-300 hover:text-white transition-colors">
                  Delivery Information
                </Link>
              </li>
              <li>
                <Link href="/help/returns" className="text-jungle-300 hover:text-white transition-colors">
                  Returns & Refunds
                </Link>
              </li>
              <li>
                <Link href="/help/faq" className="text-jungle-300 hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/help/contact" className="text-jungle-300 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/help/size-guide" className="text-jungle-300 hover:text-white transition-colors">
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
