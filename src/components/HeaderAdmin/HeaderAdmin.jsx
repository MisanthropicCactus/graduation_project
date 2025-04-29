//C:\Users\aimen\car-rental\src\components\HeaderAdmin\headerAdmin.jsx
// C:\Users\aimen\car-rental\src\components\HeaderAdmin\headerAdmin.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HeaderAdmin.css';

const HeaderAdmin = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('approve'); // Par défaut, l'onglet actif est "approuver"

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    switch(tab) {
      case 'add':
        // Cette action sera gérée dans AdminApproval pour afficher le formulaire
        if (window.dispatchEvent) {
          window.dispatchEvent(new CustomEvent('showAddCarForm'));
        }
        break;
      case 'approve':
        // Reste sur la page actuelle mais cache le formulaire si ouvert
        if (window.dispatchEvent) {
          window.dispatchEvent(new CustomEvent('hideAddCarForm'));
        }
        break;
      case 'reservations':
        navigate('/Reservation');
        break;
      default:
        break;
    }
  };

  return (
    <div className="admin-header">
      <div className="admin-logo">
        <span className="admin-icon">🛡️</span>
        <h1>Administration</h1>
      </div>
      
      <nav className="admin-nav">
        <ul>
          <li 
            className={`admin-nav-item ${activeTab === 'add' ? 'active' : ''}`}
            onClick={() => handleTabClick('add')}
          >
            <span className="admin-nav-icon">🚗</span>
            <span className="admin-nav-text">Ajouter une voiture</span>
          </li>
          
          <li 
            className={`admin-nav-item ${activeTab === 'approve' ? 'active' : ''}`}
            onClick={() => handleTabClick('approve')}
          >
            <span className="admin-nav-icon">✅</span>
            <span className="admin-nav-text">Approuver les voitures</span>
          </li>
          
          <li 
            className={`admin-nav-item ${activeTab === 'reservations' ? 'active' : ''}`}
            onClick={() => handleTabClick('reservations')}
          >
            <span className="admin-nav-icon">📅</span>
            <span className="admin-nav-text">Voir les réservations</span>
          </li>
        </ul>
      </nav>
      
      <div className="admin-user">
        <div className="admin-user-avatar">
          <span>A</span>
        </div>
        <div className="admin-user-info">
          <span className="admin-user-name">Admin</span>
          <button onClick={() => navigate('/')} className="admin-logout">
            Déconnexion
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeaderAdmin;