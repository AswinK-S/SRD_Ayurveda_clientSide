import { useNavigate, } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { docloginSuccess, logout } from "../../featuers/doctor/doctorSlice";
import { jwtDecode } from "jwt-decode";
// import ReactLoading from 'react-loading'
import 'ldrs/quantum'
const DocNav = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [showMenu, setShowMenu] = useState(false);
    const [loading, setLoading] = useState(true)

    const doctor = useSelector((state) => state.doctor.doctor)


    useEffect(() => {
        const token = localStorage.getItem('doctortoken')

        if (token) {

            const decode = jwtDecode(token)
            if (decode.role === 'doctor') {

                const doctorDetails = localStorage.getItem('doctorDetails')

                dispatch(docloginSuccess(doctorDetails))
                setTimeout(() => {
                    setLoading(false)

                }, 1000)
                return
            } else {
                navigate('/doctor')
            }
        } else {
            navigate('/doctor')
        }
        setLoading(false)
    }, [dispatch, navigate, doctor])

    const logoutDoc = () => {
        localStorage.removeItem('doctortoken')
        localStorage.removeItem('doctorDetails')
        dispatch(logout())
    }

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };


    return (
        <>
            {
                loading ? (
                    <div className="h-screen inset-0 flex items-center justify-center   bg-yellow-100   ">
                        <div className=" p-5 flex-row items-center justify-center   ">
                        <l-quantum
                            size="80"
                            speed="1.25"
                            color="green"
                        ></l-quantum>
                        <p className="text-light-green-800">loading...</p>
                        </div>
     

                    </div>) :
                    (
                        <div className=" flex justify-center shadow-sm shadow-black py-1">
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
                                                    onClick={logoutDoc}
                                                >
                                                    Logout
                                                </button>

                                            </>
                                        ) : null}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
            }

        </>
    );
}

export default DocNav