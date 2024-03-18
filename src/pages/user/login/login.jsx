/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";
import Footer from "../../../components/footer/footer"
import Nav from "../../../components/navbar/nav"
import { login } from "../../../api/userApi";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { loginSuccess } from "../../../featuers/user/userSlice";
import { useDispatch } from "react-redux";


const Login = () => {

    const navigate =useNavigate()
    const dispatch = useDispatch()

    const [email,setEmail] = useState('')
    const [password,setPassword] =useState('')

    useEffect(()=>{
        const token = localStorage.getItem('usertoken')
        if(token){
            const decode = jwtDecode(token)
            if(decode.role=="user"){
                navigate('/')
            }else{
                navigate('/login')
            }
        }else{
            navigate('/login')
        }
    },[navigate])

    const backgroundImage = {
        backgroundImage: 'url("ayurveda.jpeg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: '100%',
        position: 'relative',

    };




    const handleSubmit =async (e)=>{
        e.preventDefault()

        try{
            const formData = {email,password}
            const response = await login(formData)
            console.log('response===>',response);

            if(response?.status ==200){
                dispatch(loginSuccess(response.data.user))
                localStorage.setItem('usertoken',response.data.token)
                localStorage.setItem('userDetails',JSON.stringify(response.data.user))
                navigate('/')
            }else{
                console.log('invalid ',response);
            }

        }catch(err){
            console.log(err.message);
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
                        <p className="bg-transparent text-opacity-30">Login page</p>

                    </div>
                </div>

            </div>

            {/* login form */}



            <div className="relative flex flex-col justify-center min-h-screen shadow-2xl p-5  overflow-hidden">

                <div className="w-full p-10 m-auto  rounded-md shadow-xl lg:max-w-xl  bg-[#E7EE9D] ">
                    <h1 className="bg-transparent  text-3xl font-semibold text-center  uppercase">
                        Sign in
                    </h1>
                    <form className=" bg-transparent mt-6" onSubmit={handleSubmit}>

                        <div className="mb-2 bg-transparent">
                            <label
                                htmlFor="email"
                                className="block text-sm bg-transparent  font-semibold text-gray-800 "
                            >
                                Email
                            </label>
                            
                            <input
                                type="email" name="email" placeholder="enter your email address"  value={email} onChange={(e)=>setEmail(e.target.value)}
                                className="block bg-[white] w-full px-4 py-2 mt-2   border rounded-md "
                            />
                        </div>

                        <div className="mb-2 bg-transparent">
                            <label
                                htmlFor="password"
                                className="block bg-transparent text-sm font-semibold text-gray-800"
                            >
                                Password
                            </label>
                            <input
                                type="password" name="password" placeholder="enter password" value={password} onChange={(e)=>setPassword(e.target.value)}
                                className="block w-full px-4 py-2 mt-2 bg-[white] border rounded-md "
                            />
                        </div>

                        <a href="#" className="text-sm font-normal  hover:underline">
                            Forget Password?
                        </a>

                        <div className="mt-6 bg-transparent">
                            <button className="w-full bg-[#CEB047] px-4 py-2 tracking-wide font-semibold     text-black border rounded-md ">
                                Login
                            </button>
                        </div>

                    </form>

                   

                    <div className="flex  mt-4 gap-x-2">
                       

                    </div>

                    <p className="mt-8 text-sm bg-transparent font-normal text-center text-gray-700">
                        {" "}
                        Don't have an account?{" "}
                        
                           <Link to='/signup'> Sign up  </Link> 
                    </p>
                </div>
            </div>


            <Footer />
        </div>
    )
}

export default Login




