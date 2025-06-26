
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
  const navigate = useNavigate();

  return (
    <nav className="relative z-20 bg-gradient-to-b from-black/80 to-transparent backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* NASA Logo */}
        <div className="flex items-center space-x-3">
          <img 
            src="https://www.nasa.gov/wp-content/themes/nasa/assets/images/nasa-logo.svg" 
            alt="NASA Logo" 
            className="h-12 w-auto filter invert"
            onError={(e) => {
              e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ctext y='50' font-size='20' fill='white'%3ENASA%3C/text%3E%3C/svg%3E";
            }}
          />
          <span className="text-white text-xl font-bold">Space Weather Monitor</span>
        </div>

        {/* About Button */}
        <Button 
          onClick={() => navigate('/about')}
          variant="outline"
          className="bg-black/20 border-white/30 text-white hover:bg-black/40 hover:border-white/50 transition-all duration-300"
        >
          About
        </Button>
      </div>
    </nav>
  );
};

export default NavBar;
