
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

interface DonkiEvent {
  activityID?: string;
  beginTime?: string;
  peakTime?: string;
  endTime?: string;
  classType?: string;
  sourceLocation?: string;
  note?: string;
  linkedEvents?: any[];
  instruments?: any[];
  cmeAnalyses?: any[];
  kpIndex?: number;
  source?: string;
  speed?: number;
}

const SpaceWeather = () => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleString());

  // Replace all fetch calls in your useQuery hooks with this corrected code:

  // Fetch Solar Flares
  const { data: solarFlares = [] } = useQuery({
    queryKey: ['solarFlares'],
    queryFn: async () => {
      const endDate = new Date().toISOString().split('T')[0];
      const startDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
      const response = await fetch(`https://nasa-explorer-dash.onrender.com/donki?eventType=FLR&startDate=${startDate}&endDate=${endDate}`);
      return response.json();
    },
    refetchInterval: 10000,
  });

  // Fetch Coronal Mass Ejections
  const { data: cmeEvents = [] } = useQuery({
    queryKey: ['cmeEvents'],
    queryFn: async () => {
      const endDate = new Date().toISOString().split('T')[0];
      const startDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
      const response = await fetch(`https://nasa-explorer-dash.onrender.com/donki?eventType=CME&startDate=${startDate}&endDate=${endDate}`);
      return response.json();
    },
    refetchInterval: 10000,
  });

  // Fetch Geomagnetic Storms
  const { data: geoStorms = [] } = useQuery({
    queryKey: ['geoStorms'],
    queryFn: async () => {
      const endDate = new Date().toISOString().split('T')[0];
      const startDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
      const response = await fetch(`https://nasa-explorer-dash.onrender.com/donki?eventType=GST&startDate=${startDate}&endDate=${endDate}`);
      return response.json();
    },
    refetchInterval: 10000,
  });

  // Fetch Solar Wind
  const { data: solarWind = [] } = useQuery({
    queryKey: ['solarWind'],
    queryFn: async () => {
      const endDate = new Date().toISOString().split('T')[0];
      const startDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
      const response = await fetch(`https://nasa-explorer-dash.onrender.com/donki?eventType=WSAEnlilSimulations&startDate=${startDate}&endDate=${endDate}`);
      return response.json();
    },
    refetchInterval: 10000,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const getLatestEvent = (events: DonkiEvent[]) => {
    return events.length > 0 ? events[0] : null;
  };

  const formatEventTime = (timeString?: string) => {
    if (!timeString) return 'N/A';
    return new Date(timeString).toLocaleDateString();
  };

  const getRiskLevel = (type: string, data: any[]) => {
    if (data.length === 0) return 'LOW';
    if (data.length > 3) return 'HIGH';
    return 'MODERATE';
  };

  const getActivityLevel = (events: DonkiEvent[]) => {
    return events.length > 5 ? 10 : Math.max(1, events.length * 2);
  };

  return (
    <div 
      className="min-h-screen flex flex-col justify-between px-4 relative overflow-hidden"
      style={{
        backgroundImage: "url('/background/spaceweather.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/90 via-white/80 to-white/90"></div>
      <div className="container mx-auto px-4 py-8 relative z-10">
        <Button 
          onClick={() => navigate('/')}
          className="mb-6 bg-gray-800 hover:bg-gray-900 text-white border border-gray-300"
        >
          ← Back to Home
        </Button>
        
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <h1 className="text-4xl md:text-6xl font-light text-gray-900 tracking-tight">
              Space Weather Storm Tracker
            </h1>
          </div>
          <p className="text-xl text-gray-800 mb-4 font-light">
            Real-time Solar Activity & Geomagnetic Conditions
          </p>
          <div className="flex items-center justify-center gap-2">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-gray-700 font-light">Live Data Feed</span>
          </div>
          <p className="text-sm text-gray-600 mt-2 font-light">
            Last updated: {currentTime}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5 max-w-6xl mx-auto mb-6">
          <Card className="bg-gray-900/90 border-orange-500/30 backdrop-blur-xl scale-90">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <span className="text-xl">☀️</span>
                <CardTitle className="text-orange-400 text-lg font-light">Solar Flare Activity</CardTitle>
              </div>
              <CardDescription className="text-gray-300 font-light">
                Current solar X-ray flux
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-300 font-light">Risk Level</span>
                <span className={`px-2 py-1 rounded-full text-xs font-light ${
                  getRiskLevel('flares', solarFlares) === 'LOW' ? 'bg-green-500 text-white' :
                  getRiskLevel('flares', solarFlares) === 'MODERATE' ? 'bg-orange-500 text-white' :
                  'bg-red-500 text-white'
                }`}>
                  {getRiskLevel('flares', solarFlares)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300 font-light">Activity Level</span>
                <span className="text-white text-lg font-light">{getActivityLevel(solarFlares)}/10</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2">
                <div 
                  className="bg-orange-400 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${getActivityLevel(solarFlares) * 10}%` }}
                ></div>
              </div>
              <div className="bg-orange-900/30 p-2 rounded-lg">
                <div className="text-orange-400 font-light text-sm">Last Flare Event</div>
                <div className="text-white font-light text-sm">
                  {getLatestEvent(solarFlares)?.classType || 'No recent activity'}
                </div>
                <div className="text-white/60 text-xs font-light">
                  {formatEventTime(getLatestEvent(solarFlares)?.beginTime)}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/90 border-blue-500/30 backdrop-blur-xl scale-90">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <span className="text-xl">🌍</span>
                <CardTitle className="text-blue-400 text-lg font-light">Geomagnetic Activity</CardTitle>
              </div>
              <CardDescription className="text-gray-300 font-light">
                Planetary K-index monitoring
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-300 font-light">Storm Level</span>
                <span className={`px-2 py-1 rounded-full text-xs font-light ${
                  getRiskLevel('geo', geoStorms) === 'LOW' ? 'bg-green-500 text-white' :
                  getRiskLevel('geo', geoStorms) === 'MODERATE' ? 'bg-orange-500 text-white' :
                  'bg-red-500 text-white'
                }`}>
                  {getRiskLevel('geo', geoStorms)}
                </span>
              </div>
              <div className="flex items-center justify-center">
                <div className="text-center">
                  <div className="text-3xl font-light text-blue-400 mb-1">
                    {getLatestEvent(geoStorms)?.kpIndex || '3'}
                  </div>
                  <div className="text-gray-300 text-sm font-light">Current Kp Index</div>
                </div>
              </div>
              <div className="grid grid-cols-12 gap-1">
                {Array.from({ length: 12 }, (_, i) => (
                  <div 
                    key={i}
                    className={`h-4 rounded ${
                      i < 3 ? 'bg-green-500' :
                      i < 6 ? 'bg-yellow-500' :
                      i < 9 ? 'bg-orange-500' :
                      'bg-red-500'
                    }`}
                  />
                ))}
              </div>
              <div className="text-center text-gray-400 text-xs font-light">24-Hour Forecast</div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/90 border-green-500/30 backdrop-blur-xl scale-90">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <span className="text-xl">🌌</span>
                <CardTitle className="text-green-400 text-lg font-light">Aurora Forecast</CardTitle>
              </div>
              <CardDescription className="text-gray-300 font-light">
                Northern lights visibility
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-300 font-light">Intensity</span>
                <span className="px-2 py-1 rounded-full text-xs font-light bg-orange-500 text-white">
                  MODERATE
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300 font-light">Visibility</span>
                <span className="text-white text-lg font-light">32%</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2">
                <div className="bg-green-400 h-2 rounded-full w-1/3"></div>
              </div>
              <div className="space-y-1">
                <div className="text-green-400 font-light text-sm">Best Viewing Locations</div>
                {['Alaska', 'Northern Canada', 'Scandinavia', 'Northern Russia'].map((location) => (
                  <div key={location} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-gray-300 text-sm font-light">{location}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-gray-900/90 border-purple-500/30 backdrop-blur-xl max-w-6xl mx-auto scale-90">
          <CardHeader>
            <div className="flex items-center gap-2">
              <span className="text-xl">💨</span>
              <CardTitle className="text-purple-400 text-xl font-light">Solar Wind Parameters</CardTitle>
            </div>
            <CardDescription className="text-gray-300 font-light">
              Real-time solar wind measurements
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-4xl font-light text-purple-400 mb-2">345</div>
                <div className="text-gray-400 font-light">km/s</div>
                <div className="text-gray-300 font-light">Wind Speed</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-light text-blue-400 mb-2">3.2</div>
                <div className="text-gray-400 font-light">p/cm³</div>
                <div className="text-gray-300 font-light">Particle Density</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-light text-orange-400 mb-2">110,055</div>
                <div className="text-gray-400 font-light">K</div>
                <div className="text-gray-300 font-light">Temperature</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SpaceWeather;
