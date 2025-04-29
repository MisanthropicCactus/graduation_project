//C:\Users\aimen\car-rental\src\pages\AddCar\AddCar.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./addCar.css";

const AddCar = () => {
  const [car, setCar] = useState({
    name: "",
    category: "",
    price: "",
    image: null,
    seats: "",
    fuelType: "",
    transmission: "",
    type: "",
    description: "",
    status: "pending"
  });

  // Options pour les menus déroulants (sans les noms de voiture)
  const categoryOptions = ["Économique", "Confort", "Luxe", "Familiale", "SUV", "Sport"];
  
  const fuelTypeOptions = ["Essence", "Diesel", "Hybride", "Électrique", "GPL"];
  
  const transmissionOptions = ["Manuelle", "Automatique", "Semi-automatique"];
  
  const carTypeOptions = ["Berline", "SUV", "Coupé", "Cabriolet", "Monospace", "Break", "Citadine"];

  const [previewImage, setPreviewImage] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCar({ ...car, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
      convertToBase64(file);
    }
  };

  const convertToBase64 = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setCar((prevCar) => ({ ...prevCar, image: reader.result }));
    };
    reader.onerror = (error) => {
      console.error("Erreur lors de la conversion de l'image : ", error);
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!car.name || !car.price || !car.image) {
      alert("Veuillez remplir tous les champs obligatoires.");
      return;
    }
  
    try {
      const response = await axios.post("http://localhost:3001/api/cars", car);
      alert("Votre voiture a été soumise pour approbation.");
      navigate("/vehicules");
    } catch (error) {
      console.error("Erreur lors de l'envoi de la voiture :", error);
      alert("Une erreur s'est produite. Veuillez réessayer.");
    }
  };
  
  return (
    <div className="add-car-page">
      <div className="add-car-container">
        <div className="add-car-header">
          <div className="header-icon">🚗</div>
          <h2>Ajoutez ma voiture</h2>
          <p className="header-subtitle">Proposez votre véhicule à la location</p>
        </div>
        
        <div className="approval-notice">
          <span className="notice-icon">ℹ️</span>
          <p>Votre voiture sera examinée par un administrateur avant d'être publiée sur notre plateforme.</p>
        </div>
        
        <form onSubmit={handleSubmit} className="add-car-form-horizontal">
          <div className="form-columns">
            <div className="form-column">
              <div className="form-group">
                <label htmlFor="name">
                  <span>Nom de la voiture</span>
                </label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  placeholder="Ex: Renault Clio" 
                  onChange={handleChange} 
                  required 
                />
              </div>

              <div className="form-group">
                <label htmlFor="category">
                  <span>Catégorie</span>
                </label>
                <select 
                  id="category" 
                  name="category" 
                  value={car.category}
                  onChange={handleChange} 
                  required
                  className="select-input"
                >
                  <option value="" disabled>Sélectionnez une catégorie</option>
                  {categoryOptions.map((option, index) => (
                    <option key={index} value={option}>{option}</option>
                  ))}
                </select>
              </div>

              <div className="form-group price-input-container">
                <label htmlFor="price">
                  <span>Prix par jour</span>
                </label>
                <div className="price-input-wrapper">
                  <input 
                    type="number" 
                    id="price" 
                    name="price" 
                    placeholder="2000.00" 
                    onChange={handleChange} 
                    required 
                  />
                  <span className="price-suffix">DZG / jour</span>
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="seats">
                  <span>Nombre de places</span>
                </label>
                <input 
                  type="number" 
                  id="seats" 
                  name="seats" 
                  placeholder="Ex: 5" 
                  onChange={handleChange} 
                  required 
                />
              </div>
            </div>

            <div className="form-column">
              <div className="form-group file-input-container">
                <label htmlFor="car-image">Image de la voiture</label>
                <input 
                  id="car-image" 
                  type="file" 
                  accept="image/*" 
                  onChange={handleImageChange} 
                  required 
                  style={{ display: 'none' }}
                />
                <div 
                  className="file-upload-box" 
                  onClick={() => document.getElementById('car-image').click()}
                >
                  {previewImage ? (
                    <img src={previewImage} alt="Aperçu" className="image-preview" />
                  ) : (
                    <div className="upload-placeholder">
                      <span>Cliquez pour ajouter une image</span>
                      <small>JPEG, PNG ou JPG (max 5Mo)</small>
                    </div>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="fuelType">
                  <span>Type de carburant</span>
                </label>
                <select 
                  id="fuelType" 
                  name="fuelType" 
                  value={car.fuelType}
                  onChange={handleChange} 
                  required
                  className="select-input"
                >
                  <option value="" disabled>Sélectionnez un type de carburant</option>
                  {fuelTypeOptions.map((option, index) => (
                    <option key={index} value={option}>{option}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="transmission">
                  <span>Transmission</span>
                </label>
                <select 
                  id="transmission" 
                  name="transmission" 
                  value={car.transmission}
                  onChange={handleChange} 
                  required
                  className="select-input"
                >
                  <option value="" disabled>Sélectionnez un type de transmission</option>
                  {transmissionOptions.map((option, index) => (
                    <option key={index} value={option}>{option}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-column">
              <div className="form-group">
                <label htmlFor="type">
                  <span>Type de voiture</span>
                </label>
                <select 
                  id="type" 
                  name="type" 
                  value={car.type}
                  onChange={handleChange} 
                  required
                  className="select-input"
                >
                  <option value="" disabled>Sélectionnez un type de voiture</option>
                  {carTypeOptions.map((option, index) => (
                    <option key={index} value={option}>{option}</option>
                  ))}
                </select>
              </div>

              <div className="form-group full-width">
                <label htmlFor="description">
                  <span>Description</span>
                </label>
                <textarea 
                  id="description" 
                  name="description" 
                  placeholder="Décrivez votre voiture (équipements, état, particularités...)" 
                  rows="4" 
                  onChange={handleChange} 
                  required
                ></textarea>
              </div>

              <div className="form-actions">
                <button type="submit" className="submit-button">
                  <span>Ajouter ma voiture</span>
                </button>
                <button 
                  type="button" 
                  className="return-button" 
                  onClick={() => navigate("/")}
                >
                  <span>Retour</span>
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCar;