
import { Link } from 'react-router-dom';
import './nav.css';

const Nav = () => {
  return (
    <>
      <div className="container p-2">

       <div className='flex justify-between'>

       <div className=''>
          <img className="h-[100px]" src="/logo.png" alt="" />
        </div>

        

        <div className="flex text-black items-center space-x-4 font-serif">

          <p className="inline-flex hover:border-b-2 rounded-lg hover:border-black cursor-pointer py-2 px-2 sm:px-4"><Link to ='/'> Home </Link> </p>
          <p className="inline-flex hover:border-b-2 rounded-lg hover:border-black cursor-pointer py-2 px-2 sm:px-4"> <Link to ='/treatment'>Treatment </Link> </p>
          <p className="inline-flex hover:border-b-2 rounded-lg hover:border-black cursor-pointer py-2 px-2 sm:px-4"> <Link to = '/booking'> Online Booking</Link> </p>
          <button className="bg-[#E7EE9D] px-4 py-2 rounded-lg shadow-lg hover:border-b-2"> <Link to='/login'> Login </Link> </button>

        </div>
       </div>


      </div>
    </>
  );
}

export default Nav;
