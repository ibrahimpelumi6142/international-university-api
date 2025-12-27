/**
 * WorqNow Education API - React Example
 * Complete university search component
 */

import React, { useState, useEffect } from 'react';

const API_BASE = 'https://api.worqnow.ai';

// Custom hook for fetching universities
function useUniversities(country, filters = {}) {
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUniversities = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const params = new URLSearchParams(filters);
        const response = await fetch(`${API_BASE}/education/${country}/universities?${params}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setUniversities(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUniversities();
  }, [country, JSON.stringify(filters)]);

  return { universities, loading, error };
}

// Main University Search Component
function UniversitySearch() {
  const [country, setCountry] = useState('au');
  const [filters, setFilters] = useState({});
  const { universities, loading, error } = useUniversities(country, filters);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  if (loading) return <div className="loading">Loading universities...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="university-search">
      <h1>University Search</h1>
      
      {/* Filters */}
      <div className="filters">
        <select 
          value={country} 
          onChange={(e) => setCountry(e.target.value)}
          className="country-select"
        >
          <option value="au">🇦🇺 Australia</option>
          <option value="ca">🇨🇦 Canada</option>
          <option value="usa">🇺🇸 USA</option>
          <option value="uk">🇬🇧 UK</option>
        </select>

        <label>
          <input
            type="checkbox"
            onChange={(e) => handleFilterChange('has_scholarship', e.target.checked || undefined)}
          />
          Has Scholarships
        </label>

        {country === 'au' && (
          <label>
            <input
              type="checkbox"
              onChange={(e) => handleFilterChange('is_regional', e.target.checked || undefined)}
            />
            Regional Universities
          </label>
        )}

        {country === 'uk' && (
          <label>
            <input
              type="checkbox"
              onChange={(e) => handleFilterChange('is_russell_group', e.target.checked || undefined)}
            />
            Russell Group
          </label>
        )}

        <select onChange={(e) => handleFilterChange('fee_band', e.target.value || undefined)}>
          <option value="">All Fee Bands</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      {/* Results */}
      <div className="results">
        <p className="count">{universities.length} universities found</p>
        
        <div className="university-grid">
          {universities.map(uni => (
            <UniversityCard key={uni.code} university={uni} />
          ))}
        </div>
      </div>
    </div>
  );
}

// University Card Component
function UniversityCard({ university }) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="university-card">
      <h3>{university.name}</h3>
      <p className="region">📍 {university.region}</p>
      
      <div className="badges">
        {university.is_regional && <span className="badge regional">Regional</span>}
        {university.is_russell_group && <span className="badge russell">Russell Group</span>}
        {university.is_go8 && <span className="badge go8">Group of Eight</span>}
        {university.scholarships?.length > 0 && (
          <span className="badge scholarships">
            {university.scholarships.length} Scholarships
          </span>
        )}
      </div>

      <div className="fee-band">
        Fee Band: <strong>{university.international_fee_band}</strong>
      </div>

      <button 
        onClick={() => setShowDetails(!showDetails)}
        className="details-btn"
      >
        {showDetails ? 'Hide' : 'Show'} Details
      </button>

      {showDetails && (
        <div className="details">
          <h4>Courses ({university.courses?.length || 0})</h4>
          <ul>
            {university.courses?.slice(0, 5).map((course, idx) => (
              <li key={idx}>{course.name} ({course.level})</li>
            ))}
          </ul>

          {university.scholarships?.length > 0 && (
            <>
              <h4>Scholarships</h4>
              <ul>
                {university.scholarships.map((scholarship, idx) => (
                  <li key={idx}>
                    <strong>{scholarship.name}</strong>: {scholarship.value}
                  </li>
                ))}
              </ul>
            </>
          )}

          <a 
            href={university.website} 
            target="_blank" 
            rel="noopener noreferrer"
            className="website-link"
          >
            Visit Website →
          </a>
        </div>
      )}
    </div>
  );
}

// Statistics Component
function CountryStatistics({ country }) {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/education/${country}/statistics`)
      .then(res => res.json())
      .then(data => {
        setStats(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [country]);

  if (loading) return <div>Loading stats...</div>;
  if (!stats) return null;

  return (
    <div className="statistics">
      <h2>Statistics for {country.toUpperCase()}</h2>
      <div className="stat-grid">
        <div className="stat">
          <div className="stat-number">{stats.total_universities}</div>
          <div className="stat-label">Universities</div>
        </div>
        <div className="stat">
          <div className="stat-number">{stats.total_scholarships}</div>
          <div className="stat-label">Scholarships</div>
        </div>
        <div className="stat">
          <div className="stat-number">{stats.waec_acceptance_rate}</div>
          <div className="stat-label">WAEC Acceptance</div>
        </div>
      </div>

      {stats.key_advantages && (
        <div className="advantages">
          <h3>Key Advantages</h3>
          <ul>
            {stats.key_advantages.map((advantage, idx) => (
              <li key={idx}>{advantage}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default UniversitySearch;
export { CountryStatistics, useUniversities };
