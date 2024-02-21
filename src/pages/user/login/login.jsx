import Footer from "../../../components/footer/footer"
import Nav from "../../../components/navbar/nav"

const Login = () => {

    const backgroundImage = {
        backgroundImage: 'url("ayurveda.jpeg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: '100%',
        position: 'relative',

    };

    return (
        <div>
            <Nav />

            <div>
                <div className="flex lg:h-[200px]  items-center justify-center p-5" style={backgroundImage}>
                    <div className="text-white text-5xl font-bold  bg-transparent">
                        <p className="bg-transparent text-opacity-30">Login page</p>

                    </div>
                </div>

            </div>

            {/* login form */}



            <div className="relative flex flex-col justify-center min-h-screen shadow-2xl  overflow-hidden">

                <div className="w-full p-10 m-auto  rounded-md shadow-xl lg:max-w-xl  bg-[#E7EE9D] ">
                    <h1 className="bg-transparent  text-3xl font-semibold text-center  uppercase">
                        Sign in
                    </h1>

                    <form className=" bg-transparent mt-6">
                        <div className="mb-2 bg-transparent">
                            <label
                                for="email"
                                className="block text-sm bg-transparent  font-semibold text-gray-800 "
                            >
                                Email
                            </label>
                            
                            <input
                                type="email"
                                className="block bg-[white] w-full px-4 py-2 mt-2   border rounded-md "
                            />
                        </div>

                        <div className="mb-2 bg-transparent">
                            <label
                                for="password"
                                className="block bg-transparent text-sm font-semibold text-gray-800"
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                className="block w-full px-4 py-2 mt-2 bg-[white] border rounded-md "
                            />
                        </div>

                        <a href="#" className="text-xs  hover:underline">
                            Forget Password?
                        </a>

                        <div className="mt-6 bg-transparent">
                            <button className="w-full bg-[#CEB047] px-4 py-2 tracking-wide text-black border rounded-md ">
                                Login
                            </button>
                        </div>

                    </form>

                    <div className="relative flex items-center justify-center w-full mt-6 border border-t">
                        {/* <div className="absolute bg-transparent px-5 ">Or</div> */}
                    </div>

                    <div className="flex  mt-4 gap-x-2">
                        <button
                            type="button"   
                            className="flex bg-[#5d5df6] items-center justify-center w-full p-2 border border-gray-600 rounded-md "
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

                    <p className="mt-8 text-xs bg-transparent font-light text-center text-gray-700">
                        {" "}
                        Don't have an account?{" "}
                        <a
                            href="#"
                            className="font-medium bg-transparent  hover:underline"
                        >
                            Sign up
                        </a>
                    </p>
                </div>
            </div>


            <Footer />
        </div>
    )
}

export default Login




