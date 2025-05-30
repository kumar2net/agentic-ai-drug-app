import React, { useState, useContext, createContext, useEffect, useRef } from 'react';
import { apiService } from './services/api';
import './App.css';
import drugs from './mockDrugs';
import MarketAnalytics from './components/MarketAnalytics';
import DrugSuggestion from './components/DrugSuggestion';
import CervicalADRMarket from './components/CervicalADRMarket';
import './components/CervicalADRMarket.css';

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
  const [activeTab, setActiveTab] = useState('drugs');

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
        if (activeTab === 'spine') {
          // For spine implants tab, use the mock data directly
          setSearchResults(drugs.filter(drug => drug.category === 'Spine Implants'));
        } else {
          const results = await apiService.searchDrugs({
            category: selectedCategory,
          });
          setSearchResults(results);
        }
      } catch (error) {
        console.error('Error loading category drugs:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCategoryDrugs();
  }, [selectedCategory, activeTab]);

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
      // For spine implants, use the drug data directly
      if (drug.category === 'Spine Implants') {
        const details = {
          ...drug,
          alternatives: drug.alternatives.map(alt => ({
            ...alt,
            priceDifference: alt.price - drug.price,
            priceDifferencePercentage: ((alt.price - drug.price) / drug.price * 100).toFixed(1)
          }))
        };
        setSelectedDrugDetails(details);
        setShowDetailsModal(true);
      } else {
        const details = await apiService.getDrugDetails(drug.name, drug.category);
        setSelectedDrugDetails(details);
        setShowDetailsModal(true);
      }
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

  // Update tab switching
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    // Close any open modals when switching tabs
    setShowDetailsModal(false);
    setShowReminderModal(false);
    setShowInteractionModal(false);
    setSelectedDrugDetails(null);
    
    if (tab === 'spine') {
      setSelectedCategory('Spine Implants');
      setSearchResults(drugs.filter(drug => drug.category === 'Spine Implants'));
    } else if (tab === 'drugs') {
      setSelectedCategory('all');
      setSearchResults([]);
    }
  };

  // Add useEffect to handle modal state
  useEffect(() => {
    // Close modals when switching tabs
    if (activeTab !== 'drugs' && activeTab !== 'spine') {
      setShowDetailsModal(false);
      setShowReminderModal(false);
      setShowInteractionModal(false);
      setSelectedDrugDetails(null);
    }
  }, [activeTab]);

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

export default function AppWithProvider() {
  return (
    <AgentProvider>
      <App />
    </AgentProvider>
  );
} 