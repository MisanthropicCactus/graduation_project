//C:\Users\aimen\car-rental\src\pages\Payement\Payement.jsx
import React, { useContext, useState } from "react";
import { CartContext } from "../../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaArrowRight, FaCreditCard, FaLock, FaCheckCircle } from "react-icons/fa";
import "./payment.css"; // Assurez-vous d'importer le fichier CSS pour le style

const Payement = () => {
  const { cartItems, clearCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [paymentStep, setPaymentStep] = useState(1);
  const [formData, setFormData] = useState({
    cardName: "",
    cardNumber: "",
    cardExpiry: "",
    cardCVV: "",
    billingAddress: "",
    city: "",
    postalCode: "",
    country: "",
  });
  const [errors, setErrors] = useState({});
  
  // Calcul du total initial
  const total = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);
  const [finalTotal, setFinalTotal] = useState(total); // Stocker le montant final

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.cardName.trim()) newErrors.cardName = "Nom requis";
    if (!formData.cardNumber.trim()) {
      newErrors.cardNumber = "Numéro de carte requis";
    } else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ""))) {
      newErrors.cardNumber = "Numéro de carte invalide";
    }
    if (!formData.cardExpiry.trim()) {
      newErrors.cardExpiry = "Date d'expiration requise";
    } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.cardExpiry)) {
      newErrors.cardExpiry = "Format invalide (MM/YY)";
    }
    if (!formData.cardCVV.trim()) {
      newErrors.cardCVV = "CVV requis";
    } else if (!/^\d{3,4}$/.test(formData.cardCVV)) {
      newErrors.cardCVV = "CVV invalide";
    }
    if (paymentStep === 2) {
      if (!formData.billingAddress.trim()) newErrors.billingAddress = "Adresse requise";
      if (!formData.city.trim()) newErrors.city = "Ville requise";
      if (!formData.postalCode.trim()) newErrors.postalCode = "Code postal requis";
      if (!formData.country.trim()) newErrors.country = "Pays requis";
    }
    return newErrors;
  };

  const handleContinue = () => {
    const newErrors = validateForm();
    if (Object.keys(newErrors).length === 0) {
      if (paymentStep === 1) {
        setPaymentStep(2);
      } else {
        setPaymentStep(3);
      }
    } else {
      setErrors(newErrors);
    }
  };

  const handleConfirmPayment = () => {
    // Stocker le montant total avant de vider le panier
    setFinalTotal(total);
    setTimeout(() => {
      clearCart(); // Vider le panier
      setPaymentStep(4); // Passer à l'étape de confirmation
    }, 2000);
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(" ");
    } else {
      return value;
    }
  };

  const formatExpiryDate = (value) => {
    // Supprimer les caractères non numériques
    const rawValue = value.replace(/\D/g, "");
    let formattedValue = "";

    if (rawValue.length > 0) {
      formattedValue = rawValue.slice(0, 2); // Ajouter les deux premiers chiffres (mois)
    }
    if (rawValue.length > 2) {
      formattedValue += "/" + rawValue.slice(2, 4); // Ajouter le slash et les deux chiffres suivants (année)
    }

    return formattedValue;
  };

  return (
    <div className="payment-page-container">
      <div className="payment-page-wrapper">
        {/* En-tête */}
        <div className="payment-page-header">
          <h2>
            <FaCreditCard className="payment-page-header-icon" /> Paiement
          </h2>
          <div className="payment-page-divider"></div>
        </div>

        {/* Étapes du paiement */}
        <div className="payment-steps-container">
          <div className={`payment-step ${paymentStep >= 1 ? "active" : ""}`}>1. Détails de paiement</div>
          <div className={`payment-step ${paymentStep >= 2 ? "active" : ""}`}>2. Adresse de facturation</div>
          <div className={`payment-step ${paymentStep >= 3 ? "active" : ""}`}>3. Confirmation</div>
        </div>

        {/* Étape 1 : Informations de carte */}
        {paymentStep === 1 && (
          <div className="payment-form-container">
            <h3><FaCreditCard /> Informations de carte</h3>
            <div className="payment-form-group">
              <label htmlFor="cardName">Nom sur la carte</label>
              <input
                type="text"
                id="cardName"
                name="cardName"
                value={formData.cardName}
                onChange={handleInputChange}
                className={errors.cardName ? "error" : ""}
              />
              {errors.cardName && <span className="payment-error-message">{errors.cardName}</span>}
            </div>
            <div className="payment-form-group">
              <label htmlFor="cardNumber">Numéro de carte</label>
              <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={(e) => {
                  const formatted = formatCardNumber(e.target.value);
                  setFormData({ ...formData, cardNumber: formatted });
                }}
                maxLength="19"
                placeholder="1234 5678 9012 3456"
                className={errors.cardNumber ? "error" : ""}
              />
              {errors.cardNumber && <span className="payment-error-message">{errors.cardNumber}</span>}
            </div>
            <div className="payment-form-row">
              <div className="payment-form-group half-width">
                <label htmlFor="cardExpiry">Date d'expiration</label>
                <input
                  type="text"
                  id="cardExpiry"
                  name="cardExpiry"
                  value={formData.cardExpiry}
                  onChange={(e) => {
                    const formattedValue = formatExpiryDate(e.target.value);
                    setFormData({
                      ...formData,
                      cardExpiry: formattedValue,
                    });
                  }}
                  placeholder="MM/YY"
                  maxLength="5" // Limiter à 5 caractères (MM/YY)
                  className={errors.cardExpiry ? "error" : ""}
                />
                {errors.cardExpiry && (
                  <span className="payment-error-message">{errors.cardExpiry}</span>
                )}
              </div>
              <div className="payment-form-group half-width">
                <label htmlFor="cardCVV">CVV</label>
                <input
                  type="text"
                  id="cardCVV"
                  name="cardCVV"
                  value={formData.cardCVV}
                  onChange={handleInputChange}
                  maxLength="4"
                  placeholder="123"
                  className={errors.cardCVV ? "error" : ""}
                />
                {errors.cardCVV && <span className="payment-error-message">{errors.cardCVV}</span>}
              </div>
            </div>
            <div className="payment-actions-container">
              <Link to="/cart" className="payment-back-button">
                <FaArrowLeft /> Retour au panier
              </Link>
              <button className="payment-continue-button" onClick={handleContinue}>
                Continuer <FaArrowRight />
              </button>
            </div>
          </div>
        )}

        {/* Étape 2 : Adresse de facturation */}
        {paymentStep === 2 && (
          <div className="payment-form-container">
            <h3>Adresse de facturation</h3>
            <div className="payment-form-group">
              <label htmlFor="billingAddress">Adresse</label>
              <input
                type="text"
                id="billingAddress"
                name="billingAddress"
                value={formData.billingAddress}
                onChange={handleInputChange}
                className={errors.billingAddress ? "error" : ""}
              />
              {errors.billingAddress && <span className="payment-error-message">{errors.billingAddress}</span>}
            </div>
            <div className="payment-form-row">
              <div className="payment-form-group half-width">
                <label htmlFor="city">Ville</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className={errors.city ? "error" : ""}
                />
                {errors.city && <span className="payment-error-message">{errors.city}</span>}
              </div>
              <div className="payment-form-group half-width">
                <label htmlFor="postalCode">Code postal</label>
                <input
                  type="text"
                  id="postalCode"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleInputChange}
                  className={errors.postalCode ? "error" : ""}
                />
                {errors.postalCode && <span className="payment-error-message">{errors.postalCode}</span>}
              </div>
            </div>
            <div className="payment-form-group">
              <label htmlFor="country">Pays</label>
              <select
                id="country"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                className={errors.country ? "error" : ""}
              >
                <option value="">Sélectionnez un pays</option>
                <option value="Algérie">Algérie</option>
                <option value="France">France</option>
                <option value="Belgique">Belgique</option>
                <option value="Canada">Canada</option>
                <option value="Maroc">Maroc</option>
                <option value="Tunisie">Tunisie</option>
              </select>
              {errors.country && <span className="payment-error-message">{errors.country}</span>}
            </div>
            <div className="payment-actions-container">
              <button className="payment-back-button" onClick={() => setPaymentStep(1)}>
                <FaArrowLeft /> Retour
              </button>
              <button className="payment-continue-button" onClick={handleContinue}>
                Vérifier la commande <FaArrowRight />
              </button>
            </div>
          </div>
        )}

        {/* Étape 3 : Confirmation */}
        {paymentStep === 3 && (
          <div className="payment-confirmation-section">
            <h3>Vérification de la commande</h3>
            <div className="payment-confirmation-details">
              <div className="payment-confirmation-block">
                <h4>Véhicules réservés</h4>
                <ul className="payment-confirmation-items">
                  {cartItems.length > 0 ? (
                    cartItems.map((item, index) => (
                      <li key={index} className="payment-confirmation-item">
                        <div className="payment-item-info">
                          <span className="payment-item-name">{item.name}</span>
                          <span className="payment-item-duration">({item.duration} jour(s))</span>
                        </div>
                        <span className="payment-item-price">{item.totalPrice} DZG</span>
                      </li>
                    ))
                  ) : (
                    <li>Aucun véhicule dans votre panier</li>
                  )}
                </ul>
              </div>
              <div className="payment-confirmation-block">
                <h4>Informations de paiement</h4>
                <div className="payment-info-row">
                  <span>Carte:</span>
                  <span>**** **** **** {formData.cardNumber.slice(-4) || '****'}</span>
                </div>
                <div className="payment-info-row">
                  <span>Titulaire:</span>
                  <span>{formData.cardName}</span>
                </div>
              </div>
              <div className="payment-confirmation-block">
                <h4>Adresse de facturation</h4>
                <p>{formData.billingAddress}</p>
                <p>{formData.postalCode}, {formData.city}</p>
                <p>{formData.country}</p>
              </div>
              <div className="payment-confirmation-total">
                <span>Total à payer:</span>
                <span className="payment-total-price">{total} DZG</span>
              </div>
            </div>
            <div className="payment-actions-container">
              <button className="payment-back-button" onClick={() => setPaymentStep(2)}>
                <FaArrowLeft /> Modifier
              </button>
              <button className="payment-confirm-button" onClick={handleConfirmPayment}>
                <FaLock /> Confirmer et payer
              </button>
            </div>
          </div>
        )}

        {/* Étape 4 : Succès du paiement */}
        {paymentStep === 4 && (
          <div className="payment-success-container">
            <div className="payment-success-icon">
              <FaCheckCircle />
            </div>
            <h3>Paiement réussi!</h3>
            <p>Votre réservation a été confirmée. Un email de confirmation vous a été envoyé.</p>
            <div className="payment-success-details">
              <div className="payment-success-info">
                <span>Numéro de réservation:</span>
                <span>{Math.floor(Math.random() * 900000) + 100000}</span>
              </div>
              <div className="payment-success-info">
                <span>Montant payé:</span>
                <span>{finalTotal} DZG</span>
              </div>
            </div>
            <Link 
              to="/" 
              className="payment-home-button"
            >
              Retour à l'accueil
            </Link>
          </div>
        )}

        {/* Notice de sécurité */}
        <div className="payment-security-notice">
          <FaLock /> Paiement sécurisé | Toutes vos données sont protégées
        </div>
      </div>
    </div>
  );
};

export default Payement;