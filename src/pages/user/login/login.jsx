/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";
import Footer from "../../../components/footer/footer"
import Nav from "../../../components/navbar/nav"
import { login } from "../../../api/userApi";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";



const Login = () => {

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
    },[])

    const backgroundImage = {
        backgroundImage: 'url("ayurveda.jpeg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: '100%',
        position: 'relative',

    };


    const navigate =useNavigate()

    const [email,setEmail] = useState('')
    const [password,setPassword] =useState('')

    const handleSubmit =async (e)=>{
        e.preventDefault()

        try{
            const formData = {email,password}
            const response = await login(formData)
            console.log('response===>',response);

            if(response?.status ==200){
                localStorage.setItem('usertoken',response.data.token)
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

                    {/* <div className="relative flex items-center justify-center w-full mt-6 border border-t">
                        <div className="absolute bg-transparent px-5 ">Or</div>
                    </div> */}

                    <div className="flex  mt-4 gap-x-2">
                        {/* <button
                            type="button"   
                            className="flex bg-[#CEB047] items-center justify-center w-full p-2 border border-gray-600 rounded-md "
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 32 32"
                                className="w-5 h-5 bg-transparent fill-current"
                            >
                                <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
                            </svg>
                        </button> */}

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




