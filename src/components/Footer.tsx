import React from "react";
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Mail,
  ArrowRight,
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface FooterProps {
  companyName?: string;
  companyDescription?: string;
  navigationLinks?: Array<{
    title: string;
    links: Array<{ name: string; href: string }>;
  }>;
  socialLinks?: Array<{ name: string; icon: React.ReactNode; href: string }>;
}

const Footer = ({
  companyName = "WearCycle",
  companyDescription = "Sustainable fashion rental service helping you look great while reducing environmental impact. Rent designer clothes for any occasion at a fraction of retail price.",
  navigationLinks = [
    {
      title: "Shop",
      links: [
        { name: "All Collections", href: "#" },
        { name: "New Arrivals", href: "#" },
        { name: "Trending Now", href: "#" },
        { name: "Occasions", href: "#" },
        { name: "Sustainability", href: "#" },
      ],
    },
    {
      title: "Help",
      links: [
        { name: "How It Works", href: "#" },
        { name: "Shipping & Returns", href: "#" },
        { name: "Sizing Guide", href: "#" },
        { name: "FAQs", href: "#" },
        { name: "Contact Us", href: "#" },
      ],
    },
    {
      title: "About",
      links: [
        { name: "Our Story", href: "#" },
        { name: "Sustainability", href: "#" },
        { name: "Careers", href: "#" },
        { name: "Press", href: "#" },
        { name: "Blog", href: "#" },
      ],
    },
  ],
  socialLinks = [
    { name: "Instagram", icon: <Instagram className="h-5 w-5" />, href: "#" },
    { name: "Facebook", icon: <Facebook className="h-5 w-5" />, href: "#" },
    { name: "Twitter", icon: <Twitter className="h-5 w-5" />, href: "#" },
    { name: "YouTube", icon: <Youtube className="h-5 w-5" />, href: "#" },
  ],
}: FooterProps) => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 pt-12 pb-8 w-full">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900">{companyName}</h2>
            <p className="text-gray-600 text-sm">{companyDescription}</p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="text-gray-500 hover:text-emerald-600 transition-colors"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          {navigationLinks.map((category, index) => (
            <div key={index} className="space-y-4">
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
                {category.title}
              </h3>
              <ul className="space-y-2">
                {category.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href={link.href}
                      className="text-gray-600 hover:text-emerald-600 text-sm transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter Signup */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
              Subscribe to our newsletter
            </h3>
            <p className="text-gray-600 text-sm">
              Get the latest updates on new arrivals and special promotions.
            </p>
            <div className="flex space-x-2">
              <Input
                type="email"
                placeholder="Your email"
                className="bg-white border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
              />
              <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} {companyName}. All rights
              reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a
                href="#"
                className="text-gray-500 hover:text-emerald-600 text-sm transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-emerald-600 text-sm transition-colors"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-emerald-600 text-sm transition-colors"
              >
                Accessibility
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
