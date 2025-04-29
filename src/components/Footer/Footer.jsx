// src/components/Footer/Footer.jsx
// src/components/Footer/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaCar, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaShieldAlt } from 'react-icons/fa';
import './footer.css';


const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Section Principale */}
        <div className="footer-grid">
          {/* Colonne Logo & Description */}
          <div className="footer-column">
            <h1 className="footer-logo-text">AutoLibre 🚗</h1> {/* New text-based logo */}
            <p className="footer-description">
              AutoLibre 🚗 - Votre partenaire de confiance pour la location de véhicules. 
              Large choix de voitures à des tarifs compétitifs avec assistance 24/7.
            </p>
            <div className="trust-badges">
              <div className="trust-badge">
                <FaShieldAlt className="badge-icon" />
                <span>Assurance incluse</span>
              </div>
              <div className="trust-badge">
                <FaCar className="badge-icon" />
                <span>Véhicules récents</span>
              </div>
            </div>
          </div>

          {/* Colonne Locations */}
          <div className="footer-column">
            <h3 className="footer-title">Nos locations</h3>
            <ul className="footer-links">
              <li><Link to="/location-ville">Location en ville</Link></li>
              <li><Link to="/location-aeroport">Location aéroport</Link></li>
              <li><Link to="/location-longue-duree">Longue durée</Link></li>
              <li><Link to="/voiture-haut-gamme">Voitures haut de gamme</Link></li>
              <li><Link to="/utilitaire">Véhicules utilitaires</Link></li>
            </ul>
          </div>

          {/* Colonne Assistance */}
          <div className="footer-column">
            <h3 className="footer-title">Assistance</h3>
            <ul className="footer-links">
              <li><Link to="/Contact">Contact</Link></li>
              <li><Link to="/assurance">Options d'assurance</Link></li>
              <li><Link to="/conditions-location">Conditions de location</Link></li>
              <li><Link to="/vehicules">Voir les voitures</Link></li>
              <li><Link to="/depannage">Service de dépannage</Link></li>
            </ul>
          </div>

          {/* Colonne Contact */}
          <div className="footer-column contact-column">
            <h3 className="footer-title">Contact rapide</h3>
            <ul className="contact-info">
              <li>
                <FaPhoneAlt className="contact-icon" />
                <a href="tel:+213778120763">+213778120763</a>
              </li>
              <li>
                <FaEnvelope className="contact-icon" />
                <a href="makhloufachraf757@gmail.com">makhloufachraf757@gmail.com</a>
              </li>
              <li>
                <FaMapMarkerAlt className="contact-icon" />
                <span>Algérie • Guelma • Ben djerrah</span>
              </li>
            </ul>
            <div className="opening-hours">
              <p>Ouvert 7j/7 de 8h à 22h</p>
              <p>Assistance 24h/24 pour urgences</p>
            </div>
          </div>
        </div>

        {/* Bas de footer */}
        <div className="footer-bottom">
          <div className="payment-methods">
            <span>Moyens de paiement :</span>
            <div className="payment-icons">
              <img src="/images/payment/Visa.png" alt="Visa" className="payment-icon" loading="lazy" />
              <img src="/images/payment/mastercard.png" alt="Mastercard" className="payment-icon" loading="lazy" />
              <img src="/images/payment/paypal.png" alt="PayPal" className="payment-icon" loading="lazy" />
              <img src="/images/payment/cb.png" alt="Carte Bancaire" className="payment-icon" loading="lazy" />
            </div>
          </div>
          
          <div className="legal-links">
            <Link to="/mentions-legales">Mentions légales</Link>
            <Link to="/cgv">Conditions générales</Link>
            <Link to="/politique-confidentialite">Confidentialité</Link>
            <Link to="/cookies">Cookies</Link>
          </div>
          
          <div className="copyright">
            © {new Date().getFullYear()} AutoLibre 🚗✨ - Tous droits réservés
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;