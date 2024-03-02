import { useState } from "react"
import { login } from "../../api/adminApi"
import { useNavigate } from "react-router-dom"



const AdmnBody = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {

            let loginData = { email, password }
            let response = await login(loginData)
            console.log('ressss ----------,',response);
            if (response?.status == 200) {
                console.log('login success');
                navigate('/admin/dashboard')
            } else {
                console.log('invalid',response?.data?.message);
            }
        } catch (err) {
            console.log(err.message);
        }

    }

    return (
        <div>

            <div className="relative flex flex-col justify-center min-h-screen shadow-2xl   overflow-hidden">

                <div className="w-full p-20 m-auto   shadow-xl lg:max-w-xl  bg-[#E7EE9D] ">
                    <h1 className="bg-transparent  text-3xl font-semibold text-center  uppercase">
                        Admin
                    </h1>

                    <form className=" bg-transparent mt-6" onSubmit={handleSubmit}>
                        <div className="mb-2 bg-transparent">
                            <label
                                htmlFor="email"
                                className="block text-sm bg-transparent text-center  font-semibold text-gray-800 "
                            >
                                Email
                            </label>

                            <input
                                type="email" name="email" placeholder="enter your email address"
                                value={email} onChange={(e) => { setEmail(e.target.value) }}
                                className="block bg-[white] w-full px-4 py-2 mt-2   border rounded-md "
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
                                value={password} onChange={(e) => { setPassword(e.target.value) }}
                                className="block w-full px-4 py-2 mt-2 bg-[white] border rounded-md "
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

export default AdmnBody