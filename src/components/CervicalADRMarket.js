import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D', '#FF6B6B'];

const CervicalADRMarket = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('yearly');

  // Market Data
  const marketData = {
    marketSize: {
      current: 8500000000, // ₹8.5B
      growth: 12.5,
      forecast: {
        2024: 9500000000,
        2025: 10800000000,
        2026: 12200000000,
        2027: 13800000000,
        2028: 15500000000
      }
    },
    companyShare: [
      { company: "Medtronic", share: 35, revenue: "₹2.98B", price: "₹450,000" },
      { company: "Centinel Spine", share: 20, revenue: "₹1.70B", price: "₹470,000" },
      { company: "Globus Medical", share: 15, revenue: "₹1.28B", price: "₹460,000" },
      { company: "Spine Art", share: 12, revenue: "₹1.02B", price: "₹420,000" },
      { company: "Signus", share: 8, revenue: "₹680M", price: "₹410,000" },
      { company: "Aesculap", share: 6, revenue: "₹510M", price: "₹440,000" },
      { company: "ESP", share: 4, revenue: "₹340M", price: "₹430,000" }
    ],
    stateWiseVolume: [
      { state: "Maharashtra", volume: 1200, growth: 15 },
      { state: "Delhi", volume: 950, growth: 12 },
      { state: "Karnataka", volume: 850, growth: 14 },
      { state: "Tamil Nadu", volume: 780, growth: 13 },
      { state: "Gujarat", volume: 650, growth: 11 },
      { state: "West Bengal", volume: 580, growth: 10 },
      { state: "Telangana", volume: 520, growth: 12 },
      { state: "Kerala", volume: 480, growth: 9 }
    ],
    annualVolume: [
      { year: 2020, volume: 2800, growth: 8.5 },
      { year: 2021, volume: 3200, growth: 14.3 },
      { year: 2022, volume: 3800, growth: 18.8 },
      { year: 2023, volume: 4500, growth: 18.4 },
      { year: 2024, volume: 5200, growth: 15.6 }
    ],
    topSurgeons: [
      {
        name: "Dr. Rajesh Kumar",
        hospital: "Apollo Hospitals, Mumbai",
        procedures: 180,
        successRate: 98.5,
        experience: "15 years",
        specialties: ["C-ADR", "Complex Spine"]
      },
      {
        name: "Dr. Priya Sharma",
        hospital: "Fortis Memorial, Delhi",
        procedures: 165,
        successRate: 98.2,
        experience: "12 years",
        specialties: ["C-ADR", "Minimally Invasive"]
      },
      {
        name: "Dr. Amit Patel",
        hospital: "Manipal Hospital, Bangalore",
        procedures: 150,
        successRate: 97.8,
        experience: "14 years",
        specialties: ["C-ADR", "Revision Surgery"]
      },
      {
        name: "Dr. Neha Gupta",
        hospital: "Max Super Speciality, Delhi",
        procedures: 140,
        successRate: 98.0,
        experience: "11 years",
        specialties: ["C-ADR", "Spine Trauma"]
      },
      {
        name: "Dr. Vikram Singh",
        hospital: "AIIMS Delhi",
        procedures: 135,
        successRate: 97.5,
        experience: "13 years",
        specialties: ["C-ADR", "Spine Oncology"]
      }
    ],
    marketOutlook: {
      growthDrivers: [
        "Increasing awareness of motion preservation benefits",
        "Rising healthcare infrastructure",
        "Growing middle-class population",
        "Insurance coverage expansion",
        "Technological advancements"
      ],
      challenges: [
        "High procedure cost",
        "Limited insurance coverage",
        "Skilled surgeon availability",
        "Infrastructure requirements",
        "Patient awareness"
      ],
      opportunities: [
        "Untapped tier-2 and tier-3 cities",
        "Medical tourism potential",
        "New product innovations",
        "Training and education programs",
        "Public-private partnerships"
      ]
    }
  };

  return (
    <div className="cervical-adr-market">
      <h2>Cervical Artificial Disc Replacement Market Analysis</h2>
      
      {/* Market Overview */}
      <div className="market-overview">
        <h3>Market Overview</h3>
        <div className="overview-cards">
          <div className="overview-card">
            <h4>Current Market Size</h4>
            <p>₹{marketData.marketSize.current.toLocaleString()}</p>
            <span className="growth">+{marketData.marketSize.growth}% YoY</span>
          </div>
          <div className="overview-card">
            <h4>Annual Procedures</h4>
            <p>{marketData.annualVolume[marketData.annualVolume.length - 1].volume}</p>
            <span className="growth">+{marketData.annualVolume[marketData.annualVolume.length - 1].growth}% YoY</span>
          </div>
          <div className="overview-card">
            <h4>Average Price</h4>
            <p>₹450,000</p>
            <span className="trend">Stable</span>
          </div>
        </div>
      </div>

      {/* Company Market Share */}
      <div className="market-share">
        <h3>Company Market Share</h3>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={marketData.companyShare}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="company" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="share" name="Market Share (%)" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* State-wise Volume */}
      <div className="state-volume">
        <h3>State-wise Procedure Volume</h3>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={marketData.stateWiseVolume}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="state" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="volume" name="Annual Procedures" fill="#82ca9d" />
              <Bar dataKey="growth" name="Growth Rate (%)" fill="#ffc658" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Surgeons */}
      <div className="top-surgeons">
        <h3>Top Surgeons</h3>
        <div className="surgeons-grid">
          {marketData.topSurgeons.map((surgeon, index) => (
            <div key={index} className="surgeon-card">
              <h4>{surgeon.name}</h4>
              <p className="hospital">{surgeon.hospital}</p>
              <div className="surgeon-stats">
                <div className="stat">
                  <span>Procedures</span>
                  <strong>{surgeon.procedures}</strong>
                </div>
                <div className="stat">
                  <span>Success Rate</span>
                  <strong>{surgeon.successRate}%</strong>
                </div>
                <div className="stat">
                  <span>Experience</span>
                  <strong>{surgeon.experience}</strong>
                </div>
              </div>
              <div className="specialties">
                {surgeon.specialties.map((spec, i) => (
                  <span key={i} className="specialty-tag">{spec}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Market Outlook */}
      <div className="market-outlook">
        <h3>Market Outlook (2024-2028)</h3>
        <div className="outlook-grid">
          <div className="outlook-section">
            <h4>Growth Drivers</h4>
            <ul>
              {marketData.marketOutlook.growthDrivers.map((driver, index) => (
                <li key={index}>{driver}</li>
              ))}
            </ul>
          </div>
          <div className="outlook-section">
            <h4>Challenges</h4>
            <ul>
              {marketData.marketOutlook.challenges.map((challenge, index) => (
                <li key={index}>{challenge}</li>
              ))}
            </ul>
          </div>
          <div className="outlook-section">
            <h4>Opportunities</h4>
            <ul>
              {marketData.marketOutlook.opportunities.map((opportunity, index) => (
                <li key={index}>{opportunity}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CervicalADRMarket; 