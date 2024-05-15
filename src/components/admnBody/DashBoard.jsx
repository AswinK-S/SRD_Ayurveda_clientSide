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

                <div className='flex flex-col justify-center'>
                    <h4 className='font-bold'> Approved Doctors </h4>
                    <p className='text-[#2A527A]'>{dashData?.doctorData?.doctors?.approvedDoc}</p>

                </div>

                <div className='flex flex-col justify-center'>
                    <span className='text-[#112D31] font-bold'>Total Doctors</span>
                    <p className='text-[#2A527A]'>{dashData?.doctorData?.doctors?.totalDoc}</p>

                </div>
            </div>

            {/* users  */}
            <div className="border rounded-md shadow-black shadow-sm w-3/4 card-container justify-around items-center py-5  px-10 md:flex ">
                <div>
                    <img className="w-28" src="/usrsGrp.png" alt="" />
                </div>

                <div className='flex flex-col justify-center'>
                    <h4 className='font-bold'> Total users </h4>
                    <p className='text-[#2A527A]'>{dashData?.userData?.user?.totalCount}</p>

                </div>

                <div className='flex flex-col justify-center'>
                    <span className='text-[#112D31] font-bold'>Blocked Users</span>
                    <p className='text-[#2A527A]'>{dashData?.userData?.user?.blockedUsers}</p>

                </div>
            </div>
            {/* bookings  */}
            <div className="border rounded-md shadow-black shadow-sm w-3/4 card-container justify-around items-center py-5  px-10 md:flex">
                <div className='flex flex-col justify-center'>
                    <h4 className='font-bold'> Total bookings </h4>
                    <p className='text-[#2A527A]'>{dashData?.bookingData?.bookings?.totalBooking}</p>

                </div>

                <div className='flex flex-col justify-center'>
                    <span className='text-[#112D31] font-bold'>Pending Bookings</span>
                    <p className='text-[#2A527A]'>{dashData?.bookingData?.bookings?.pending}</p>

                </div>

                <div className='flex flex-col justify-center'>
                    <h4 className='font-bold'> Cancelled bookings </h4>
                    <p className='text-[#2A527A]'>{dashData?.bookingData?.bookings?.cancelled}</p>
                    
                </div>

                <div className='flex flex-col justify-center'>
                    <h4 className='font-bold'> Completed bookings </h4>
                    <p className='text-[#2A527A]'>{dashData?.bookingData?.bookings?.completed}</p>
                    
                </div>

            </div>

        </div>
    )

}

export default DashBoard