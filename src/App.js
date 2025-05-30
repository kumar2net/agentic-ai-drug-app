import React from 'react';
import './App.css';
import CervicalADRMarket from './components/CervicalADRMarket';
import './components/CervicalADRMarket.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Medical Device Market Analysis</h1>
      </header>
      <main>
        <CervicalADRMarket />
      </main>
    </div>
  );
}

export default App; 