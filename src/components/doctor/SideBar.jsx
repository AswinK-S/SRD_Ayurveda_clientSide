import { Link } from "react-router-dom"

const SideBar = () => {


    return (
        <>

            {/* component */}
            {/* <div className=" md:w-auto  bg-white "> */}
                {/* <div className=" w-full  flex flex-col flex-auto shadow-md shadow-gray-800 antialiased rounded-md p-2 bg-gradient-to-r from-lime-300 via-lime-100 to-lime-300 text-gray-900"> */}
                    <div className="flex flex-col top-0 left-0 w-3/4 bg-gradient-to-r from-lime-300 via-lime-100 to-lime-300 shadow-md shadow-black">
                        <div className="flex items-center justify-center  h-14 border-b">
                            <div>Doctor Interface</div>
                        </div>
                        <div className="overflow-y-auto overflow-x-hidden flex-grow  ">
                            <ul className="flex flex-col py-4 space-y-1">

                                <Link to='/doctor/overView'>
                                    <li>
                                        <a
                                            href="#"
                                            className="flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-900 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"
                                        >
                                            <span className="inline-flex justify-center items-center ml-4">
                                                <svg
                                                    className="w-5 h-5"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                                                    />
                                                </svg>
                                            </span>
                                            <span className="ml-2 text-sm tracking-wide truncate">
                                                Overview
                                            </span>
                                        </a>
                                    </li>
                                </Link>

                                <li>
                                    <a
                                        href="#"
                                        className=" flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-900 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"
                                    >
                                        <span className="inline-flex justify-center items-center ml-4">
                                            <svg
                                                className="w-5 h-5"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                                                />
                                            </svg>
                                        </span>
                                        <span className="ml-2 text-sm tracking-wide truncate">
                                            Messages
                                        </span>
                                    </a>
                                </li>

                                <li>
                                    <a
                                        href="#"
                                        className=" flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-900 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"
                                    >
                                        <span className="inline-flex justify-center items-center ml-4">
                                            <svg
                                                className="w-5 h-5"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                                                />
                                            </svg>
                                        </span>
                                        <span className="ml-2 text-sm tracking-wide truncate">
                                            Notifications
                                        </span>
                                       
                                    </a>
                                </li>

                                <li>
                                    <a
                                        href="#"
                                        className=" flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-900 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"
                                    >
                                        <span className="inline-flex justify-center items-center ml-4">
                                            <svg
                                                className="w-5 h-5"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                                                />
                                            </svg>
                                        </span>
                                        <span className="ml-2 text-sm tracking-wide truncate">
                                            Appointments
                                        </span>
                                    </a>
                                </li>

                                <li>
                                    <a
                                        href="#"
                                        className=" flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-900 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"
                                    >
                                        <span className="inline-flex justify-center items-center ml-4">
                                            <svg
                                                className="w-5 h-5"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                                />
                                            </svg>
                                        </span>
                                        <span className="ml-2 text-sm tracking-wide truncate">
                                            Slots
                                        </span>
                                    </a>
                                </li>

                                <Link to='/doctor/AddSlot'>
                                <li>
                                    <a
                                        href=""
                                        className=" flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-900 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"
                                    >
                                        <span className="inline-flex justify-center items-center ml-4">
                                            <svg
                                                className="w-5 h-5"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                                />
                                            </svg>
                                        </span>
                                        <span className="ml-2 text-sm tracking-wide truncate">
                                            Add Slots
                                        </span>
                                    </a>
                                </li>
                                </Link>

                                <li>


                                    <a
                                        href="#"
                                        className=" flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-900 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"
                                    >
                                        <span className="inline-flex justify-center items-center ml-4">
                                            <svg
                                                className="w-5 h-5"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                                                />
                                            </svg>
                                        </span>
                                        <span className="ml-2 text-sm tracking-wide truncate">
                                            Patients
                                        </span>
                                        
                                    </a>
                                </li>

                                <Link to='/doctor/profile'>

                                    <li>
                                        <a
                                            href="#"
                                            className=" flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-900 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"
                                        >
                                            <span className="inline-flex justify-center items-center ml-4">
                                                <svg
                                                    className="w-5 h-5"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                                    />
                                                </svg>
                                            </span>
                                            <span className="ml-2 text-sm tracking-wide truncate">
                                                Profile
                                            </span>

                                        </a>
                                    </li>
                                </Link>
                            </ul>
                        </div>
                    </div>
                {/* </div> */}
            {/* </div> */}





        </>

    )
}

export default SideBar



