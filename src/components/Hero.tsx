import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

const Hero = () => {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#e6ebf1] via-white to-[#cbd5de]">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-[#3ccedb]/20 to-[#b184db]/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-[#b184db]/20 to-[#3ccedb]/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Logo */}
        <div className="mb-8 animate-fade-in">
          <img 
            src="/logo.png" 
            alt="Lumeo Logo" 
            className="h-24 w-auto mx-auto drop-shadow-lg" 
          />
          <div className="flex items-center justify-center space-x-2">
            <Sparkles className="text-[#3ccedb] animate-pulse" size={24} />
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-[#3ccedb] to-[#b184db] bg-clip-text text-transparent">
              Lumeo
            </h1>
            <Sparkles className="text-[#b184db] animate-pulse delay-500" size={24} />
          </div>
        </div>

        {/* Main Headline */}
        <h2 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6 animate-slide-up">
          Powering Creativity with AI
        </h2>

        {/* Subheadline */}
        <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed animate-slide-up delay-200">
          From branding to AI-generated visuals, Lumeo transforms ideas into impactful digital experiences.
        </p>

        {/* CTA Button */}
        <button
          onClick={scrollToContact}
          className="group bg-gradient-to-r from-[#3ccedb] to-[#b184db] text-white px-12 py-4 rounded-full text-lg font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300 animate-slide-up delay-400"
        >
          <span className="flex items-center space-x-2">
            <span>Work With Us</span>
            <ArrowRight className="group-hover:translate-x-1 transition-transform duration-300" size={20} />
          </span>
        </button>

        {/* Floating Elements */}
        <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-[#3ccedb] rounded-full animate-float"></div>
        <div className="absolute top-1/3 right-1/4 w-6 h-6 bg-[#b184db] rounded-full animate-float delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-[#3ccedb] rounded-full animate-float delay-2000"></div>
      </div>
    </section>
  );
};

export default Hero;
