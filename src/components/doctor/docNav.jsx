import { useNavigate, } from "react-router-dom";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const DocNav = () => {
    const navigate = useNavigate()

    const [doctor, setDoctor] = useState(false)

    const [showMenu, setShowMenu] = useState(false);



    useEffect(() => {
        const token = localStorage.getItem('token')
        console.log('dctr nav tkn :', token);

        if (token) {
            const decode = jwtDecode(token)
            console.log('dctr token :', decode.role);
            if (decode.role == 'doctor') {
                setDoctor(true)
                return
            }
        } else {
            navigate('/doctor')
        }
    }, [navigate])

    const logout = () => {
        localStorage.removeItem('token')
        navigate('/doctor')
    }

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };


    return (
        <>


            <div className=" flex justify-center shadow-lg shadow-blue-gray-300 py-1">
                <div className="container">
                    <div className="flex flex-col sm:flex-row items-center justify-between">
                        <div className="mb-4 sm:mb-0">
                            <img className="h-[100px]" src="/logo.png" alt="" />
                        </div>

                        {/* Menu Button for Mobile View */}
                        <div className="sm:hidden">
                            <button
                                onClick={toggleMenu}
                                className="text-black focus:outline-none"
                            >
                                &#9776; {/* Hamburger Icon */}
                            </button>
                        </div>

                        {/* Menu Items for Normal and Mobile View */}
                        <div
                            className={`flex text-black items-center space-x-4 font-serif ${showMenu ? 'flex-col sm:flex-row' : 'hidden sm:flex'
                                }`}
                        >
                            {doctor ? (
                                <>
                                    <button
                                        className="bg-[#d3dd64] px-4 py-2 rounded-lg shadow-md shadow-gray-700 hover:border-b-2"
                                        onClick={logout}
                                    >
                                        Logout
                                    </button>

                                </>
                            ) : null}
                        </div>
                    </div>
                </div>
            </div>



        </>
    );
}

export default DocNav