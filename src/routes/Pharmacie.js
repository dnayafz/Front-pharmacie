import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "../App.css";
import "./style.css";
import Footer from './footer';

const PharmacieList = () => {
    const [pharmacies, setPharmacies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newPharmacie, setNewPharmacie] = useState({
        nom: '',
        adresse: '',
        telephone: '',
        lat: 0,
        log: 0,
        etat: 0,
        zoneId: '',
        villeId: ''
    });
    const [zoneOptions, setZoneOptions] = useState([]);
    const [villeOptions, setVilleOptions] = useState([]);

    useEffect(() => {
        fetchPharmacies();
        fetchZoneOptions();
        fetchVilleOptions();
    }, []);

    const fetchPharmacies = async () => {
        try {
            const response = await axios.get('http://localhost:9071/pharmacies/all');
            setPharmacies(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching pharmacies:', error);
        }
    };

    const fetchZoneOptions = async () => {
        try {
            const response = await axios.get('http://localhost:9071/zones/all');
            setZoneOptions(response.data);
        } catch (error) {
            console.error('Error fetching zone options:', error);
        }
    };

    const fetchVilleOptions = async () => {
        try {
            const response = await axios.get('http://localhost:9071/villes/all');
            setVilleOptions(response.data);
        } catch (error) {
            console.error('Error fetching ville options:', error);
        }
    };

    const deletePharmacie = async (id) => {
        try {
            await axios.delete(`http://localhost:9071/pharmacies/deletePharmacie/id=${id}`);
            setPharmacies(pharmacies.filter((pharmacie) => pharmacie.id !== id));
        } catch (error) {
            console.error('Error deleting pharmacie:', error);
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewPharmacie((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSave = async () => {
        try {
            const response = await axios.post('http://localhost:9071/pharmacies/add/1', newPharmacie);
            setPharmacies([...pharmacies, response.data]);
            setNewPharmacie({
                nom: '',
                adresse: '',
                telephone: '',
                lat: 0,
                log: 0,
                etat: 0,
                zoneId: '',
                villeId: ''
            });
        } catch (error) {
            console.error('Error adding pharmacie:', error);
        }
    };


    return (
      <div className="container-wrapper">
    <div className="container">
    <div className="add-pharmacie-form">
      <h2 className='pharmacie-form-title'>Pharmacie List</h2>
      <form onSubmit={handleSave}>
        
              <input
                  type="text"
                  name="nom"
                  value={newPharmacie.nom}
                  onChange={handleInputChange}
                  placeholder="Pharmacy Name"
              />
              <input
                  type="text"
                  name="adresse"
                  value={newPharmacie.adresse}
                  onChange={handleInputChange}
                  placeholder="Pharmacy Address"
              />
              <input
                  type="text"
                  name="telephone"
                  value={newPharmacie.telephone}
                  onChange={handleInputChange}
                  placeholder="Pharmacy Telephone"
              />
              <input
                  type="number"
                  name="lat"
                  value={newPharmacie.lat}
                  onChange={handleInputChange}
                  placeholder="Latitude"
              />
              <input
                  type="number"
                  name="log"
                  value={newPharmacie.log}
                  onChange={handleInputChange}
                  placeholder="Longitude"
              />
              <select name="zoneId" value={newPharmacie.zoneId} onChange={handleInputChange}>
                  <option value="">Select Zone</option>
                  {zoneOptions.map((zone) => (
                      <option key={zone.id} value={zone.id}>
                          {zone.nom}
                      </option>
                  ))}
              </select>
              <select name="villeId" value={newPharmacie.villeId} onChange={handleInputChange}>
                  <option value="">Select Ville</option>
                  {villeOptions.map((ville) => (
                      <option key={ville.id} value={ville.id}>
                          {ville.nom}
                      </option>
                  ))}
              </select>
              <button type="submit">Save</button>
      </form>
    </div>

    {loading ? (
      <p>Loading...</p>
    ) : (
      
        
      <table className="table-list">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>adresse</th>
              <th>Telephone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pharmacies.map((pharmacie) => (
              <tr key={pharmacie.id}>
                <td>{pharmacie.id}</td>
                <Link to={`/pharmadetails/${pharmacie.id}`} className="pharmacie-name-link">{pharmacie.nom}</Link>
                <td>{pharmacie.adresse}</td>
                <td>{pharmacie.telephone}</td>
                <td>
                  <button className='deletebtn' onClick={() => deletePharmacie(pharmacie.id)}>Delete</button>
                  {/* Add other actions (Update, etc.) here */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      
    )}
   </div>
    <Footer />
  </div>
    );
  
};

export default PharmacieList;