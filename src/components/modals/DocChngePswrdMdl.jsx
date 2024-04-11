import propTypes from 'prop-types'
import { useState } from 'react'
import { changePsswrdOtp } from '../../api/doctorApi'

const DocChngePswrdMdl = ({ setPswrdModal, doctorDetails }) => {

    const [showOtpField, setShowOtpField] = useState(false)

    const getOtp = async ()=>{
        try {
            const email = doctorDetails.email
            const name =doctorDetails.name
            const result = await changePsswrdOtp(email,name) 
            if(result==='Otp send successfully'){
                setShowOtpField(true)
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    const handleResendOtp = async () => {

    }

    return (
        <div className="min-w-screen h-screen animated fadeIn faster fixed left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover" id="modal-id">
            <div className="absolute bg-black opacity-80 inset-0 z-0" />
            <div className="w-full max-w-lg p-5 relative mx-auto my-auto rounded-xl shadow-lg bg-[#F9FFE1] ">
                {/*content*/}
                <div>
                    <div className="text-center p-5 flex-auto justify-center">
                        <h2 className="text-xl font-bold py-4 ">  Change Password </h2>
                        <p className="text-sm text-gray-900 px-8">
                        </p>
                        {/* Input fields */}

                        <div className="flex  flex-col  items-start mb-3">
                            <label className="text-sm text-gray-600">Enter email</label>
                            <input type="text" placeholder="Enter email" name='email' id='email' value={doctorDetails.email} className="w-full mt-4 p-2 border rounded-md" />
                        </div>

                        {showOtpField ? (
                            <>
                                <div className="flex  flex-col  items-start mb-3">
                                    <label className="text-sm text-gray-600">Enter otp</label>
                                    <input type="text" placeholder="Enter otp" name='otp' id='otp' value='' className="w-full mt-4 p-2 border rounded-md" />
                                </div>

                                <span className="text-sm text-light-blue-900 mt-2" onClick={handleResendOtp}>Resend Otp</span>
                            </>
                        ) : (null)}

                        <div className="p-3 mt-2 text-center space-x-4 md:block">

                            <button onClick={getOtp} className="mb-2 md:mb-0 bg-[#d8e088]  px-5 py-2 text-sm shadow-sm shadow-black font-medium tracking-wider  text-gray-600  hover:shadow-lg ">
                                Get Otp
                            </button>
                           
                        </div>

                    </div>
                    {/*footer*/}
                    <div className="p-3 mt-2 text-center space-x-4 md:block">



                    </div>
                </div>

                <div className="text-center p-5 flex-auto justify-center">

                    <div className="p-3 mt-2 text-center space-x-4 md:block">

                        <button onClick={() => setPswrdModal(false)} className="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm shadow-black font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100">
                            Cancel
                        </button>
                        <button onClick='' className="mb-2 md:mb-0 bg-[#d8e088] border px-5 py-2 text-sm shadow-sm shadow-black font-medium tracking-wider text-black rounded-full hover:shadow-lg hover:bg-[#c9d172]">
                            Book Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

DocChngePswrdMdl.propTypes = {
    setPswrdModal: propTypes.func.isRequired,
    doctorDetails: propTypes.func.isRequired
};

export default DocChngePswrdMdl