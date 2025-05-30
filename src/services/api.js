import drugs from '../mockDrugs';

// Simulated API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class ApiService {
  // Search drugs with filters
  async searchDrugs({ query, category }) {
    await delay(500); // Simulate network delay
    
    let filteredDrugs = drugs;
    
    if (query) {
      filteredDrugs = filteredDrugs.filter(drug => 
        drug.name.toLowerCase().includes(query.toLowerCase())
      );
    }
    
    if (category && category !== 'all') {
      filteredDrugs = filteredDrugs.filter(drug => 
        drug.category === category
      );
    }
    
    return filteredDrugs;
  }

  // Get drug details with alternatives
  async getDrugDetails(drugName, category) {
    await delay(500);
    
    const mainDrug = drugs.find(
      d => d.name.toLowerCase() === drugName.toLowerCase() &&
      (category === 'all' || d.category === category)
    );
    
    if (!mainDrug) {
      throw new Error('Drug not found');
    }
    
    // For spine implants, return the complete object with all fields
    if (mainDrug.category === 'Spine Implants') {
      return {
        ...mainDrug,
        alternatives: mainDrug.alternatives.map(alt => ({
          ...alt,
          priceDifference: alt.price - mainDrug.price,
          priceDifferencePercentage: ((alt.price - mainDrug.price) / mainDrug.price * 100).toFixed(1)
        }))
      };
    }
    
    // For other drugs, handle both string and object alternatives
    const alternatives = mainDrug.alternatives.map(alt => {
      if (typeof alt === 'string') {
        const altDrug = drugs.find(d => d.name === alt);
        if (altDrug) {
          return {
            ...altDrug,
            priceDifference: altDrug.price - mainDrug.price,
            priceDifferencePercentage: ((altDrug.price - mainDrug.price) / mainDrug.price * 100).toFixed(1)
          };
        }
        return null;
      }
      return {
        ...alt,
        priceDifference: alt.price - mainDrug.price,
        priceDifferencePercentage: ((alt.price - mainDrug.price) / mainDrug.price * 100).toFixed(1)
      };
    }).filter(Boolean);
    
    return {
      ...mainDrug,
      alternatives
    };
  }

  // Get drug interactions
  async checkDrugInteractions(drug1, drug2) {
    await delay(300);
    
    // Simulate interaction check
    const severity = Math.random() > 0.5 ? 'Moderate' : 'Mild';
    const descriptions = {
      Moderate: [
        'Potential moderate interaction detected. Monitor for side effects.',
        'Combination may require dosage adjustment.',
        'Increased risk of side effects when taken together.'
      ],
      Mild: [
        'Minor interaction possible. Continue monitoring.',
        'No significant interaction expected.',
        'Safe to use together with normal monitoring.'
      ]
    };
    
    return {
      drug1,
      drug2,
      severity,
      description: descriptions[severity][Math.floor(Math.random() * descriptions[severity].length)],
      timestamp: new Date().toISOString()
    };
  }

  // Get price history
  async getPriceHistory(drugName) {
    await delay(400);
    
    // Simulate price history data
    const today = new Date();
    const history = [];
    
    for (let i = 30; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      const drug = drugs.find(d => d.name === drugName);
      if (drug) {
        // Simulate price fluctuations
        const fluctuation = (Math.random() - 0.5) * 10;
        const price = Math.max(0, drug.price + fluctuation);
        
        history.push({
          date: date.toISOString().split('T')[0],
          price: Math.round(price)
        });
      }
    }
    
    return history;
  }

  // Get manufacturer information
  async getManufacturerInfo(manufacturerName) {
    await delay(300);
    
    // Simulate manufacturer data
    const manufacturers = {
      'Sun Pharma': {
        name: 'Sun Pharmaceutical Industries Ltd',
        location: 'Mumbai, India',
        established: 1983,
        products: drugs.filter(d => d.manufacturer === 'Sun Pharma').length,
        rating: 4.5
      },
      'USV Ltd': {
        name: 'USV Private Limited',
        location: 'Mumbai, India',
        established: 1960,
        products: drugs.filter(d => d.manufacturer === 'USV Ltd').length,
        rating: 4.3
      },
      'MSD': {
        name: 'Merck Sharp & Dohme',
        location: 'New Jersey, USA',
        established: 1891,
        products: drugs.filter(d => d.manufacturer === 'MSD').length,
        rating: 4.7
      }
    };
    
    return manufacturers[manufacturerName] || {
      name: manufacturerName,
      location: 'Information not available',
      established: 'N/A',
      products: drugs.filter(d => d.manufacturer === manufacturerName).length,
      rating: 'N/A'
    };
  }

  // Get category statistics
  async getCategoryStats() {
    await delay(200);
    
    const stats = {};
    drugs.forEach(drug => {
      if (!stats[drug.category]) {
        stats[drug.category] = {
          count: 0,
          avgPrice: 0,
          totalPrice: 0,
          manufacturers: new Set()
        };
      }
      
      stats[drug.category].count++;
      stats[drug.category].totalPrice += drug.price;
      stats[drug.category].manufacturers.add(drug.manufacturer);
    });
    
    // Calculate averages and format data
    return Object.entries(stats).map(([category, data]) => ({
      category,
      count: data.count,
      avgPrice: Math.round(data.totalPrice / data.count),
      manufacturers: Array.from(data.manufacturers)
    }));
  }

  // Get trending drugs
  async getTrendingDrugs() {
    await delay(400);
    
    // Simulate trending drugs based on price changes and frequency
    const trending = drugs
      .map(drug => ({
        ...drug,
        trendScore: Math.random() * 100 // Simulate trend score
      }))
      .sort((a, b) => b.trendScore - a.trendScore)
      .slice(0, 5);
    
    return trending;
  }

  // Get drug alternatives by price range
  async getAlternativesByPrice(drugName, priceRange) {
    await delay(300);
    
    const mainDrug = drugs.find(d => d.name === drugName);
    if (!mainDrug) {
      throw new Error('Drug not found');
    }
    
    const alternatives = drugs
      .filter(drug => 
        drug.category === mainDrug.category &&
        drug.price >= priceRange.min &&
        drug.price <= priceRange.max &&
        drug.name !== drugName
      )
      .sort((a, b) => a.price - b.price);
    
    return alternatives;
  }
}

export const apiService = new ApiService(); 
 