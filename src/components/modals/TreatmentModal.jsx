import propTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { editTrtmntName, treatment } from '../../api/adminApi'
import { useNavigate } from 'react-router-dom'

const TreatmentModal = ({setTreatmentModal ,editTrtmntId}) => {

    const [trtmnt,setTreatment] = useState('')
    const [error,setError] = useState('')

    const navigate = useNavigate()

    const fetch=async(id)=>{
        const result = await treatment(id)
        console.log('trt---->',result);
        setTreatment(result?.data?.name)
    }

    useEffect(()=>{
        fetch(editTrtmntId)
    },[])

    const handleChange =(e)=>{
        setTreatment(e.target.value)
        setError('')
    }

    const handleSubmit = async(e)=>{
        e.preventDefault()
        try {
            if (!trtmnt || trtmnt.length <= 3 || trtmnt.length > 8 || trtmnt.trim() === '' || /[0-9]/.test(trtmnt)) {
                setError('Provide valid Treatment')
                return
            }

            const result = await editTrtmntName(trtmnt,editTrtmntId)
            console.log('rslt-->',result);
            if(result?.status ===201){
                console.log('updated');
                setTreatmentModal(false)
                // navigate('/admin/treatments')
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <>
            <div
                className="min-w-screen h-screen animated fadeIn faster  fixed  left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover"

                id="modal-id"
            >
                <div className="absolute bg-black opacity-80 inset-0 z-0" />
                <div className="w-full  max-w-lg p-5 relative mx-auto my-auto rounded-xl shadow-lg  bg-[#E7EE9D]">
                    {/*content*/}
                    <div className="flex justify-center mb-5 mt-5">
                        <h2 className="text-2xl font-semibold mb-4">Edit Treatment</h2>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-row gap-5 justify-around">

                            <div className="">

                                <div className="mb-4">
                                    <label htmlFor="name" className="block text-gray-600 text-sm font-medium mb-2">
                                        Treatment Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={trtmnt}
                                        onChange={handleChange}
                                        className="border rounded-md p-2 w-full"
                                    />
                                </div>

                            </div>

                        </div>

                        <div className="mt-4 flex justify-center">

                            <button
                                type="submit"
                                className="bg-[#CEB047] text-white py-2 px-4 rounded-md hover:bg-[#dfc258]"
                            >
                                Edit Treatment
                            </button>
                        </div>
                        
                        {error && <div className=' flex justify-center p-2'><p className='text-sm text-red-600'>{error}</p></div>}

                    </form>

                    {/*footer*/} 
                    <div className="p-3  mt-2 text-center space-x-4 md:block">

                        <button onClick={() => setTreatmentModal(false)} className="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100">
                            Cancel
                        </button>

                    </div>
                </div>
            </div>
            {/* {showModal && <ConfirmationModals setShowModal={setShowModal} handelRemove={handelRemove} />} */}

        </>
    )
}


TreatmentModal.propTypes={
    setTreatmentModal: propTypes.func.isRequired,
    editTrtmntId:propTypes.func.isRequired,
    treatmentModal:propTypes.func.isRequired
}

export default TreatmentModal