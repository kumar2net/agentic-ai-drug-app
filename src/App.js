import React, { useState, useContext, createContext, useEffect, useRef } from 'react';
import { apiService } from './services/api';
import './App.css';
import drugs from './mockDrugs';

// Enhanced Agent Context Protocol
const AgentContext = createContext();

function AgentProvider({ children }) {
  const [lastSearch, setLastSearch] = useState('');
  const [preferences, setPreferences] = useState({ 
    price: 'low',
    reminders: [],
    interactions: [],
    searchHistory: [],
    favoriteDrugs: [],
    priceAlerts: [],
    userPreferences: {
      preferredManufacturers: [],
      preferredCategories: [],
    // max 
      notifications: true
    }
  });

  // Smart suggestion system
  const getSmartSuggestions = (currentSearch) => {
    const searchHistory = preferences.searchHistory;
    const favoriteDrugs = preferences.favoriteDrugs;
    
    // Get frequently searched drugs
    const frequentSearches = searchHistory.reduce((acc, search) => {
      acc[search] = (acc[search] || 0) + 1;
      return acc;
    }, {});

    // Get related drugs based on category and manufacturer preferences
    const relatedDrugs = drugs.filter(drug => 
      preferences.userPreferences.preferredCategories.includes(drug.category) ||
      preferences.userPreferences.preferredManufacturers.includes(drug.manufacturer)
    );

    return {
      frequentSearches: Object.entries(frequentSearches)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 3)
        .map(([drug]) => drug),
      favoriteDrugs,
      relatedDrugs: relatedDrugs.slice(0, 3)
    };
  };

  // Price alert system
  const checkPriceAlerts = (drug) => {
    const alerts = preferences.priceAlerts.filter(alert => 
      alert.drugName === drug.name && 
      drug.price <= alert.targetPrice
    );
    
    if (alerts.length > 0) {
      return {
        hasAlert: true,
        message: `Price alert: ${drug.name} is now available at ₹${drug.price}`
      };
    }
    return { hasAlert: false };
  };

  // Proactive notifications
  const getProactiveNotifications = () => {
    const notifications = [];
    
    // Check for upcoming reminders
    const upcomingReminders = preferences.reminders.filter(reminder => {
      const reminderTime = new Date(reminder.time);
      const now = new Date();
      const diffHours = (reminderTime - now) / (1000 * 60 * 60);
      return diffHours > 0 && diffHours <= 24;
    });

    if (upcomingReminders.length > 0) {
      notifications.push({
        type: 'reminder',
        message: `You have ${upcomingReminders.length} medication reminders in the next 24 hours`
      });
    }

    // Check for price changes in favorite drugs
    preferences.favoriteDrugs.forEach(drugName => {
      const drug = drugs.find(d => d.name === drugName);
      if (drug) {
        const priceAlert = checkPriceAlerts(drug);
        if (priceAlert.hasAlert) {
          notifications.push({
            type: 'price',
            message: priceAlert.message
          });
        }
      }
    });

    return notifications;
  };

  const updatePreferences = (newPreferences) => {
    setPreferences(prev => ({
      ...prev,
      ...newPreferences
    }));
  };

  return (
    <AgentContext.Provider value={{ 
      lastSearch, 
      setLastSearch, 
      preferences, 
      updatePreferences,
      getSmartSuggestions,
      checkPriceAlerts,
      getProactiveNotifications
    }}>
      {children}
    </AgentContext.Provider>
  );
}

// Custom hook to use the agent context
const useAgent = () => {
  const context = useContext(AgentContext);
  if (!context) {
    throw new Error('useAgent must be used within an AgentProvider');
  }
  return context;
};

