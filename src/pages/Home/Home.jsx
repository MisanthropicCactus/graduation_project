//src/pages/Home/Home.jsx
import React, { useEffect } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { Link } from 'react-router-dom';
import './home.css';

// Import des icônes
import EcoIcon from '../../assets/icons/1.jpg';
import PremiumIcon from '../../assets/icons/2.jpg';
import PriceIcon from '../../assets/icons/3.png';

// Import des images de voitures
import CitadineSmall from '../../assets/cars/1.jpg';
import SuvImage from '../../assets/cars/2.jpg';
import CitadineMid from '../../assets/cars/3.jpg';

const Home = () => {
  useEffect(() => {
    const animateStats = () => {
      const statElements = document.querySelectorAll('.stat-number');
      statElements.forEach(element => {
        const target = parseInt(element.getAttribute('data-count'));
        const duration = 2000;
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;

        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            clearInterval(timer);
            current = target;
          }
          element.textContent = Math.floor(current);
        }, 16);
      });
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateStats();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.stats-section');
    if (statsSection) observer.observe(statsSection);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="home-page">
      <Header />
      
      {/* Hero Section */}
      <section className="hero-section" style={{
        backgroundImage: `url('/images/Background/background2.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}>
        <div className="hero-overlay"></div>
        <div className="hero-container">
          <div className="hero-content">
            <h1>Location AutoLibre de Véhicules Premium</h1>
            <p className="hero-subtitle">Achref Makhlouf vous propose une expérience de location unique, alliant performance et respect de l'environnement</p>
            <div className="hero-cta">
              <Link to="/vehicules" className="cta-button primary">
                <span>Découvrir nos véhicules</span>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
              <Link to="/contact" className="cta-button secondary">Contactez-nous</Link>
            </div>
          </div>
        </div>
        <div className="hero-scroll-indicator">
          <div className="mouse-icon">
            <div className="wheel"></div>
          </div>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section className="value-section">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Nos engagements</span>
            <h2 className="section-title">Pourquoi choisir notre service ?</h2>
          </div>
          <div className="value-grid">
            <div className="value-card">
              <div className="value-icon">
                <img src={EcoIcon} alt="Écologique" />
              </div>
              <h3>Engagement Écologique</h3>
              <p>Notre flotte comprend 40% de véhicules hybrides et électriques pour réduire votre empreinte carbone</p>
            </div>
            <div className="value-card">
              <div className="value-icon">
                <img src={PremiumIcon} alt="Premium" />
              </div>
              <h3>Service Premium</h3>
              <p>Livraison du véhicule à votre domicile, 24/7 assistance routière et options sur mesure</p>
            </div>
            <div className="value-card">
              <div className="value-icon">
                <img src={PriceIcon} alt="Tarifs" />
              </div>
              <h3>Tarifs Transparents</h3>
              <p>Pas de frais cachés - le prix que vous voyez est le prix que vous payez</p>
            </div>
          </div>
        </div>
      </section>

      {/* Dernières Offres Section */}
      <section className="offers-section">
        <div className="container">
          <div className="section-header">
            <span className="offers-badge">DERNIÈRES OFFRES</span>
            <h2 className="section-title">Nos offres de voitures</h2>
          </div>
          <div className="offers-grid">
            <div className="offer-card">
              <div className="offer-image">
                <img src={CitadineSmall} alt="Voiture Citadine" />
              </div>
              <div className="offer-content">
                <h3>Citadine</h3>
                <div className="offer-agencies">
                  <div className="agency-item">
                    <span className="agency-name">Wisecars</span>
                    <span className="agency-price"> 2000.00 DZG / jour</span>
                  </div>
                  <div className="agency-item">
                    <span className="agency-name">AutoEurope</span>
                    <span className="agency-price"> 5000.00 DZG  / jour</span>
                  </div>
                  <div className="agency-item">
                    <span className="agency-name">Rentalcars</span>
                    <span className="agency-price"> 8000.00 DZG / jour</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="offer-card">
              <div className="offer-image">
                <img src={SuvImage} alt="SUV" />
              </div>
              <div className="offer-content">
                <h3>SUV</h3>
                <div className="offer-agencies">
                  <div className="agency-item">
                    <span className="agency-name">AutoEurope</span>
                    <span className="agency-price"> 10000.00 DZG / jour</span>
                  </div>
                  <div className="agency-item">
                    <span className="agency-name">Rentalcars</span>
                    <span className="agency-price"> 12000 DZG / jour</span>
                  </div>
                  <div className="agency-item">
                    <span className="agency-name">Budget</span>
                    <span className="agency-price"> 20000 DZG / jour</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="offer-card">
              <div className="offer-image">
                <img src={CitadineMid} alt="Citadine" />
              </div>
              <div className="offer-content">
                <h3>Citadine</h3>
                <div className="offer-agencies">
                  <div className="agency-item">
                    <span className="agency-name">AutoEurope</span>
                    <span className="agency-price"> 3000.00 DZG / jour</span>
                  </div>
                  <div className="agency-item">
                    <span className="agency-name">Wisecars</span>
                    <span className="agency-price"> 5000 DZG / jour</span>
                  </div>
                  <div className="agency-item">
                    <span className="agency-name">BSPAuto</span>
                    <span className="agency-price"> 9000.00 DZG / jour</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="offers-cta">
            <Link to="/vehicules" className="cta-button primary">
              <span>Voir toutes nos offres</span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
        </div>
      </section>
{/* About Section */}
<section className="about-section">
  <div className="container">
    <div className="about-content">
      <div className="founders-images">
        <div className="founder-column">
          <div className="image-wrapper">
            <img src="/images/achref-makhlouf2.jpg" alt="Achref Makhlouf - Fondateur" />
          </div>
          <div className="founder-badge">
            <span className="founder-name">Achref </span>
            <span className="founder-title">Co-Fondateur & CEO</span>
          </div>
        </div>
        <div className="founder-column">
          <div className="image-wrapper">
            <img src="/images/wassim.jpg" alt="Wassim - Fondateur" />
          </div>
          <div className="founder-badge">
            <span className="founder-name">Wassim</span>
            <span className="founder-title">Co-Fondateur & COO</span>
          </div>
        </div>
      </div>
      <div className="about-text">
        <span className="section-subtitle">Notre histoire</span>
        <h2 className="section-title">Notre Philosophie</h2>
        <blockquote className="highlight-text">
          "Chez <strong>AutoLibre 🚗</strong>, nous croyons qu'une location de voiture peut être à la fois luxueuse et responsable."
        </blockquote>
        <p>
          Fondée en 2024 par Achref Makhlouf et Wassim Hamoude, notre entreprise s'engage à révolutionner l'industrie de la location automobile avec une approche centrée sur le client et l'environnement.
        </p>
        <ul className="about-features">
          <li>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 6L9 17L4 12" stroke="#2a9d8f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>Flotte régulièrement renouvelée et entretenue</span>
          </li>
          <li>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 6L9 17L4 12" stroke="#2a9d8f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>Partenariats avec des marques premium</span>
          </li>
          <li>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 6L9 17L4 12" stroke="#2a9d8f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>Compensation carbone pour chaque location</span>
          </li>
          <li>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 6L9 17L4 12" stroke="#2a9d8f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>Service client primé 3 années consécutives</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number" data-count="250">0</div>
              <div className="stat-label">Véhicules Premium</div>
            </div>
            <div className="stat-item">
              <div className="stat-number" data-count="98">0</div>
              <div className="stat-label">Satisfaction Client (%)</div>
            </div>
            <div className="stat-item">
              <div className="stat-number" data-count="15000">0</div>
              <div className="stat-label">Clients Satisfaits</div>
            </div>
            <div className="stat-item">
              <div className="stat-number" data-count="40">0</div>
              <div className="stat-label">Véhicules Électriques</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Témoignages</span>
            <h2 className="section-title">Ce que nos clients disent</h2>
          </div>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-content">
                <div className="rating">★★★★★</div>
                <p>"Le service est exceptionnel et les véhicules sont toujours impeccables. Je recommande vivement!"</p>
              </div>
              <div className="client-info">
                <img src="/images/client1.jpg" alt="Client" />
                <div>
                  <h4>Marie Dupont</h4>
                  <span>Client depuis Janvier 2025</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <h2>Prêt à vivre l'expérience EcoDrive ?</h2>
          <p>Réservez votre véhicule en moins de 2 minutes</p>
          <Link to="/vehicules" className="cta-button primary large">
            <span>Réserver maintenant</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;