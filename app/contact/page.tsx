'use client';

import { useState } from 'react';
import Link from 'next/link';
import { TreePalm, Mail, Phone, MapPin, Clock, Send } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    // Simulate form submission (you can integrate with your email service)
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-jungle-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-jungle-600 to-jungle-700 text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <Link href="/" className="inline-flex items-center gap-2 text-white/90 hover:text-white mb-6 transition-colors">
            <TreePalm className="h-5 w-5" />
            <span>Back to Home</span>
          </Link>
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Contact Us</h1>
          <p className="text-xl text-jungle-100">We're here to help! Get in touch with our team</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">

          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-6">

            {/* Phone */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-jungle-100 rounded-xl">
                  <Phone className="h-6 w-6 text-jungle-600" />
                </div>
                <h2 className="font-display text-lg font-bold text-gray-900">Phone</h2>
              </div>
              <p className="text-gray-700 mb-2">
                <a href="tel:+447342224136" className="text-jungle-600 hover:underline font-semibold">
                  +44 7342224136
                </a>
              </p>
              <p className="text-sm text-gray-600">Monday-Friday, 9am-5pm GMT</p>
            </div>

            {/* Email */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-tiger-100 rounded-xl">
                  <Mail className="h-6 w-6 text-tiger-600" />
                </div>
                <h2 className="font-display text-lg font-bold text-gray-900">Email</h2>
              </div>
              <p className="text-gray-700 mb-2">
                <a href="mailto:grace@jungleetoys.com" className="text-jungle-600 hover:underline font-semibold">
                  grace@jungleetoys.com
                </a>
              </p>
              <p className="text-sm text-gray-600">We typically respond within 24 hours</p>
            </div>

            {/* Address */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-parrot-100 rounded-xl">
                  <MapPin className="h-6 w-6 text-parrot-600" />
                </div>
                <h2 className="font-display text-lg font-bold text-gray-900">Address</h2>
              </div>
              <p className="text-gray-700">
                JungleeToys<br />
                483 Green Lanes<br />
                London, N13 4BS<br />
                United Kingdom
              </p>
            </div>

            {/* Opening Hours */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-jungle-100 rounded-xl">
                  <Clock className="h-6 w-6 text-jungle-600" />
                </div>
                <h2 className="font-display text-lg font-bold text-gray-900">Customer Service Hours</h2>
              </div>
              <div className="space-y-2 text-sm text-gray-700">
                <div className="flex justify-between">
                  <span className="font-semibold">Monday - Friday:</span>
                  <span>9:00 AM - 5:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Saturday:</span>
                  <span>10:00 AM - 2:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Sunday:</span>
                  <span className="text-gray-500">Closed</span>
                </div>
                <p className="text-xs text-gray-500 mt-3">All times in GMT/BST</p>
              </div>
            </div>

          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <h2 className="font-display text-2xl font-bold text-gray-900 mb-2">Send Us a Message</h2>
              <p className="text-gray-600 mb-6">
                Fill out the form below and we'll get back to you as soon as possible.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-jungle-500 outline-none transition-colors"
                    placeholder="John Smith"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-jungle-500 outline-none transition-colors"
                    placeholder="john@example.com"
                  />
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-jungle-500 outline-none transition-colors bg-white"
                  >
                    <option value="">Select a subject...</option>
                    <option value="order">Order Enquiry</option>
                    <option value="delivery">Delivery Question</option>
                    <option value="return">Returns & Refunds</option>
                    <option value="product">Product Information</option>
                    <option value="offer">Make an Offer Question</option>
                    <option value="complaint">Complaint</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-jungle-500 outline-none transition-colors resize-none"
                    placeholder="Please provide as much detail as possible..."
                  />
                </div>

                {/* Submit Button */}
                <div>
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="w-full bg-jungle-600 hover:bg-jungle-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {status === 'sending' ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5" />
                        Send Message
                      </>
                    )}
                  </button>
                </div>

                {/* Success Message */}
                {status === 'success' && (
                  <div className="bg-jungle-50 border border-jungle-200 text-jungle-800 p-4 rounded-xl">
                    <p className="font-semibold">Thank you for your message!</p>
                    <p className="text-sm">We'll get back to you within 24 hours.</p>
                  </div>
                )}

                {/* Error Message */}
                {status === 'error' && (
                  <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-xl">
                    <p className="font-semibold">Oops! Something went wrong.</p>
                    <p className="text-sm">Please try again or email us directly at grace@jungleetoys.com</p>
                  </div>
                )}
              </form>

              {/* Additional Info */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-3">Before you contact us:</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Check our <Link href="/faq" className="text-jungle-600 hover:underline">FAQ page</Link> for quick answers</li>
                  <li>• Review our <Link href="/delivery" className="text-jungle-600 hover:underline">Delivery Information</Link> for shipping queries</li>
                  <li>• See our <Link href="/returns" className="text-jungle-600 hover:underline">Returns & Refunds</Link> policy</li>
                  <li>• Have your order number ready if contacting about an order</li>
                </ul>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
