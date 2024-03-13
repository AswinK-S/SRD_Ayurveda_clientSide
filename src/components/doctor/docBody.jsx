import { jwtDecode } from "jwt-decode"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { docLogin } from "../../api/doctorApi";



const DocBody =()=>{

    const navigate=useNavigate();

    const [email,setEmail]= useState('')
    const [password,setPassword] = useState('')

    useEffect(()=>{
        const token = localStorage.getItem('token')
        if(token){
            const decode = jwtDecode(token)
            if(decode.role =='doctor'){
                navigate('doctor/dashboard')
            }else{
                navigate('/doctor')
            }
        }
    },[])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {

            let loginData = { email, password }
            let response = await docLogin(loginData)
            console.log('ressss ----------,');
            if (response?.data.message==='doctor logged in') {
                console.log('login success --admin');
                localStorage.setItem('token',response.data.token)
                navigate('/doctor/overView')
            } else {
                console.log('invalid',response?.data?.message);
                navigate('/doctor')
            }
        } catch (err) {
            console.log(err.message);
        }

    }

    return(
        <div>

            <div className="relative flex flex-col justify-center min-h-screen shadow-2xl   overflow-hidden">

                <div className="w-full p-20 m-auto  rounded-3xl shadow-xl lg:max-w-xl  bg-[#E7EE9D] ">
                    <h1 className="bg-transparent  text-3xl font-semibold text-center  uppercase">
                      Doctor
                    </h1>

                    <form className=" bg-transparent mt-6" onClick={handleSubmit} >
                        <div className="mb-2 bg-transparent">
                            <label
                                htmlFor="email"
                                className="block text-sm bg-transparent text-center  font-semibold text-gray-800 "
                            >
                                Email
                            </label>

                            <input
                                type="email" name="email" placeholder="enter your email address"
                                className="block bg-[white] w-full px-4 py-2 mt-2   border rounded-md "
                                value={email}
                                onChange={(e)=>{setEmail(e.target.value)}}
                            />
                        </div>

                        <div className="mb-2 bg-transparent">
                            <label
                                htmlFor="password"
                                className="block bg-transparent text-center text-sm font-semibold text-gray-800"
                            >
                                Password
                            </label>
                            <input
                                type="password" name="password" placeholder="enter password" 
                                className="block w-full px-4 py-2 mt-2 bg-[white] border rounded-md "
                                value={password} onChange={(e)=>{setPassword(e.target.value)}}
                            />
                        </div>

                        

                        <div className="mt-6 flex justify-center bg-transparent">
                            <button className=" bg-[#CEB047] px-4 py-2 tracking-wide font-semibold     text-black border rounded-md ">
                                Login
                            </button>
                        </div>

                    </form>

    
                   
                </div>

            </div>
        </div>
    )
}

export default DocBody