import React, { useState } from 'react';
import { marketData } from '../mockMarketData';
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
  AreaChart,
  Area,
  Line
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

const MarketAnalytics = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('yearly');

  return (
    <div className="market-analytics">
      <h2>Spine Implant Market Analytics</h2>
      
      {/* Time Period Selector */}
      <div className="analytics-controls">
        <div className="timeframe-selector">
          <button 
            className={selectedTimeframe === 'yearly' ? 'active' : ''} 
            onClick={() => setSelectedTimeframe('yearly')}
          >
            Yearly
          </button>
          <button 
            className={selectedTimeframe === 'quarterly' ? 'active' : ''} 
            onClick={() => setSelectedTimeframe('quarterly')}
          >
            Quarterly
          </button>
          <button 
            className={selectedTimeframe === 'monthly' ? 'active' : ''} 
            onClick={() => setSelectedTimeframe('monthly')}
          >
            Monthly
          </button>
        </div>
      </div>

      {/* Market Overview Section */}
      <div className="analytics-section overview">
        <h3>Market Overview</h3>
        <div className="overview-grid">
          <div className="overview-card">
            <h4>Total Market Size</h4>
            <p className="value">₹9.8B</p>
            <p className="trend positive">+12.5% YoY</p>
          </div>
          <div className="overview-card">
            <h4>Annual Growth Rate</h4>
            <p className="value">8.4%</p>
            <p className="trend positive">+2.1% vs Last Year</p>
          </div>
          <div className="overview-card">
            <h4>Total Procedures</h4>
            <p className="value">168,000</p>
            <p className="trend positive">+8.4% YoY</p>
          </div>
          <div className="overview-card">
            <h4>Average Price</h4>
            <p className="value">₹58,300</p>
            <p className="trend negative">-3.2% YoY</p>
          </div>
        </div>
      </div>

      {/* Market Share Section */}
      <div className="analytics-section">
        <h3>Market Share by Company</h3>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={marketData.marketShare}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="company" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="share" name="Market Share (%)" fill="#8884d8" />
              <Bar dataKey="revenue" name="Revenue (₹B)" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Procedure Volume Trends */}
      <div className="analytics-section">
        <h3>Procedure Volume Trends</h3>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={marketData.annualVolume}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="volume" name="Procedures" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
              <Line type="monotone" dataKey="growth" name="Growth (%)" stroke="#ff7300" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Product Category Distribution */}
      <div className="analytics-section">
        <h3>Product Category Distribution</h3>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={[
                  { name: 'Cervical Implants', value: 35 },
                  { name: 'Lumbar Implants', value: 45 },
                  { name: 'Thoracic Implants', value: 15 },
                  { name: 'Motion Preservation', value: 5 }
                ]}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={150}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {COLORS.map((color, index) => (
                  <Cell key={`cell-${index}`} fill={color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Regional Distribution */}
      <div className="analytics-section">
        <h3>Regional Market Distribution</h3>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={[
              { region: 'North', share: 35, growth: 9.2 },
              { region: 'South', share: 30, growth: 8.5 },
              { region: 'East', share: 15, growth: 7.8 },
              { region: 'West', share: 20, growth: 8.9 }
            ]}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="region" />
              <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
              <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
              <Tooltip />
              <Legend />
              <Bar yAxisId="left" dataKey="share" name="Market Share (%)" fill="#8884d8" />
              <Bar yAxisId="right" dataKey="growth" name="Growth Rate (%)" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Surgeons Section */}
      <div className="analytics-section">
        <h3>Top Spine Surgeons</h3>
        <div className="surgeons-grid">
          {marketData.topSurgeons.map((surgeon, index) => (
            <div key={index} className="surgeon-card">
              <h4>{surgeon.name}</h4>
              <p>Hospital: {surgeon.hospital}</p>
              <p>Procedures: {surgeon.procedures}</p>
              <p>Specialties: {surgeon.specialties.join(', ')}</p>
              <p>Rating: {surgeon.rating} ⭐</p>
              <div className="surgeon-stats">
                <div className="stat">
                  <span className="label">Success Rate</span>
                  <span className="value">98.5%</span>
                </div>
                <div className="stat">
                  <span className="label">Experience</span>
                  <span className="value">15+ years</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Hospitals Section */}
      <div className="analytics-section">
        <h3>Top Hospitals</h3>
        <div className="hospitals-grid">
          {marketData.topHospitals.map((hospital, index) => (
            <div key={index} className="hospital-card">
              <h4>{hospital.name}</h4>
              <p>Location: {hospital.location}</p>
              <p>Procedures: {hospital.procedures}</p>
              <p>Specialties: {hospital.specialties.join(', ')}</p>
              <p>Rating: {hospital.rating} ⭐</p>
              <p>Accreditation: {hospital.accreditation.join(', ')}</p>
              <div className="hospital-stats">
                <div className="stat">
                  <span className="label">Success Rate</span>
                  <span className="value">97.8%</span>
                </div>
                <div className="stat">
                  <span className="label">Patient Satisfaction</span>
                  <span className="value">4.7/5</span>
                </div>
                <div className="stat">
                  <span className="label">Infection Rate</span>
                  <span className="value">0.8%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Market Trends and Forecasts */}
      <div className="analytics-section">
        <h3>Market Trends and Forecasts</h3>
        <div className="trends-grid">
          <div className="trend-card">
            <h4>Growth Drivers</h4>
            <ul>
              <li>Increasing geriatric population</li>
              <li>Rising prevalence of spine disorders</li>
              <li>Technological advancements in implants</li>
              <li>Growing healthcare infrastructure</li>
            </ul>
          </div>
          <div className="trend-card">
            <h4>Market Challenges</h4>
            <ul>
              <li>High cost of procedures</li>
              <li>Limited insurance coverage</li>
              <li>Regulatory compliance</li>
              <li>Competition from local manufacturers</li>
            </ul>
          </div>
          <div className="trend-card">
            <h4>Future Outlook</h4>
            <ul>
              <li>Expected CAGR: 9.2% (2024-2029)</li>
              <li>Market size by 2029: ₹15.2B</li>
              <li>Focus on minimally invasive procedures</li>
              <li>Integration of AI and robotics</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketAnalytics; 