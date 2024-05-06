// client/src/pages/AddEditProject.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const AddEditProject = ({ fetchProjects = null }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    if (id) {
      fetchProject();
    }
  }, [id]);

  const fetchProject = async () => {
    try {
      const response = await axios.get(`/api/Projects/${id}`);
      setName(response.data.data[0].name);
      setDescription(response.data.data[0].description);
      setPrice(response.data.data[0].price);
    } catch (error) {
      console.error('Error fetching Project:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newProject = { name, description, price: Number(price) };

    if (id) {
      try {
        await axios.put(`/api/Projects/${id}`, newProject);
        navigate('/Projects');
      } catch (error) {
        console.error('Error updating Project:', error);
      }
    } else {
      try {
        await axios.post('/api/Projects', newProject);
        fetchProjects(); // Fetch Projects after adding a new Project
        navigate('/Projects');
      } catch (error) {
        console.error('Error adding Project:', error);
      }
    }

    
    
  };

  // Compteur des mots

  const compterMots = () => {
    const mots = description.split(' ');
    return mots.length - 1;
  };

  return (
    <div className='w-[85%] p-[5rem]'>
      <h2 className="text-xl font-bold mb-2">{id ? 'Ajoutez votre' : 'Modifiez votre'} Projet</h2>
      <form onSubmit={compterMots() <= 450 && handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Nom complet
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            placeholder='Nom Postnom Prenom'
            onChange={(e) => setName(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
            Bref description de votre Projet de recherche / Sujet, Problèmatique, Objectifs, Méthodologies et resultat attendus / 450 mots max
          </label>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="shadow appearance-none border h-[15rem] rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <small className={compterMots() < 450 ? 'text-green-500 text-justify' : 'text-red-500 text-justify'}>{compterMots()} mots.</small>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
            Coût estimé en $
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Enregister
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEditProject;
