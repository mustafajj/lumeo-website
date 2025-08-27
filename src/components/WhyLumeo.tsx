import React from 'react';
import { Lightbulb, Zap, Palette, Award } from 'lucide-react';

const values = [
  {
    icon: Lightbulb,
    title: 'Innovation',
    description: 'We stay at the forefront of AI technology, constantly exploring new possibilities to push creative boundaries.',
    stat: '100+',
    statLabel: 'AI Models Used'
  },
  {
    icon: Zap,
    title: 'Simplicity',
    description: 'Complex AI technology made simple. We handle the technical complexity so you can focus on your vision.',
    stat: '24h',
    statLabel: 'Average Turnaround'
  },
  {
    icon: Palette,
    title: 'AI-Driven Creativity',
    description: 'Human creativity enhanced by artificial intelligence, delivering results that exceed traditional limitations.',
    stat: '500+',
    statLabel: 'Projects Completed'
  },
  {
    icon: Award,
    title: 'Professional Results',
    description: 'Enterprise-grade quality with attention to detail that ensures your brand stands out in the market.',
    stat: '98%',
    statLabel: 'Client Satisfaction'
  }
];

const WhyLumeo = () => {
  return (
    <section id="why-lumeo" className="py-20 bg-gradient-to-br from-[#e6ebf1] via-white to-[#cbd5de] relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-r from-[#3ccedb]/10 to-[#b184db]/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-r from-[#b184db]/10 to-[#3ccedb]/10 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Why Choose Lumeo?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We combine cutting-edge AI technology with human creativity to deliver 
            exceptional results that transform your brand and captivate your audience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {values.map((value, index) => (
            <div
              key={value.title}
              className="group relative"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 hover:bg-white transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 border border-[#cbd5de]/30">
                <div className="flex items-start space-x-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-r from-[#3ccedb] to-[#b184db] rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <value.icon className="text-white" size={28} />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-[#3ccedb] transition-colors duration-300">
                      {value.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      {value.description}
                    </p>
                    <div className="flex items-center space-x-2">
                      <span className="text-3xl font-bold bg-gradient-to-r from-[#3ccedb] to-[#b184db] bg-clip-text text-transparent">
                        {value.stat}
                      </span>
                      <span className="text-sm text-gray-500 font-medium">
                        {value.statLabel}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-20 text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-8">
            Trusted by Forward-Thinking Companies
          </h3>
          <div className="flex flex-wrap justify-center items-center space-x-8 opacity-60">
            {['Startup', 'Enterprise', 'Agency', 'E-commerce', 'SaaS', 'Creative'].map((type) => (
              <div key={type} className="text-lg font-semibold text-gray-600 mb-4">
                {type}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyLumeo;