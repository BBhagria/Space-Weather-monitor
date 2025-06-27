import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sun, Zap, Wind, Radio } from 'lucide-react';
import { format, subDays } from 'date-fns';

interface SpaceWeatherEvent {
  type: string;
  severity?: string;
  speed?: string;
  density?: string;
  impact?: string;
  arrival?: string;
  time?: string;
}

const getWeatherLogo = (type: string) => {
  switch (type.toLowerCase()) {
    case 'solar flare':
      return <Sun className="w-8 h-8 text-orange-400" />;
    case 'geomagnetic storm':
      return <Zap className="w-8 h-8 text-purple-400" />;
    case 'solar wind':
      return <Wind className="w-8 h-8 text-blue-400" />;
    case 'coronal mass ejection':
      return <Radio className="w-8 h-8 text-red-400" />;
    default:
      return <Sun className="w-8 h-8 text-orange-400" />;
  }
};

const SpaceWeatherPanel: React.FC = () => {
    const [spaceWeatherData, setSpaceWeatherData] = useState<
      { date: string; events: SpaceWeatherEvent[] }[]
    >([]);

    useEffect(() => {
    const fetchWeatherData = async () => {
      const endDate = new Date();
      const startDate = subDays(endDate, 4);
      const start = startDate.toISOString().split('T')[0];
      const end = endDate.toISOString().split('T')[0];

      const eventTypes = [
        { type: 'FLR', name: 'Solar Flare' },
        { type: 'CME', name: 'Coronal Mass Ejection' },
        { type: 'GST', name: 'Geomagnetic Storm' },
        { type: 'HSS', name: 'Solar Wind' },
      ];

      try {
        const allEvents = [];

        for (const { type, name } of eventTypes) {
          const res = await fetch(`https://nasa-explorer-dash.onrender.com/donki?eventType=${type}&startDate=${start}&endDate=${end}`);
          const data = await res.json();

          data.forEach((event: any) => {
            const date =
              event.beginTime?.split('T')[0] ||
              event.startTime?.split('T')[0] ||
              event.cmeAnalyses?.[0]?.time21_5?.split('T')[0] ||
              'Unknown';

            const time =
              event.beginTime?.split('T')[1]?.slice(0, 5) ||
              event.startTime?.split('T')[1]?.slice(0, 5) ||
              '';

            allEvents.push({
              date,
              type: name,
              severity: event.classType || event.gstID || '',
              time,
              impact: event.note || '',
              speed: event.speed ? `${event.speed} km/s` : '',
              density: event.density ? `${event.density} protons/cm³` : '',
              arrival: event.cmeArrivalTime || '',
            });
          });
        }

        // Group by date
        const grouped: Record<string, typeof allEvents> = {};
        allEvents.forEach((e) => {
          if (!grouped[e.date]) grouped[e.date] = [];
          grouped[e.date].push(e);
        });

        // Convert to expected format
        // Convert to expected format
        const formatted = Object.entries(grouped).map(([date, events]) => ({ date, events }));
        // ✅ Sort by date descending (latest first)
        formatted.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        setSpaceWeatherData(formatted);
      } catch (error) {
        console.error('Failed to fetch space weather events:', error);
      }
    };

    fetchWeatherData();
  }, []);


  return (
    <Card className="h-full bg-black/30 border-blue-500/30 backdrop-blur-md relative flex flex-col">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-2xl font-bold text-white bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Space Weather Monitor
          </CardTitle>
          <div className="bg-black/20 p-2 rounded-lg border border-blue-500/30">
            <Sun className="w-8 h-8 text-orange-400" />
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 overflow-y-auto">
        <h3 className="text-xl font-semibold text-white mb-4">Recent Space Weather (Past 5 Days)</h3>
        <div className="space-y-4">
          {spaceWeatherData.map((day, index) => (
            <Card key={index} className="bg-black/20 border-blue-500/20 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-blue-300">{day.date}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {day.events.map((event, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-lg bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-400/20"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        {getWeatherLogo(event.type)}
                        <h4 className="font-semibold text-white">{event.type}</h4>
                      </div>
                      {event.time && (
                        <span className="text-xs text-blue-300 bg-blue-500/20 px-2 py-1 rounded">
                          {event.time}
                        </span>
                      )}
                    </div>

                    <div className="text-sm text-gray-300 space-y-1">
                      {event.severity && (
                        <p>
                          Severity: <span className="text-orange-400">{event.severity}</span>
                        </p>
                      )}

                      {(event.speed || event.density) && (
                        <div className="flex flex-wrap gap-4">
                          {event.speed && (
                            <p>
                              Speed: <span className="text-green-400">{event.speed}</span>
                            </p>
                          )}
                          {event.density && (
                            <p>
                              Density: <span className="text-cyan-400">{event.density}</span>
                            </p>
                          )}
                        </div>
                      )}

                      {event.impact && (
                        <p>
                          Impact: <span className="text-yellow-400">{event.impact}</span>
                        </p>
                      )}
                      {event.arrival && (
                        <p>
                          Arrival: <span className="text-red-400">{event.arrival}</span>
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SpaceWeatherPanel;
