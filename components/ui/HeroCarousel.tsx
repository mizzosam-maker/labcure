// components/ui/HeroCarousel.tsx
"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const heroSlides = [
  {
    id: 1,
    title: "Welcome to Labcure",
    highlight: "Labcure",
    subtitle: "Reliable medical, laboratory, and hospital equipment across Kenya.",
    ctaPrimary: "Shop Now",
    ctaSecondary: "Contact Us",
    image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=1600&h=600&fit=crop",
    gradient: "from-black/70 to-transparent"
  },
  {
    id: 2,
    title: "Premium Laboratory Equipment",
    highlight: "Laboratory",
    subtitle: "State-of-the-art diagnostic tools and lab supplies for modern healthcare facilities.",
    ctaPrimary: "Browse Lab Equipment",
    ctaSecondary: "Request Quote",
    image: "https://images.unsplash.com/photo-1605781231474-f60dea478e8a?q=80&w=1171&auto=format&fit=crop",
    gradient: "from-black/70 to-transparent"
  },
  {
    id: 3,
    title: "Hospital Grade Solutions",
    highlight: "Hospital Grade",
    subtitle: "High-quality medical devices and hospital furniture designed for patient care.",
    ctaPrimary: "View Hospital Equipment",
    ctaSecondary: "Learn More",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1600&h=600&fit=crop",
    gradient: "from-black/70 to-transparent"
  },
  {
    id: 4,
    title: "Trusted by Healthcare Professionals",
    highlight: "Trusted",
    subtitle: "Join hundreds of medical facilities across Kenya that rely on Labcure.",
    ctaPrimary: "Our Products",
    ctaSecondary: "Testimonials",
    image: "https://images.unsplash.com/photo-1581093577421-f561a654a353?q=80&w=1170&auto=format&fit=crop",
    gradient: "from-black/60 to-transparent"
  },
  {
    id: 5,
    title: "Fast & Reliable Delivery",
    highlight: "Nationwide",
    subtitle: "Get your medical equipment delivered quickly to any location in Kenya.",
    ctaPrimary: "Order Now",
    ctaSecondary: "Delivery Info",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=1600&h=600&fit=crop",
    gradient: "from-black/60 to-transparent"
  }
];

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, currentSlide]);

  return (
    <div className="relative h-[600px] overflow-hidden">
      {heroSlides.map((slide, index) => (
        <div
          key={slide.id}
          className="absolute inset-0 transition-transform duration-700 ease-in-out"
          style={{
            transform: `translateX(${(index - currentSlide) * 100}%)`,
          }}
        >
          <div className="absolute inset-0">
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              priority={index === 0}
              className="object-cover"
              sizes="100vw"
              quality={90}
            />
            <div className={`absolute inset-0 bg-gradient-to-r ${slide.gradient}`} />
          </div>
          <div className="relative container mx-auto px-4 h-full flex items-center">
            <div className="max-w-2xl text-white animate-fade-in">
              <h1 className="text-5xl md:text-6xl font-bold mb-4">
                {slide.title.split(slide.highlight)[0]}
                <span className="text-secondary">{slide.highlight}</span>
                {slide.title.split(slide.highlight)[1]}
              </h1>
              <p className="text-lg md:text-xl text-gray-100 mb-8">
                {slide.subtitle}
              </p>
              <div className="flex gap-4 flex-wrap">
                <Link
                  href="/products"
                  className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-light transition-all duration-300 transform hover:scale-105"
                >
                  {slide.ctaPrimary}
                </Link>
                <Link
                  href="/contact"
                  className="border-2 border-secondary text-white px-6 py-3 rounded-lg hover:bg-secondary transition-all duration-300 transform hover:scale-105"
                >
                  {slide.ctaSecondary}
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={() => { prevSlide(); setIsAutoPlaying(false); setTimeout(() => setIsAutoPlaying(true), 5000); }}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-300 hover:scale-110 z-10"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      
      <button
        onClick={() => { nextSlide(); setIsAutoPlaying(false); setTimeout(() => setIsAutoPlaying(true), 5000); }}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-300 hover:scale-110 z-10"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 ${
              index === currentSlide
                ? "w-8 bg-secondary h-2 rounded-full"
                : "w-2 bg-white/50 hover:bg-white/80 h-2 rounded-full"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 z-10">
        {isAutoPlaying && (
          <div 
            className="h-full bg-secondary transition-all duration-[5000ms] linear"
            style={{ 
              width: "100%",
              animation: "shrink 5s linear forwards"
            }}
          />
        )}
      </div>

      <style jsx>{`
        @keyframes shrink {
          from { width: 100%; }
          to { width: 0%; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
}