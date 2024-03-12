
import { Link, useNavigate } from 'react-router-dom';
import './nav.css';
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

const Nav = () => {

  const [user, setUser] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    console.log('user token :', token);
    if (token) {
      const decode = jwtDecode(token)

      if (decode.role == 'user') {
        setUser(true)
      }
    }

  }, [user])

  const logout = () => {
    localStorage.removeItem('token')
    navigate('/')
  }

  return (
    <>


      <div className="container p-2 flex flex-col ">

        <div className='flex  sm:flex-row justify-between '>

          <div className='mb-4 sm:mb-0'>
            <img className="h-[100px]" src="/logo.png" alt="" />
          </div>

          <div className="flex text-black items-center space-x-4 font-serif">

            <p className="inline-flex hover:border-b-2 rounded-lg hover:border-black cursor-pointer py-2 px-2 sm:px-4"><Link to='/'> Home </Link></p>
            <p className="inline-flex hover:border-b-2 rounded-lg hover:border-black cursor-pointer py-2 px-2 sm:px-4"> <Link to='/treatment'>Treatment </Link></p>
            <p className="inline-flex hover:border-b-2 rounded-lg hover:border-black cursor-pointer py-2 px-2 sm:px-4"> <Link to='/booking'> Online Booking</Link></p>

            {user ?
              <button
                className="bg-[#E7EE9D] px-4 py-2 rounded-lg shadow-lg hover:border-b-2"
                onClick={logout}
              >
                Logout
              </button> :
              <button className="bg-[#E7EE9D] px-4 py-2 rounded-lg shadow-lg hover:border-b-2 sm:ml-2"> <Link to='/login'> Login </Link> </button>
            }
          </div>
        </div>

      </div>



    </>
  );
}

export default Nav;
