import React from 'react';
import { Heart, Facebook, Instagram, Linkedin, Music2 } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <img 
                src="/logo.png" 
                alt="Lumeo Logo" 
                className="h-10 w-auto" 
                style={{ marginTop: '6px' }}
              />
              <span className="text-2xl font-bold bg-gradient-to-r from-[#3ccedb] to-[#b184db] bg-clip-text text-transparent">
                Lumeo
              </span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Powering creativity with AI. We transform ideas into impactful digital experiences 
              through innovative technology and human creativity.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://www.instagram.com/lumeo.aistudio/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#3ccedb] transition-colors duration-300"
              >
                <Instagram size={18} />
              </a>
              <a 
                href="https://www.facebook.com/share/1BGXwCnWD7/?mibextid=wwXIfr" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#3ccedb] transition-colors duration-300"
              >
                <Facebook size={18} />
              </a>
              <a 
                href="https://www.tiktok.com/@lumeo.aistudio" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#3ccedb] transition-colors duration-300"
              >
                <Music2 size={18} />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#3ccedb] transition-colors duration-300"
              >
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Services</h3>
            <ul className="space-y-3">
              {['Branding', 'Content Creation', 'Marketing', 'Web Development', 'AI Visuals', 'Creative Solutions'].map((service) => (
                <li key={service}>
                  <a href="#" className="text-gray-400 hover:text-[#3ccedb] transition-colors duration-300">
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Company</h3>
            <ul className="space-y-3">
              {['About Us', 'Portfolio', 'Careers', 'Blog', 'Contact', 'Privacy Policy'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-400 hover:text-[#3ccedb] transition-colors duration-300">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © {currentYear} Lumeo. All rights reserved.
          </p>
          <p className="text-gray-400 text-sm flex items-center">
            Made with <Heart className="mx-1 text-red-500" size={16} /> and AI
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
