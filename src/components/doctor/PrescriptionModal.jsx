import PropTypes from 'prop-types';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { addPrescription } from '../../api/doctorApi';

const PrescriptionModal = ({ setPmodal,uEmail }) => {

    const doctor = useSelector((state)=>state.doctor.doctor)
    const [prescription,setPrescription] =useState()

    const handleChange =(e)=>{
        setPrescription(e.target.value)
    }

    const handleSubmit=async(e)=>{
        e.preventDefault()
        try {
            const docId = JSON.parse(doctor)
            if(prescription){
                const result = await addPrescription(prescription,uEmail,docId?._id)
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-[#E7EE9D] p-6 rounded-md w-1/3 flex flex-col justify-center items-center">
                <div className='flex justify-center items-center'>
                    <h1 className='text-lg font-bold'>Add Prescription</h1>
                </div>

                <div className='w-full flex justify-center p-5'>
                    <textarea className='w-full' name="text" id=""
                    onChange={handleChange}
                    ></textarea>
                </div>
                <div className="text-center p-2 flex-auto justify-center">
                    <div className="p-3 mt-2 text-center space-x-4 md:block">
                        <button
                            onClick={() => setPmodal(false)}
                            className="mb-2 md:mb-0 bg-red-500 px-5 py-2 text-sm shadow-sm shadow-black font-medium tracking-wider 
                            border text-white rounded-full hover:shadow-lg hover:bg-red-200"
                        >
                            Cancel
                        </button>

                        <button className="mb-2 md:mb-0 bg-green-600 px-5 py-2 text-sm shadow-sm shadow-black font-medium tracking-wider 
                        border text-white rounded-full hover:shadow-lg hover:bg-green-400"
                        onClick={handleSubmit}
                        >
                            Add Prescription
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

PrescriptionModal.propTypes = {
    setPmodal: PropTypes.func.isRequired,
    uEmail:PropTypes.string.isRequired
};

export default PrescriptionModal;
