// src/pages/Login/Login.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEnvelope, FaLock, FaGoogle, FaFacebook, FaKey } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header' // ' ../../../components/Header/Header';
import './login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }
  
      console.log('Login success:', data);
  
      // Save the token
      localStorage.setItem('token', data.token);
  
      // Redirect user or show success
      // For example: navigate to dashboard
      navigate('/Home'); // if you're using react-router-dom's useNavigate()
    } catch (error) {
      console.error('Login error:', error.message);
      alert('Login failed: ' + error.message);
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
    <div className="login-page">
      <div className="road-animation">
        <div className="road-line"></div>
        <div className="road-line"></div>
        <div className="road-line"></div>
      </div>
      
      <Header />
      
      <div className="login-container">
        <motion.div 
          className="login-card"
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
          
          <div className="login-header">
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Connexion AutoLibre
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
              Bienvenue sur AutoLibre 🚗✨, votre partenaire de mobilité préféré
            </motion.p>
          </div>

          <motion.form 
            onSubmit={handleSubmit} 
            className="login-form"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="form-section-title">
              <div className="section-icon"><FaKey /></div>
              <h3>Accédez à votre compte</h3>
            </div>
            
            <motion.div className="form-group" variants={itemVariants}>
              <label htmlFor="email">Email</label>
              <div className="input-with-icon">
                <FaEnvelope className="input-icon" />
                <input
                  type="email"
                  id="email"
                  placeholder="Votre adresse email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </motion.div>

            <motion.div className="form-group" variants={itemVariants}>
              <label htmlFor="password">Mot de passe</label>
              <div className="input-with-icon">
                <FaLock className="input-icon" />
                <input
                  type="password"
                  id="password"
                  placeholder="Votre mot de passe"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </motion.div>

            <motion.div className="form-options" variants={itemVariants}>
              <div className="remember-me">
                <input
                  type="checkbox"
                  id="rememberMe"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <label htmlFor="rememberMe">Se souvenir de moi</label>
              </div>
              <Link to="/forgot-password" className="forgot-password">
                Mot de passe oublié?
              </Link>
            </motion.div>

            <motion.button 
              type="submit" 
              className="login-button"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Se connecter
            </motion.button>

            <motion.div className="social-login" variants={itemVariants}>
              <p>Ou connectez-vous avec</p>
              <div className="social-buttons">
                <motion.button 
                  type="button" 
                  className="google-button"
                  whileHover={{ scale: 1.05, backgroundColor: "#f2f2f2" }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaGoogle /> Google
                </motion.button>
                <motion.button 
                  type="button" 
                  className="facebook-button"
                  whileHover={{ scale: 1.05, backgroundColor: "#f2f2f2" }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaFacebook /> Facebook
                </motion.button>
              </div>
            </motion.div>
          </motion.form>

          <motion.div 
            className="register-link"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <p>
              Vous n'avez pas de compte?{' '}
              <Link to="/signup" className="animated-link">Créer un compte</Link>
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

export default Login;