import React, { useState } from 'react';
import MapboxLocationSearch from './map.jsx';
import './App.css';


function FormComponent() {
  const [formData, setFormData] = useState({
    selectedTravelDay: '',
    destination: '',
    selectedTravelStyle: '',
  });
  const [chatResponse, setChatResponse] = useState('');
  const [tripInfo, setTripInfo] = useState('');

  const handleInputChange = (inputName, value) => {
    setFormData({
      ...formData,
      [inputName]: value,
    });
  };

  const handleExploreClick = () => {
    console.log(`Plan a ${formData.selectedTravelStyle} trip to ${formData.destination} for ${formData.selectedTravelDay}`);

    let days = formData.selectedTravelDay;
    let place = formData.destination;
    let style = formData.selectedTravelStyle;

    if (days !== "Travel day" && place !== "" && style !== "Travel style") {
      // If all fields are filled, send HTTP POST request to chat API
      fetch('http://localhost:5123/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: `Plan a ${style} trip to ${place} for ${days}`,
        }),
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error('Network response was not ok.');
        })
        .then((data) => {
          console.log('Response from server:', data.choices[0].message.content);
          setChatResponse(data.choices[0].message.content);

          // Set the trip info for display
          setTripInfo(`${days} trip to ${place}`);
        })
        .catch((error) => {
          console.error('Error sending data:', error);
        });
    } else {
      alert('Please fill in all fields');
    }
  };

  const renderChatResponse = () => {
    if (!chatResponse) {
      return null;
    }
  
    // Use regular expression to split the content based on "Day X:"
    const parts = chatResponse.split(/Day\s+\d+:/);
  
    return parts.map((part, index) => {
      // Skip the first part which is empty or before the first "Day X:"
      if (index === 0) {
        return null;
      }
  
      // Extract the day number from the part
      const dayNumberMatch = part.match(/(\d+)/);
      const dayNumber = dayNumberMatch ? dayNumberMatch[0] : index;
  
      // Split the lines of the part
      const lines = part.trim().split('\n');
  
      return (
        <div key={index} className="chat-part">
          <h3 className='day-header'>Day {dayNumber}:</h3>
          <div className="day-content">
            {lines.map((line, idx) => (
              <div key={idx} className="line">{line.trim()}</div>
            ))}
          </div>
        </div>
      );
    });
  };
    
  return (
    <div className="maindiv1">
      <DropdownMenu
        label="Travel Day"
        options={['Travel day', '1 Day', '2 Day', '3 Day', '4 Day', '5 Day', '6 Day', '7 Day']}
        value={formData.selectedTravelDay}
        onChange={(value) => handleInputChange('selectedTravelDay', value)}
      />

      <TextBox
        label="Destination"
        value={formData.destination}
        onChange={(value) => handleInputChange('destination', value)}
      />

      <DropdownMenu
        label="Travel Style"
        options={[
          'Travel style',
          'Relaxation',
          'Cultural and Historical',
          'Romantic for couples',
          'Family-friendly',
          'Adventure and outdoor',
        ]}
        value={formData.selectedTravelStyle}
        onChange={(value) => handleInputChange('selectedTravelStyle', value)}
      />

      <Button onClick={handleExploreClick} />

      <div className="chat-response">
        {tripInfo && (
          <div className="trip-info">{tripInfo}</div>
        )}
        {renderChatResponse()}
      </div>
    </div>
  );
}


function DropdownMenu({ label, options, value, onChange }) {
  const handleChange = (event) => {
    onChange(event.target.value);
  };

  return (
    <div className="dropdown-container">
      <label className="labellabel" htmlFor="dropdown">
        {label}
      </label>
      <select
        id="dropdown"
        value={value}
        onChange={handleChange}
        className="dropdown-select"
      >
        {options.map((option) => (
          <option
            key={option}
            value={option}
            className={`dropdown-option ${value === option ? 'selected' : ''}`}
          >
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

function TextBox({ label, value, onChange }) {
  const handleChange = (event) => {
    onChange(event.target.value);
  };

  return (
    <div className="dropdown-container">
      <label className="labellabel" htmlFor="destination">
        {label}
      </label>
          <input
        id="destination"
        type="text"
        className="dropdown-select"
        value={value}
        onChange={handleChange}
        placeholder='destination'
      />
    </div>
  );
}

function Button({ onClick }) {
  return (
    <div>
      <button className="explore-button" onClick={onClick}>
      ✨Explore✨
      </button>
    </div>
  );
}

export default FormComponent;
