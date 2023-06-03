import './style.css'
import React, { useState, useEffect } from 'react';
import "./zone.css";
import Footer from './footer';

const Card = ({ onSave, onUpdate, updateValue, setUpdateValue }) => {
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleSave = () => {
        onSave(inputValue);
        setInputValue('');
    };

    const handleUpdate = () => {
        onUpdate(updateValue, inputValue);
        setInputValue('');
        setUpdateValue('');
    };

    return (
        
        <form className='transparent-form'>
            <h2 className='untitre'>villes</h2>
            <input
                type="text"
                value={inputValue || updateValue}
                onChange={handleInputChange}
                placeholder="Enter city name"
            />
            {updateValue ? (
                <button  onClick={handleUpdate}>Update</button>
            ) : (
                <button className='savee-button' onClick={handleSave}>Save</button>
            )}
        </form>
    );
};

const ListView = ({ items, onDelete, onUpdate, setUpdateValue }) => {
    return (
        <table className="table-list">
        
        
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.nom}</td>
                <td>
  <button className="delete-button" onClick={() => onDelete(item.id)}>Delete</button>
  {'  '} {/* Ajouter un espace */}
  <button className="update-button" onClick={() => onUpdate(item)}>Update</button>
</td>
              </tr>
            ))}
          </tbody>
        </table>
     
    );
  };

function Ville() {
    const [listItems, setListItems] = useState([]);
    const [updateValue, setUpdateValue] = useState('');

    useEffect(() => {
        fetch('http://localhost:9071/villes/all')
            .then((response) => response.json())
            .then((data) => {
                setListItems(data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const handleSaveItem = (item) => {
        if (item.trim() === '') {
            console.log('Veuillez entrer un nom de ville'); // Définit le message d'erreur
            return; // Arrête la fonction si le champ est vide
          }
        fetch('http://localhost:9071/villes/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nom: item }),
        })
            .then((response) => response.json())
            .then((data) => {
                setListItems([...listItems, data]);
            })
            .catch((error) => {
                console.error('Error adding city:', error);
            });
    };

    const handleDeleteItem = (itemId) => {
        const confirmed = window.confirm("Êtes-vous sûr de vouloir supprimer cet élément ?");
      
        if (confirmed) {
          fetch(`http://localhost:9071/villes/deleteVille/id=${itemId}`, {
            method: 'DELETE',
          })
            .then(() => {
              setListItems(listItems.filter((item) => item.id !== itemId));
            })
            .catch((error) => {
              console.error('Error deleting city:', error);
            });
        }
      };
      

    const handleUpdateItem = (item) => {
        setUpdateValue(item.nom);
    };

    const handlePerformUpdate = (item, newValue) => {
        const updatedCity = { ...item, nom: newValue }; // Update the city name

        fetch(`http://localhost:9071/villes/updateVille/id=${item.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedCity),
        })
            .then((response) => response.json())
            .then((updatedItem) => {
                setListItems((prevItems) =>
                    prevItems.map((prevItem) =>
                        prevItem.id === updatedItem.id ? updatedItem : prevItem
                    )
                );
                setUpdateValue('');
            })
            .catch((error) => {
                console.error('Error updating city:', error);
            });
    };

    return (
        
            <div className="app zone-container">
            <Card
                onSave={handleSaveItem}
                onUpdate={handlePerformUpdate}
                updateValue={updateValue}
                setUpdateValue={setUpdateValue}
            />
            <ListView
                items={listItems}
                onDelete={handleDeleteItem}
                onUpdate={handleUpdateItem}
                setUpdateValue={setUpdateValue}
            />
            <Footer />
        </div>
    );
}

export default Ville;
