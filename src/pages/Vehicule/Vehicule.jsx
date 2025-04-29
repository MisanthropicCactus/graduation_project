//C:\Users\aimen\car-rental\src\pages\Vehicule\Vehicule.jsx
import React, { useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import SearchBar from '../../components/SearchBar/SearchBar';
import CarList from '../../components/CarList/CarList';
import Footer from '../../components/Footer/Footer';
import { carsData } from '../../data/cars';
import "./vehicule.css"; // ✅ Assure-toi que ce fichier existe bien

const Vehicule = () => {
  const [allCars, setAllCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);

  // Charger les voitures au montage du composant
// ... dans Vehicule.jsx
useEffect(() => {
  const fetchCars = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/cars');
      const data = await response.json();

      if (response.ok) {
        setAllCars(data);
        setFilteredCars(data);
      } else {
        console.error("Erreur lors du chargement des voitures:", data.message);
      }
    } catch (error) {
      console.error("Erreur réseau:", error);
    }
  };

  fetchCars();
}, []);


  // Gérer la recherche des voitures
  const handleSearch = (query) => {
    if (query.trim() === '') {
      setFilteredCars(allCars);
    } else {
      const filtered = allCars.filter(car => 
        car.name.toLowerCase().includes(query.toLowerCase()) ||
        car.category.toLowerCase().includes(query.toLowerCase()) ||
        (car.specs && car.specs.toLowerCase().includes(query.toLowerCase()))
      );
      setFilteredCars(filtered);
    }
  };

  return (
    <div className="vehicule-page">
      <Header />
      <main className="main-content">
        <SearchBar onSearch={handleSearch} />
        <CarList cars={filteredCars} />
      </main>
      <Footer />
    </div>
  );
};

export default Vehicule;