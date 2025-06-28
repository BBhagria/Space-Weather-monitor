import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

type Asteroid = {
  name: string;
  size: string;
  speed: string;
  distance: string;
  date: string;
  riskLevel: string;
};

const AsteroidMonitorSection = () => {
  const navigate = useNavigate();
  const [asteroids, setAsteroids] = useState<Asteroid[]>([]);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const fetchAsteroids = async () => {
      const endDate = new Date();
      const startDate = new Date();
      startDate.setDate(endDate.getDate() - 6); // past 7 days
      const start = startDate.toISOString().split('T')[0];
      const end = endDate.toISOString().split('T')[0];

      try {
        const res = await fetch(`https://space-weather-monitor.onrender.com/neo/feed?start_date=${start}&end_date=${end}`);
        const data = await res.json();

        const extracted: Asteroid[] = [];
        for (const date in data.near_earth_objects) {
          data.near_earth_objects[date].forEach((a: any) => {
            if (a.is_potentially_hazardous_asteroid) {
              extracted.push({
                name: a.name,
                size: `${Math.round(a.estimated_diameter.meters.estimated_diameter_min)}–${Math.round(a.estimated_diameter.meters.estimated_diameter_max)} m`,
                speed: parseFloat(a.close_approach_data[0].relative_velocity.kilometers_per_second).toFixed(1),
                distance: `${parseFloat(a.close_approach_data[0].miss_distance.kilometers).toFixed(0)} km`,
                date: date,
                riskLevel: 'High',
              });
            }
          });
        }

        setAsteroids(extracted.slice(0, 3)); // limit to 3 for display
      } catch (err) {
        console.error('Failed to fetch asteroids:', err);
      }
    };

    fetchAsteroids();
  }, []);

  const handleLearnMore = () => {
    navigate('/asteroid-monitor');
  };

  return (
    <section 
      id="asteroid-monitor" 
      className="min-h-screen flex flex-col justify-between px-4 relative overflow-hidden"
      style={{
        backgroundImage: "url('/background/asteroid.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="max-w-6xl mx-auto flex flex-col justify-between min-h-screen relative z-30">
        <div className="text-center pt-24 animate-fade-in">
          <h2 className="text-6xl md:text-8xl font-light text-white mb-6 tracking-tight">
            Asteroid Monitor
          </h2>
          <p className="text-2xl md:text-3xl text-white/90 mb-8 max-w-4xl mx-auto font-light leading-relaxed">
            Track near-Earth objects and potential threats.
          </p>
          <Button 
            onClick={handleLearnMore}
            className="bg-white/10 hover:bg-white/20 text-white px-8 py-3 text-base font-light rounded-full transition-all duration-300 hover:scale-105 shadow-2xl border border-white/20 backdrop-blur-sm mb-16"
          >
            Learn more
          </Button>
        </div>

        <div className="pb-16 relative">
          <div className="flex justify-between items-end max-w-6xl mx-auto">
            <Card className="bg-black/70 border-none backdrop-blur-xl hover:bg-black/80 transition-all duration-300 hover:scale-105 rounded-xl overflow-hidden w-80">
              <CardHeader className="pb-3 bg-gradient-to-br from-purple-600/20 to-pink-600/20">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">🌑</span>
                  </div>
                  <CardTitle className="text-white text-lg font-light text-left">Near-Earth Objects</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3 pt-3">
                {asteroids.length > 0 ? (
                  asteroids.map((a, i) => (
                    <div key={i} className="flex justify-between items-center text-white/90 p-2 bg-white/5 rounded-lg">
                      <div>
                        <div className="font-light text-sm">{a.name}</div>
                        <div className="text-xs text-white/60">~{a.size} diameter</div>
                      </div>
                      <span className="text-yellow-400 font-light px-2 py-1 bg-yellow-400/20 rounded-full text-xs">Monitoring</span>
                    </div>
                  ))
                ) : (
                  <div className="text-white text-sm">Loading data...</div>
                )}
              </CardContent>
            </Card>

            <Card className="bg-black/70 border-none backdrop-blur-xl hover:bg-black/80 transition-all duration-300 hover:scale-105 rounded-xl overflow-hidden w-80">
              <CardHeader className="pb-3 bg-gradient-to-br from-green-600/20 to-emerald-600/20">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">🎯</span>
                  </div>
                  <CardTitle className="text-white text-lg font-light text-left">Impact Risk Assessment</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3 pt-3">
                <div className="text-center">
                  <div className="text-4xl font-light text-green-400 mb-1">0.001%</div>
                  <p className="text-white/80 font-light text-sm">Current Risk Level</p>
                  <p className="text-white/60 text-xs mt-1">Next 100 years</p>
                </div>
                <div className="w-full bg-white/20 rounded-full h-3">
                  <div className="bg-gradient-to-r from-green-400 to-emerald-500 h-3 rounded-full w-1/12"></div>
                </div>
                <div className="text-center text-white/70 text-xs font-light">
                  Based on current tracking data
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AsteroidMonitorSection;
