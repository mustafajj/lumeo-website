import React from 'react';
import { Palette, PenTool, Megaphone, Code, Image, Wand2 } from 'lucide-react';

const services = [
  {
    icon: Palette,
    title: 'Branding',
    description: 'Crafting unique brand identities that resonate with your audience and stand out in the market.'
  },
  {
    icon: PenTool,
    title: 'Content Creation',
    description: 'Engaging content that tells your story and connects with your customers across all platforms.'
  },
  {
    icon: Megaphone,
    title: 'Marketing',
    description: 'Strategic marketing campaigns that drive growth and maximize your digital presence.'
  },
  {
    icon: Code,
    title: 'Web Development',
    description: 'Modern, responsive websites that deliver exceptional user experiences and drive results.'
  },
  {
    icon: Image,
    title: 'AI-Generated Images & Videos',
    description: 'Cutting-edge AI visuals that bring your creative vision to life with stunning precision.'
  },
  {
    icon: Wand2,
    title: 'Creative Solutions',
    description: 'Innovative approaches to complex creative challenges using the latest AI technologies.'
  }
];

const About = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            What We Do
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We combine artificial intelligence with creative expertise to deliver comprehensive digital solutions
            that elevate your brand and engage your audience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="group p-8 rounded-2xl bg-gradient-to-br from-[#e6ebf1] to-white hover:from-white hover:to-[#e6ebf1] transition-all duration-500 hover:shadow-xl hover:-translate-y-2 border border-[#cbd5de]/30"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-[#3ccedb] to-[#b184db] rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <service.icon className="text-white" size={28} />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4 group-hover:text-[#3ccedb] transition-colors duration-300">
                {service.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;