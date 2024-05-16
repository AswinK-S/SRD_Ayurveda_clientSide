import { useEffect, useState } from "react"
import { dashBoardData } from "../../api/adminApi"

const DashBoard = () => {

    const [dashData, setDashData] = useState({})

    useEffect(() => {
        const fetchData = async () => {
            const res = await dashBoardData()
            setDashData(res)
        }
        fetchData()
    }, [])

    return (
        <div className="flex flex-col justify-center items-center gap-5 p-10 ">
            <div className="border rounded-md shadow-black shadow-sm w-3/4 card-container py-5  px-10 justify-around items-center md:flex ">
                <div>
                    <img className="w-28" src="/doctor.webp" alt="" />
                </div>

                <div className='flex flex-col justify-center items-center'>
                    <h4 className='font-bold text-green-900'> Approved <br/> Doctors </h4>
                    <p className='text-[#2A527A] font-semibold mt-2'>{dashData?.doctorData?.doctors?.approvedDoc}</p>

                </div>

                <div className='flex flex-col justify-center items-center'>
                    <span className='text-light-blue-800 font-bold'>Total <br/> Doctors</span>
                    <p className='text-[#2A527A] font-semibold mt-2'>{dashData?.doctorData?.doctors?.totalDoc}</p>

                </div>
            </div>

            {/* users  */}
            <div className="border rounded-md shadow-black shadow-sm w-3/4 card-container justify-around items-center py-5  px-10 md:flex ">
                <div>
                    <img className="w-28" src="/usrsGrp.png" alt="" />
                </div>

                <div className='flex flex-col justify-center items-center'>
                    <h4 className='text-light-blue-800 font-bold'> Total<br/> users </h4>
                    <p className='text-[#2A527A] font-semibold mt-2'>{dashData?.userData?.user?.totalCount}</p>

                </div>

                <div className='flex flex-col justify-center items-center'>
                    <span className='text-red-800 font-bold '> Blocked <br/>Users</span>
                    <p className='text-[#233f5c] font-semibold mt-2'>{dashData?.userData?.user?.blockedUsers}</p>

                </div>
            </div>
            {/* bookings  */}
            <div className="border rounded-md shadow-black shadow-sm w-3/4 card-container justify-around items-center py-5  px-10 md:flex">
                <div className='flex flex-col justify-center items-center'>
                    <h4 className='font-bold text-blue-800'> Total<br/> bookings </h4>
                    <p className='text-[#2A527A] font-semibold mt-2'>{dashData?.bookingData?.bookings?.totalBooking}</p>

                </div>

                <div className='flex flex-col justify-center items-center'>
                    <span className='text-orange-800 font-bold'>Pending<br/> Bookings</span>
                    <p className='text-[#2A527A] font-semibold mt-2'>{dashData?.bookingData?.bookings?.pending}</p>

                </div>

                <div className='flex flex-col justify-center items-center'>
                    <h4 className='font-bold text-red-800'> Cancelled<br/> bookings </h4>
                    <p className='text-[#2A527A] font-semibold mt-2'>{dashData?.bookingData?.bookings?.cancelled}</p>
                    
                </div>

                <div className='flex flex-col justify-center items-center'>
                    <h4 className='font-bold text-green-800'> Completed<br/> bookings </h4>
                    <p className='text-[#2A527A] font-semibold mt-2'>{dashData?.bookingData?.bookings?.completed}</p>
                    
                </div>

            </div>

        </div>
    )

}

export default DashBoard