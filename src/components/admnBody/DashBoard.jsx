import { useEffect } from "react"
import { dashBoardData } from "../../api/adminApi"

const DashBoard = () => {


    useEffect(()=>{
        const fetchData = async()=>{
            const res = await dashBoardData()
        }
        fetchData()
    },[])
    
    return (
        <div className="flex flex-col justify-center items-center gap-5 p-10 border border-black">
            <div className="border rounded-md shadow-black shadow-md w-3/4 card-container py-5  px-10 flex justify-around items-center">
                <div>
                     <img className="w-28" src="/doctor.webp" alt="" />
                </div>

                <div className='flex flex-col justify-center'>
                    <h4 className='font-bold'> Approved Doctors </h4>
                    <p className='text-[#2A527A]'>details</p>

                </div>

                <div className='flex flex-col justify-center'>
                    <span className='text-[#112D31] font-bold'>Total Doctors</span>
                </div>
            </div>

            {/* users  */}
            <div className="border rounded-md shadow-black shadow-md w-3/4 card-container py-5  px-10 flex justify-around items-center">
                <div>
                     <img className="w-28" src="/usrsGrp.png" alt="" />
                </div>

                <div className='flex flex-col justify-center'>
                    <h4 className='font-bold'> Approved users </h4>
                    <p className='text-[#2A527A]'>details</p>

                </div>

                <div className='flex flex-col justify-center'>
                    <span className='text-[#112D31] font-bold'>Total Users</span>
                </div>
            </div>
            {/* bookings  */}
            <div className="border rounded-md shadow-black shadow-md w-3/4 card-container py-5  px-10 flex justify-around items-center">
            <div className='flex flex-col justify-center'>
                    <h4 className='font-bold'> Total bookings </h4>
                    <p className='text-[#2A527A]'>details</p>

                </div>

                <div className='flex flex-col justify-center'>
                    <span className='text-[#112D31] font-bold'>Pending Bookings</span>
                    <p className='text-[#2A527A]'>details</p>

                </div>

                <div className='flex flex-col justify-center'>
                    <h4 className='font-bold'> Cancelled bookings </h4>
                    <p className='text-[#2A527A]'>details</p>

                </div>

               
            </div>

        </div>
    )

}

export default DashBoard