import { useState } from "react";
import Footer from "../../../components/footer/footer";
import Nav from "../../../components/navbar/nav"
import { Link } from "react-router-dom";
import { signup } from "../../../api/userApi";
import { registerUser } from "../../../api/userApi";
import { useNavigate } from "react-router-dom";

const SignUp = () => {


    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate()

    //useState to show otp field
    const [showOtpInput,setShowOtpInput] =useState(false)
    const [otpValue,setOtpValue] = useState('')




    //formData 
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mob: '',
        password: ''
    })



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

    //function to submit the data of form
    const handleSubmit = async (e) => {
        e.preventDefault()


        try {

            if(showOtpInput){
              // Process OTP submission logic here
              console.log('Submitted OTP:', otpValue);  
              let res =await registerUser(otpValue)
              if(res.status ===200){
                navigate('/login')
              }
            }else{
            const registerData = formData
            const response = await signup(registerData)
            if (response.status == 200) {
                console.log('user data send to back end');
                setShowOtpInput(true)
            }
          }
        } catch (err) {
            console.log(err.message);
        }

    }

    // take the data from the form 
    const handleChange = async (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
        console.log('register data', formData);
    }

    

    return (

        <div>
            <Nav />
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
                        </div>


                        <div className="mb-2 bg-transparent">
                            <label htmlFor="email" className="block text-sm bg-transparent  font-semibold"> Email </label>


                            <input type="email" name="email" placeholder="enter your email address"
                                className="block bg-[white] w-full px-4 py-2 mt-2   border rounded-md " onChange={handleChange} />


                        </div>


                        <div className="mb-2 bg-transparent">
                            <label htmlFor="" className="block text-sm bg-transparent  font-semibold"> Mob </label>


                            <input type="number" name="mob" placeholder="enter your valid mobile number"
                                className="block bg-[white] w-full px-4 py-2 mt-2   border rounded-md " onChange={handleChange} />


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
                                type={showPassword?'text':'password'} name="confirmPassword" placeholder="confirm your password"
                                className="block w-full px-4 py-2 mt-2 bg-[white] border rounded-md "
                            />

                            <span 
                            className="absolute top-2 right-4"
                            onClick={handleTogglePassword}>
                                {showPassword?(<i className="fas fa-eye-slash "/>):(<i className="fas fa-eye"/>)}
                            </span>

                            </div>
                            
                        </div>

                        {/* Conditional rendering of OTP input */}
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
                                    onChange={(e) => setOtpValue(e.target.value)}
                                />
                            </div>
                        )}

                        <div className="mt-6 bg-transparent">
                            <button className="w-full bg-[#CEB047] px-4 py-2 tracking-wide font-semibold text-black border rounded-md " 
                           >
                                {showOtpInput ? "Enter OTP" : "Sign Up"}
                            </button>

                            
                        </div>

                    </form>

                    <div className="relative flex items-center justify-center w-full mt-6 border border-t">
                        {/* <div className="absolute bg-transparent px-5 ">Or</div> */}
                    </div>

                    <div className="flex  mt-4 gap-x-2">
                        <button

                            className="flex bg-[#CEB047] items-center justify-center w-full p-2 border border-gray-600 rounded-md "
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 32 32"
                                className="w-5 h-5 bg-transparent fill-current"
                            >
                                <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
                            </svg>
                        </button>

                    </div>

                    <p className="mt-8 text-sm bg-transparent font-normal text-center text-gray-700">
                        {" "}
                        have an account?{" "}

                        <Link to='/login'> Login  </Link>
                    </p>
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default SignUp