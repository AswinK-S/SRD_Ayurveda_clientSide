
import { Link, useNavigate } from 'react-router-dom';
import './nav.css';
import { useDispatch, useSelector } from 'react-redux';
// import { useEffect } from 'react';
import { logout } from '../../featuers/user/userSlice';
import { useState } from 'react';


const Nav = () => {

  const navigate = useNavigate()
  const user = useSelector((state) => state.user.user)
  const dispatch = useDispatch()

  const [showMenu, setShowMenu] = useState(false)


  // useEffect(()=>{
  //   console.log('iiii');
  //   if(!user){
  //     console.log('user---- ',user);
  //     navigate('/')
  //   }
  // },[user,navigate])

  const logoutUser = () => {
    localStorage.removeItem('usertoken')
    // localStorage.removeItem('userDetails')
    dispatch(logout())
    navigate('/')
  }

  return (
    <>

      <div className="container py-5 px-4">

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between  gap-10">
          {/* Logo */}
          <div className=' '>
            <img className="img-fluid h-auto lg:h-[75px]" src="/logo.png" alt="Logo" />

          </div>
          <div className="flex items-center">
            {/* Navigation Links */}
            <nav className="hidden lg:flex lg:flex-row lg:gap-10 lg:items-center ml-10">
              <a  className="text-md font-serif text-black hover:text-gray-900 transition duration-300 ease-in-out"> <Link to='/'> Home </Link></a>
              <a  className="text-lg font-serif text-black hover:text-gray-900 transition duration-300 ease-in-out"> <Link to='/treatment'> Treatment </Link></a>
              <a  className="text-lg font-serif text-black hover:text-gray-900 transition duration-300 ease-in-out"> <Link to='/booking'> Online Booking </Link></a>
              {user ? (
                <button  className="bg-[#E7EE9D] px-4 py-2  shadow-lg hover:bg-lime-600 text-lg font-serif text-black hover:text-gray-900 transition duration-300 ease-in-out"
                onClick={logoutUser}
                > <Link> Logout </Link></button>
              ) : (
                <button  className="bg-[#E7EE9D] px-4 py-2  shadow-lg hover:bg-lime-600 text-lg font-serif text-black hover:text-gray-900 transition duration-300 ease-in-out"> <Link to='/login'> Login </Link></button>
              )}
            </nav>
          </div>
          {/* Hamburger Menu for Mobile */}
          <div className="flex justify-center lg:hidden">
            <button className="p-2" onClick={() => setShowMenu(!showMenu)}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-black hover:text-gray-900 transition duration-300 ease-in-out" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
        </div>
        {/* Responsive Menu for Mobile */}
        {showMenu && (
          <div className="lg:hidden">
            <nav className="flex flex-col gap-4 mt-4">
              <a  className="text-lg font-serif text-black hover:text-gray-900 transition duration-300 ease-in-out"><Link to='/'> Home </Link></a>
              <a  className="text-lg font-serif text-black hover:text-gray-900 transition duration-300 ease-in-out"><Link to='/treatment'> Treatment </Link></a>
              <a  className="text-lg font-serif text-black hover:text-gray-900 transition duration-300 ease-in-out"><Link to='/booking'> Online Booking </Link></a>
              {user ? (
                <button  className="bg-[#E7EE9D] px-4 py-2  shadow-lg hover:bg-lime-600 text-lg font-serif text-black hover:text-gray-900 transition duration-300 ease-in-out"
                onClick={logoutUser}
                > <Link> Logout </Link></button>
              ) : (
                <button  className="bg-[#E7EE9D] px-4 py-2  shadow-lg hover:bg-lime-600 text-lg font-serif text-black hover:text-gray-900 transition duration-300 ease-in-out"> <Link to='/login'> Login </Link></button>
              )}
            </nav>
          </div>
        )}
      </div>


      



    </>
  );
}

export default Nav;
