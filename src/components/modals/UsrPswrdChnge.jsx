import propTypes from 'prop-types'
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { changePassword } from '../../api/userApi';
import { toast } from 'react-toastify';

const UsrPswrdChnge = ({ setShowModal }) => {

    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const user= useSelector((state)=>state.user.user)

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

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
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

            const result = await changePassword(user?._id,newPassword)
            if(result){
                console.log('result----',result);
                toast.success("Successfully changed the password!");
                setShowModal(false)
            }else{
                toast.error('Something went Wrong')
                // setShowModal(false)
            }
        } catch (error) {
            console.log(error.message);
        }

    }


    return (
        <div className="min-w-screen h-screen animated fadeIn faster fixed left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover" id="modal-id">
            <div className="absolute bg-black opacity-80 inset-0 z-0" />
            <div className="w-full max-w-lg p-5 relative mx-auto my-auto rounded-xl shadow-lg bg-[#F9FFE1] ">
                {/*content*/}
                <div>
                    <div className="text-center p-5 flex-auto justify-center">
                        <h2 className="text-xl font-bold py-4 ">  Change Password </h2>
                        <p className="text-sm text-gray-900 px-8">
                        </p>
                        {/* Input fields */}

                        <div className="flex  flex-col  items-start mb-3">
                            <label className="text-sm text-gray-600">Enter new Password</label>
                            <input type="password" placeholder="Enter password" name='newPassword' id='password' className="w-full mt-4 p-2 border rounded-md" onChange={handleChange} />


                        </div>

                        <div className="flex  flex-col  items-start mb-3">
                            <label className="text-sm text-gray-600">Confirm Password</label>
                            <input type="password" placeholder="Enter password" name='confirmPassword' id='cpassword' onChange={handleChange} className="w-full mt-4 p-2 border rounded-md" />
                        </div>

                        {errorMessage && <div className="text-red-500 text-sm mt-2">{errorMessage}</div>}

                        <div className=" text-center space-x-4 md:block">

                            <button onClick={handleSubmit} className=" md:mb-0 bg-[#d8e088]  px-5 py-2 text-sm shadow-sm shadow-black font-medium tracking-wider  text-gray-600  hover:shadow-lg ">
                                Submit
                            </button>

                        </div>

                    </div>

                </div>

                <div className="text-center  flex-auto justify-center">

                    <div className="p-3 mt-2 text-center space-x-4 md:block">

                        <button onClick={() => setShowModal(false)} className="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm shadow-black font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100">
                            Cancel
                        </button>

                    </div>
                </div>
            </div>
        </div>
    )
}

UsrPswrdChnge.propTypes = {
    setShowModal: propTypes.func.isRequired,
};

export default UsrPswrdChnge