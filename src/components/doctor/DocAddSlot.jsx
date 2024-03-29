import { jwtDecode } from 'jwt-decode';
import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { createSlot } from '../../api/doctorApi';



const DocAddSlot = () => {


    const [value, onChange] = useState(new Date())

    const [dateError, setDateError] = useState('')
    const [error, setError] = useState('')
    const [selectedShift, setSelectedShift] = useState('')

    const handleShiftChange = (e) => {
        setSelectedShift(e.target.value)
        if(e.target.value){
            setError('')
        }
    }


    //slot submition
    const handleSubmit = async () => {

        console.log('value-->', value,"slctd-->",selectedShift);
        if (!value) {
            setDateError('Please select a date')
            return
        }

        if(selectedShift === ''){
            setError("Select at least one shift")
        }

        try {
            const token = localStorage.getItem('doctortoken')
            if (token) {
                const decode = jwtDecode(token)
                if (decode.role === 'doctor') {
                const id = decode.id

                    const slotInfo ={selectedShift,value,id}
                    const result = await createSlot(slotInfo)
                    console.log('rslt --',result);
                }
            }
        } catch (error) {
            console.log(error.message);
        }

    }


    return (
        <>
            <Calendar className='mb-4' onChange={onChange} value={value}

            />

            <div className='  mx-10 bg-gradient-to-r from-lime-300 via-lime-100 to-lime-300 p-10 shadow-md shadow-black'>
                <div className='flex justify-center'>
                    <h4 className='text-md font-serif font-semibold'>Select time slot</h4>
                    
                </div>

            

                <div className=' p-5   '>
                    <div className=' flex flex-col items-center'>
                    {error && <span className='text-md text-red-700'>{error}</span>}
                {dateError && <span className='text-md text-red-700'>{dateError}</span>}

                        <div className='m-2 flex gap-3 '>
                            <label className='font-semibold font-serif text-blue-gray-800'>
                                <input className='mx-2'
                                    type='radio'
                                    name='shift'
                                    value='Morning Shift'
                                    checked={selectedShift === 'Morning Shift'}
                                    onChange={handleShiftChange}
                                />
                                Morning Shift - 9.A.M - 12.P.M
                            </label>
                        </div>

                        <div className='m-2 flex gap-3'>
                            <label className='font-semibold font-serif text-blue-gray-800'>
                                <input className='mx-2'
                                    type='radio'
                                    name='shift'
                                    value='Afternoon Shift'
                                    checked={selectedShift === 'Afternoon Shift'}
                                    onChange={handleShiftChange}
                                />
                                Afternoon Shift - 12.P.M - 5.P.M
                            </label>
                        </div>

                        <div className='m-2 flex gap-3'>
                            <label className='font-semibold font-serif text-blue-gray-800'>
                                <input className='mx-2'
                                    type='radio'
                                    name='shift'
                                    value='FullDay Shift'
                                    checked={selectedShift === 'FullDay Shift'}
                                    onChange={handleShiftChange}
                                />
                                FullDay Shift - 9.A.M - 5.P.M
                            </label>
                        </div>

                    </div>


                    <div className='m-2  flex flex-col items-center'>
                        <h4 className='text-md font-serif font-semibold' >Selected slot </h4>
                        {value && <p className='font-semibold font-serif  text-blue-800'> Selected date is - {value.toLocaleDateString()}</p>}
                        {selectedShift  ? (
                                
                                 <span className='font-semibold font-serif  text-green-800'>You have selected slot for {selectedShift} </span>
                        ) : (
                            <span className='text-md font-serif text-deep-orange-700'>No Slot Selected</span>
                        )}

                        <button className='bg-[#9ca535] px-4 py-2 rounded-lg shadow-md shadow-gray-700 hover:bg-[#e0ea6e] m-2'
                            onClick={handleSubmit}
                        >Create slot</button>

                    </div>

                </div>
            </div>

        </>
    );
};

export default DocAddSlot;