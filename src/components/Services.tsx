import React from 'react';
import { CheckCircle, Zap, Target, Users } from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'AI-powered workflows that deliver results in record time without compromising quality.'
  },
  {
    icon: Target,
    title: 'Precision Focused',
    description: 'Every solution is tailored to your specific needs and business objectives.'
  },
  {
    icon: Users,
    title: 'Collaborative Approach',
    description: 'We work closely with you throughout the entire creative process.'
  },
  {
    icon: CheckCircle,
    title: 'Proven Results',
    description: 'Track record of successful projects that drive engagement and growth.'
  }
];

const Services = () => {
  return (
    <section id="services" className="py-20 bg-gradient-to-br from-[#e6ebf1] to-[#cbd5de]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Our Approach
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We leverage cutting-edge AI technology combined with human creativity to deliver 
            exceptional results that exceed expectations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="text-center group hover:scale-105 transition-transform duration-300"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="mb-6">
                <div className="w-20 h-20 bg-gradient-to-r from-[#3ccedb] to-[#b184db] rounded-full flex items-center justify-center mx-auto group-hover:shadow-2xl transition-shadow duration-300">
                  <feature.icon className="text-white" size={32} />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Process Flow */}
        <div className="mt-20">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Our Process
          </h3>
          <div className="flex flex-col md:flex-row items-center justify-between space-y-8 md:space-y-0 md:space-x-8">
            {['Discover', 'Create', 'Refine', 'Deliver'].map((step, index) => (
              <div key={step} className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-2xl font-bold text-[#3ccedb] shadow-lg mb-4">
                  {index + 1}
                </div>
                <h4 className="text-lg font-semibold text-gray-800">{step}</h4>
                {index < 3 && (
                  <div className="hidden md:block absolute w-24 h-0.5 bg-gradient-to-r from-[#3ccedb] to-[#b184db] transform translate-x-20 translate-y-8"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;