function App() {
  const { preferences, updatePreferences, getSmartSuggestions, getProactiveNotifications } = useAgent();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedDrug, setSelectedDrug] = useState(null);
  const [showReminderModal, setShowReminderModal] = useState(false);
  const [showInteractionModal, setShowInteractionModal] = useState(false);
  const [reminderTime, setReminderTime] = useState('');
  const [interactionDrug, setInteractionDrug] = useState('');
  const [notifications, setNotifications] = useState([]);
  const [trendingDrugs, setTrendingDrugs] = useState([]);
  const [categoryStats, setCategoryStats] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const suggestionsRef = useRef(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedDrugDetails, setSelectedDrugDetails] = useState(null);

  // Load initial data
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const [trending, stats] = await Promise.all([
          apiService.getTrendingDrugs(),
          apiService.getCategoryStats()
        ]);
        setTrendingDrugs(trending);
        setCategoryStats(stats);
      } catch (error) {
        console.error('Error loading initial data:', error);
      }
    };
    loadInitialData();
  }, []);

  // Add useEffect to load drugs when category changes
  useEffect(() => {
    const loadCategoryDrugs = async () => {
      try {
        setIsLoading(true);
        const results = await apiService.searchDrugs({
          category: selectedCategory,
        });
        setSearchResults(results);
      } catch (error) {
        console.error('Error loading category drugs:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCategoryDrugs();
  }, [selectedCategory]);

  // Search drugs
  const handleSearch = async () => {
    try {
      setIsLoading(true);
      const results = await apiService.searchDrugs({
        query: searchQuery,
        category: selectedCategory,
      });
      setSearchResults(results);
      
      // Update search history in preferences
      updatePreferences({
        searchHistory: [...preferences.searchHistory, searchQuery]
      });
    } catch (error) {
      console.error('Error searching drugs:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Get drug details
  const handleDrugSelect = async (drug) => {
    try {
      setIsLoading(true);
      const details = await apiService.getDrugDetails(drug.name, selectedCategory);
      setSelectedDrugDetails(details);
      setShowDetailsModal(true);
    } catch (error) {
      console.error('Error getting drug details:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Check drug interactions
  const handleCheckInteraction = async () => {
    if (!selectedDrug || !interactionDrug) return;
    
    try {
      const interaction = await apiService.checkDrugInteractions(
        selectedDrug.name,
        interactionDrug
      );
      
      updatePreferences({
        interactions: [...preferences.interactions, interaction]
      });
      
      setShowInteractionModal(false);
      setInteractionDrug('');
      
      // Add notification
      setNotifications(prev => [{
        type: 'interaction',
        message: `Interaction check completed for ${selectedDrug.name} and ${interactionDrug}`,
        timestamp: new Date().toISOString()
      }, ...prev]);
    } catch (error) {
      console.error('Error checking interactions:', error);
    }
  };

  // Set medication reminder
  const handleAddReminder = async () => {
    if (!selectedDrug || !reminderTime) return;
    
    const reminder = {
      drugName: selectedDrug.name,
      time: reminderTime,
      timestamp: new Date().toISOString()
    };
    
    updatePreferences({
      reminders: [...preferences.reminders, reminder]
    });
    
    setShowReminderModal(false);
    setReminderTime('');
    
    // Add notification
    setNotifications(prev => [{
      type: 'reminder',
      message: `Reminder set for ${selectedDrug.name} at ${reminderTime}`,
      timestamp: new Date().toISOString()
    }, ...prev]);
  };

  // Get unique categories for filter
  const categories = ['all', ...new Set(drugs.map(drug => drug.category))];

  // Update notifications periodically
  useEffect(() => {
    const updateNotifications = () => {
      const newNotifications = getProactiveNotifications();
      setNotifications(newNotifications);
    };

    updateNotifications();
    const interval = setInterval(updateNotifications, 60000); // Update every minute
    return () => clearInterval(interval);
  }, [preferences, getProactiveNotifications]);

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
    if (searchQuery.trim().length > 0) {
      const filteredDrugs = drugs.filter(drug => 
        drug.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (selectedCategory === 'all' || drug.category === selectedCategory)
      );
      setSuggestions(filteredDrugs.slice(0, 5));
      setShowSuggestions(true);
    } else {
      // Show smart suggestions when search is empty
      const smartSuggestions = getSmartSuggestions(searchQuery);
      setSuggestions([
        ...smartSuggestions.frequentSearches,
        ...smartSuggestions.favoriteDrugs,
        ...smartSuggestions.relatedDrugs
      ].slice(0, 5));
      setShowSuggestions(true);
    }
  }, [searchQuery, selectedCategory, getSmartSuggestions]);

  const handleSuggestionClick = (drugName) => {
    setSearchQuery(drugName);
    setShowSuggestions(false);
    handleSearch();
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Agentic AI Drug Suggestion App</h1>
        
        {/* Notifications Panel */}
        {notifications.length > 0 && (
          <div className="notifications-panel">
            {notifications.map((notification, index) => (
              <div key={index} className={`notification ${notification.type}`}>
                {notification.message}
              </div>
            ))}
          </div>
        )}

        <div className="search-container">
          <div className="search-input-container" ref={suggestionsRef}>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setShowSuggestions(true)}
              placeholder="Search drugs..."
            />
            {showSuggestions && suggestions.length > 0 && (
              <ul className="suggestions-list">
                {suggestions.map((drug, index) => (
                  <li
                    key={index}
                    onClick={() => handleSuggestionClick(typeof drug === 'string' ? drug : drug.name)}
                    className="suggestion-item"
                  >
                    <span className="suggestion-name">
                      {typeof drug === 'string' ? drug : drug.name}
                    </span>
                    {typeof drug !== 'string' && (
                      <span className="suggestion-category">{drug.category}</span>
                    )}
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
          <button onClick={handleSearch} disabled={isLoading}>
            {isLoading ? 'Searching...' : 'Search'}
          </button>
        </div>

        {isLoading && <div className="loading-spinner"></div>}
        
        {!isLoading && searchResults.length === 0 && (
          <div className="not-found">
            <h2>No drugs found in {selectedCategory === 'all' ? 'any category' : selectedCategory}</h2>
            <p>Please try another category.</p>
          </div>
        )}

        {!isLoading && searchResults.length > 0 && (
          <div className="results-container">
            <h2>Drugs in {selectedCategory === 'all' ? 'All Categories' : selectedCategory}</h2>
            <div className="drug-grid">
              {searchResults.map((drug) => (
                <div key={drug.name} className="drug-card">
                  <div className="drug-header">
                    <h3>{drug.name}</h3>
                    <div className="drug-actions-header">
                      <button 
                        onClick={() => {
                          const newFavorites = preferences.favoriteDrugs.includes(drug.name)
                            ? preferences.favoriteDrugs.filter(name => name !== drug.name)
                            : [...preferences.favoriteDrugs, drug.name];
                          updatePreferences({ favoriteDrugs: newFavorites });
                        }}
                        className={`favorite-btn ${preferences.favoriteDrugs.includes(drug.name) ? 'active' : ''}`}
                      >
                        {preferences.favoriteDrugs.includes(drug.name) ? '★' : '☆'}
                      </button>
                      <span className="price-tag">₹{drug.price}</span>
                    </div>
                  </div>
                  <div className="drug-info">
                    <p><strong>Combination:</strong> {drug.combination}</p>
                    <p><strong>Strength:</strong> {drug.strength}</p>
                    <p><strong>Dosage Form:</strong> {drug.dosageForm}</p>
                    <p><strong>Manufacturer:</strong> {drug.manufacturer}</p>
                  </div>
                  <div className="drug-actions">
                    <button onClick={() => handleDrugSelect(drug)}>View Details</button>
                    <button onClick={() => {
                      setSelectedDrug(drug);
                      setShowReminderModal(true);
                    }}>Set Reminder</button>
                  </div>
                  <div className="side-effects">
                    <h4>Common Side Effects:</h4>
                    <ul>
                      {drug.sideEffects.map((effect, index) => (
                        <li key={index}>{effect}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Drug Details Modal */}
        {showDetailsModal && selectedDrugDetails && (
          <div className="modal">
            <div className="modal-content drug-details-modal">
              <div className="modal-header">
                <h3>{selectedDrugDetails.name}</h3>
                <button 
                  className="close-btn"
                  onClick={() => setShowDetailsModal(false)}
                >
                  ×
                </button>
              </div>
              
              <div className="modal-body">
                <div className="drug-details-grid">
                  <div className="drug-details-section">
                    <h4>Basic Information</h4>
                    <p><strong>Category:</strong> {selectedDrugDetails.category}</p>
                    <p><strong>Combination:</strong> {selectedDrugDetails.combination}</p>
                    <p><strong>Strength:</strong> {selectedDrugDetails.strength}</p>
                    <p><strong>Dosage Form:</strong> {selectedDrugDetails.dosageForm}</p>
                    <p><strong>Manufacturer:</strong> {selectedDrugDetails.manufacturer}</p>
                    <p><strong>Price:</strong> ₹{selectedDrugDetails.price}</p>
                    {selectedDrugDetails.category === "Spine Implants" && (
                      <>
                        <p><strong>Material:</strong> {selectedDrugDetails.material}</p>
                        <p><strong>Size:</strong> {selectedDrugDetails.size}</p>
                        <p><strong>Sterilization:</strong> {selectedDrugDetails.sterilization}</p>
                        <p><strong>Shelf Life:</strong> {selectedDrugDetails.shelfLife}</p>
                        <p><strong>Surgical Technique:</strong> {selectedDrugDetails.surgicalTechnique}</p>
                        <p><strong>Compatibility:</strong> {selectedDrugDetails.compatibility.join(", ")}</p>
                        <p><strong>Certifications:</strong> {selectedDrugDetails.certifications.join(", ")}</p>
                        <p><strong>Warranty:</strong> {selectedDrugDetails.warranty}</p>
                        <p><strong>Surgical Time:</strong> {selectedDrugDetails.surgicalTime}</p>
                        <p><strong>Recovery Time:</strong> {selectedDrugDetails.recoveryTime}</p>
                      </>
                    )}
                  </div>

                  <div className="drug-details-section">
                    <h4>Side Effects</h4>
                    <ul>
                      {selectedDrugDetails.sideEffects.map((effect, index) => (
                        <li key={index}>{effect}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="drug-details-section">
                    <h4>Alternatives</h4>
                    <div className="alternatives-list">
                      {selectedDrugDetails.alternatives && selectedDrugDetails.alternatives.length > 0 ? (
                        selectedDrugDetails.alternatives.map((alt, index) => (
                          <div key={index} className="alternative-item">
                            <div className="alt-header">
                              <span className="alt-name">{alt.name}</span>
                              <span className={`price-diff ${alt.price > selectedDrugDetails.price ? 'higher' : 'lower'}`}>
                                {alt.price > selectedDrugDetails.price ? '+' : ''}
                                {((alt.price - selectedDrugDetails.price) / selectedDrugDetails.price * 100).toFixed(1)}%
                              </span>
                            </div>
                            <div className="alt-details">
                              <p>Price: ₹{alt.price}</p>
                              <p>Manufacturer: {alt.manufacturer}</p>
                              {alt.material && <p>Material: {alt.material}</p>}
                              {alt.advantages && (
                                <div className="advantages">
                                  <p><strong>Advantages:</strong></p>
                                  <ul>
                                    {alt.advantages.map((adv, i) => (
                                      <li key={i}>{adv}</li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                          </div>
                        ))
                      ) : (
                        <p>No alternatives available</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="modal-actions">
                  <button onClick={() => {
                    setSelectedDrug(selectedDrugDetails);
                    setShowReminderModal(true);
                    setShowDetailsModal(false);
                  }}>
                    Set Reminder
                  </button>
                  <button onClick={() => {
                    setSelectedDrug(selectedDrugDetails);
                    setShowInteractionModal(true);
                    setShowDetailsModal(false);
                  }}>
                    Check Interactions
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Reminder Modal */}
        {showReminderModal && (
          <div className="modal">
            <div className="modal-content">
              <h3>Set Medication Reminder</h3>
              <input
                type="time"
                value={reminderTime}
                onChange={(e) => setReminderTime(e.target.value)}
              />
              <div className="modal-actions">
                <button onClick={handleAddReminder}>Set Reminder</button>
                <button onClick={() => setShowReminderModal(false)}>Cancel</button>
              </div>
            </div>
          </div>
        )}

        {/* Interaction Checker Modal */}
        {showInteractionModal && (
          <div className="modal">
            <div className="modal-content">
              <h3>Check Drug Interactions</h3>
              <input
                type="text"
                value={interactionDrug}
                onChange={(e) => setInteractionDrug(e.target.value)}
                placeholder="Enter another drug name"
              />
              <div className="modal-actions">
                <button onClick={handleCheckInteraction}>Check</button>
                <button onClick={() => setShowInteractionModal(false)}>Cancel</button>
              </div>
            </div>
          </div>
        )}

        {/* Reminders List */}
        {preferences.reminders.length > 0 && (
          <div className="reminders-list">
            <h3>Your Medication Reminders</h3>
            <ul>
              {preferences.reminders.map(reminder => (
                <li key={reminder.timestamp}>
                  {reminder.drugName} - {reminder.time}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Interactions List */}
        {preferences.interactions.length > 0 && (
          <div className="interactions-list">
            <h3>Drug Interactions</h3>
            <ul>
              {preferences.interactions.map(interaction => (
                <li key={interaction.id}>
                  <strong>{interaction.drug1}</strong> + <strong>{interaction.drug2}</strong>
                  <span className={`severity ${interaction.severity.toLowerCase()}`}>
                    {interaction.severity}
                  </span>
                  <p>{interaction.description}</p>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Price Alerts List */}
        {preferences.priceAlerts.length > 0 && (
          <div className="price-alerts-list">
            <h3>Price Alerts</h3>
            <ul>
              {preferences.priceAlerts.map(alert => (
                <li key={alert.id}>
                  <strong>{alert.drugName}</strong> - Alert when price ≤ ₹{alert.targetPrice}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Add trending drugs section */}
        {trendingDrugs.length > 0 && (
          <div className="trending-drugs">
            <h3>Trending Medications</h3>
            <div className="drug-grid">
              {trendingDrugs.map(drug => (
                <div key={drug.name} className="drug-card">
                  <h4>{drug.name}</h4>
                  <p>Category: {drug.category}</p>
                  <p>Price: ₹{drug.price}</p>
                  <button onClick={() => handleDrugSelect(drug)}>View Details</button>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Add category statistics */}
        {categoryStats.length > 0 && (
          <div className="category-stats">
            <h3>Category Statistics</h3>
            <div className="stats-grid">
              {categoryStats.map(stat => (
                <div key={stat.category} className="stat-card">
                  <h4>{stat.category}</h4>
                  <p>Total Drugs: {stat.count}</p>
                  <p>Average Price: ₹{stat.avgPrice}</p>
                  <p>Manufacturers: {stat.manufacturers.length}</p>
                </div>
              ))}
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