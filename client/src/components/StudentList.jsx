// client/src/components/StudentList.js
import React, { useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';

const StudentList = ({ Students, deleteStudent, fetchStudents }) => {
  const navigate = useNavigate();

  const editStudent = (id) => {
    navigate(`/edit-Student/${id}`);
  }

  useEffect(() => {
    fetchStudents()
  }, [])
  return (
    <div className=' mt-10 flex flex-col mx-auto w-[70%] overflow-y-auto'>
      <div className='justify-between flex'>
        <h2 className="text-xl font-bold mb-2">Liste des étudiants</h2>
        <Link to="/add-Student" className="bg-blue-500 text-white px-2 py-1 rounded">
          Ajouter un étudiant
        </Link>
      </div>
      <table className="table-auto mt-10 w-full">
        <thead>
          <tr>
            <th className="px-4 border py-2">Noms</th>
            <th className="px-4 border py-2">Adresses mails</th>
            <th className="px-4 border py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {Students?.length
            ?
            Students.map((Student) => (
              <tr key={Student._id}>
                <td className="border px-4 py-2 text-center">{Student.name}</td>
                <td className="border px-4 py-2 text-center">{Student.email}</td>
                <td className="border px-4 py-2 flex flex-nowrap justify-center">
                  <button
                    className="bg-green-500 text-white px-2 py-1 rounded"
                    onClick={() => editStudent(Student._id)}
                  >
                    Modifier
                  </button>
                  <button
                    className="bg-red-500 ms-2 text-white px-2 py-1 rounded"
                    onClick={() => deleteStudent(Student._id)}
                  >
                    Supprimer
                  </button>

                </td>
              </tr>
            ))
            :
            <td className="border px-4 py-2 text-center" rowSpan={10} colSpan={10}>La liste est encore vide</td>

          }
        </tbody>
      </table>
    </div>
  );
};

export default StudentList;
