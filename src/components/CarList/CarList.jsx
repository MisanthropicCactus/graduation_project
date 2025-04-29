// src/components/CarList/CarList.jsx
import React, { useState, useEffect } from 'react';
import CarCard from '../CarCard/CarCard';
import './carList.css';

const CarList = ({ cars, title = "Véhicules disponibles" }) => {
  const [allCars, setAllCars] = useState([]);
  const [openDescriptions, setOpenDescriptions] = useState({});

  // Fonction pour générer un ID unique
  const generateUniqueId = (car, index, source) => {
    // Si la voiture a déjà un ID, on l'utilise en ajoutant la source
    if (car.id) return `${car.id}-${source}`;

    // Sinon, on génère un ID unique basé sur plusieurs facteurs
    return `car-${source}-${index}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  };

  useEffect(() => {
    const approvedCars = JSON.parse(localStorage.getItem("carList")) || [];

    // Préparer les voitures avec des IDs uniques
    const carsWithUniqueIds = cars.map((car, index) => ({
      ...car,
      id: generateUniqueId(car, index, 'props')
    }));

    const approvedCarsWithUniqueIds = approvedCars.map((car, index) => ({
      ...car,
      id: generateUniqueId(car, index, 'localStorage')
    }));

    // Fusionner les deux tableaux sans créer de doublons dans les IDs
    const uniqueCars = [...carsWithUniqueIds, ...approvedCarsWithUniqueIds];

    // Vérifier l'unicité des IDs pour éviter les conflits
    const uniqueCarIds = new Set();
    const finalCars = uniqueCars.filter((car) => {
      if (!uniqueCarIds.has(car.id)) {
        uniqueCarIds.add(car.id);
        return true;
      }
      return false; // Filtrer les doublons
    });

    setAllCars(finalCars);

    const handleCarUpdate = () => {
      const updatedApprovedCars = JSON.parse(localStorage.getItem("carList")) || [];
      const updatedApprovedCarsWithUniqueIds = updatedApprovedCars.map((car, index) => ({
        ...car,
        id: generateUniqueId(car, index, 'localStorage-updated')
      }));

      const updatedUniqueCars = [...carsWithUniqueIds, ...updatedApprovedCarsWithUniqueIds];
      const updatedUniqueCarIds = new Set();
      const finalUpdatedCars = updatedUniqueCars.filter((car) => {
        if (!updatedUniqueCarIds.has(car.id)) {
          updatedUniqueCarIds.add(car.id);
          return true;
        }
        return false; // Filtrer les doublons
      });

      setAllCars(finalUpdatedCars);
    };

    window.addEventListener("carListUpdated", handleCarUpdate);

    return () => {
      window.removeEventListener("carListUpdated", handleCarUpdate);
    };
  }, [cars]);

  const toggleDescription = (carId) => {
    setOpenDescriptions((prev) => ({
      ...prev,
      [carId]: !prev[carId],
    }));
  };

  if (!allCars || allCars.length === 0) {
    return (
      <div className="car-list-container">
        <h2 className="car-list-title">{title}</h2>
        <div className="no-cars">
          <p>Aucun véhicule ne correspond à votre recherche.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="car-list-container">
      <div className="list-header">
        <h2 className="car-list-title">{title}</h2>
        <p className="results-count">{allCars.length} véhicules trouvés</p>
      </div>

      <div className="car-grid">
        {allCars.map((car) => (
          <CarCard
            key={car.id} // Utilisation de l'ID unique généré
            car={car}
            isOpen={!!openDescriptions[car.id]}
            toggleDescription={() => toggleDescription(car.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default CarList;