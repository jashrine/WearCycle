import React from "react";
import { Button } from "./ui/button";
import { ArrowRight, ChevronRight } from "lucide-react";

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  backgroundImage?: string;
  onCtaClick?: () => void;
}

const HeroSection = ({
  title = "Sustainable Fashion at Your Fingertips",
  subtitle = "Rent designer outfits for any occasion. Look amazing, save money, and help the planet.",
  ctaText = "Browse Collection",
  backgroundImage = "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1400&q=80",
  onCtaClick = () => {},
}: HeroSectionProps) => {
  return (
    <div className="relative w-full h-[600px] bg-gray-100 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src={backgroundImage}
          alt="Fashion collection"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>
      </div>

      {/* Content Container */}
      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
        <div className="max-w-2xl">
          {/* Badge */}
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-600/90 text-white text-sm font-medium mb-6 backdrop-blur-sm">
            <span>New Collection</span>
            <ChevronRight className="h-4 w-4 ml-1" />
          </div>

          {/* Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
            {title}
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-lg">
            {subtitle}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              onClick={onCtaClick}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-6 h-auto text-base"
            >
              {ctaText}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 px-8 py-6 h-auto text-base"
            >
              How It Works
            </Button>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-8 mt-12">
            <div className="bg-white/10 backdrop-blur-sm px-4 py-3 rounded-lg">
              <p className="text-white/80 text-sm">Satisfied Customers</p>
              <p className="text-white font-bold text-2xl">10,000+</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm px-4 py-3 rounded-lg">
              <p className="text-white/80 text-sm">Designer Brands</p>
              <p className="text-white font-bold text-2xl">200+</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm px-4 py-3 rounded-lg">
              <p className="text-white/80 text-sm">Rental Savings</p>
              <p className="text-white font-bold text-2xl">Up to 85%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
