import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import Meteor from '@/components/Meteor';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ArrowLeft, CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface AsteroidData {
  name: string;
  size: string;
  speed: string;
  distance: string;
  riskLevel: 'High' | 'Medium' | 'Low';
  orbitalPeriod?: string;
  magnitude?: string;
  isPotentiallyHazardous: boolean;
  closeApproachDate: string;
  velocity: string;
  diameter: string;
}

const AsteroidsDetail = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [asteroids, setAsteroids] = useState<AsteroidData[]>([]);

  useEffect(() => {
    const fetchAsteroids = async () => {
      const dateStr = selectedDate.toISOString().split('T')[0];

      try {
        const res = await fetch(`http://localhost:5000/neo/feed?start_date=${dateStr}&end_date=${dateStr}`);
        const data = await res.json();

        const results: AsteroidData[] = [];

        for (const entry of data.near_earth_objects[dateStr] || []) {
          const closeApproach = entry.close_approach_data?.[0];
          results.push({
            name: entry.name,
            size: `${Math.round(entry.estimated_diameter.meters.estimated_diameter_min)}–${Math.round(entry.estimated_diameter.meters.estimated_diameter_max)} m`,
            speed: `${parseFloat(closeApproach.relative_velocity.kilometers_per_second).toFixed(1)} km/s`,
            distance: `${parseFloat(closeApproach.miss_distance.kilometers).toFixed(0)} km`,
            riskLevel: entry.is_potentially_hazardous_asteroid ? 'High' : 'Low',
            orbitalPeriod: entry.orbital_data?.orbital_period ? `${parseFloat(entry.orbital_data.orbital_period).toFixed(1)} days` : 'N/A',
            magnitude: entry.absolute_magnitude_h?.toFixed(1),
            isPotentiallyHazardous: entry.is_potentially_hazardous_asteroid,
            closeApproachDate: dateStr,
            velocity: `${parseFloat(closeApproach.relative_velocity.kilometers_per_hour).toFixed(0)} km/h`,
            diameter: `${Math.round(entry.estimated_diameter.meters.estimated_diameter_min + entry.estimated_diameter.meters.estimated_diameter_max) / 2} m`,
          });
        }

        setAsteroids(results);
      } catch (error) {
        console.error('Error fetching asteroid data:', error);
        setAsteroids([]);
      }
    };

    fetchAsteroids();
  }, [selectedDate]);

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'High': return 'text-red-400 bg-red-500/20 border-red-500/40';
      case 'Medium': return 'text-orange-400 bg-orange-500/20 border-orange-500/40';
      case 'Low': return 'text-green-400 bg-green-500/20 border-green-500/40';
      default: return 'text-gray-400 bg-gray-500/20 border-gray-500/40';
    }
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <div id="starfield" className="absolute inset-0 pointer-events-none"></div>
      <div className="absolute inset-0 pointer-events-none z-50">
        {[...Array(20)].map((_, i) => <Meteor key={i} index={i} />)}
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
          <Button onClick={() => navigate('/')} variant="outline" className="mr-4 bg-black/20 border-white/30 text-white hover:bg-black/40">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          <h1 className="text-4xl font-bold text-white bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
            Detailed Asteroid Information
          </h1>
        </div>

        <Card className="bg-black/30 border-orange-500/30 backdrop-blur-md mb-8">
          <CardHeader>
            <CardTitle className="text-xl text-white mb-4">Select Date for Asteroid Data</CardTitle>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn("w-80 justify-start text-left font-normal bg-black/20 border-orange-500/30 text-white hover:bg-black/40")}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {format(selectedDate, "PPP")}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-black/90 border-orange-500/30" align="start">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => date && setSelectedDate(date)}
                  disabled={(date) => date > new Date()}
                  initialFocus
                  className="pointer-events-auto text-white"
                />
              </PopoverContent>
            </Popover>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {asteroids.map((asteroid, index) => (
            <Card key={index} className="bg-black/30 border-orange-500/20 backdrop-blur-md hover:bg-black/40 transition-all duration-300">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <CardTitle className="text-xl text-white">{asteroid.name}</CardTitle>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getRiskColor(asteroid.riskLevel)}`}>
                    {asteroid.riskLevel} Risk
                  </span>
                </div>
                <p className="text-gray-300 text-sm">Close Approach: {asteroid.closeApproachDate}</p>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div className="grid grid-cols-2 gap-4">
                  <div><span className="text-gray-400">Size:</span> <span className="text-cyan-400 ml-2">{asteroid.size}</span></div>
                  <div><span className="text-gray-400">Speed:</span> <span className="text-green-400 ml-2">{asteroid.speed}</span></div>
                  <div className="col-span-2"><span className="text-gray-400">Distance:</span> <span className="text-yellow-400 ml-2">{asteroid.distance}</span></div>
                </div>

                <div className="border-t border-gray-600 pt-4 space-y-2">
                  <div className="flex justify-between"><span className="text-gray-400">Diameter:</span><span className="text-blue-400">{asteroid.diameter}</span></div>
                  <div className="flex justify-between"><span className="text-gray-400">Velocity:</span><span className="text-purple-400">{asteroid.velocity}</span></div>
                  <div className="flex justify-between"><span className="text-gray-400">Orbital Period:</span><span className="text-indigo-400">{asteroid.orbitalPeriod}</span></div>
                  <div className="flex justify-between"><span className="text-gray-400">Magnitude:</span><span className="text-pink-400">{asteroid.magnitude}</span></div>
                  <div className="flex justify-between"><span className="text-gray-400">Potentially Hazardous:</span><span className={asteroid.isPotentiallyHazardous ? "text-red-400" : "text-green-400"}>{asteroid.isPotentiallyHazardous ? "Yes" : "No"}</span></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {asteroids.length === 0 && (
          <Card className="bg-black/30 border-orange-500/30 backdrop-blur-md">
            <CardContent className="text-center py-12">
              <p className="text-white text-lg">No asteroid data available for the selected date.</p>
              <p className="text-gray-400 mt-2">Try selecting a different date.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AsteroidsDetail;
