
import React from 'react';

const Navigation = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">NASA</span>
            </div>
            <div className="text-white">
              <h1 className="text-xl font-bold">Space Explorer</h1>
              <p className="text-xs text-gray-300">National Aeronautics and Space Administration</p>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <a href="#space-weather" className="text-white hover:text-blue-300 transition-colors">Space Weather</a>
            <a href="#asteroid-monitor" className="text-white hover:text-blue-300 transition-colors">Asteroids</a>
            <a href="#apod" className="text-white hover:text-blue-300 transition-colors">APOD</a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
