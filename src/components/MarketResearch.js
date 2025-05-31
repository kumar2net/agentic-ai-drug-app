import React, { useState } from 'react';
import './MarketResearch.css';

function MarketResearch() {
  const [selectedReport, setSelectedReport] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const reportTypes = [
    { 
      id: 'cervical-disc', 
      name: 'Cervical Disc Replacement Analysis - India', 
      description: 'Comprehensive analysis of cervical artificial disc replacement procedures and market trends in India' 
    }
  ];

  // Market data for India
  const marketData = {
    statewiseMarket: [
      { state: 'Maharashtra', marketSize: 1200000000, procedures: 2800 },
      { state: 'Delhi', marketSize: 950000000, procedures: 2200 },
      { state: 'Karnataka', marketSize: 850000000, procedures: 2000 },
      { state: 'Tamil Nadu', marketSize: 780000000, procedures: 1800 },
      { state: 'Gujarat', marketSize: 650000000, procedures: 1500 },
      { state: 'West Bengal', marketSize: 580000000, procedures: 1350 },
      { state: 'Telangana', marketSize: 520000000, procedures: 1200 },
      { state: 'Kerala', marketSize: 480000000, procedures: 1100 }
    ],
    marketSize: {
      current: 8500000000, // ₹8.5B
      projected: 15000000000, // ₹15B by 2028
      growthRate: 12.5
    },
    companies: [
      {
        name: 'Medtronic',
        marketShare: 35,
        products: ['Prestige LP', 'Bryan Cervical Disc'],
        priceRange: { min: 350000, max: 450000 },
        strengths: ['Strong clinical data', 'Extensive surgeon training programs', 'Comprehensive product portfolio']
      },
      {
        name: 'Centinel Spine',
        marketShare: 15,
        products: ['Prodisc C', 'Prodisc C Vivo'],
        priceRange: { min: 320000, max: 420000 },
        strengths: ['Innovative design', 'Strong clinical outcomes', 'Cost-effective solutions']
      },
      {
        name: 'Globus Medical',
        marketShare: 12,
        products: ['Simplify Disc'],
        priceRange: { min: 300000, max: 400000 },
        strengths: ['Minimally invasive approach', 'Rapid recovery protocols', 'Advanced materials']
      },
      {
        name: 'Spine Art',
        marketShare: 10,
        products: ['M6-C'],
        priceRange: { min: 280000, max: 380000 },
        strengths: ['Unique design', 'Motion preservation', 'European technology']
      },
      {
        name: 'Signus',
        marketShare: 8,
        products: ['Mobi-C'],
        priceRange: { min: 250000, max: 350000 },
        strengths: ['Multi-level indication', 'FDA approved', 'Good clinical results']
      },
      {
        name: 'Aesculap',
        marketShare: 7,
        products: ['Activ C'],
        priceRange: { min: 270000, max: 370000 },
        strengths: ['German engineering', 'Quality focus', 'Strong support system']
      },
      {
        name: 'ESP',
        marketShare: 13,
        products: ['ESP Cervical Disc'],
        priceRange: { min: 260000, max: 360000 },
        strengths: ['Local presence', 'Cost advantage', 'Good distribution network']
      }
    ],
    annualVolume: {
      current: 15000,
      projected: 25000,
      growthRate: 10.8
    },
    topSurgeons: [
      { name: 'Dr. Rajesh Verma', hospital: 'Apollo Hospitals, Delhi', procedures: 280 },
      { name: 'Dr. Sunil Sharma', hospital: 'Kokilaben Hospital, Mumbai', procedures: 250 },
      { name: 'Dr. Anil Kumar', hospital: 'Manipal Hospital, Bangalore', procedures: 220 },
      { name: 'Dr. Priya Patel', hospital: 'Fortis Hospital, Mumbai', procedures: 200 },
      { name: 'Dr. Ramesh Singh', hospital: 'Medanta, Gurgaon', procedures: 190 },
      { name: 'Dr. Meera Gupta', hospital: 'Max Hospital, Delhi', procedures: 180 },
      { name: 'Dr. Suresh Reddy', hospital: 'KIMS, Hyderabad', procedures: 170 },
      { name: 'Dr. Arun Kumar', hospital: 'Christian Medical College, Vellore', procedures: 160 },
      { name: 'Dr. Neha Sharma', hospital: 'Jaslok Hospital, Mumbai', procedures: 150 },
      { name: 'Dr. Vikram Malhotra', hospital: 'BLK Hospital, Delhi', procedures: 140 }
    ],
    marketForecast: {
      shortTerm: {
        year: 2025,
        marketSize: 12000000000,
        procedures: 20000,
        growthRate: 12
      },
      mediumTerm: {
        year: 2028,
        marketSize: 15000000000,
        procedures: 25000,
        growthRate: 10
      },
      keyDrivers: [
        'Increasing awareness about motion preservation',
        'Growing middle-class population',
        'Rising healthcare insurance penetration',
        'Improving healthcare infrastructure',
        'Increasing number of trained surgeons'
      ],
      challenges: [
        'High procedure cost',
        'Limited insurance coverage',
        'Need for specialized training',
        'Competition from fusion procedures',
        'Regulatory requirements'
      ]
    }
  };

  const renderReportContent = () => {
    if (!selectedReport) return null;

    switch (selectedReport) {
      case 'cervical-disc':
        return (
          <div className="report-content">
            <h3>India Cervical Artificial Disc Replacement Market Analysis</h3>
            
            {/* State-wise Market Analysis */}
            <div className="state-analysis">
              <h4>State-wise Market Distribution</h4>
              <div className="state-grid">
                {marketData.statewiseMarket.map((state, index) => (
                  <div key={index} className="state-card">
                    <h5>{state.state}</h5>
                    <div className="state-metrics">
                      <div className="metric">
                        <span>Market Size</span>
                        <span>₹{(state.marketSize / 100000000).toFixed(2)} Cr</span>
                      </div>
                      <div className="metric">
                        <span>Annual Procedures</span>
                        <span>{state.procedures}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Overall Market Size */}
            <div className="market-size-section">
              <h4>Market Size & Growth</h4>
              <div className="market-metrics">
                <div className="metric-card">
                  <h5>Current Market Size (2023)</h5>
                  <div className="metric-value">₹{(marketData.marketSize.current / 1000000000).toFixed(1)}B</div>
                </div>
                <div className="metric-card">
                  <h5>Projected Market Size (2028)</h5>
                  <div className="metric-value">₹{(marketData.marketSize.projected / 1000000000).toFixed(1)}B</div>
                </div>
                <div className="metric-card">
                  <h5>Annual Growth Rate</h5>
                  <div className="metric-value positive">{marketData.marketSize.growthRate}%</div>
                </div>
              </div>
            </div>

            {/* Company Analysis */}
            <div className="company-analysis">
              <h4>Market Players & Share</h4>
              <div className="company-grid">
                {marketData.companies.map((company, index) => (
                  <div key={index} className="company-card">
                    <h5>{company.name}</h5>
                    <div className="company-metrics">
                      <div className="metric">
                        <span>Market Share</span>
                        <span>{company.marketShare}%</span>
                      </div>
                      <div className="metric">
                        <span>Price Range</span>
                        <span>₹{company.priceRange.min.toLocaleString()} - ₹{company.priceRange.max.toLocaleString()}</span>
                      </div>
                    </div>
                    <div className="products">
                      <h6>Products:</h6>
                      <ul>
                        {company.products.map((product, i) => (
                          <li key={i}>{product}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="strengths">
                      <h6>Key Strengths:</h6>
                      <ul>
                        {company.strengths.map((strength, i) => (
                          <li key={i}>{strength}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Volume Analysis */}
            <div className="volume-analysis">
              <h4>Procedure Volume Analysis</h4>
              <div className="volume-metrics">
                <div className="metric-card">
                  <h5>Current Annual Volume</h5>
                  <div className="metric-value">{marketData.annualVolume.current.toLocaleString()}</div>
                </div>
                <div className="metric-card">
                  <h5>Projected Volume (2028)</h5>
                  <div className="metric-value">{marketData.annualVolume.projected.toLocaleString()}</div>
                </div>
                <div className="metric-card">
                  <h5>Volume Growth Rate</h5>
                  <div className="metric-value positive">{marketData.annualVolume.growthRate}%</div>
                </div>
              </div>
            </div>

            {/* Top Surgeons */}
            <div className="surgeons-section">
              <h4>Top Surgeons & Hospitals</h4>
              <div className="surgeons-grid">
                {marketData.topSurgeons.map((surgeon, index) => (
                  <div key={index} className="surgeon-card">
                    <h5>{surgeon.name}</h5>
                    <div className="hospital-name">{surgeon.hospital}</div>
                    <div className="procedure-count">
                      Annual Procedures: {surgeon.procedures}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Market Forecast */}
            <div className="forecast-section">
              <h4>Market Forecast & Outlook</h4>
              <div className="forecast-metrics">
                <div className="metric-card">
                  <h5>Short Term (2025)</h5>
                  <div className="metric-value">₹{(marketData.marketForecast.shortTerm.marketSize / 1000000000).toFixed(1)}B</div>
                  <div className="metric-subtext">
                    {marketData.marketForecast.shortTerm.procedures.toLocaleString()} procedures
                  </div>
                </div>
                <div className="metric-card">
                  <h5>Medium Term (2028)</h5>
                  <div className="metric-value">₹{(marketData.marketForecast.mediumTerm.marketSize / 1000000000).toFixed(1)}B</div>
                  <div className="metric-subtext">
                    {marketData.marketForecast.mediumTerm.procedures.toLocaleString()} procedures
                  </div>
                </div>
              </div>
              
              <div className="forecast-factors">
                <div className="drivers">
                  <h5>Key Market Drivers</h5>
                  <ul>
                    {marketData.marketForecast.keyDrivers.map((driver, index) => (
                      <li key={index}>{driver}</li>
                    ))}
                  </ul>
                </div>
                <div className="challenges">
                  <h5>Market Challenges</h5>
                  <ul>
                    {marketData.marketForecast.challenges.map((challenge, index) => (
                      <li key={index}>{challenge}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return <div>Select a report type to view its content</div>;
    }
  };

  return (
    <div className="market-research">
      <div className="research-header">
        <h2>Market Research Reports</h2>
        <div className="report-selector">
          <select
            value={selectedReport}
            onChange={(e) => setSelectedReport(e.target.value)}
            className="report-combo-box"
          >
            <option value="">Select a Report</option>
            {reportTypes.map((report) => (
              <option key={report.id} value={report.id}>
                {report.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      {isLoading ? (
        <div className="loading-spinner"></div>
      ) : (
        <div className="report-container">
          {selectedReport && (
            <div className="report-description">
              {reportTypes.find(r => r.id === selectedReport)?.description}
            </div>
          )}
          {renderReportContent()}
        </div>
      )}
    </div>
  );
}

export default MarketResearch; 