
import React from 'react';
import Navigation from '@/components/Navigation';
import SpaceWeatherSection from '@/components/SpaceWeatherSection';
import AsteroidMonitorSection from '@/components/AsteroidMonitorSection';
import APODSection from '@/components/APODSection';

const Index = () => {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Navigation />
      <SpaceWeatherSection />
      <AsteroidMonitorSection />
      <APODSection />
    </div>
  );
};

export default Index;
