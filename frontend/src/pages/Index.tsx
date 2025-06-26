
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import SpaceWeatherPanel from '@/components/SpaceWeatherPanel';
import AsteroidPanel from '@/components/AsteroidPanel';
import NavBar from '@/components/NavBar';

const Index = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedWeather, setSelectedWeather] = useState<string>('solar-flare');
  const [apodBackground, setApodBackground] = useState<string>('');
  const [apodTitle, setApodTitle] = useState<string>('Deep Space Nebula');

  // Mock APOD data - in real app, this would come from NASA API
  useEffect(() => {
  const fetchYesterdayApod = async () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const formattedDate = yesterday.toISOString().split('T')[0]; // YYYY-MM-DD

    try {
      const res = await fetch(`http://localhost:5000/apod?date=${formattedDate}`);
      const data = await res.json();
      setApodBackground(data.url);
      setApodTitle(data.title);
    } catch (err) {
      console.error('Failed to fetch APOD for yesterday:', err);
      // Fallback if fetch fails
      setApodBackground('https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=1920&h=1080&fit=crop');
      setApodTitle('Cosmic Web of the Cygnus Loop');
    }
  };

    fetchYesterdayApod();
  }, []);


  return (
    <div 
      className="min-h-screen relative"
      style={{
        backgroundImage: `url(${apodBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* APOD Background overlay */}
      <div className="absolute inset-0 bg-black/30" />
      
      {/* Navigation Bar */}
      <NavBar />
      
      {/* Main content */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Panel - Space Weather Card */}
          <div className="h-[900px]">
            <SpaceWeatherPanel/>
          </div>

          {/* Right Panel - Asteroid Data Card */}
          <div className="h-[900px]">
            <AsteroidPanel />
          </div>
        </div>
        
        {/* Buttons Row - positioned outside and below the cards */}
        <div className="mt-8 flex justify-between items-center">
          {/* APOD Button - left side */}
          <Button
            onClick={() => navigate('/apod')}
            variant="ghost"
            className="text-white hover:text-blue-300 bg-black/40 hover:bg-black/60 backdrop-blur-sm border border-white/20 hover:border-blue-300/40 transition-all duration-300"
          >
            APOD Picture of the Day: "{apodTitle}"
          </Button>
          
          {/* More Info Button - right side */}
          <Button 
            onClick={() => navigate('/asteroids')}
            className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            More Info
          </Button>
        </div>
      </div>

      {/* Floating particles animation */}
      <div className="absolute inset-0 pointer-events-none z-5">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-70 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Index;
