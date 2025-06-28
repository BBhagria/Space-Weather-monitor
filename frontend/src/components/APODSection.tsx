import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const APODSection = () => {
  const [apodData, setApodData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAPOD = async () => {
      try {
        const res = await fetch('https://space-weather-monitor.onrender.com/apod');
        const data = await res.json();
        setApodData(data);
      } catch (error) {
        console.error('Error fetching APOD:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAPOD();
  }, []);

  return (
        <section
      id="apod"
      className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-900 to-black px-4 font-light"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-6xl md:text-8xl text-white mb-6 tracking-tight font-light">
            Astronomy Picture of the Day
          </h2>
          <p className="text-2xl md:text-3xl text-white/90 mb-8 max-w-3xl mx-auto font-light leading-relaxed">
            Discover the cosmos with NASA's daily featured astronomy image
          </p>
        </div>

        {!loading && apodData ? (
          <Card className="bg-black/30 border-yellow-500/30 backdrop-blur-sm overflow-hidden hover:bg-black/40 transition-all duration-300 hover:scale-[1.02] font-light">
            <div className="md:flex">
              <div className="md:w-1/2">
                {apodData.media_type === 'image' ? (
                  <img
                    src={apodData.url}
                    alt={apodData.title}
                    className="w-full h-64 md:h-full object-cover"
                  />
                ) : (
                  <iframe
                    src={apodData.url}
                    title={apodData.title}
                    className="w-full h-64 md:h-full"
                    allowFullScreen
                  />
                )}
              </div>
              <div className="md:w-1/2 p-6">
                <CardHeader className="p-0 mb-4">
                  <CardTitle className="text-yellow-400 text-2xl mb-2 font-light">
                    {apodData.title}
                  </CardTitle>
                  <CardDescription className="text-gray-400 font-light">{apodData.date}</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <p className="text-gray-300 leading-relaxed mb-6 font-light">
                    {apodData.explanation}
                  </p>
                  <a href={apodData.hdurl || apodData.url} target="_blank" rel="noopener noreferrer">
                    <Button className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-2 rounded-full transition-all duration-300 hover:scale-105 font-light">
                      View Full Resolution
                    </Button>
                  </a>
                </CardContent>
              </div>
            </div>
          </Card>
        ) : (
          <div className="text-center">
            <div className="animate-pulse">
              <div className="bg-gray-700 h-64 rounded-lg mb-4"></div>
              <div className="bg-gray-700 h-4 rounded w-3/4 mx-auto mb-2"></div>
              <div className="bg-gray-700 h-4 rounded w-1/2 mx-auto"></div>
            </div>
          </div>
        )}
      </div>
    </section>

  );
};

export default APODSection;