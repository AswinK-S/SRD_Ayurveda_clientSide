
const AdmnBody = () => {

    return (
        <div>

            <div className="relative flex flex-col justify-center min-h-screen shadow-2xl p-5  overflow-hidden">

                <div className="w-full p-10 m-auto  rounded-md shadow-xl lg:max-w-xl  bg-[#E7EE9D] ">
                    <h1 className="bg-transparent  text-3xl font-semibold text-center  uppercase">
                        Sign in
                    </h1>

                    <form className=" bg-transparent mt-6" >
                        <div className="mb-2 bg-transparent">
                            <label
                                htmlFor="email"
                                className="block text-sm bg-transparent  font-semibold text-gray-800 "
                            >
                                Email
                            </label>

                            <input
                                type="email" name="email" placeholder="enter your email address"
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
                                type="password" name="password" placeholder="enter password" 
                                className="block w-full px-4 py-2 mt-2 bg-[white] border rounded-md "
                            />
                        </div>

                        

                        <div className="mt-6 bg-transparent">
                            <button className="w-full bg-[#CEB047] px-4 py-2 tracking-wide font-semibold     text-black border rounded-md ">
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