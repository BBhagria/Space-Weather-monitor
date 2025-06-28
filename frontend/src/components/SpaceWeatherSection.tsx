
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

const fetchDonkiData = async (eventType) => {
  const endDate = new Date().toISOString().split('T')[0];
  const startDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  const response = await fetch(`https://nasa-explorer-dash.onrender.com/donki?eventType=${eventType}&startDate=${startDate}&endDate=${endDate}`);
  return response.json();
};

const SpaceWeatherSection = () => {
  const navigate = useNavigate();

  const { data: solarFlares = [] } = useQuery({
    queryKey: ['solarFlares'],
    queryFn: () => fetchDonkiData('FLR'),
    refetchInterval: 10000,
  });

  const { data: geoStorms = [] } = useQuery({
    queryKey: ['geoStorms'],
    queryFn: () => fetchDonkiData('GST'),
    refetchInterval: 10000,
  });

  const { data: solarWind = [] } = useQuery({
    queryKey: ['solarWind'],
    queryFn: () => fetchDonkiData('WSAEnlilSimulations'),
    refetchInterval: 10000,
  });

  const handleLearnMore = () => {
    navigate('/space-weather');
  };

  return (
    <section 
      id="space-weather" 
      className="min-h-screen flex flex-col justify-between px-4 relative overflow-hidden"
      style={{
        backgroundImage: "url('/background/solarflare.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="absolute inset-0 bg-black/40"></div>
      
      <div className="max-w-6xl mx-auto flex flex-col justify-between min-h-screen relative z-10">
        <div className="text-center pt-24 animate-fade-in">
          <h2 className="text-6xl md:text-8xl font-light text-white mb-6 tracking-tight">
            Space Weather
          </h2>
          <p className="text-2xl md:text-3xl text-white/90 mb-12 max-w-4xl mx-auto font-light leading-relaxed">
            Monitor solar storms and space conditions.
          </p>
        </div>

        <div className="pb-16">
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-black/70 border-none backdrop-blur-xl hover:bg-black/80 transition-all duration-300 hover:scale-105 rounded-xl overflow-hidden scale-75">
              <CardHeader className="pb-3 bg-gradient-to-br from-orange-600/20 to-red-600/20">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">☀️</span>
                  </div>
                  <div>
                    <CardTitle className="text-white text-lg font-light text-left">Solar Flares</CardTitle>
                    <CardDescription className="text-orange-200 text-xs text-left">
                      {solarFlares.length > 3 ? 'High Activity' : solarFlares.length > 0 ? 'Moderate Activity' : 'Low Activity'}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="w-full bg-white/20 rounded-full h-2 mb-3">
                  <div
                    className="bg-gradient-to-r from-orange-400 to-red-500 h-2 rounded-full"
                    style={{ width: `${Math.min(100, solarFlares.length * 20)}%` }}
                  ></div>
                </div>
                <div className="text-white/90 text-xs font-light">
                  {solarFlares.length > 0 ? 'X-ray flux detected' : 'No recent activity'}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/70 border-none backdrop-blur-xl hover:bg-black/80 transition-all duration-300 hover:scale-105 rounded-xl overflow-hidden scale-75">
              <CardHeader className="pb-3 bg-gradient-to-br from-green-600/20 to-blue-600/20">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">🌍</span>
                  </div>
                  <div>
                    <CardTitle className="text-white text-lg font-light text-left">Geomagnetic Field</CardTitle>
                    <CardDescription className="text-green-200 text-xs text-left">
                      {geoStorms.length > 2 ? 'Unstable' : geoStorms.length > 0 ? 'Active' : 'Stable'}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="w-full bg-white/20 rounded-full h-2 mb-3">
                  <div
                    className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full"
                    style={{ width: `${Math.min(100, geoStorms.length * 25)}%` }}
                  ></div>
                </div>
                <div className="text-white/90 text-xs font-light">
                  {geoStorms.length > 0 ? 'Disturbances detected' : 'Planetary K-index within normal range'}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/70 border-none backdrop-blur-xl hover:bg-black/80 transition-all duration-300 hover:scale-105 rounded-xl overflow-hidden scale-75">
              <CardHeader className="pb-3 bg-gradient-to-br from-blue-600/20 to-purple-600/20">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">💨</span>
                  </div>
                  <div>
                    <CardTitle className="text-white text-lg font-light text-left">Cosmic Radiation</CardTitle>
                    <CardDescription className="text-blue-200 text-xs text-left">
                      {solarWind.length > 0 ? 'Nominal' : 'Low Level'}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="w-full bg-white/20 rounded-full h-2 mb-3">
                  <div
                    className="bg-gradient-to-r from-blue-400 to-purple-500 h-2 rounded-full"
                    style={{ width: `${Math.min(100, solarWind.length * 10)}%` }}
                  ></div>
                </div>
                <div className="text-white/90 text-xs font-light">
                  {solarWind.length > 0 ? 'Solar wind parameters nominal' : 'Awaiting solar wind data'}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <Button
              onClick={handleLearnMore}
              className="bg-white/10 hover:bg-white/20 text-white px-8 py-3 text-base font-light rounded-full transition-all duration-300 hover:scale-105 shadow-2xl border border-white/20 backdrop-blur-sm"
            >
              Learn more
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpaceWeatherSection;

