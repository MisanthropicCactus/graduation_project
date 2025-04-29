//C:\Users\aimen\car-rental\src\pages\Reservation\Reservation.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaCalendarAlt,
  FaCar,
  FaUserFriends,
  FaGasPump,
  FaCog,
  FaClock,
  FaMoneyBillWave,
  FaCheckCircle,
  FaTimesCircle,
  FaArrowLeft,
  FaTrash,
  FaSpinner,
  FaFilter,
  FaSearch,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaIdCard
} from 'react-icons/fa';
import './Reservation.css';

const Reservation = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const loadReservations = useCallback(async () => {
    console.log("Chargement des réservations depuis le serveur...");
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/reservations'); // Adapt the URL if needed
      const data = await response.json();
  
      if (response.ok) {
        const sortedReservations = data.sort((a, b) =>
          new Date(b.createdAt) - new Date(a.createdAt)
        );
        setReservations(sortedReservations);
      } else {
        console.error("Erreur de récupération:", data.message);
        setReservations([]);
      }
    } catch (error) {
      console.error("Erreur réseau lors du chargement:", error);
      setReservations([]);
    } finally {
      setLoading(false);
    }
  }, []);
  

  useEffect(() => {
    loadReservations();
  }, [loadReservations]);

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === 'reservations') {
        console.log("Changement détecté via 'storage' event pour 'reservations'. Rechargement...");
        loadReservations();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [loadReservations]);

  const getStatusBadge = (status) => {
     switch (status) {
       case 'confirmed':
         return <span className="status-badge confirmed"><FaCheckCircle /> Confirmée</span>;
       case 'pending':
         return <span className="status-badge pending"><FaClock /> En attente</span>;
       case 'cancelled':
         return <span className="status-badge cancelled"><FaTimesCircle /> Annulée</span>;
       default:
         return <span className="status-badge unknown">Inconnu</span>;
     }
  };

  const updateReservationStatus = (id, newStatus) => {
    setReservations(prevReservations => {
      const updatedList = prevReservations.map(res =>
        res.id === id ? { ...res, status: newStatus, updatedAt: new Date().toISOString() } : res
      );
      try {
        localStorage.setItem('reservations', JSON.stringify(updatedList));
        window.dispatchEvent(new StorageEvent('storage', { key: 'reservations' }));
      } catch (error) {
          console.error("Erreur sauvegarde MAJ statut:", error);
      }
      return updatedList;
    });
  };

  const deleteReservation = (id) => {
    const shortId = id ? String(id).slice(-6) : 'N/A';
    if (window.confirm(`Confirmer la suppression de la réservation #${shortId} ?`)) {
      setReservations(prevReservations => {
        const updatedList = prevReservations.filter(res => res.id !== id);
        try {
          localStorage.setItem('reservations', JSON.stringify(updatedList));
          window.dispatchEvent(new StorageEvent('storage', { key: 'reservations' }));
        } catch (error) {
          console.error("Erreur sauvegarde suppression:", error);
        }
        return updatedList;
      });
    }
  };

  const formatDate = (dateString) => {
      if (!dateString) return "Date invalide";
      try {
          const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
          return new Date(dateString).toLocaleDateString('fr-FR', options);
      } catch (error) {
          return "Date invalide";
      }
  };

  const formatPrice = (price) => {
      const numPrice = Number(price);
      return !isNaN(numPrice) ? numPrice.toLocaleString('fr-DZ', { 
        style: 'currency', 
        currency: 'DZD', 
        minimumFractionDigits: 2 
      }) : 'N/A';
  };

  // Filtrer les réservations en fonction du statut et du terme de recherche
  const filteredReservations = reservations.filter(res => {
    const matchesFilter = filter === 'all' || res.status === filter;
    const matchesSearch = searchTerm === '' || 
      (res.name && res.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (res.id && res.id.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (res.client && res.client.firstName && res.client.firstName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (res.client && res.client.lastName && res.client.lastName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (res.client && res.client.email && res.client.email.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="reservation-page">
      <div className="reservation-container">
        <h2 className="page-title">
          <FaCalendarAlt /> Historique des Réservations
        </h2>

        <div className="admin-actions">
          <button
            onClick={() => navigate("/admin/approval")}
            className="admin-btn"
          >
            <FaArrowLeft /> Retour à la validation
          </button>
        </div>

        {/* Ajout des filtres */}
        <div className="filters-container">
          <div className="search-box">
            <FaSearch className="search-icon" />
            <input 
              type="text" 
              placeholder="Rechercher par véhicule, client ou ID..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          
          <div className="filter-buttons">
            <span className="filter-label"><FaFilter /> Filtrer:</span>
            <button 
              className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              Toutes
            </button>
            <button 
              className={`filter-btn ${filter === 'pending' ? 'active' : ''}`}
              onClick={() => setFilter('pending')}
            >
              En attente
            </button>
            <button 
              className={`filter-btn ${filter === 'confirmed' ? 'active' : ''}`}
              onClick={() => setFilter('confirmed')}
            >
              Confirmées
            </button>
            <button 
              className={`filter-btn ${filter === 'cancelled' ? 'active' : ''}`}
              onClick={() => setFilter('cancelled')}
            >
              Annulées
            </button>
          </div>
        </div>

        {loading ? (
          <div className="loading-message">
            <FaSpinner className="spinner-icon"/> Chargement...
          </div>
        ) : filteredReservations.length === 0 ? (
          <div className="empty-reservation">
            <p>Aucune réservation trouvée.</p>
            <span className="icon">📅</span>
            {filter !== 'all' && (
              <button 
                onClick={() => setFilter('all')} 
                className="reset-filter-btn"
              >
                Afficher toutes les réservations
              </button>
            )}
          </div>
        ) : (
          <>
            <div className="results-summary">
              Affichage de {filteredReservations.length} réservation{filteredReservations.length > 1 ? 's' : ''}
            </div>
            <div className="reservation-list">
              {filteredReservations.map((reservation) => (
                <div key={reservation.id} className={`reservation-card status-${reservation.status}`}>
                  <div className="reservation-header">
                    <h3>Réservation #{reservation.id ? String(reservation.id).slice(-6) : 'N/A'}</h3>
                    {getStatusBadge(reservation.status)}
                  </div>

                  <div className="reservation-details">
                    {/* Section Client - Nouvelle section */}
                    {reservation.client && (
  <div className="detail-section client-section">
    <h4><FaUser /> Informations Client</h4>
    <div className="client-info-grid">
      <div className="client-info-item">
        <div className="client-info-label">
          <FaUser className="info-icon" /> Nom complet
        </div>
        <div className="client-info-value">
          {reservation.client.firstName} {reservation.client.lastName}
        </div>
      </div>
      
      <div className="client-info-item">
        <div className="client-info-label">
          <FaEnvelope className="info-icon" /> Email
        </div>
        <div className="client-info-value">
          {reservation.client.email || 'Non spécifié'}
        </div>
      </div>
      
      <div className="client-info-item">
        <div className="client-info-label">
          <FaPhone className="info-icon" /> Téléphone
        </div>
        <div className="client-info-value">
          {reservation.client.phoneNumber || 'Non spécifié'}
        </div>
      </div>
      
      <div className="client-info-item">
        <div className="client-info-label">
          <FaIdCard className="info-icon" /> Permis
        </div>
        <div className="client-info-value">
          {reservation.client.drivingLicenseId || 'Non spécifié'}
        </div>
      </div>
      
      {reservation.client.pickupLocation && (
        <div className="client-info-item">
          <div className="client-info-label">
            <FaCar className="info-icon" /> Lieu de prise
          </div>
          <div className="client-info-value">
            {reservation.client.pickupLocation}
          </div>
        </div>
      )}
    </div>
  </div>
)}
                    {/* Section Dates */}
                    <div className="detail-section">
                      <h4><FaCalendarAlt /> Dates & Durée</h4>
                      <p><strong>Début:</strong> {formatDate(reservation.startDate)}</p>
                      <p><strong>Fin:</strong> {formatDate(reservation.endDate)}</p>
                      {reservation.duration && <p><strong>Durée:</strong> {reservation.duration} jour(s)</p>}
                    </div>

                    {/* Section Véhicule - Améliorée */}
                    <div className="detail-section">
                      <h4><FaCar /> Véhicule</h4>
                      <div className="vehicle-info">
                        {reservation.image && (
                          <img
                            src={reservation.image}
                            alt={reservation.name || 'Véhicule'}
                            className="vehicle-image"
                            onClick={() => reservation.id && navigate(`/car/${reservation.id}`)}
                            loading="lazy"
                          />
                        )}
                        <div className="vehicle-details">
                          <p className="vehicle-name">{reservation.name || 'Nom inconnu'}</p>
                          {reservation.type && <p className="vehicle-category">{reservation.type}</p>}
                          
                          {/* Ajout des spécifications du véhicule */}
                          <div className="vehicle-specs">
                            <div className="spec-item">
                              <FaUserFriends className="spec-icon" />
                              <span>{reservation.seats || 'N/A'} places</span>
                            </div>
                            <div className="spec-item">
                              <FaGasPump className="spec-icon" />
                              <span>{reservation.fuelType || 'N/A'}</span>
                            </div>
                            <div className="spec-item">
                              <FaCog className="spec-icon" />
                              <span>{reservation.transmission || 'N/A'}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Section Paiement - Améliorée */}
                    <div className="detail-section">
                      <h4><FaMoneyBillWave /> Paiement</h4>
                      <p><strong>Prix/jour:</strong> {formatPrice(reservation.price)}</p>
                      <p><strong>Total:</strong> <span className="total-price">{formatPrice(reservation.totalPrice)}</span></p>
                      {reservation.createdAt && <p className="creation-date"><strong>Créée le:</strong> {formatDate(reservation.createdAt)}</p>}
                      {reservation.updatedAt && <p className="update-date"><strong>Modifiée le:</strong> {formatDate(reservation.updatedAt)}</p>}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="reservation-actions">
                    {reservation.status === 'pending' && (
                      <>
                        <button
                          onClick={() => updateReservationStatus(reservation.id, 'confirmed')}
                          className="action-btn confirm-btn"
                        >
                          <FaCheckCircle /> Confirmer
                        </button>
                        <button
                          onClick={() => updateReservationStatus(reservation.id, 'cancelled')}
                          className="action-btn cancel-btn"
                        >
                           <FaTimesCircle /> Annuler
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => deleteReservation(reservation.id)}
                      className="action-btn delete-btn"
                    >
                      <FaTrash /> Supprimer
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Reservation;