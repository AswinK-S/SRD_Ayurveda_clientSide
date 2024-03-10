
import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


const AdmnNav = () => {

  const navigate = useNavigate()

  const [admin, setadmin] = useState(false)

  const [showMenu, setShowMenu] = useState(false);



  useEffect(() => {
    const token = localStorage.getItem('token')
    console.log('admn nav tkn :', token);

    if (token) {
      const decode = jwtDecode(token)
      console.log('admn token :', decode.role);
      if (decode.role == 'admin') {
        setadmin(true)
        return
      }
    } else {
      navigate('/admin')
    }
  }, [navigate])

  const logout = () => {
    localStorage.removeItem('token')
    navigate('/admin')
  }

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };


  return (
    <>
      <div className="container p-3">
        <div className="flex flex-col sm:flex-row items-center justify-between">
          <div className="mb-4 sm:mb-0">
            <img className="h-[100px]" src="/logo.png" alt="" />
          </div>

          {/* Menu Button for Mobile View */}
          <div className="sm:hidden">
            <button
              onClick={toggleMenu}
              className="text-black focus:outline-none"
            >
              &#9776; {/* Hamburger Icon */}
            </button>
          </div>

          {/* Menu Items for Normal and Mobile View */}
          <div
            className={`flex text-black items-center space-x-4 font-serif ${showMenu ? 'flex-col sm:flex-row' : 'hidden sm:flex'
              }`}
          >
            {admin ? (
              <>



                <Link to="/admin/dashboard" className="inline-flex hover:border-b-2 rounded-lg hover:border-black cursor-pointer py-2 px-4 sm:px-5">
                  Dashboard
                </Link>
                <Link to="/admin/users" className="inline-flex hover:border-b-2 rounded-lg hover:border-black cursor-pointer py-2 px-4 sm:px-5">
                  Users
                </Link>
                <Link to="/admin/patients" className="inline-flex hover:border-b-2 rounded-lg hover:border-black cursor-pointer py-2 px-4 sm:px-5">
                  Patients
                </Link>
                <Link to="/admin/treatments" className="inline-flex hover:border-b-2 rounded-lg hover:border-black cursor-pointer py-2 px-4 sm:px-5">
                  Treatments
                </Link>
                <Link to="/admin/doctors" className="inline-flex hover:border-b-2 rounded-lg hover:border-black cursor-pointer py-2 px-5 sm:px-4">
                  Doctors
                </Link>
                <button
                  className="bg-[#E7EE9D] px-4 py-2 rounded-lg shadow-lg hover:border-b-2"
                  onClick={logout}
                >
                  Logout
                </button>

              </>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );



}

export default AdmnNav;


