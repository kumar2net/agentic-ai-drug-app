import React, { useState, useContext, createContext } from 'react';
import './App.css';
import drugs from './mockDrugs';

// Agent Context Protocol
const AgentContext = createContext();

function AgentProvider({ children }) {
  const [lastSearch, setLastSearch] = useState('');
  const [preferences, setPreferences] = useState({ price: 'low' });

  return (
    <AgentContext.Provider value={{ lastSearch, setLastSearch, preferences, setPreferences }}>
      {children}
    </AgentContext.Provider>
  );
}

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState(null);
  const { lastSearch, setLastSearch, preferences } = useContext(AgentContext);

  const handleSearch = () => {
    // Simulate API call with setTimeout
    setTimeout(() => {
      // Find the drug by name (case-insensitive)
      const mainDrug = drugs.find(
        (d) => d.name.toLowerCase() === searchTerm.trim().toLowerCase()
      );
      if (!mainDrug) {
        setResults({ notFound: true });
        setLastSearch(searchTerm);
        return;
      }
      // Get alternative drug details
      const alternatives = mainDrug.alternatives
        .map((altName) => drugs.find((d) => d.name === altName))
        .filter(Boolean)
        .sort((a, b) => a.price - b.price);
      setResults({
        name: mainDrug.name,
        combination: mainDrug.combination,
        manufacturer: mainDrug.manufacturer,
        price: mainDrug.price,
        alternatives
      });
      setLastSearch(searchTerm);
    }, 500);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Agentic AI Drug Suggestion App</h1>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Enter tablet name"
        />
        <button onClick={handleSearch}>Search</button>
        {lastSearch && <p>Last search: {lastSearch}</p>}
        {results && results.notFound && (
          <div>
            <h2>No results found for "{searchTerm}"</h2>
            <p>Please try another tablet name.</p>
          </div>
        )}
        {results && !results.notFound && (
          <div>
            <h2>Results for {results.name}</h2>
            <p>Combination: {results.combination}</p>
            <p>Manufacturer: {results.manufacturer}</p>
            <p>Price: ₹{results.price} per strip</p>
            <h3>Alternatives (sorted by price):</h3>
            <ul>
              {results.alternatives.map((alt, index) => (
                <li key={index}>
                  <strong>{alt.name}</strong> — {alt.combination} — {alt.manufacturer} — ₹{alt.price} per strip
                </li>
              ))}
            </ul>
          </div>
        )}
      </header>
    </div>
  );
}

export default function AppWithProvider() {
  return (
    <AgentProvider>
      <App />
    </AgentProvider>
  );
} 