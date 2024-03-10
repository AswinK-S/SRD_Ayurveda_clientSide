import { Link } from "react-router-dom"

export const AddBtn = () => {
  return (
    <div>
        <button className="bg-[#E7EE9D] flex flex-col items-center rounded-lg shadow-md p-3 ml-5" ><Link to='/admin/addDoc'>Add Doctor</Link> </button>
    </div>
  )
}


export const AddTBtn =()=>{
  return (
    <div>
        <button className="bg-[#E7EE9D] flex flex-col items-center rounded-lg shadow-md p-3 ml-5" ><Link to='/admin/addTreat'>Add Treatment</Link> </button>
    </div>
  )
}