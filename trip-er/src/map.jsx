import React, { useState } from 'react';
import mapboxgl from 'mapbox-gl';

import 'mapbox-gl/dist/mapbox-gl.css';

const MapboxLocationSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const mapboxAccessToken = 'pk.eyJ1IjoicHJ1ZGh2aTMxMDUiLCJhIjoiY2x1M2xwYzZmMTJjbDJubDhsZ25nZzZjZCJ9.Se3vPcEsIgc8RY9EjhybNQ';

  // Initialize map
  mapboxgl.accessToken = mapboxAccessToken;
  const [map, setMap] = useState(null);

  React.useEffect(() => {
    const initializedMap = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [0, 0],
      zoom: 1
    });
    setMap(initializedMap);
  }, []);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(searchTerm)}.json?access_token=${mapboxAccessToken}`);
      const data = await response.json();

      if (data.features.length > 0) {
        const coordinates = data.features[0].center;
        map.flyTo({
          center: coordinates,
          zoom: 12
        });
      } else {
        alert('Location not found!');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <div style={{marginTop: 50}}>
    <div id='map' style={{ width: '100%', height: '400px',borderRadius: 25 }}></div>

      <div id='search-container'>
        <form onSubmit={handleFormSubmit}>
          <input
            id='search-input'
            type='text'
            placeholder='Enter location'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            required
          />
          <button type='submit'>Search</button>
        </form>
      </div>

    </div>
  );
};

export default MapboxLocationSearch;
