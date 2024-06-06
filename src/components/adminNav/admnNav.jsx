
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { loginSuccess, logout } from '../../featuers/admin/adminSlice';
import { jwtDecode } from 'jwt-decode';
import ReactLoading from 'react-loading'


const AdmnNav = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [showMenu, setShowMenu] = useState(false);
  const [loading, setLoading] = useState(true)
  const admin = useSelector((state) => state.admin.admin)


  useEffect(() => {
    const token = localStorage.getItem('admintoken')
    if (token) {
      const decode = jwtDecode(token)
      if (decode.role === 'admin') {
        const adminDetails = localStorage.getItem('adminDetails')
        dispatch(loginSuccess(adminDetails))
        setTimeout(() => {
          setLoading(false)

        }, 1000)
        return
      } else {
        navigate('/admin')
      }
    } else {
      navigate('/admin')
    }
    setLoading(false)
  }, [navigate, admin, dispatch])



  const logoutAdmin = () => {
    localStorage.removeItem('admintoken')
    localStorage.removeItem('adminDetails')
    dispatch(logout())
  }

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };


  return (
    <>
      {
        loading ? (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-yellow-100">
            <ReactLoading type="balls" color="lime" height={100} width={50} />
          </div>
        ) :
          (
            <div className=" flex justify-center shadow-md shadow-blue-gray-300 py-1">

              <div className="container ">
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
                        <Link to="/admin/dashboard" className="inline-flex hover:border-b-4  hover:border-lime-400 cursor-pointer py-2 px-4 sm:px-5">
                          Dashboard
                        </Link>
                        <Link to="/admin/users" className="inline-flex hover:border-b-4  hover:border-lime-400 cursor-pointer py-2 px-4 sm:px-5">
                          Users
                        </Link>
                        {/* <Link to="/admin/patients" className="inline-flex hover:border-b-4  hover:border-lime-400 cursor-pointer py-2 px-4 sm:px-5">
                    Patients
                  </Link> */}
                        <Link to="/admin/treatments" className="inline-flex hover:border-b-4  hover:border-lime-400 cursor-pointer py-2 px-4 sm:px-5">
                          Treatments
                        </Link>
                        <Link to="/admin/doctors" className="inline-flex hover:border-b-4  hover:border-lime-400 cursor-pointer py-2 px-5 sm:px-4">
                          Doctors
                        </Link>
                        <button
                          className="bg-[#d3dd64] px-4 py-2  shadow-lg hover:bg-lime-700"
                          onClick={logoutAdmin}
                        >
                          Logout
                        </button>

                      </>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          )
      }

    </>
  );

}

export default AdmnNav;