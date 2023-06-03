import React from "react";
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa";
import "./footer.css"; 

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Adresse</h3>
          <p>
            <FaMapMarkerAlt className="footer-icon" />
            123 Rue des Pharmacies<br />
            Ville, Pays
          </p>
        </div>
        <div className="footer-section">
          <h3>Contact</h3>
          <p>
            <FaPhone className="footer-icon" />
            +1 234 567 890
          </p>
          <p>
            <FaEnvelope className="footer-icon" />
            info@example.com
          </p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Application de Localisation de Pharmacie. Tous droits réservés.</p>
      </div>
    </footer>
  );
};

export default Footer;
