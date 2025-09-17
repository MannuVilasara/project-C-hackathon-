import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 pt-16">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <img 
          src="/background-auth.webp" 
          alt="Background" 
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-black/70"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6">
              About <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">SecureAuth</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Leading the future of cybersecurity with enterprise-grade authentication solutions, 
              protecting organizations and individuals from evolving digital threats.
            </p>
          </div>

          {/* Mission Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div className="bg-black/40 backdrop-blur-xl rounded-3xl p-8 border border-white/10">
              <div className="flex items-center mb-6">
                <div className="bg-blue-500/20 p-3 rounded-2xl mr-4">
                  <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-white">Our Mission</h2>
              </div>
              <p className="text-gray-300 leading-relaxed">
                To democratize cybersecurity by providing advanced, user-friendly authentication solutions 
                that protect digital identities and secure access to critical resources.
              </p>
            </div>

            <div className="bg-black/40 backdrop-blur-xl rounded-3xl p-8 border border-white/10">
              <div className="flex items-center mb-6">
                <div className="bg-green-500/20 p-3 rounded-2xl mr-4">
                  <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-white">Our Vision</h2>
              </div>
              <p className="text-gray-300 leading-relaxed">
                To create a world where digital security is seamless, intelligent, and unbreachable. 
                We envision a future where authentication adapts to user behavior while maintaining 
                the highest standards of privacy and protection.
              </p>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center bg-black/40 backdrop-blur-xl rounded-3xl p-12 border border-white/10">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Secure Your Digital Future?</h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Join thousands of organizations that trust SecureAuth to protect their most valuable digital assets.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/signup"
                className="bg-white text-black px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors duration-300"
              >
                Get Started Free
              </Link>
              <Link
                to="/contact"
                className="border border-white/30 text-white px-8 py-3 rounded-xl font-semibold hover:bg-white/10 transition-colors duration-300"
              >
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
