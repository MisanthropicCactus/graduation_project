// src/pages/Signup/Signup.jsx
// src/pages/Signup/Signup.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaPhone, FaGoogle, FaFacebook, FaCalendarAlt, FaVenusMars, FaIdCard, FaCar } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Header from '../../components/Header/Header';
import './signup.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    birthDate: '',
    gender: '',
    licenseNumber: '',
    licenseDate: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (formData.password !== formData.confirmPassword) {
      alert("Les mots de passe ne correspondent pas !");
      return;
    }
  
    try {
      const response = await fetch('http://localhost:5000/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        alert('Inscription réussie !');
        // Optional: redirect to login page
      } else {
        alert(result.message || 'Erreur lors de l\'inscription.');
      }
    } catch (error) {
      console.error('Erreur serveur:', error);
      alert('Erreur de connexion au serveur.');
    }
  };
  

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        delayChildren: 0.3,
        staggerChildren: 0.1 
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };


  return (
    <div className="signup-page">
      <div className="road-animation">
        <div className="road-line"></div>
        <div className="road-line"></div>
        <div className="road-line"></div>
      </div>
      
      <Header />
      
      <div className="signup-container">
        <motion.div 
          className="signup-card"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="dashboard-decoration">
            <div className="speedometer">
              <div className="speedometer-dial"></div>
              <div className="speedometer-needle"></div>
            </div>
            <div className="steering-wheel"></div>
          </div>
          
          <div className="signup-header">
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Rejoignez AutoLibre
            </motion.h1>
            
            <motion.div
              className="car-animation-container"
              initial={{ x: -100 }}
              animate={{ x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="car-silhouette">
                <div className="car-body"></div>
                <div className="car-window"></div>
                <div className="car-wheel front-wheel"></div>
                <div className="car-wheel back-wheel"></div>
                <div className="car-light"></div>
              </div>
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="tagline"
            >
              Prenez la route avec nous - Inscrivez-vous et démarrez votre aventure
            </motion.p>
          </div>

          <motion.form 
            onSubmit={handleSubmit} 
            className="signup-form"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="form-section-title">
              <div className="section-icon"><FaUser /></div>
              <h3>Informations personnelles</h3>
            </div>
            
            <motion.div className="form-row" variants={itemVariants}>
              <div className="form-group">
                <label htmlFor="firstName">Prénom</label>
                <div className="input-with-icon">
                  <FaUser className="input-icon" />
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    placeholder="Votre prénom"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Nom</label>
                <div className="input-with-icon">
                  <FaUser className="input-icon" />
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    placeholder="Votre nom"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </motion.div>

            <motion.div className="form-row" variants={itemVariants}>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <div className="input-with-icon">
                  <FaEnvelope className="input-icon" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Votre adresse email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="phone">Téléphone</label>
                <div className="input-with-icon">
                  <FaPhone className="input-icon" />
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="Votre numéro de téléphone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </motion.div>

            <motion.div className="form-row" variants={itemVariants}>
              <div className="form-group">
                <label htmlFor="birthDate">Date de naissance</label>
                <div className="input-with-icon">
                  <FaCalendarAlt className="input-icon" />
                  <input
                    type="date"
                    id="birthDate"
                    name="birthDate"
                    value={formData.birthDate}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="gender">Sexe</label>
                <div className="input-with-icon gender-select-container">
                  <FaVenusMars className="input-icon" />
                  <select
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                    className="gender-select"
                  >
                    <option value="">Sélectionnez</option>
                    <option value="male">Homme</option>
                    <option value="female">Femme</option>
                    <option value="prefer-not-to-say">Ne pas préciser</option>
                  </select>
                </div>
              </div>
            </motion.div>
            
            <div className="form-section-title">
              <div className="section-icon"><FaIdCard /></div>
              <h3>Informations de conduite</h3>
            </div>
            
            <motion.div className="form-row" variants={itemVariants}>
              <div className="form-group">
                <label htmlFor="licenseNumber">Numéro de permis</label>
                <div className="input-with-icon">
                  <FaIdCard className="input-icon" />
                  <input
                    type="text"
                    id="licenseNumber"
                    name="licenseNumber"
                    placeholder="Votre numéro de permis de conduire"
                    value={formData.licenseNumber}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="licenseDate">Date d'obtention</label>
                <div className="input-with-icon">
                  <FaCalendarAlt className="input-icon" />
                  <input
                    type="date"
                    id="licenseDate"
                    name="licenseDate"
                    value={formData.licenseDate}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </motion.div>
            

            
            <div className="form-section-title">
              <div className="section-icon"><FaLock /></div>
              <h3>Sécuriser votre compte</h3>
            </div>

            <motion.div className="form-group" variants={itemVariants}>
              <label htmlFor="password">Mot de passe</label>
              <div className="input-with-icon">
                <FaLock className="input-icon" />
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Créer un mot de passe"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
            </motion.div>

            <motion.div className="form-group" variants={itemVariants}>
              <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
              <div className="input-with-icon">
                <FaLock className="input-icon" />
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Confirmer votre mot de passe"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
            </motion.div>

            <motion.div className="terms-checkbox" variants={itemVariants}>
              <input
                type="checkbox"
                id="agreeTerms"
                name="agreeTerms"
                checked={formData.agreeTerms}
                onChange={handleChange}
                required
              />
              <label htmlFor="agreeTerms">
                J'accepte les <a href="/terms">conditions d'utilisation</a> et la <a href="/privacy">politique de confidentialité</a>
              </label>
            </motion.div>

            <motion.button 
              type="submit" 
              className="signup-button" 
              disabled={!formData.agreeTerms}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="key-icon"></span>
              Démarrer mon expérience AutoLibre
            </motion.button>

            <motion.div className="social-signup" variants={itemVariants}>
              <p>Ou inscrivez-vous avec</p>
              <div className="social-buttons">
                <motion.button 
                  type="button" 
                  className="social-button google-button"
                  whileHover={{ scale: 1.05, backgroundColor: "#f2f2f2" }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaGoogle /> Google
                </motion.button>
                <motion.button 
                  type="button" 
                  className="social-button facebook-button"
                  whileHover={{ scale: 1.05, backgroundColor: "#f2f2f2" }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaFacebook /> Facebook
                </motion.button>
              </div>
            </motion.div>
          </motion.form>

          <motion.div 
            className="login-link"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <p>
              Vous avez déjà un compte?{' '}
              <Link to="/login" className="animated-link">Se connecter</Link>
            </p>
          </motion.div>
          
          <motion.div 
            className="benefits car-benefits"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
          >
            <h3>Avantages des membres AutoLibre</h3>
            <ul>
              <li>
                <div className="benefit-icon-container">
                  <span className="benefit-icon">⚡</span>
                </div>
                <div className="benefit-content">
                  <h4>Réservation Express</h4>
                  <p>Processus simplifié en quelques clics</p>
                </div>
              </li>
              <li>
                <div className="benefit-icon-container">
                  <span className="benefit-icon">💰</span>
                </div>
                <div className="benefit-content">
                  <h4>Tarifs exclusifs</h4>
                  <p>Économisez jusqu'à 15% sur vos locations</p>
                </div>
              </li>
              <li>
                <div className="benefit-icon-container">
                  <span className="benefit-icon">🔄</span>
                </div>
                <div className="benefit-content">
                  <h4>Kilométrage illimité</h4>
                  <p>Sur une sélection de véhicules</p>
                </div>
              </li>
              <li>
                <div className="benefit-icon-container">
                  <span className="benefit-icon">🏆</span>
                </div>
                <div className="benefit-content">
                  <h4>Programme Fidélité AutoMiles</h4>
                  <p>Cumulez des points à chaque location</p>
                </div>
              </li>
            </ul>
          </motion.div>
          
          <div className="car-decoration bottom-car"></div>
        </motion.div>
      </div>

    </div>
  );
};
// Dans Signup.jsx

export default Signup;