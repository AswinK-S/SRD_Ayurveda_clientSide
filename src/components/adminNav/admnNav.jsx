
import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


const AdmnNav = () => {

  const navigate = useNavigate()

  const [admin, setadmin] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    console.log('admn nav tkn :',token);
    
    if (token) {
      const decode = jwtDecode(token)
      console.log('admn token :', decode.role);
      if (decode.role == 'admin') {
        setadmin(true)
      }
    }
  }, [admin])

  const logout = () => {
    localStorage.removeItem('token')
    navigate('/admin')
  }


  return (
    <>
      <div className="container p-2">

        <div className='flex justify-between'>

          <div className=''>
            <img className="h-[100px]" src="/logo.png" alt="" />
          </div>



          <div className="flex text-black items-center space-x-4 font-serif">



            {admin ?
              <>
                <p className="inline-flex hover:border-b-2 rounded-lg hover:border-black cursor-pointer py-2 px-2 sm:px-4"><Link to=''> Patients </Link> </p>
                <p className="inline-flex hover:border-b-2 rounded-lg hover:border-black cursor-pointer py-2 px-2 sm:px-4"> <Link to=''>Doctors </Link> </p>
                <p className="inline-flex hover:border-b-2 rounded-lg hover:border-black cursor-pointer py-2 px-2 sm:px-4"> <Link to=''>  Treatments </Link> </p>
                <button className="bg-[#E7EE9D] px-4 py-2 rounded-lg shadow-lg hover:border-b-2" onClick={logout}> Logout </button>
              </>

              :
              <button className="bg-[#E7EE9D] px-4 py-2 rounded-lg shadow-lg hover:border-b-2"> <Link to='/admin'> Login </Link> </button>
            }

          </div>
        </div>


      </div>
    </>
  );
}

export default AdmnNav;
