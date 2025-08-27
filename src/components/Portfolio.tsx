import React from 'react';
import { Play } from 'lucide-react';

const portfolioItems = [
  {
    title: 'AI Brand Identity',
    category: 'Branding',
    description: 'Complete brand transformation using AI-generated visual elements',
    image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
    type: 'image'
  },
  {
    title: 'Dynamic Web Experience',
    category: 'Web Development',
    description: 'Interactive website with AI-powered personalization',
    image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800',
    type: 'image'
  },
  {
    title: 'AI Video Campaign',
    category: 'Content Creation',
    description: 'Engaging video content generated with cutting-edge AI',
    image: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800',
    type: 'video'
  },
  {
    title: 'Marketing Automation',
    category: 'Marketing',
    description: 'AI-driven marketing campaigns with personalized content',
    // image: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpg?auto=compress&cs=tinysrgb&w=800',
    image: 'https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=800',
    type: 'image'
  },
  {
    title: 'Visual Storytelling',
    category: 'AI Visuals',
    description: 'Stunning AI-generated imagery for brand storytelling',
    image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800',
    type: 'image'
  },
  {
    title: 'Creative Solutions',
    category: 'Innovation',
    description: 'Breakthrough creative concepts powered by AI technology',
    image: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=800',
    type: 'image'
  }
];

const Portfolio = () => {
  return (
    <section id="portfolio" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Our Work
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our portfolio of AI-powered creative solutions that have transformed 
            brands and captivated audiences worldwide.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioItems.map((item, index) => (
            <div
              key={item.title}
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#e6ebf1] to-white hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Play button for videos */}
                {item.type === 'video' && (
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
                      <Play className="text-[#3ccedb] ml-1" size={24} />
                    </div>
                  </div>
                )}
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-[#3ccedb] bg-[#3ccedb]/10 px-3 py-1 rounded-full">
                    {item.category}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-[#3ccedb] transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Us Button */}
        <div className="text-center mt-12">
          <button 
            onClick={() => {
              const element = document.getElementById('contact');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="bg-gradient-to-r from-[#3ccedb] to-[#b184db] text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            Contact Us
          </button>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
