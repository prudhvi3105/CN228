import React from 'react';
import FormComponent from './FormComponent';
import MapboxLocationSearch from './map.jsx';
import './App.css';

function App() {
  return (
    <div className='maindiv'>
      <Title />
      <SubTitle />
      <FormComponent />
      <MapboxLocationSearch />

    </div>
  );
}

function Title() {
  return <h1 className='title'>Trip-er 🌴</h1>;
} 

function SubTitle() {
  return <h3 className='subtitle'>Plan your dream trip with personalized itineraries.</h3>;
}

export default App;
