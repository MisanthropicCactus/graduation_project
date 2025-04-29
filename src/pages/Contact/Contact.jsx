//C:\Users\aimen\car-rental\src\pages\Contact\Contact.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import './contact.css';
import {
    FaMapMarkerAlt,
    FaPhone,
    FaEnvelope,
    FaGlobe,
} from 'react-icons/fa';

const Contact = () => {
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const navigate = useNavigate(); // Initialize navigate

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate form submission
        setIsFormSubmitted(true);
        // Reset form after 3 seconds
        setTimeout(() => {
            setIsFormSubmitted(false);
            setFormData({ name: '', email: '', subject: '', message: '' }); // Reset form data
        }, 3000);
    };

    return (
        <div className="contact-page">
            <div className="contact-container">
                <div className="contact-header">
                    <div className="header-icon">📧</div>
                    <h2>Contactez-nous</h2>
                    <p className="header-subtitle">
                        N'hésitez pas à nous laisser un message!
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="contact-form">
                    <div className="form-columns">
                        <div className="form-column">
                            <div className="form-group">
                                <label htmlFor="name">
                                    <span>Votre Nom</span>
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    placeholder="Votre nom"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">
                                    <span>Votre Email</span>
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="Votre email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="subject">
                                    <span>Objet</span>
                                </label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    placeholder="Objet de votre message"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-column">
                            <div className="form-group full-width">
                                <label htmlFor="message">
                                    <span>Message</span>
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    placeholder="Détails de votre demande"
                                    rows="4"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                ></textarea>
                            </div>
                        </div>
                    </div>

                    <div className="form-actions">
                        <button
                            type="submit"
                            className={`submit-button ${
                                isFormSubmitted ? 'submitted' : ''
                            }`}
                        >
                            <span>
                                {isFormSubmitted ? 'Message Envoyé!' : 'Envoyer'}
                            </span>
                        </button>
                        <button
                            type="button"
                            className="return-button"
                            onClick={() => navigate('/')}
                        >
                            <span>Retour</span>
                        </button>
                    </div>
                </form>

                <div className="contact-info">
                    <div className="info-header">
                        <h2>Nos Coordonnées</h2>
                        <div className="title-underline"></div>
                    </div>
                    <p className="contact-intro">
                        Nous sommes à votre écoute pour toute demande de location
                    </p>
                    <div className="contact-details">
                        <div className="contact-item">
                            <FaMapMarkerAlt className="contact-icon" />
                            <div>
                                <span className="contact-label">Adresse:</span>
                                Algérie • Guelma • Ben djerrah
                            </div>
                        </div>
                        <div className="contact-item">
                            <FaPhone className="contact-icon" />
                            <div>
                                <span className="contact-label">Téléphone:</span>
                                +213778120763
                            </div>
                        </div>
                        <div className="contact-item">
                            <FaEnvelope className="contact-icon" />
                            <div>
                                <span className="contact-label">Email:</span>
                                makhloufachraf757@gmail.com
                            </div>
                        </div>
                        <div className="contact-item">
                            <FaGlobe className="contact-icon" />
                            <div>
                                <span className="contact-label">Site web:</span>
                                https://car-rental-beta-ashen.vercel.app/
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;