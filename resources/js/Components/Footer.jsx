import React from 'react';
import { Link } from '@inertiajs/react';
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Instagram, href: '#', label: 'Instagram' },
  ];

  const quickLinks = [
    { name: 'About Us', href: '/about' },
    { name: 'Find Jobs', href: '/jobs' },
    { name: 'Find Talent', href: '/professionals' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Success Stories', href: '/stories' },
  ];

  const categories = [
    { name: 'Development', href: '/categories/development' },
    { name: 'Design', href: '/categories/design' },
    { name: 'Marketing', href: '/categories/marketing' },
    { name: 'Business', href: '/categories/business' },
    { name: 'Writing', href: '/categories/writing' },
  ];

  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
              HireInk
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6 text-sm">
              Connecting top talent with amazing opportunities. Find your next career move or hire exceptional professionals.
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  className="text-slate-400 hover:text-primary transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map(link => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-slate-600 hover:text-primary dark:text-slate-400 dark:hover:text-primary-400 text-sm transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-4">
              Categories
            </h3>
            <ul className="space-y-3">
              {categories.map(category => (
                <li key={category.name}>
                  <Link
                    href={category.href}
                    className="text-slate-600 hover:text-primary dark:text-slate-400 dark:hover:text-primary-400 text-sm transition-colors"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-4">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:contact@hireink.com"
                  className="flex items-center gap-2 text-slate-600 hover:text-primary dark:text-slate-400 dark:hover:text-primary-400 text-sm transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  contact@hireink.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+1234567890"
                  className="flex items-center gap-2 text-slate-600 hover:text-primary dark:text-slate-400 dark:hover:text-primary-400 text-sm transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  (123) 456-7890
                </a>
              </li>
              <li className="flex items-center gap-2 text-slate-600 dark:text-slate-400 text-sm">
                <MapPin className="w-4 h-4 flex-shrink-0" />
                <span>123 Business Street, Suite 100, City, Country</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-slate-200 dark:border-slate-800">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              © {currentYear} HireInk. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link
                href="/privacy"
                className="text-sm text-slate-600 hover:text-primary dark:text-slate-400 dark:hover:text-primary-400 transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-sm text-slate-600 hover:text-primary dark:text-slate-400 dark:hover:text-primary-400 transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}