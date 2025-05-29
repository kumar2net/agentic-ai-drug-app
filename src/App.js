import React, { useState, useContext, createContext, useEffect, useRef } from 'react';
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
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestionsRef = useRef(null);
  const { lastSearch, setLastSearch, preferences } = useContext(AgentContext);

  // Get unique categories for filter
  const categories = ['all', ...new Set(drugs.map(drug => drug.category))];

  // Handle clicks outside suggestions dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Update suggestions when search term changes
  useEffect(() => {
    if (searchTerm.trim().length > 0) {
      const filteredDrugs = drugs.filter(drug => 
        drug.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedCategory === 'all' || drug.category === selectedCategory)
      );
      setSuggestions(filteredDrugs.slice(0, 5)); // Limit to 5 suggestions
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchTerm, selectedCategory]);

  const handleSuggestionClick = (drugName) => {
    setSearchTerm(drugName);
    setShowSuggestions(false);
    handleSearch(drugName);
  };

  const handleSearch = (term = searchTerm) => {
    setIsLoading(true);
    // Simulate API call with setTimeout
    setTimeout(() => {
      // Find the drug by name (case-insensitive) and category
      const mainDrug = drugs.find(
        (d) => d.name.toLowerCase() === term.trim().toLowerCase() &&
        (selectedCategory === 'all' || d.category === selectedCategory)
      );
      if (!mainDrug) {
        setResults({ notFound: true });
        setLastSearch(term);
        setIsLoading(false);
        return;
      }
      // Get alternative drug details
      const alternatives = mainDrug.alternatives
        .map((altName) => drugs.find((d) => d.name === altName))
        .filter(Boolean)
        .sort((a, b) => a.price - b.price);

      // Calculate price differences
      const alternativesWithPriceDiff = alternatives.map(alt => ({
        ...alt,
        priceDifference: alt.price - mainDrug.price,
        priceDifferencePercentage: ((alt.price - mainDrug.price) / mainDrug.price * 100).toFixed(1)
      }));

      setResults({
        name: mainDrug.name,
        combination: mainDrug.combination,
        manufacturer: mainDrug.manufacturer,
        price: mainDrug.price,
        strength: mainDrug.strength,
        dosageForm: mainDrug.dosageForm,
        sideEffects: mainDrug.sideEffects,
        category: mainDrug.category,
        alternatives: alternativesWithPriceDiff
      });
      setLastSearch(term);
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Agentic AI Drug Suggestion App</h1>
        <div className="search-container">
          <div className="search-input-container" ref={suggestionsRef}>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => searchTerm.trim().length > 0 && setShowSuggestions(true)}
              placeholder="Enter tablet name"
            />
            {showSuggestions && suggestions.length > 0 && (
              <ul className="suggestions-list">
                {suggestions.map((drug, index) => (
                  <li
                    key={index}
                    onClick={() => handleSuggestionClick(drug.name)}
                    className="suggestion-item"
                  >
                    <span className="suggestion-name">{drug.name}</span>
                    <span className="suggestion-category">{drug.category}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <select 
            value={selectedCategory} 
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="category-select"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'all' ? 'All Categories' : category}
              </option>
            ))}
          </select>
          <button onClick={() => handleSearch()} disabled={isLoading}>
            {isLoading ? 'Searching...' : 'Search'}
          </button>
        </div>
        {lastSearch && <p className="last-search">Last search: {lastSearch}</p>}
        {isLoading && <div className="loading-spinner"></div>}
        {results && results.notFound && (
          <div className="not-found">
            <h2>No results found for "{searchTerm}"</h2>
            <p>Please try another tablet name or category.</p>
          </div>
        )}
        {results && !results.notFound && (
          <div className="results-container">
            <h2>Results for {results.name}</h2>
            <div className="drug-details">
              <div className="drug-header">
                <h3>{results.category}</h3>
                <span className="price-tag">₹{results.price}</span>
              </div>
              <div className="drug-info">
                <p><strong>Combination:</strong> {results.combination}</p>
                <p><strong>Strength:</strong> {results.strength}</p>
                <p><strong>Dosage Form:</strong> {results.dosageForm}</p>
                <p><strong>Manufacturer:</strong> {results.manufacturer}</p>
              </div>
              <div className="side-effects">
                <h3>Common Side Effects:</h3>
                <ul>
                  {results.sideEffects.map((effect, index) => (
                    <li key={index}>{effect}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="alternatives">
              <h3>Alternatives (sorted by price):</h3>
              <ul>
                {results.alternatives.map((alt, index) => (
                  <li key={index} className="alternative-item">
                    <div className="alt-header">
                      <strong>{alt.name}</strong>
                      <span className={`price-diff ${alt.priceDifference > 0 ? 'higher' : 'lower'}`}>
                        {alt.priceDifference > 0 ? '+' : ''}{alt.priceDifferencePercentage}%
                      </span>
                    </div>
                    <div className="alt-details">
                      <p>Category: {alt.category}</p>
                      <p>Combination: {alt.combination}</p>
                      <p>Strength: {alt.strength}</p>
                      <p>Manufacturer: {alt.manufacturer}</p>
                      <p className="alt-price">Price: ₹{alt.price} per strip</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
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