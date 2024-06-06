
import { useNavigate } from "react-router-dom";
import { submitOtp, verifyEmail } from "../../../api/userApi";
import Footer from "../../../components/footer/footer";
import Nav from "../../../components/navbar/nav";
import { useEffect, useState } from 'react'
import { useDispatch } from "react-redux";
import { emailToChngePsswrd } from "../../../featuers/user/emailSlice";

const ForgotPassword = () => {

    const [otpField, setOtpField] = useState(false)
    const [timer, setTimer] = useState(0)
    const [email, setEmail] = useState('')


    const [emailError, setEmailError] = useState('')
    const [otp, setOtp] = useState('')
    const [otpError, setOtpError] = useState('')

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const backgroundImage = {
        backgroundImage: 'url("ayurveda.jpeg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat', // Prevent tiling
        width: '100%',
        position: 'relative',
    };


    const handleEmail = (e) => {
        setEmail(e.target.value)
        setEmailError('')
    }

    // setTimer 
    useEffect(() => {
        if (otpField && timer > 0) {
            setTimeout(() => {
                setTimer(timer - 1)
            }, 1000)
        }

        if (timer === 0) {
            setOtpField(false)
            setOtp('')
            setOtpError('')
        }
    }, [otpField, timer])

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    //submit the email to get otp
    const getOtp = async (e) => {
        e.preventDefault()
        try {
            if (!email || email.trim() === '') {
                setEmailError('Please enter a valid Email Address!')
                return
            }
            else if (!emailRegex.test(email)) {
                setEmailError('Please enter a valid Email Address!')
                return
            }

            const result = await verifyEmail(email)
            if (result === 'success') {
                dispatch(emailToChngePsswrd(email))
                setOtpField(true)
                setTimer(60)
            }

        } catch (error) {
            console.log(error.message);
        }
    }


    const handleChangeOtp = (e) => {
        setOtp(e.target.value)
        setOtpError("")

    }

    const handleSubmitOtp = async (e) => {
        e.preventDefault()
        try {

            if (otp.trim() === '' || !otp) {
                setOtpError('Otp field cannot be empty')
                return
            }
            const response = await submitOtp(email, otp)
            if (response === 'otp matched') {
                navigate('/newPassword')
            }
            else if (response === 'otp not matched') {
                setOtpError('wrong otp')
                return
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <div className="flex justify-center">
                <Nav />
            </div>

            <div style={backgroundImage} className="flex lg:h-[200px] items-center justify-center p-5">
                <div className="text-white text-5xl font-bold bg-transparent">
                    <p className="bg-transparent text-opacity-30">Verify Your Email Address</p>
                </div>
            </div>

            <div className="relative flex flex-col justify-center min-h-screen shadow-2xl  overflow-hidden">
                <div className="w-full p-10 m-auto rounded-md shadow-xl lg:max-w-xl bg-[#E7EE9D]">
                    <h1 className="bg-transparent text-3xl font-semibold text-center uppercase">
                        Verify Email
                    </h1>

                    <form className=" bg-transparent mt-6" onSubmit=''>

                        <div className="mb-2 bg-transparent">
                            <label
                                htmlFor="email"
                                className="block text-sm bg-transparent  font-semibold text-gray-800 "
                            >
                                Email
                            </label>

                            <input
                                type="email" name="email" placeholder="enter your email address"
                                onChange={handleEmail}
                                className="block bg-[white] w-full px-4 py-2 mt-2   border rounded-md "
                            />
                        </div>

                        {emailError && <p className="text-sm text-red-700"> {emailError}</p>}

                        {otpField &&

                            (
                                <>
                                    <div className="mb-2 bg-transparent">
                                        <label
                                            htmlFor="otp"
                                            className="block bg-transparent text-sm font-semibold text-gray-800"
                                        >
                                            Enter otp
                                        </label>
                                        <input
                                            type="otp" name="otp" placeholder="enter otp" onChange={handleChangeOtp}
                                            className="block w-full px-4 py-2 mt-2 bg-[white] border rounded-md "
                                        />
                                    </div>
                                    {otpError && <p className="text-sm text-red-700">{otpError}</p>}
                                    {timer ? (<p className="mt-2 p-2 flex items-center justify-center text-sm text-red-700 border">{timer} seconds left</p>) : null}{/* Show the timer */}
                                </>

                            )}


                        <div className="p-3 mt-2 text-center space-x-4 md:block">

                            <button onClick={getOtp} className="mb-2 md:mb-0 bg-[#CEB047]  px-5 py-2 text-sm shadow-sm shadow-black font-medium tracking-wider  text-white  hover:shadow-lg ">
                                Get Otp
                            </button>


                        </div>

                        {otpField && timer ? (<div className="mt-6 bg-transparent flex justify-center">

                            <button className=" bg-[#CEB047] px-4 py-2 tracking-wide font-semibold     text-black border rounded-md "
                                onClick={handleSubmitOtp}
                            >
                                verify
                            </button>
                        </div>) : (null)}

                    </form>


                </div>
            </div>

            <Footer />
        </div>
    );
};

export default ForgotPassword;



