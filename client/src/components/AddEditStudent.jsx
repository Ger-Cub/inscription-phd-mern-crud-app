// client/src/pages/AddEditStudent.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate,useSearchParams, useParams } from 'react-router-dom';

const AddEditStudent = ({ fetchStudents }) => {
  const navigate = useNavigate();

  const { id } = useParams();
  const [name, setname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  useEffect(() => {
    if (id) {
      console.log('here');
      fetchStudent();
    }
  }, [id]);

  const fetchStudent = async () => {
    try {
      const response = await axios.get(`/api/Students/${id}`);
      setname(response.data.data[0].name);
      setEmail(response.data.data[0].email);
      setPassword(response.data.data[0].password);
    } catch (error) {
      console.error('Error fetching Student:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newStudent = { name, email, password };

    if (id) {
      try {
        await axios.put(`/api/Students/${id}`, newStudent);
        navigate('/Students');
      } catch (error) {
        console.error('Error updating Student:', error);
      }
    } else {
      try {
        await axios.post('/api/Students', newStudent);
        fetchStudents(); // Fetch Students after adding a new Student
        navigate('/Students');
      } catch (error) {
        console.error('Error adding Student:', error);
      }
    }
  };

  return (
    <div className='w-[85%] p-[5rem]'>
      <h2 className="text-xl font-bold mb-2"> {id ? 'Modifier' : 'Ajouter'} l'étudiant</h2>
      <form onSubmit={handleSubmit} className='w-[70%]'>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Nom
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setname(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Adresse mail
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Mot de passe
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Enregistrer
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEditStudent;
