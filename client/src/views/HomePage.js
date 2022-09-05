import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from 'axios'

export default function HomePage() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalUser, setTotalUser] = useState(0)
  const navigate = useNavigate()

  function changePage(type) {
    let currentPage = page;
    if (type === "next") {
      currentPage++;
    } else {
      currentPage--;
    }
    setPage(currentPage);
  }

  async function deleteUser(id) {
    try {
        let res = await axios.delete(`https://fakestoreapi.com/users/${id}`)
        Swal.fire({
            icon: 'success',
            text: 'Delete User Success'
        })
    } catch (error) {
        Swal.fire({
            icon: 'error',
            text: 'Error'
        })
    }
  }


  async function getUsers() {
    try {
        let res = await fetch("https://fakestoreapi.com/users")
        res = await res.json()
        setTotalUser(res.length)
        const result = res.slice((page - 1) * 4, page * 4)
        setUsers(result)
    } catch (error) {
        
    }
  }

  useEffect(() => {
    if (!localStorage.getItem('token')) {
        navigate('/login')
    }
  }, [])

  useEffect(() => {
    getUsers()
  }, [page]);

  return (
    <>
        <div className="mt-2">
        <button onClick={() => navigate('/add')} className="bg-blue-500 text-white font-bold py-2 px-4 rounded">+ Add User</button>
        </div>
        <div className="flex justify-center mt-2">
      <table className="border-collapse border border-slate-400">
        <thead>
          <tr>
            <th className="border border-slate-300">Username</th>
            <th className="border border-slate-300">Email</th>
            <th className="border border-slate-300">First Name</th>
            <th className="border border-slate-300">Last Name</th>
            <th className="border border-slate-300">Phone</th>
            <th className="border border-slate-300">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="border border-slate-300">{user.username}</td>
              <td className="border border-slate-300">{user.email}</td>
              <td className="border border-slate-300">{user.name.firstname}</td>
              <td className="border border-slate-300">{user.name.lastname}</td>
              <td className="border border-slate-300">{user.phone}</td>
              <td className="border border-slate-300">
                <button onClick={() => navigate(`/edit/${user.id}`)} className="bg-blue-500 text-white font-bold py-2 px-4 ml-2 mr-1 rounded">
                  Edit
                </button>
                <button onClick={() => deleteUser(user.id)} className="bg-red-500 text-white font-bold py-2 px-4 ml-1 mr-2 my-2 rounded">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      <div className="mt-2">
        {page > 1 && (
          <button className="bg-gray-300 text-gray-800 font-bold py-2 px-4 mx-1 rounded" onClick={() => changePage('previous')}>
            Previous
          </button>
        )}
        {page < totalUser / 4 && (
          <button className="bg-gray-300 text-gray-800 font-bold py-2 px-4 mx-1 rounded" onClick={() => changePage('next')}>
            Next
          </button>
        )}
      </div>
    </>
  );
}
