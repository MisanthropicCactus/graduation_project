//C:\Users\aimen\car-rental\src\components\CarCard\CarCard.jsx
import React, { useContext } from 'react';
import { FaCar, FaGasPump, FaUserFriends, FaCog, FaHeart, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import './carcard.css';

const CarCard = ({ car, isOpen, toggleDescription }) => {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="car-card">
      <div className="car-image-container">
        <img src={car.image} alt={car.name} className="car-image" />
      </div>

      <div className="car-details">
        <div className="car-header">
          <h3 className="car-name">{car.name}</h3>
          <div className="category-badge">{car.category}</div>
        </div>

        <div className="car-info-section">
          <ul className="features-list">
            <li><FaUserFriends className="feature-icon" /> {car.seats} places</li>
            <li><FaGasPump className="feature-icon" /> {car.fuelType}</li>
            <li><FaCog className="feature-icon" /> {car.transmission}</li>
            <li><FaCar className="feature-icon" /> {car.type}</li>
          </ul>
        </div>

        <button className="toggle-description-btn" onClick={toggleDescription}>
          {isOpen ? 'Masquer la description' : 'Voir la description'}
          {isOpen ? <FaChevronUp className="toggle-icon" /> : <FaChevronDown className="toggle-icon" />}
        </button>

        {isOpen && (
          <div className="car-description">
            <p>{car.description || "Aucune description disponible pour ce véhicule."}</p>
          </div>
        )}

        <hr className="divider-line" />

        <div className="price-section">
          <div className="price-container">
            <span className="price">{car.price} DZG</span>
            <span className="per-day">/jour</span>
          </div>
          <div className="car-actions">
            <Link to={`/car/${car.id}`} className="view-details-button">Voir détails</Link>
            <button className="favorite-button"><FaHeart /></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarCard;