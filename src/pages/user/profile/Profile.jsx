// src/components/UserProfile.js
import {  useEffect, useState } from 'react';
import Nav from '../../../components/navbar/nav';
import ImgComponent from '../../../components/imgCmpnt/ImgComponent';
import Footer from '../../../components/footer/footer';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import UsrPswrdChnge from '../../../components/modals/UsrPswrdChnge';

const UserProfile = () => {

    const user = useSelector(state => state.user.user)
    const [showModal,setShowModal] = useState(false)
    const [userData,setUserData]=useState('')

    useEffect(()=>{
        if(user?.user?.isGoogle){
            setUserData(user?.user)
        }else{
            setUserData(user)
        }
    },[user])
   

    return (
        <>
            <Nav />
            <ImgComponent text='User Profile' />

            <div className='p-4'>
                <div className="max-w-lg mx-auto p-8 bg-gradient-to-r from-lime-200 via-lime-100 to-lime-200 rounded-lg shadow-lg m-10">
                    {userData ? (
                        <div>
                          {userData?.image?(
                            <img
                                className="rounded-full h-24 w-24 mx-auto mb-4"
                                src={userData?.image}
                                alt={userData?.name}
                            />):(
                            <img
                                className="rounded-full h-24 w-24 mx-auto mb-4"
                                src={`https://avatars.dicebear.com/api/avataaars/${userData.name}.svg`}
                                alt={userData.name}
                            />)
                            }
                            

                            <div className="text-center mb-4">
                                <h2 className="text-2xl font-bold text-teal-500">{userData.name}</h2>
                                <p className="text-gray-600">{userData?.email}</p>
                               <Link to='/editProfile'> <a className='text-sm underline text-blue-900'>Edit Profile</a></Link>
                            </div>
                            

                            <div className='flex gap-2 justify-center'>
                                <button
                                    className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-teal-700"
                                    onClick={() => setShowModal(true)}
                                >
                                    Change Password
                                </button>
                                <button
                                    className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-teal-700"
                                    onClick=''
                                >
                                    <Link to='/booking'> Booking</Link>
                                </button>

                                <button
                                    className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-teal-700"
                                    onClick=''
                                >
                                    <Link to='/message'> Message</Link>
                                </button>
                            </div>
                        </div>
                    ) : (
                        <p className="text-center">Loading...</p>
                    )}
                </div>
            </div >
            <Footer />
            {showModal&& <UsrPswrdChnge setShowModal={setShowModal}/>}
        </>
    );
};

export default UserProfile;
