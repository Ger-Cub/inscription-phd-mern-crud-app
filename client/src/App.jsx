// client/src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import StudentList from './components/StudentList';
import ProjectList from './components/ProjectList';
import AddEditProject from './components/AddEditProject';
import AddEditStudent from './components/AddEditStudent';
import Home from './components/Home';

const App = () => {
  // State and useEffect hooks
  const [Students, setStudents] = useState([]);
  const [Projects, setProjects] = useState([]);
  axios.defaults.baseURL = `http://localhost:5000`

  useEffect(() => {
    fetchStudents();
    fetchProjects();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get('/api/Students');
      setStudents(response.data.data);
      console.log(response);
    } catch (error) {
      console.error('Error fetching Students:', error);
    }
  };

  const fetchProjects = async () => {
    try {
      const response = await axios.get('/api/Projects');
      setProjects(response.data.data);
    } catch (error) {
      console.error('Error fetching Projects:', error);
    }
  };

  const deleteStudent = async (id) => {
    try {
      await axios.delete(`/api/Students/${id}`);
      fetchStudents(); // Fetch Students after deleting a Student
    } catch (error) {
      console.error('Error deleting Student:', error);
    }
  };

  const deleteProject = async (id) => {
    try {
      await axios.delete(`/api/Projects/${id}`);
      fetchProjects(); // Fetch Projects after deleting a Project
    } catch (error) {
      console.error('Error deleting Project:', error);
    }
  };

  return (
    <div className="mx-auto app h-[100vh]">
      <Router>
        <div className='flex flex-row bg-black py-4 px-4 justify-between align-middle items-center'>
          {/** Header */}
          <div>
            <h1 className="text-3xl font-bold text-white">Inscription PhD Géologie Numérique</h1>
            <small className="text-1xl font-bold text-white">MERN Stack CRUD Application</small>
          </div>

          <div className="flex">
            <div className="mr-4">
              <Link to="/" className="hover:bg-blue-500 rounded-2xl text-white px-2 py-1 rounded">
                Accuel
              </Link>
            </div>
            <div className="mr-4">
              <Link to="/Students" className="hover:bg-blue-500 rounded-2xl text-white px-2 py-1 rounded">
                Etudiants
              </Link>
            </div>
            <div className='mr-4'>
              <Link to="/Projects" className="hover:bg-blue-500 rounded-2xl text-white px-2 py-1 rounded">
                Projects
              </Link>
            </div>
          </div>
        </div>


        <div className=" w-[100%] h-[100%] flex mx-auto w-1/2 place-self-center place-content-center self-center ">

          <div className="flex flex-col bg-gray-600 pt-[2.5rem] w-[18rem]">


            <Link to="/" className="text-xl font-bold text-white">
              <div className={"pl-[2.5rem] hover:bg-blue-500 pt-[1rem] pb-[1rem] m-[5px] rounded-2xl"}>
                Accuel
              </div>
            </Link>


            <Link to="/Students" className="text-xl font-bold text-white">
              <div className="pl-[2.5rem] hover:bg-blue-500 pt-[1rem] pb-[1rem] m-[5px] rounded-2xl">
                Liste des étudiants
              </div>
            </Link>

            <Link to="/Projects" className="text-xl font-bold text-white">
              <div className='pl-[2.5rem] hover:bg-blue-500 pt-[1rem] pb-[1rem] m-[5px] rounded-2xl'>
                Projet d'études
              </div>
            </Link>
          </div>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Students" element={<StudentList Students={Students} fetchStudents={fetchStudents} deleteStudent={deleteStudent} />} />
            <Route path="/Projects" element={<ProjectList Projects={Projects} fetchProjects={fetchProjects} deleteProject={deleteProject} />} />
            <Route path="/add-Project" element={<AddEditProject fetchProjects={fetchProjects} />} />
            <Route path="/add-Student" element={<AddEditStudent fetchStudents={fetchProjects} />} />
            <Route path="/edit-Project/:id" element={<AddEditProject fetchProjects={fetchProjects} />} />
            <Route path="/edit-Student/:id" element={<AddEditStudent fetchStudents={fetchProjects} />} />
          </Routes>
        </div>

      </Router>
    </div>
  );
};

export default App;
