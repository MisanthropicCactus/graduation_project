//src\pages\CarDetails\CarDetails.jsx
import React, { useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { CartContext } from "../../context/CartContext";
import { FaCar, FaGasPump, FaUserFriends, FaCog, FaCalendarAlt, FaClock, FaIdCard, FaFileAlt, FaUserCircle, FaBuilding, FaReceipt, FaStamp } from "react-icons/fa";
import { motion } from "framer-motion";
import "./carDetails.css";

const CarDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useContext(CartContext);
    
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    const formattedTime = `${String(today.getHours()).padStart(2, '0')}:${String(today.getMinutes()).padStart(2, '0')}`;
    
    const [clientInfo, setClientInfo] = useState({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        drivingLicenseId: "",
        email: "",
        pickupLocation: "",
        departureDate: formattedDate,
        departureTime: formattedTime,
        returnDate: formattedDate,
        returnTime: formattedTime
    });

    const [formErrors, setFormErrors] = useState({});

    const [car, setCar] = useState(null);

    useEffect(() => {
    const fetchCar = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/cars/${id}`);
            setCar(response.data);
        } catch (error) {
            console.error("Erreur lors de la récupération du véhicule:", error);
        }
    };

    fetchCar();
}, [id]);


    if (!car) {
        return <h2 className="not-found">Véhicule introuvable</h2>;
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setClientInfo({
            ...clientInfo,
            [name]: value
        });
        
        if (formErrors[name]) {
            setFormErrors({
                ...formErrors,
                [name]: ""
            });
        }
    };

    const validateForm = () => {
        const errors = {};
        
        if (!clientInfo.firstName.trim()) errors.firstName = "Requis";
        if (!clientInfo.lastName.trim()) errors.lastName = "Requis";
        if (!clientInfo.phoneNumber.trim()) {
            errors.phoneNumber = "Requis";
        } else if (!/^\d{10}$/.test(clientInfo.phoneNumber.trim())) {
            errors.phoneNumber = "10 chiffres";
        }
        if (!clientInfo.drivingLicenseId.trim()) errors.drivingLicenseId = "Requis";
        if (!clientInfo.email.trim()) {
            errors.email = "Requis";
        } else if (!/^\S+@\S+\.\S+$/.test(clientInfo.email)) {
            errors.email = "Invalide";
        }
        if (!clientInfo.pickupLocation.trim()) errors.pickupLocation = "Requis";
        if (!clientInfo.departureDate) errors.departureDate = "Requis";
        if (!clientInfo.departureTime) errors.departureTime = "Requis";
        if (!clientInfo.returnDate) errors.returnDate = "Requis";
        if (!clientInfo.returnTime) errors.returnTime = "Requis";
        
        const departureDateTime = new Date(`${clientInfo.departureDate}T${clientInfo.departureTime}`);
        const returnDateTime = new Date(`${clientInfo.returnDate}T${clientInfo.returnTime}`);
        
        if (returnDateTime <= departureDateTime) {
            errors.returnDate = "Doit être après départ";
        }
        
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleChoose = async () => {
        if (!validateForm()) return;
    
        const departureDateTime = new Date(`${clientInfo.departureDate}T${clientInfo.departureTime}`);
        const returnDateTime = new Date(`${clientInfo.returnDate}T${clientInfo.returnTime}`);
        const durationMs = returnDateTime.getTime() - departureDateTime.getTime();
        const durationDays = Math.ceil(durationMs / (1000 * 60 * 60 * 24));
        const totalPrice = car.price * durationDays;
    
        const reservation = {
            carId: car.id,
            clientInfo,
            departureDateTime: departureDateTime.toISOString(),
            returnDateTime: returnDateTime.toISOString(),
            duration: durationDays,
            totalPrice,
            status: "pending"
        };
    
        try {
            await axios.post("http://localhost:5000/api/reservations", reservation);
            alert(`Réservation confirmée pour ${durationDays} jour(s) (${totalPrice} DZG)`);
            navigate("/cart");
        } catch (error) {
            console.error("Erreur lors de la réservation:", error);
            alert("Une erreur est survenue lors de la réservation.");
        }
    };
    
    return (
        <motion.div 
            className="car-details-page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <div className="car-details-container">
                <div className="car-header">
                    <h1>{car.name}</h1>
                    <div className="price-badge">{car.price}DZG/jour</div>
                </div>

                <div className="car-content">
                    <div className="car-media-section">
                        <motion.img 
                            src={car.image} 
                            alt={car.name} 
                            className="car-image"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        />
                        
                        <div className="car-specs-grid">
                            <motion.div 
                                className="spec-item spec-item-seats"
                                whileHover={{ scale: 1.03 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <div className="spec-icon-container">
                                    <FaUserFriends className="spec-icon" />
                                </div>
                                <div className="spec-text">
                                    <div className="spec-label">Places</div>
                                    <div className="spec-value">{car.seats}</div>
                                </div>
                            </motion.div>

                            <motion.div 
                                className="spec-item spec-item-fuel"
                                whileHover={{ scale: 1.03 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <div className="spec-icon-container">
                                    <FaGasPump className="spec-icon" />
                                </div>
                                <div className="spec-text">
                                    <div className="spec-label">Carburant</div>
                                    <div className="spec-value">{car.fuelType}</div>
                                </div>
                            </motion.div>

                            <motion.div 
                                className="spec-item spec-item-transmission"
                                whileHover={{ scale: 1.03 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <div className="spec-icon-container">
                                    <FaCog className="spec-icon" />
                                </div>
                                <div className="spec-text">
                                    <div className="spec-label">Transmission</div>
                                    <div className="spec-value">{car.transmission}</div>
                                </div>
                            </motion.div>

                            <motion.div 
                                className="spec-item spec-item-type"
                                whileHover={{ scale: 1.03 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <div className="spec-icon-container">
                                    <FaCar className="spec-icon" />
                                </div>
                                <div className="spec-text">
                                    <div className="spec-label">Type</div>
                                    <div className="spec-value">{car.type}</div>
                                </div>
                            </motion.div>
                        </div>
                        
                        {/* Section Documents à fournir */}
        <div className="required-documents-section">
            <h2 className="documents-title">Les Documents à Fournir</h2>
            
            <div className="documents-container">
                <div className="document-category">
                    <h3>Particuliers</h3>
                    <div className="document-icon">
                        <FaUserCircle />
                    </div>
                    <ul className="document-list">
                        <li><span className="document-icon-small"><FaIdCard /></span>Passeport original en cours de validité</li>
                        <li><span className="document-icon-small"><FaIdCard /></span>Permis de conduire en cours de validité (03 ans d'ancienneté)</li>
                        <li><span className="document-icon-small"><FaUserCircle /></span>Age minimum 25 ans</li>
                        <li><span className="document-icon-small"><FaReceipt /></span>Caution (entre 50 000.00 et 100 000.00Da)</li>
                    </ul>
                </div>
                
                <div className="document-category">
                    <h3>Entreprises</h3>
                    <div className="document-icon">
                        <FaBuilding />
                    </div>
                    <ul className="document-list">
                        <li><span className="document-icon-small"><FaFileAlt /></span>Copie registre de commerce</li>
                        <li><span className="document-icon-small"><FaFileAlt /></span>Copie carte fiscale</li>
                        <li><span className="document-icon-small"><FaFileAlt /></span>Certificat d'existence</li>
                        <li><span className="document-icon-small"><FaReceipt /></span>Bon de commande</li>
                        <li><span className="document-icon-small"><FaStamp /></span>Cachet de l'entreprise</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>

                    <div className="car-info-section">
                        <p className="car-description">{car.description}</p>

                        <div className="reservation-form">
                            <h2 className="form-title">Formulaire de réservation</h2>
                            
                            <div className="form-grid">
                                <div className="form-group">
                                    <label>Prénom <span className="required-star">*</span></label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={clientInfo.firstName}
                                        onChange={handleInputChange}
                                        className={formErrors.firstName ? 'input-error' : ''}
                                    />
                                    {formErrors.firstName && <span className="error-message">{formErrors.firstName}</span>}
                                </div>

                                <div className="form-group">
                                    <label>Nom <span className="required-star">*</span></label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={clientInfo.lastName}
                                        onChange={handleInputChange}
                                        className={formErrors.lastName ? 'input-error' : ''}
                                    />
                                    {formErrors.lastName && <span className="error-message">{formErrors.lastName}</span>}
                                </div>

                                <div className="form-group">
                                    <label>Téléphone <span className="required-star">*</span></label>
                                    <input
                                        type="tel"
                                        name="phoneNumber"
                                        value={clientInfo.phoneNumber}
                                        onChange={handleInputChange}
                                        placeholder="0612345678"
                                        className={formErrors.phoneNumber ? 'input-error' : ''}
                                    />
                                    {formErrors.phoneNumber && <span className="error-message">{formErrors.phoneNumber}</span>}
                                </div>

                                <div className="form-group">
  <label>
    Permis ID <span className="required-star">*</span>
  </label>
  <input
    type="text"
    name="drivingLicenseId"
    value={clientInfo.drivingLicenseId}
    onChange={handleInputChange}
    maxLength={9} // ✅ Limite à 9 caractères
    className={formErrors.drivingLicenseId ? 'input-error' : ''}
  />
  {formErrors.drivingLicenseId && (
    <span className="error-message">{formErrors.drivingLicenseId}</span>
  )}
</div>

                                <div className="form-group">
                                    <label>Email <span className="required-star">*</span></label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={clientInfo.email}
                                        onChange={handleInputChange}
                                        className={formErrors.email ? 'input-error' : ''}
                                    />
                                    {formErrors.email && <span className="error-message">{formErrors.email}</span>}
                                </div>

                                <div className="form-group">
                                    <label>Lieu de prise en charge <span className="required-star">*</span></label>
                                    <input
                                        type="text"
                                        name="pickupLocation"
                                        value={clientInfo.pickupLocation}
                                        onChange={handleInputChange}
                                        className={formErrors.pickupLocation ? 'input-error' : ''}
                                    />
                                    {formErrors.pickupLocation && <span className="error-message">{formErrors.pickupLocation}</span>}
                                </div>
                            </div>

                            <div className="date-time-section">
                                <h3><FaCalendarAlt /> Dates de location</h3>
                                
                                <div className="date-time-grid">
                                    <div className="form-group">
                                        <label><FaCalendarAlt /> Date départ <span className="required-star">*</span></label>
                                        <input
                                            type="date"
                                            name="departureDate"
                                            value={clientInfo.departureDate}
                                            onChange={handleInputChange}
                                            className={formErrors.departureDate ? 'input-error' : ''}
                                        />
                                        {formErrors.departureDate && <span className="error-message">{formErrors.departureDate}</span>}
                                    </div>

                                    <div className="form-group">
                                        <label><FaClock /> Heure départ <span className="required-star">*</span></label>
                                        <input
                                            type="time"
                                            name="departureTime"
                                            value={clientInfo.departureTime}
                                            onChange={handleInputChange}
                                            className={formErrors.departureTime ? 'input-error' : ''}
                                        />
                                        {formErrors.departureTime && <span className="error-message">{formErrors.departureTime}</span>}
                                    </div>

                                    <div className="form-group">
                                        <label><FaCalendarAlt /> Date retour <span className="required-star">*</span></label>
                                        <input
                                            type="date"
                                            name="returnDate"
                                            value={clientInfo.returnDate}
                                            onChange={handleInputChange}
                                            className={formErrors.returnDate ? 'input-error' : ''}
                                        />
                                        {formErrors.returnDate && <span className="error-message">{formErrors.returnDate}</span>}
                                    </div>

                                    <div className="form-group">
                                        <label><FaClock /> Heure retour <span className="required-star">*</span></label>
                                        <input
                                            type="time"
                                            name="returnTime"
                                            value={clientInfo.returnTime}
                                            onChange={handleInputChange}
                                            className={formErrors.returnTime ? 'input-error' : ''}
                                        />
                                        {formErrors.returnTime && <span className="error-message">{formErrors.returnTime}</span>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="action-buttons">
                    <motion.button 
                        className="back-button" 
                        onClick={() => navigate("/vehicules")}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        Retour aux véhicules
                    </motion.button>
                    <motion.button 
                        className="reserve-button" 
                        onClick={handleChoose}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        Confirmer la réservation
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );
};

export default CarDetails;