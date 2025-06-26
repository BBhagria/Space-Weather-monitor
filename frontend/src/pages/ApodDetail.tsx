
import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, Camera, Info } from 'lucide-react';

interface ApodData {
  title: string;
  date: string;
  explanation: string;
  url: string;
  copyright?: string;
  media_type: string;
  hdurl?: string;
}

const ApodDetail = () => {
  const navigate = useNavigate();
  const [apodData, setApodData] = useState<ApodData | null>(null);

  useEffect(() => {
    const fetchApod = async () => {
      try {
        const res = await fetch('https://nasa-explorer-dash.onrender.com/apod');
        const data = await res.json();
        setApodData(data);
      } catch (err) {
        console.error('Failed to fetch APOD data', err);
      }
    };

    fetchApod();
  }, []);

  if (!apodData) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading APOD...
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen relative"
      style={{
        backgroundImage: `url(${apodData.url})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
          <Button 
            onClick={() => navigate('/')}
            variant="outline"
            className="mr-4 bg-black/20 border-white/30 text-white hover:bg-black/40"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          <h1 className="text-4xl font-bold text-white bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Astronomy Picture of the Day
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Panel */}
          <Card className="bg-black/30 border-blue-500/30 backdrop-blur-md">
            <CardHeader>
              <CardTitle className="text-2xl text-white flex items-center">
                <Camera className="w-6 h-6 mr-2 text-blue-400" />
                {apodData.title}
              </CardTitle>
              <div className="flex items-center text-blue-300">
                <Calendar className="w-4 h-4 mr-2" />
                {apodData.date}
              </div>
            </CardHeader>
            <CardContent>
              <img 
                src={apodData.url} 
                alt={apodData.title}
                className="w-full h-64 object-cover rounded-lg shadow-lg border border-blue-500/20"
              />
              <p className="text-gray-300 text-sm mt-4">
                <strong>Copyright:</strong> {apodData.copyright || 'NASA'}
              </p>
              <p className="text-gray-300 text-sm">
                <strong>Media Type:</strong> {apodData.media_type}
              </p>
            </CardContent>
          </Card>

          {/* Information Panel */}
          <Card className="bg-black/30 border-purple-500/30 backdrop-blur-md">
            <CardHeader>
              <CardTitle className="text-2xl text-white flex items-center">
                <Info className="w-6 h-6 mr-2 text-purple-400" />
                Detailed Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-purple-300 mb-3">Explanation</h3>
                  <p className="text-gray-300 leading-relaxed">
                    {apodData.explanation}
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-purple-300">Quick Facts</h3>
                  <div className="grid grid-cols-1 gap-3">
                    <div className="p-3 rounded-lg bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-400/20">
                      <p className="text-white"><span className="text-purple-300">Distance:</span> ~1,470 light years</p>
                    </div>
                    <div className="p-3 rounded-lg bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-400/20">
                      <p className="text-white"><span className="text-purple-300">Size:</span> Nearly 3° across</p>
                    </div>
                    <div className="p-3 rounded-lg bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-400/20">
                      <p className="text-white"><span className="text-purple-300">Age:</span> 10,000–20,000 years</p>
                    </div>
                    <div className="p-3 rounded-lg bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-400/20">
                      <p className="text-white"><span className="text-purple-300">Expansion Speed:</span> {'>'}600,000 mph</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <Button
                    onClick={() => window.open(apodData.hdurl || apodData.url, '_blank')}
                    className="w-full bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white"
                  >
                    View High Resolution Image
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ApodDetail;