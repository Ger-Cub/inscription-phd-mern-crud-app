// client/src/components/ProjectList.js
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ProjectList = ({ Projects, deleteProject, fetchProjects }) => {
  const navigate = useNavigate();

  const editProject = (id) => {
    navigate(`/edit-Project/${id}`);
  }
  useEffect(() => {
    fetchProjects();
  }, [])
  return (
    <div className='mt-10 flex flex-col mx-auto w-[70%] max-h-[80vh] overflow-y-auto'>
      <div className='justify-between flex'>
        <h2 className="text-xl font-bold mb-2">Liste des projets</h2>
        <Link to="/add-Project" className="bg-blue-500 text-white px-2 py-1 rounded">
          Ajouter un projet
        </Link>
      </div>
      <table className="table-auto mt-10 w-full">
        <thead>
          <tr>
            <th className="px-4 border  py-2">Noms</th>
            <th className="px-4 border  py-2">Description</th>
            <th className="px-4 border  py-2">Coût</th>
            <th className="px-4 border  py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {
          
          Projects?.length ?
            Projects.map((Project) => (
              <tr key={Project._id}>
                <td className="border px-4 py-2 text-center">{Project.name}</td>
                <td className="border px-4 py-2 text-center">{Project.description}</td>
                <td className="border px-4 py-2 text-center">${Project.price}</td>
                <td className="border px-4 py-2 flex flex-nowrap justify-center">
                <button
                    className="bg-green-500 text-white px-2 py-1 rounded"
                    onClick={() => editProject(Project._id)}
                  >
                    Modifier
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 ms-2 py-1 rounded"
                    onClick={() => deleteProject(Project._id)}
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            )) :
            <td className="border px-4 py-2 text-center" rowSpan={10} colSpan={10}>La liste est encore vide</td>

          }
        </tbody>
      </table>
    </div>
  );
};

export default ProjectList;
