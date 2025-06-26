import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { CalendarIcon } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format, subDays } from 'date-fns';
import { cn } from '@/lib/utils';

const AsteroidPanel: React.FC = () => {
  const [selectedDateRange, setSelectedDateRange] = useState<Date>(new Date());
  const [asteroids, setAsteroids] = useState<any[]>([]);

  useEffect(() => {
    const fetchAsteroids = async () => {
      const endDate = new Date();
      const startDate = new Date();
      startDate.setDate(endDate.getDate() - 6); // past 7 days

      const start = startDate.toISOString().split('T')[0];
      const end = endDate.toISOString().split('T')[0];

      try {
        const res = await fetch(`http://localhost:5000/neo/feed?start_date=${start}&end_date=${end}`);
        const data = await res.json();

        const extracted: any[] = [];
        for (const date in data.near_earth_objects) {
          data.near_earth_objects[date].forEach((a: any) => {
            if (a.is_potentially_hazardous_asteroid) {
              extracted.push({
                name: a.name,
                size: `${Math.round(a.estimated_diameter.meters.estimated_diameter_min)}–${Math.round(a.estimated_diameter.meters.estimated_diameter_max)} m`,
                speed: parseFloat(a.close_approach_data[0].relative_velocity.kilometers_per_second).toFixed(1),
                distance: `${parseFloat(a.close_approach_data[0].miss_distance.kilometers).toFixed(0)} km`,
                date: date,
                riskLevel: 'High'
              });
            }
          });
        }

        setAsteroids(extracted);
      } catch (err) {
        console.error('Failed to fetch asteroids:', err);
      }
    };

    fetchAsteroids();
  }, []);

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'High':
        return 'text-red-400 bg-red-500/20';
      case 'Medium':
        return 'text-orange-400 bg-orange-500/20';
      case 'Low':
        return 'text-green-400 bg-green-500/20';
      default:
        return 'text-gray-400 bg-gray-500/20';
    }
  };

  const speedChartData = asteroids.map((a) => ({
    date: a.date,
    speed: parseFloat(a.speed)
  }));

  return (
    <Card className="h-full bg-black/30 border-orange-500/30 backdrop-blur-md flex flex-col">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-white bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
          High Risk Asteroids Monitor
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col space-y-6 overflow-hidden">
        {/* High Risk Asteroids List */}
        <div className="flex-1 overflow-y-auto">
          <h3 className="text-xl font-semibold text-white mb-4">High Risk Objects (Past 3 Days)</h3>
          <div className="space-y-4">
            {asteroids.map((asteroid, index) => (
              <Card key={index} className="bg-black/20 border-orange-500/20 backdrop-blur-sm hover:bg-black/30 transition-all duration-300">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-bold text-lg text-white">{asteroid.name}</h4>
                      <p className="text-gray-300 text-sm">{asteroid.date}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getRiskColor(asteroid.riskLevel)}`}>
                      {asteroid.riskLevel} Risk
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-gray-400">Size:</span>
                      <span className="text-cyan-400 ml-2">{asteroid.size}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Speed:</span>
                      <span className="text-green-400 ml-2">{asteroid.speed} km/s</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Distance:</span>
                      <span className="text-yellow-400 ml-2">{asteroid.distance}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Speed Chart */}
        <Card className="bg-black/20 border-orange-500/20 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg text-orange-300">High Risk Asteroid Speeds (km/s)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={speedChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="date" stroke="#9CA3AF" fontSize={12} />
                <YAxis stroke="#9CA3AF" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    border: '1px solid rgba(249, 115, 22, 0.3)',
                    borderRadius: '8px',
                    color: 'white'
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="speed"
                  stroke="#F97316"
                  strokeWidth={3}
                  dot={{ fill: '#F97316', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: '#F97316', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
};

export default AsteroidPanel;
