//C:\Users\aimen\car-rental\src\pages\Cart\Cart.jsx
import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../../context/CartContext";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaTimes, FaCar, FaCalendarAlt, FaCreditCard, FaArrowLeft, FaShoppingBag, FaCheckCircle, FaUser, FaEnvelope, FaPhone, FaIdCard, FaMapMarkerAlt } from "react-icons/fa";
import "./cart.css";

const Cart = () => {
  const { cartItems, removeFromCart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  useEffect(() => {
    if (location.state?.paymentSuccess) {
      setPaymentSuccess(true);
      const timer = setTimeout(() => {
        clearCart();
      }, 10000); // Vide le panier après 10 secondes
      return () => clearTimeout(timer);
    }
  }, [location.state, clearCart]);

  const total = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);

  const handleCheckout = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: cartItems }),
      });
  
      if (response.ok) {
        navigate("/payement", { state: { paymentSuccess: true } });
      } else {
        const errorData = await response.json();
        console.error('Erreur de réservation:', errorData.message);
        alert("Échec de la réservation");
      }
    } catch (error) {
      console.error('Erreur lors de la connexion au serveur:', error);
      alert("Erreur réseau");
    }
  };
  
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  const formatTime = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="cart-container">
      <div className="cart-page">
        {paymentSuccess ? (
          <div className="payment-success-container">
            <div className="payment-success-icon">
              <FaCheckCircle />
            </div>
            <h3>Paiement réussi!</h3>
            <p>Votre réservation a été confirmée. Un email de confirmation vous a été envoyé.</p>
            <div className="payment-success-details">
              <div className="payment-success-info">
                <span>Montant payé:</span>
                <span>{total} DZG</span>
              </div>
            </div>
            <Link to="/" className="payment-home-button">
              Retour à l'accueil
            </Link>
          </div>
        ) : (
          <>
            <div className="cart-header">
              <h2>
                <FaShoppingBag className="header-icon" /> Votre Réservation
              </h2>
              <div className="header-divider"></div>
            </div>

            {cartItems.length === 0 ? (
              <div className="empty-cart">
                <div className="empty-cart-icon">
                  <FaShoppingBag />
                </div>
                <h3>Votre panier est vide</h3>
                <p>Explorez notre gamme de véhicules et trouvez la perle rare</p>
                <Link to="/vehicules" className="browse-btn">
                  Voir nos véhicules
                </Link>
              </div>
            ) : (
              <div className="cart-content">
                <div className="cart-items-container">
                  <h3 className="section-title">
                    <FaCar /> Vos Véhicules Sélectionnés
                  </h3>
                  <ul className="cart-list">
                    {cartItems.map((item, index) => (
                      <li key={index} className="cart-item">
                        <div className="item-image-container">
                          <img src={item.image} alt={item.name} className="cart-image" />
                          <div className="car-badge">{item.category}</div>
                        </div>
                        
                        <div className="cart-details">
                          <h3>{item.name}</h3>
                          <div className="detail-row">
                            <span className="detail-label">
                              <FaCalendarAlt /> Durée:
                            </span>
                            <span>{item.duration} jour(s)</span>
                          </div>
                          <div className="detail-row">
                            <span className="detail-label">Prix/jour:</span>
                            <span>{item.price} DZG</span>
                          </div>
                          <div className="detail-row total">
                            <span className="detail-label">Total:</span>
                            <span className="price">{item.totalPrice} DZG</span>
                          </div>
                          
                          {/* Nouvelles informations client */}
{/* Section informations client améliorée */}
{/* Section informations client optimisée */}
{item.client && (
  <div className="client-info-section">
    <h4 className="client-info-title"><FaUser /> Informations Client</h4>
    <div className="client-info-grid">
      <div className="client-info-item">
        <span className="client-info-label"><FaUser /> Nom</span>
        <span className="client-info-value">{item.client.firstName} {item.client.lastName}</span>
      </div>
      <div className="client-info-item">
        <span className="client-info-label"><FaEnvelope /> Email</span>
        <span className="client-info-value">{item.client.email}</span>
      </div>
      <div className="client-info-item">
        <span className="client-info-label"><FaPhone /> Téléphone</span>
        <span className="client-info-value">{item.client.phoneNumber}</span>
      </div>
      <div className="client-info-item">
        <span className="client-info-label"><FaIdCard /> Permis</span>
        <span className="client-info-value">{item.client.drivingLicenseId}</span>
      </div>
      <div className="client-info-item">
        <span className="client-info-label"><FaMapMarkerAlt /> Lieu</span>
        <span className="client-info-value">{item.client.pickupLocation}</span>
      </div>
      <div className="client-info-item">
        <span className="client-info-label"><FaCalendarAlt /> Dates</span>
        <span className="client-info-value">
          {formatDate(item.startDate)} {formatTime(item.startDate)} - {formatDate(item.endDate)} {formatTime(item.endDate)}
        </span>
      </div>
    </div>
  </div>
)}
                        </div>

                        <button
                          className="delete-button"
                          onClick={() => removeFromCart(item.id)}
                          aria-label="Supprimer"
                        >
                          <FaTimes />
                        </button>
                      </li>
                    ))}
                  </ul>
                  
                  <Link to="/vehicules" className="add-more-btn">
                    + Ajouter un autre véhicule
                  </Link>
                </div>

                <div className="cart-summary">
                  <h3>
                    <FaCreditCard /> Récapitulatif
                  </h3>
                  <div className="summary-rows">
                    <div className="summary-row">
                      <span>Sous-total:</span>
                      <span>{total} DZG</span>
                    </div>
                    <div className="summary-row">
                      <span>Frais de service:</span>
                      <span>Gratuit</span>
                    </div>
                    <div className="summary-row total">
                      <span>Total à payer:</span>
                      <span className="total-price">{total} DZG</span>
                    </div>
                  </div>

                  <button className="checkout-btn" onClick={handleCheckout}>
                    Procéder au paiement
                  </button>
                  
                  <div className="payment-methods">
                    <span>Nous acceptons:</span>
                    <div className="payment-icons">
                      <img src="/images/payment/Visa.png" alt="Visa" className="payment-icon" loading="lazy" />
                      <img src="/images/payment/mastercard.png" alt="Mastercard" className="payment-icon" loading="lazy" />
                      <img src="/images/payment/paypal.png" alt="PayPal" className="payment-icon" loading="lazy" />
                      <img src="/images/payment/cb.png" alt="Carte Bancaire" className="payment-icon" loading="lazy" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            <Link to="/" className="return-home">
              <FaArrowLeft /> Retour à l'accueil
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;