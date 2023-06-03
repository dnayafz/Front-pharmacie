import React, { useState, useEffect } from 'react';
import "./zone.css";
import Footer from './footer';

const Card = ({ onSave, villeOptions }) => {
    const [name, setName] = useState('');
    const [ville, setVille] = useState('');

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleVilleChange = (event) => {
        setVille(event.target.value);
    };

    const handleSave = () => {
        const newItem = {
            nom: name,
            ville_id: parseInt(ville)
        };

        fetch('http://localhost:9071/zones/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams(newItem),
        })
            .then((response) => response.json())
            .then((data) => {
                onSave(data);
                setName('');
                setVille('');
            })
            .catch((error) => {
                console.error('Error adding zone:', error);
            });
    };

    return (
        
            <form className='transparent-form'>
            <h2 className='zone-title'> Zones </h2>
            <input
                type="text"
                value={name}
                onChange={handleNameChange}
                placeholder="Enter zone name"
            />
            <select value={ville} onChange={handleVilleChange}>
                <option value="">Select a ville</option>
                {villeOptions.map((option) => (
                    <option key={option.id} value={option.id}>
                        {option.nom}
                    </option>
                ))}
            </select>
            <button className='savee-button' onClick={handleSave}>Save</button>
            </form>
        
    );
};

const ListView = ({ items }) => {
    return (
        
        
            
            <table className="table-list">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Ville</th>
                </tr>
                </thead>
                <tbody>
                {items.map((item) => (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.nom}</td>
                        <td>{item.ville ? item.ville.nom : ''}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        
    );
};

function Zone() {
    const [listItems, setListItems] = useState([]);
    const [villeOptions, setVilleOptions] = useState([]);

    const handleSave = (item) => {
        setListItems([...listItems, item]);
    };

    useEffect(() => {
        fetch('http://localhost:9071/villes/all')
            .then((response) => response.json())
            .then((data) => {
                setVilleOptions(data);
            })
            .catch((error) => {
                console.error('Error fetching ville options:', error);
            });

        fetch('http://localhost:9071/zones/all')
            .then((response) => response.json())
            .then((data) => {
                console.log('List items:', data);
                setListItems(data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <div className="app zone-container">
          <Card onSave={handleSave} villeOptions={villeOptions} />
          <ListView items={listItems} />
          <Footer />
        </div>
      );
    }

export default Zone;