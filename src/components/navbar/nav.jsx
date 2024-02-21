// import './nav.css'

// const Nav = ()=> {
//   return (
//     <>
//       <div>
//         <div className="flex items-center justify-between ">
//           <img className="pl-10 pt-5 h-[100px]  " src="/logo.png" alt="" />

//           <div className="flex text-black  items-center space-x-10 pr-10 font-serif">
//             <p className="p-10 inline-flex hover:border-b-2   rounded-lg hover:border-black cursor-pointer py-2 px-4">Home</p>
//             <p className="p-10 inline-flex hover:border-b-2  rounded-lg hover:border-black cursor-pointer py-2 px-4 ">Treatment</p>
//             <p className="p-10 inline-flex hover:border-b-2   rounded-lg hover:border-black cursor-pointer py-2 px-4">Online Booking</p>
//             <button className="bg-[#E7EE9D] px-6 py-2  rounded-lg shadow-lg hover:border-b-2">Login</button>
//           </div>

//         </div>

//       </div>
//     </>
//   )
// }

// export default Nav



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

          <p className="inline-flex hover:border-b-2 rounded-lg hover:border-black cursor-pointer py-2 px-2 sm:px-4">Home</p>
          <p className="inline-flex hover:border-b-2 rounded-lg hover:border-black cursor-pointer py-2 px-2 sm:px-4">Treatment</p>
          <p className="inline-flex hover:border-b-2 rounded-lg hover:border-black cursor-pointer py-2 px-2 sm:px-4">Online Booking</p>
          <button className="bg-[#E7EE9D] px-4 py-2 rounded-lg shadow-lg hover:border-b-2">Login</button>

        </div>
       </div>


      </div>
    </>
  );
}

export default Nav;
