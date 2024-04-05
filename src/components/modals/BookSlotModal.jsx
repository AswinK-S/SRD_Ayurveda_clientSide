/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import { bookingDetail } from "../../api/userApi";

const BookSlotModal = ({ setShowModal,bookingData }) => {
    const [bkngDetail,setbkngDetail] = useState({})
    useEffect(()=>{
        const fetchData = async()=>{

            const result = await bookingDetail(bookingData?.doctorId,bookingData?.treatmentId,bookingData?.subTreatmentId)
            console.log('result----bb',result);
            setbkngDetail(result)
        }
        fetchData()
    },[])

    return (
        <>
            <div className="min-w-screen h-screen animated fadeIn faster fixed left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover" id="modal-id">
                <div className="absolute bg-black opacity-80 inset-0 z-0" />
                <div className="w-full max-w-lg p-5 relative mx-auto my-auto rounded-xl shadow-lg bg-[#F9FFE1] ">
                    {/*content*/}
                    <div>
                        <img className='border border-black' alt="" />
                        <div className="text-center p-5 flex-auto justify-center">
                            <h2 className="text-xl font-bold py-4 ">  Slot Booking Detail </h2>
                            <p className="text-sm text-gray-900 px-8">
                            </p>
                            {/* Input fields */}
                            <input type="text" placeholder="Patient Name" value={bookingData.patientName}className="w-full mt-4 p-2 border rounded-md" disabled/>
                            <input type="text" placeholder="Doctor Name"  value={bkngDetail?.doctorName} className="w-full mt-4 p-2 border rounded-md" />
                            <input type="text" placeholder="Treatment Name"  value={bkngDetail?.treatmentName} className="w-full mt-4 p-2 border rounded-md" />
                            <input type="text" placeholder="Subtreatment Name"  value={bkngDetail?.subTreatmentName} className="w-full mt-4 p-2 border rounded-md" />
                        </div>
                        {/*footer*/}
                        <div className="p-3 mt-2 text-center space-x-4 md:block">
                           

                           
                        </div>
                    </div>

                    <div className="text-center p-5 flex-auto justify-center">
                       
                        <div className="p-3 mt-2 text-center space-x-4 md:block">

                            <button onClick={() => { setShowModal(false) }} className="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm shadow-black font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100">
                                Cancel
                            </button>
                            <button onClick='' className="mb-2 md:mb-0 bg-[#d8e088] border px-5 py-2 text-sm shadow-sm shadow-black font-medium tracking-wider text-black rounded-full hover:shadow-lg hover:bg-[#c9d172]">
                                Book Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
};

export default BookSlotModal;
