
import { Link } from 'react-router-dom';

const AdmnNav = () => {
  return (
    <>
      <div className="container p-2">

       <div className='flex justify-between'>

       <div className=''>
          <img className="h-[100px]" src="/logo.png" alt="" />
        </div>

        

        <div className="flex text-black items-center space-x-4 font-serif">

          
          <button className="bg-[#E7EE9D] px-4 py-2 rounded-lg shadow-lg hover:border-b-2"> <Link to='/login'> Login </Link> </button>

        </div>
       </div>


      </div>
    </>
  );
}

export default AdmnNav;
