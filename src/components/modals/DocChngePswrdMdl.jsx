    import propTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { changePsswrdOtp, verifyOtp } from '../../api/doctorApi'
import {useNavigate} from 'react-router-dom'

const DocChngePswrdMdl = ({ setPswrdModal, doctorDetails }) => {

    const [showOtpField, setShowOtpField] = useState(false)
    const [timer, setTimer] = useState(60)
    const [timerId] = useState(null)
    const [otp,setOtp] = useState('')
    const [otpError,setOtpError] =  useState('')

    const navigate = useNavigate()

    // timer 
    useEffect(() => {
        let id;
        if (timer > 0 && showOtpField) {
            id = setInterval(() => {
                setTimer(prevTime => prevTime - 1)
            }, 1000)
        }

        if (timer === 0) {
            clearInterval(timerId)
        }

        return () => {
            clearTimeout(id);
        }


    }, [showOtpField, timer, timerId])

    const getOtp = async () => {
        try {
            const email = doctorDetails.email
            const name = doctorDetails.name
            const result = await changePsswrdOtp(email, name)
            if (result === 'Otp send successfully') {
                setShowOtpField(true)
                setTimer(60)
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    // get otp 
    const handleChange =(e)=>{
        setOtp(e.target.value)
        setOtpError('')
    }

    //submit otp
    const handleSubmit = async(e)=>{
        e.preventDefault()
        try {
            if(timer> 0 && otp){

                const email = doctorDetails.email
                const result = await verifyOtp(otp,email)
                if(result.message ==='otp not matched'){
                    setOtpError('wrong otp')
                    return
                }
                if(result.message ==='otp matched'){

                    navigate('/doctor/changePassword')
                    setPswrdModal(false)
                    return
                }
            }
            if(otp==='' || !otp ){
                setOtpError("Please enter OTP")
                return
            }

        } catch (error) {
            console.log(error.message);
        }
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

                        {showOtpField && (
                            <>
                                <div className="flex  flex-col  items-start mb-3">

                                    <label className="text-sm text-gray-600">Enter otp</label>
                                    {otpError && <p className='text-sm text-red-600'>{otpError}</p>}

                                    <input type="text" placeholder="Enter otp" name='otp' id='otp'  onChange={handleChange} className="w-full mt-4 p-2 border rounded-md" />
                                </div>

                                {timer ? (<p className="mt-2 p-2 flex items-center justify-center text-sm text-light-blue-700 border">{timer} seconds left</p>) : null}{/* Show the timer */}

                            </>

                        )}

                        <div className="p-3 mt-2 text-center space-x-4 md:block">

                            <button onClick={getOtp} className="mb-2 md:mb-0 bg-[#d8e088]  px-5 py-2 text-sm shadow-sm shadow-black font-medium tracking-wider  text-gray-600  hover:shadow-lg ">
                                Get Otp
                            </button>

                            <button onClick={handleSubmit} className="mb-2 md:mb-0 bg-[#d8e088]  px-5 py-2 text-sm shadow-sm shadow-black font-medium tracking-wider  text-gray-600  hover:shadow-lg ">
                                Verify Otp
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