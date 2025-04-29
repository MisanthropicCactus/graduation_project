// src/components/SearchBar/SearchBar.jsx
import React, { useState, useEffect } from 'react';
import { FaCalendarAlt, FaMapMarkerAlt, FaSearch, FaCar, FaAngleDown } from 'react-icons/fa';
import './searchBar.css';

const SearchBar = ({ onSearch }) => {
  const [voiture, setVoiture] = useState('');
  const [location, setLocation] = useState('');
  const [pickupDate, setPickupDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [isCompact, setIsCompact] = useState(false);

  // Animation d'apparition lors du chargement
  useEffect(() => {
    setIsVisible(true);

    // Détection de la taille de l'écran pour mode compact
    const handleResize = () => {
      setIsCompact(window.innerWidth < 768);
    };

    handleResize(); // Initialiser
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Animation lors de la soumission
    const button = e.currentTarget.querySelector('.search-button');
    button.classList.add('button-pulse');

    setTimeout(() => {
      button.classList.remove('button-pulse');
      onSearch({ voiture,location,  pickupDate, returnDate });
    }, 600); // Réduit de 800ms pour une réponse plus rapide
  };

  // Calculer une date minimale (aujourd'hui) pour les sélecteurs de date
  const today = new Date().toISOString().split('T')[0];

  // Mettre à jour la date de retour si la date de prise en charge est postérieure
  useEffect(() => {
    if (pickupDate && returnDate && pickupDate > returnDate) {
      setReturnDate(pickupDate);
    }
  }, [pickupDate, returnDate]);

  return (
    <div className={`search-hero ${isVisible ? 'fade-in' : ''}`}>
      <div className="particles-bg"></div>

      <div className="search-container">
        <div className="search-header">
          {/* Icône de voiture supprimée */}
          <h1 className="search-title slide-in">Trouvez votre voiture idéale</h1>
          <p className="search-subtitle slide-in delay-1">
            {isCompact ? 'Location aux meilleurs tarifs en Algérie' : 'Une expérience de location premium aux meilleurs tarifs en Algérie'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="search-form pop-in">
          <div className="form-group">
            <label htmlFor="voiture">
              <FaCar className="label-icon" /> Modèle de voiture
            </label>
            <div className="input-wrapper">
              <input
                id="voiture"
                type="text"
                placeholder="BMW, Mercedes, Toyota..."
                value={voiture}
                onChange={(e) => setVoiture(e.target.value)}
                className="search-input"
                required
              />
              <FaAngleDown className="dropdown-icon" />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="voiture">
              <FaCar className="label-icon" /> Lieu
            </label>
            <div className="input-wrapper">
              <input
                id="Lieu"
                type="text"
                placeholder="Alger, Guelma, Annaba, Oran ..."
                value={voiture}
                onChange={(e) => setVoiture(e.target.value)}
                className="search-input"
                required
              />
              <FaAngleDown className="dropdown-icon" />
            </div>
          </div>


          <div className="date-container">
            <div className="form-group date-group">
              <label htmlFor="pickup">
                <FaCalendarAlt className="label-icon" /> Date de prise en charge
              </label>
              <div className="input-wrapper">
                <input
                  id="pickup"
                  type="date"
                  value={pickupDate}
                  min={today}
                  onChange={(e) => setPickupDate(e.target.value)}
                  className="search-input date-input"
                  required
                />
              </div>
            </div>

            <div className="form-group date-group">
              <label htmlFor="return">
                <FaCalendarAlt className="label-icon" /> Date de retour
              </label>
              <div className="input-wrapper">
                <input
                  id="return"
                  type="date"
                  value={returnDate}
                  min={pickupDate || today}
                  onChange={(e) => setReturnDate(e.target.value)}
                  className="search-input date-input"
                  required
                />
              </div>
            </div>
          </div>

          <button type="submit" className="search-button">
            <FaSearch className="button-icon" />
            <span>{isCompact ? 'Rechercher' : 'Rechercher maintenant'}</span>
          </button>
        </form>


        <div className="benefits-row">
          <div className="benefit-badge">
            <span className="benefit-icon">✓</span>
            <span className="benefit-text">Sans caution</span>
          </div>
          <div className="benefit-badge">
            <span className="benefit-icon">✓</span>
            <span className="benefit-text">Annulation gratuite</span>
          </div>
          <div className="benefit-badge">
            <span className="benefit-icon">✓</span>
            <span className="benefit-text">Support 24/7</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;