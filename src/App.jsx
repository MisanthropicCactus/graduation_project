//C:\Users\aimen\car-rental\src\App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext"; 
import Home from "./pages/Home/Home";
import Vehicule from "./pages/Vehicule/Vehicule";
import Contact from "./pages/Contact/Contact";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import CarDetails from "./pages/CarDetails/CarDetails";
import Cart from "./pages/Cart/Cart";// src/pages/Payment/Payment.jsx
import Payement from "./pages/Payment/Payment"; // Import the Payement component
import AddCar from "./pages/AddCar/AddCar"; // Ajout de la page d'ajout de voiture
import AdminApproval from './pages/AdminApproval/AdminApproval';
import Reservation from './pages/Reservation/Reservation'; // Importez le composant Reservation

const App = () => {
  return (
    <Router>
      <CartProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/vehicules" element={<Vehicule />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/car/:id" element={<CarDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/payement" element={<Payement />} /> {/* Add the Payement route */}          
          <Route path="/add-car" element={<AddCar />} />
          <Route path="/reservation" element={<Reservation />} /> {/* Ajoutez cette ligne */}
          <Route path="/admin/approval" element={<AdminApproval />} />          
        </Routes>
      </CartProvider>
    </Router>
  );
};

export default App;