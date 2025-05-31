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
  const [selectedReport, setSelectedReport] = useState('market-overview');

  const reports = [
    { id: 'market-overview', name: 'Market Overview' },
    { id: 'market-share', name: 'Market Share Analysis' },
    { id: 'procedure-volume', name: 'Procedure Volume Trends' },
    { id: 'product-distribution', name: 'Product Category Distribution' },
    { id: 'regional-analysis', name: 'Regional Market Analysis' },
    { id: 'surgeon-performance', name: 'Top Surgeons Analysis' },
    { id: 'hospital-metrics', name: 'Hospital Performance Metrics' },
    { id: 'market-trends', name: 'Market Trends & Forecasts' },
    { id: 'cervical-disc', name: 'Cervical Artificial Disc Replacement' }
  ];

  return (
    <div className="market-analytics">
      <h2>Spine Implant Market Analytics</h2>
      
      {/* Report Selector */}
      <div className="analytics-controls">
        <div className="report-selector">
          <select 
            value={selectedReport}
            onChange={(e) => setSelectedReport(e.target.value)}
            className="report-select"
          >
            {reports.map(report => (
              <option key={report.id} value={report.id}>
                {report.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Market Overview Section */}
      {selectedReport === 'market-overview' && (
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
      )}

      {/* Market Share Section */}
      {selectedReport === 'market-share' && (
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
      )}

      {/* Procedure Volume Trends */}
      {selectedReport === 'procedure-volume' && (
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
      )}

      {/* Product Category Distribution */}
      {selectedReport === 'product-distribution' && (
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
      )}

      {/* Regional Distribution */}
      {selectedReport === 'regional-analysis' && (
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
      )}

      {/* Top Surgeons Section */}
      {selectedReport === 'surgeon-performance' && (
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
      )}

      {/* Top Hospitals Section */}
      {selectedReport === 'hospital-metrics' && (
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
      )}

      {/* Market Trends and Forecasts */}
      {selectedReport === 'market-trends' && (
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
      )}

      {/* Cervical Artificial Disc Replacement Analysis */}
      {selectedReport === 'cervical-disc' && (
        <div className="analytics-section">
          <div className="report-header">
            <h3>Cervical Artificial Disc Replacement - Indian Market Analysis</h3>
            <p className="report-date">Report Generated: {new Date().toLocaleDateString('en-IN', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}</p>
          </div>
          
          {/* Market Overview Cards */}
          <div className="overview-grid">
            <div className="overview-card">
              <h4>Total Market Size (2024)</h4>
              <p className="value">₹2.8B</p>
              <p className="trend positive">+18.5% YoY</p>
            </div>
            <div className="overview-card">
              <h4>Annual Procedures</h4>
              <p className="value">5,200</p>
              <p className="trend positive">+15.2% YoY</p>
            </div>
            <div className="overview-card">
              <h4>Average Price Range</h4>
              <p className="value">₹450K-550K</p>
              <p className="trend negative">-3.5% YoY</p>
            </div>
            <div className="overview-card">
              <h4>Market Penetration</h4>
              <p className="value">12.5%</p>
              <p className="trend positive">+2.8% YoY</p>
            </div>
          </div>

          {/* State-wise Market Distribution */}
          <div className="analytics-section">
            <h4>State-wise Market Distribution (2024)</h4>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={[
                  { state: 'Maharashtra', volume: 850, share: 16.3, growth: 12.5 },
                  { state: 'Delhi NCR', volume: 780, share: 15.0, growth: 14.2 },
                  { state: 'Karnataka', volume: 650, share: 12.5, growth: 15.8 },
                  { state: 'Tamil Nadu', volume: 580, share: 11.2, growth: 13.5 },
                  { state: 'Gujarat', volume: 420, share: 8.1, growth: 11.8 },
                  { state: 'West Bengal', volume: 380, share: 7.3, growth: 10.5 },
                  { state: 'Telangana', volume: 350, share: 6.7, growth: 12.2 },
                  { state: 'Others', volume: 1200, share: 23.1, growth: 9.8 }
                ]}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="state" />
                  <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                  <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                  <Tooltip />
                  <Legend />
                  <Bar yAxisId="left" dataKey="volume" name="Procedures" fill="#8884d8" />
                  <Bar yAxisId="right" dataKey="share" name="Market Share (%)" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Company Market Share */}
          <div className="analytics-section">
            <h4>Company Market Share (2024)</h4>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                  <Pie
                    data={[
                      { name: 'Medtronic', value: 32, price: '₹480,000-520,000' },
                      { name: 'Centinel Spine', value: 18, price: '₹450,000-490,000' },
                      { name: 'Globus Medical', value: 15, price: '₹460,000-500,000' },
                      { name: 'Spine Art', value: 12, price: '₹420,000-460,000' },
                      { name: 'Signus', value: 10, price: '₹440,000-480,000' },
                      { name: 'Aesculap', value: 8, price: '₹470,000-510,000' },
                      { name: 'ESP', value: 5, price: '₹430,000-470,000' }
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

          {/* Top Surgeons */}
          <div className="analytics-section">
            <h4>Top Surgeons by Procedure Volume (2024)</h4>
            <div className="surgeons-grid">
              {[
                { name: 'Dr. Rajesh Kumar', hospital: 'Apollo Hospitals, Chennai', procedures: 180, success: 96.5 },
                { name: 'Dr. Priya Sharma', hospital: 'Fortis Memorial, Delhi', procedures: 165, success: 95.8 },
                { name: 'Dr. Amit Patel', hospital: 'Manipal Hospital, Bangalore', procedures: 150, success: 95.2 },
                { name: 'Dr. Neha Gupta', hospital: 'Kokilaben Hospital, Mumbai', procedures: 145, success: 94.8 },
                { name: 'Dr. Vikram Singh', hospital: 'AIIMS Delhi', procedures: 140, success: 96.2 }
              ].map((surgeon, index) => (
                <div key={index} className="surgeon-card">
                  <h4>{surgeon.name}</h4>
                  <p>Hospital: {surgeon.hospital}</p>
                  <p>Procedures: {surgeon.procedures}</p>
                  <p>Success Rate: {surgeon.success}%</p>
                </div>
              ))}
            </div>
          </div>

          {/* Market Forecast */}
          <div className="analytics-section">
            <h4>Market Forecast (2024-2029)</h4>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={[
                  { year: 2024, marketSize: 2.8, procedures: 5200, growth: 15.2 },
                  { year: 2025, marketSize: 3.3, procedures: 6100, growth: 17.3 },
                  { year: 2026, marketSize: 3.9, procedures: 7200, growth: 18.0 },
                  { year: 2027, marketSize: 4.6, procedures: 8500, growth: 17.9 },
                  { year: 2028, marketSize: 5.4, procedures: 10000, growth: 17.6 },
                  { year: 2029, marketSize: 6.3, procedures: 11800, growth: 18.0 }
                ]}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                  <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                  <Tooltip />
                  <Legend />
                  <Area yAxisId="left" type="monotone" dataKey="marketSize" name="Market Size (₹B)" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
                  <Line yAxisId="right" type="monotone" dataKey="growth" name="Growth Rate (%)" stroke="#ff7300" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Key Market Insights */}
          <div className="trends-grid">
            <div className="trend-card">
              <h4>Market Drivers</h4>
              <ul>
                <li>Growing awareness of motion preservation</li>
                <li>Increasing insurance coverage</li>
                <li>Rising number of trained surgeons</li>
                <li>Technological advancements</li>
              </ul>
            </div>
            <div className="trend-card">
              <h4>Market Challenges</h4>
              <ul>
                <li>High procedure cost</li>
                <li>Limited reimbursement</li>
                <li>Training requirements</li>
                <li>Regional market variations</li>
              </ul>
            </div>
            <div className="trend-card">
              <h4>Future Outlook</h4>
              <ul>
                <li>CAGR: 17.5% (2024-2029)</li>
                <li>Market size by 2029: ₹6.3B</li>
                <li>New product launches</li>
                <li>Expanding indications</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MarketAnalytics; 