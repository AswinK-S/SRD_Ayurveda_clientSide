
import { jwtDecode } from 'jwt-decode';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { updatePassword } from '../../api/doctorApi';
import {useDispatch} from 'react-redux'
import { logout } from '../../featuers/doctor/doctorSlice';

const ChngePsswrd = () => {

    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const dispatch = useDispatch()


    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('doctortoken')
        
        if (token) {
            const decode = jwtDecode(token)
            if (decode.role === 'doctor') {
                const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;
                if (!passwordRegex.test(newPassword)) {
                    setErrorMessage('Password must be at least 6 characters long, include at least one uppercase letter, one lowercase letter, and one number.');
                    return;
                }
                if (newPassword !== confirmPassword) {
                    setErrorMessage('New password and confirm password do not match.');
                    return;
                }
                setErrorMessage('');
                const result = await updatePassword(newPassword,decode.id)
                if(result.message==='success'){
                    localStorage.removeItem('doctorDetails')
                    localStorage.removeItem( 'doctortoken') 
                    dispatch(logout())
                    // navigate('/doctor')
                }
            }else{
                navigate('/doctor')

            }
        } else {
            navigate('/doctor')
        }

    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'newPassword') {
            setNewPassword(value);
            setErrorMessage('')
        } else if (name === 'confirmPassword') {
            setConfirmPassword(value);
            setErrorMessage('')
        }
    };

    return (
        <div>
            <div className="relative flex flex-col justify-center min-h-screen shadow-2xl overflow-hidden">
                <div className="w-full p-20 m-auto rounded-3xl shadow-xl lg:max-w-xl bg-[#E7EE9D]">
                    <h1 className="bg-transparent text-2xl font-semibold text-center uppercase">
                        Change Password
                    </h1>
                    <form className="bg-transparent mt-6">
                        <div className="mb-2 bg-transparent">
                            <label htmlFor="newPassword" className="block text-sm bg-transparent text-center font-semibold text-gray-800">
                                New Password
                            </label>
                            <input
                                type="password"
                                name="newPassword"
                                placeholder="Enter Password"
                                className="block bg-[white] w-full px-4 py-2 mt-2 border rounded-md"
                                value={newPassword}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-2 bg-transparent">
                            <label htmlFor="confirmPassword" className="block bg-transparent text-center text-sm font-semibold text-gray-800">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                name="confirmPassword"
                                placeholder="Enter Password"
                                className="block w-full px-4 py-2 mt-2 bg-[white] border rounded-md"
                                value={confirmPassword}
                                onChange={handleChange}
                            />
                        </div>
                        {errorMessage && <div className="text-red-500 text-sm mt-2">{errorMessage}</div>}
                        <div className="mt-6 flex justify-center bg-transparent">
                            <button onClick={handleSubmit} className="bg-[#CEB047] px-4 py-2 tracking-wide font-semibold text-black border rounded-md">
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ChngePsswrd;





