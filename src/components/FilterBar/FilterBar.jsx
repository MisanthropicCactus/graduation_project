// src/components/FilterBar/FilterBar.jsx
import React, { useState } from 'react';
import { FaFilter, FaCar, FaGasPump, FaUserFriends } from 'react-icons/fa';
import './filterBar.css';

const FilterBar = ({ onFilterChange }) => {
  const [activeTab, setActiveTab] = useState('Tous');
  const [priceRange, setPriceRange] = useState([0, 500]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    onFilterChange({ category: tab });
  };

  const handlePriceChange = (e) => {
    setPriceRange([0, parseInt(e.target.value)]);
    onFilterChange({ price: parseInt(e.target.value) });
  };

  const tabs = [
    { id: 'Tous', label: 'Tous les véhicules' },
    { id: 'Économique', label: 'Économique' },
    { id: 'Confort', label: 'Confort' },
    { id: 'Premium', label: 'Premium' }
  ];

  const carTypes = [
    { id: 'compact', label: 'Compact', icon: <FaCar /> },
    { id: 'berline', label: 'Berline', icon: <FaCar /> },
    { id: 'suv', label: 'SUV', icon: <FaCar /> },
    { id: 'luxury', label: 'Luxe', icon: <FaCar /> },
    { id: 'electric', label: 'Électrique', icon: <FaGasPump /> }
  ];

  return (
    <div className="filter-container">
      <div className="filter-header">
        <h2 className="filter-title"><FaFilter /> Filtres</h2>
      </div>
      
      <div className="tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => handleTabChange(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      
      <div className="filter-section">
        <h3 className="section-title">Budget</h3>
        <div className="price-slider">
          <input 
            type="range" 
            min="0" 
            max="500" 
            step="10"
            value={priceRange[1]}
            onChange={handlePriceChange}
            className="slider"
          />
          <div className="price-range">
            <span>0€</span>
            <span>{priceRange[1]}€ / jour</span>
          </div>
        </div>
      </div>
      
      <div className="filter-section">
        <h3 className="section-title">Type de véhicule</h3>
        <div className="car-types">
          {carTypes.map((type) => (
            <button key={type.id} className="type-button">
              {type.icon}
              <span>{type.label}</span>
            </button>
          ))}
        </div>
      </div>
      
      <div className="filter-section">
        <h3 className="section-title">Passagers</h3>
        <div className="passengers-filter">
          <div className="passenger-option">
            <FaUserFriends />
            <span>2+</span>
          </div>
          <div className="passenger-option">
            <FaUserFriends />
            <span>4+</span>
          </div>
          <div className="passenger-option">
            <FaUserFriends />
            <span>5+</span>
          </div>
          <div className="passenger-option">
            <FaUserFriends />
            <span>7+</span>
          </div>
        </div>
      </div>
      
      <button className="apply-filter-button">Appliquer les filtres</button>
    </div>
  );
};

export default FilterBar;