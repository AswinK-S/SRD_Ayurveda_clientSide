import Footer from "../../../components/footer/footer";
import Nav from "../../../components/navbar/nav"
import { Link } from "react-router-dom";
import { googleAuth, resendOtp, signup } from "../../../api/userApi";
import { registerUser } from "../../../api/userApi";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../../featuers/user/userSlice";


const SignUp = () => {

    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate()

    //useState to show otp field
    const [showOtpInput, setShowOtpInput] = useState(false)
    const [otpValue, setOtpValue] = useState('')
    const [otpError, setOtpError] = useState('')
    const [resendOtpTimer, setResendOtpTimer] = useState(false)

    const [gSignUpError, setGsignUpError] = useState('')

    const [timer, setTimer] = useState(60); // Timer value in seconds
    const [timerId] = useState(null);

    const dispatch = useDispatch()

    useEffect(() => {
        let id;
        if (showOtpInput && timer > 0 || resendOtpTimer) {
            // Start the timer only when OTP input is shown and timer > 0
            id = setInterval(() => {
                setTimer(prevTimer => prevTimer - 1);
            }, 1000);
        }

        if (timer === 0) {
            clearInterval(timerId); // Stop the timer when it reaches 0
            setResendOtpTimer(false)
            setOtpValue('')
        }

        return () => {
            clearInterval(id); // Clear the timer when the component unmounts or OTP input is hidden
        };
    }, [showOtpInput, timer, timerId, resendOtpTimer]);



    //formData 
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mob: '',
        password: '',
        confirmPassword: ''
    })

    //input field errors
    const [errors, setErrors] = useState({
        name: '',
        email: '',
        mob: '',
        password: '',
        confirmPassword: '',
    });

    const [submissionError, setSubmissionError] = useState('')


    //background image style 
    const backgroundImage = {
        backgroundImage: 'url("ayurveda.jpeg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: '100%',
        position: 'relative',

    };

    //show password
    const handleTogglePassword = () => {
        setShowPassword(!showPassword)
    }

    const handleChange = (e) => {

        const { name, value } = e.target;
        setGsignUpError('')

        setFormData({ ...formData, [name]: value });
        setSubmissionError('')
        if (name === 'name' && value.length >= 3) {
            setErrors({ ...errors, name: '' });
        } else if (name === 'email' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            setErrors({ ...errors, email: '' });
        } else if (name === 'mob' && value.length === 10 && !isNaN(value)) {
            setErrors({ ...errors, mob: '' });
        } else if (name === 'password' && value.length >= 6) {
            setErrors({ ...errors, password: '' });
        } else if (name === 'confirmPassword' && value === formData.password) {
            setErrors({ ...errors, confirmPassword: '' });
        }
    };

    const handleSubmit = async (e) => {

        e.preventDefault();
        // Validation

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;

        let newErrors = {};
        if (!formData.name || formData.name.length < 3) {
            newErrors.name = 'Name must be at least 3 characters long';
        }
        if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }
        if (!formData.mob || formData.mob.length !== 10 || isNaN(formData.mob)) {
            newErrors.mob = 'Mobile number should have exactly 10 digits';
        }
        if (!passwordRegex.test(formData.password)) {
            newErrors.password = 'Password must be at least 6 characters long, include at least one uppercase letter, one lowercase letter, and one number.';
        }
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Password and Confirm Password do not match';
        }

        console.log('errors--', Object.keys(newErrors).length);
        if (Object.keys(newErrors).length > 0) {
            // Update errors state with new error messages
            setErrors(newErrors);
            return; // Exit early if there are errors
        }

        // If no errors, proceed with form submission
        try {
            if (showOtpInput) {

                // Process OTP submission logic here
                console.log('Submitted OTP:', otpValue);

                if (!otpValue) {
                    console.log('no otp--', otpValue);
                    setOtpError('enter otp')
                    return
                }

                setOtpError('')
                if (otpValue) {
                    const res = await registerUser(otpValue, formData.email)
                    console.log('res--->', res);

                    if (res === 'Wrong verification code') {
                        setOtpError('Wrong verification code')
                        return
                    }
                    if (res.status === 200) {
                        navigate('/login')
                    }
                }

            } else {
                console.log('submiting', formData);
                const registerData = formData
                const response = await signup(registerData)
                console.log('res--->', response);

                if (response === 'Request failed with status code 400') {
                    setSubmissionError('already existing email')
                    return
                }

                if (response.status === 200) {
                    console.log('user data send to back end');
                    setShowOtpInput(true);
                    setTimer(60);
                }
            }
        } catch (err) {
            console.log(err.message);
        }
    };

    //resend otp
    const handleResendOtp = async () => {
        try {
            console.log('rsnd otp clkd');
            const result = await resendOtp(formData)
            console.log('result --in sgnUp', result);
            if (result) {
                setResendOtpTimer(true)
                setTimer(60);

            }
        } catch (error) {
            console.log(error.message);
        }
    }

    //google auth

    const sendDataToBackend = async (decode) => {
        try {

            const userDetail = {
                email: decode?.email,
                name: decode?.name,
                mob: 1234567892,

            }
            const result = await googleAuth(userDetail)
            console.log('rslt-->', result);
            if (result.message === 'user already exist in this email') {
                setGsignUpError('user already exist in this email')
                return
            }
            if (result.message === 'user registered') {
                if (result?.token) {
                    console.log('token', result.token);
                    const tokn = result.token;
                    localStorage.setItem('usertoken', tokn)
                    const decode = jwtDecode(tokn)
                    if (decode?.role === 'user') {
                        dispatch(loginSuccess(result.userId))

                        console.log('role', decode.role);
                        navigate('/')

                    }

                }
            }

        } catch (error) {
            console.log(error.message);
        }
    }


    return (

        <div>
            <div className=" flex justify-center">
                <Nav />
            </div>
            <div>
                <div className="flex lg:h-[200px]  items-center justify-center p-5" style={backgroundImage}>
                    <div className="text-white text-5xl font-bold  bg-transparent">
                        <p className="bg-transparent text-opacity-30">Signup page</p>

                    </div>
                </div>

            </div>


            {/* signup form  */}

            <div className="relative flex flex-col justify-center min-h-screen drop-shadow-2xl p-5 overflow-hidden">

                <div className="w-full p-10 m-auto  rounded-md shadow-xl lg:max-w-xl  bg-[#E7EE9D] ">
                    <h1 className="bg-transparent  text-3xl font-semibold text-center  uppercase">

                        {/* /signup/ */}
                        {showOtpInput ? "Submit OTP" : "Sign Up"}
                    </h1>



                    <form className=" bg-transparent mt-6" onSubmit={handleSubmit} >

                        <div className="mb-2 bg-transparent">
                            <label htmlFor="name" className=" block text-sm bg-transparent font-semibold  "> Full Name </label>
                            <input type="text" name="name" placeholder="Enter your full name"


                                className="block w-full bg-[white]  px-4 py-2 mt-2 border rounded-md" onChange={handleChange} />
                            {errors.name && <p className="text-red-500 text-sm mb-2">{errors.name}</p>}
                        </div>


                        <div className="mb-2 bg-transparent">
                            <label htmlFor="email" className="block text-sm bg-transparent  font-semibold"> Email </label>


                            <input type="email" name="email" placeholder="enter your email address"


                                className="block bg-[white] w-full px-4 py-2 mt-2   border rounded-md " onChange={handleChange} />
                            {errors.email && <p className="text-red-500 text-sm mb-2">{errors.email}</p>}

                        </div>


                        <div className="mb-2 bg-transparent">

                            <label htmlFor="" className="block text-sm bg-transparent  font-semibold"> Mob </label>


                            <input type="number" name="mob" placeholder="enter your valid mobile number"
                                className="block bg-[white] w-full px-4 py-2 mt-2   border rounded-md " onChange={handleChange} />

                            {errors.mob && <p className="text-red-500 text-sm mb-2">{errors.mob}</p>}
                        </div>

                        <div className="mb-2 bg-transparent">
                            <label
                                htmlFor="password"
                                className="block bg-transparent text-sm font-semibold text-gray-800"
                            >
                                Password
                            </label>

                            {/*password eye*/}
                            <div className="relative rounded-md">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password" placeholder="enter password"
                                    className="block w-full px-4 py-2 mt-2 bg-[white] border rounded-md " onChange={handleChange}
                                />
                                <span
                                    className="absolute top-2 right-4 cursor-pointer"
                                    onClick={handleTogglePassword}>
                                    {showPassword ? (
                                        <i className="fas fa-eye-slash text-gray-600"></i>
                                    ) : (
                                        <i className="fas fa-eye text-gray-600"></i>
                                    )}
                                </span>

                            </div>
                            {errors.password && <p className="text-red-500 text-sm mb-2">{errors.password}</p>}

                        </div>

                        <div className="mb-2 bg-transparent">
                            <label
                                htmlFor="password"
                                className="block bg-transparent text-sm font-semibold text-gray-800"
                            >
                                confirm Password
                            </label>

                            <div className="relative rounded-md">

                                <input
                                    type={showPassword ? 'text' : 'password'} name="confirmPassword" placeholder="confirm your password"
                                    className="block w-full px-4 py-2 mt-2 bg-[white] border rounded-md " onChange={handleChange}
                                />

                                <span
                                    className="absolute top-2 right-4"
                                    onClick={handleTogglePassword}>
                                    {showPassword ? (<i className="fas fa-eye-slash " />) : (<i className="fas fa-eye" />)}
                                </span>

                            </div>

                            {errors.confirmPassword && <p className="text-red-500 text-sm mb-2">{errors.confirmPassword}</p>}


                        </div>

                        {/* Conditional rendering of OTP input */}
                        {otpError && <p className="text-red-500 text-sm mb-2">{otpError}</p>}

                        {showOtpInput && (
                            <div className="mb-2 bg-transparent">
                                <label htmlFor="otp" className="block text-sm bg-transparent font-semibold">
                                    OTP
                                </label>
                                <input
                                    type="text"
                                    name="otp"
                                    placeholder="enter OTP"
                                    className="block w-full bg-[white] px-4 py-2 mt-2 border rounded-md "
                                    value={otpValue}
                                    onChange={(e) => {
                                        setOtpValue(e.target.value);
                                        setOtpError('');
                                    }
                                    }
                                />
                                <Link className="text-sm text-light-blue-900 mt-2" onClick={handleResendOtp}>Resend Otp</Link>
                                {timer ? (<p className="mt-2 p-2 flex items-center justify-center text-sm text-light-blue-500 border">{timer} seconds left</p>) : null}{/* Show the timer */}

                            </div>
                        )}

                        <div className="mt-6 bg-transparent flex justify-center gap-5">


                            <button className=" bg-[#CEB047] px-4 py-2 tracking-wide font-semibold text-black border rounded-md "
                            >
                                {showOtpInput ? "Enter OTP" : "Sign Up"}
                            </button>
                            <GoogleLogin
                                onSuccess={credentialResponse => {
                                    const decode = jwtDecode(credentialResponse?.credential);
                                    console.log(decode, '---oath');
                                    sendDataToBackend(decode)

                                }}
                                onError={() => {
                                    console.log('Login Failed');
                                }}
                                onClick={() => { setGsignUpError('') }}
                            />

                        </div>
                        <div className="flex justify-center p-2">
                            {submissionError && <p className="text-red-500 text-sm mb-2">{submissionError}</p>}
                            {gSignUpError && <p className="text-sm text-red-600">{gSignUpError}</p>}
                        </div>
                    </form>
                   
                    <p className="mt-8 text-sm bg-transparent font-normal text-center text-gray-700">
                        {" "}
                        have an account?{" "}

                        <Link className='text-blue-900' to='/login'> Login  </Link>
                    </p>
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default SignUp