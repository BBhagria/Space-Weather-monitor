import React, { useState } from 'react';
import axios from 'axios';
import MeteorShower from './components/MeteorShower.jsx';

function App() {
  const [dataType, setDataType] = useState('apod');
  const [apodDate, setApodDate] = useState('');
  const [donkiEventType, setDonkiEventType] = useState('FLR');
  const [donkiStartDate, setDonkiStartDate] = useState('');
  const [donkiEndDate, setDonkiEndDate] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      if (dataType === 'apod') {
        const res = await axios.get('/apod', {
          params: apodDate ? { date: apodDate } : {},
        });
        setResult(res.data);
      } else {
        const res = await axios.get('/donki', {
          params: {
            eventType: donkiEventType,
            startDate: donkiStartDate,
            endDate: donkiEndDate,
          },
        });
        setResult(res.data);
      }
    } catch (err) {
      setError('Failed to fetch data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Determine background image from APOD (if applicable)
  const apodBackground = result?.url && dataType === 'apod' && result.media_type === 'image'
    ? {
        backgroundImage: `url(${result.url})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }
    : {};

  return (
    <div style={{ position: 'relative', minHeight: '200vh', overflow: 'hidden' }}>
      <MeteorShower />

      {/* Main UI Overlay */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          zIndex: 10,
          padding: '20px',
          color: 'white',
          fontFamily: 'Arial, sans-serif',
          background: 'rgba(0, 0, 0, 0.6)',
          minHeight: '100vh',
          ...apodBackground,
        }}
      >
        <h1>NASA Explorer</h1>

        {/* Dropdown */}
        <div style={{ marginBottom: '20px' }}>
          <label>
            Choose data type:{' '}
            <select value={dataType} onChange={(e) => setDataType(e.target.value)}>
              <option value="apod">APOD (Astronomy Picture of the Day)</option>
              <option value="donki">DONKI (Space Weather)</option>
            </select>
          </label>
        </div>

        {/* Form Inputs */}
        {dataType === 'apod' && (
          <div style={{ marginBottom: '20px' }}>
            <label>
              Select Date:{' '}
              <input
                type="date"
                value={apodDate}
                onChange={(e) => setApodDate(e.target.value)}
              />
            </label>
          </div>
        )}

        {dataType === 'donki' && (
          <div style={{ marginBottom: '20px' }}>
            <label>
              Event Type:{' '}
              <select
                value={donkiEventType}
                onChange={(e) => setDonkiEventType(e.target.value)}
              >
                <option value="FLR">Solar Flare (FLR)</option>
                <option value="CME">Coronal Mass Ejection (CME)</option>
                <option value="GST">Geomagnetic Storm (GST)</option>
                <option value="SEP">Solar Energetic Particles (SEP)</option>
                <option value="MPC">Magnetopause Crossing (MPC)</option>
                <option value="RBE">Radiation Belt Enhancement (RBE)</option>
              </select>
            </label>
            <br />
            <label>
              Start Date:{' '}
              <input
                type="date"
                value={donkiStartDate}
                onChange={(e) => setDonkiStartDate(e.target.value)}
              />
            </label>
            <br />
            <label>
              End Date:{' '}
              <input
                type="date"
                value={donkiEndDate}
                onChange={(e) => setDonkiEndDate(e.target.value)}
              />
            </label>
          </div>
        )}

        <button onClick={handleSubmit} style={{ marginBottom: '20px' }}>
          Submit
        </button>

        {/* Feedback */}
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        {/* Results */}
        {result && dataType === 'apod' && (
          <div>
            <h2>{result.title}</h2>
            {result.media_type === 'image' && (
              <img
                src={result.url}
                alt={result.title}
                style={{ maxWidth: '100%', marginBottom: '10px' }}
              />
            )}
            <p>{result.explanation}</p>
          </div>
        )}

        {result && dataType === 'donki' && Array.isArray(result) && (
          <div>
            <h2>{result.length} Events Found</h2>
            <ul>
              {result.map((event) => (
                <li key={event.activityID} style={{ marginBottom: '10px' }}>
                  <strong>Activity ID:</strong> {event.activityID}<br />
                  <strong>Start:</strong> {event.beginTime}<br />
                  {event.peakTime && <><strong>Peak:</strong> {event.peakTime}<br /></>}
                  {event.endTime && <><strong>End:</strong> {event.endTime}<br /></>}
                  {event.sourceLocation && <><strong>Location:</strong> {event.sourceLocation}<br /></>}
                  {event.note && <><strong>Note:</strong> {event.note}<br /></>}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
