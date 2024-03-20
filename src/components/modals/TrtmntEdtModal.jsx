import { useEffect, useState } from "react";
import { removeSubTreatment, treatment } from "../../api/adminApi";
import ConfirmationModals from "./confirmationModals";

/* eslint-disable react/prop-types */
export function TrtmntEdtModal({ setTrtmntModal, editTrtmntId }) {

    const [getTreatment, setTreatment] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [id,setId] =useState('')
    const[subName,setSubName]=useState('')




    useEffect(() => {
        console.log('modal---------');
        const fetchData = async (editTrtmntId) => {
            console.log('010101');
            const result = await treatment(editTrtmntId)
            console.log('trtmnt rslt----', result.data);
            setTreatment(result.data)
        }

        fetchData(editTrtmntId)

    }, [editTrtmntId])

    //subTreatment remove confirmation modal
    const modalConfirmation = async (trtmntId,subTrtmntName) => {
        console.log('id ->', trtmntId, "  name ->",subTrtmntName);
        setShowModal(true)
        setId(trtmntId)
        setSubName(subTrtmntName)
    }

    const handelRemove =async() =>{
        console.log('id 2222 ->', id, "  name 2222 ->",subName);
        const editData ={id,subName}
        const result = await removeSubTreatment (editData)
        console.log('remove----',result);
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

                    <form onSubmit=''>
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
                                        value={getTreatment.name}
                                        onChange=''
                                        className="border rounded-md p-2 w-full"
                                    />
                                </div>
                                {getTreatment?.subTreatments?.map((subTreatment, index) => (
                                    <div className="mb-4" key=''>
                                        <label htmlFor='' className="block text-gray-600 text-sm font-medium mb-2">
                                            Sub Treatments
                                        </label>
                                        <div className="flex">
                                            <input
                                                type="text"
                                                id={`subTreatment-${index}`}
                                                name={`subTreatment-${index}`}
                                                value={subTreatment.name}
                                                onChange=''
                                                className="border rounded-md p-2 w-full"
                                            />
                                            <button type="button" onClick={()=>{modalConfirmation(getTreatment._id,subTreatment.name)}} className="ml-2 bg-red-500 text-white rounded px-2 py-1">
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                ))}

                                {getTreatment?.subTreatments?.length < 5 && (
                                    <div className="mb-4" key=''>

                                        <div className="flex">
                                            <input
                                                type="text"
                                                id='newSubTreatment'
                                                name='newSubTreatment'
                                                value=''
                                                onChange=''
                                                className="border rounded-md p-2 w-full"
                                            />
                                            <button type="button" onClick='' className="ml-2 bg-green-500 text-white rounded px-2 py-1-2">
                                                +
                                            </button>
                                        </div>
                                    </div>
                                )}

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
                    </form>

                    {/*footer*/}
                    <div className="p-3  mt-2 text-center space-x-4 md:block">
                        <button onClick={() => setTrtmntModal(false)} className="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100">
                            Cancel
                        </button>

                    </div>
                </div>
            </div>
            {showModal && <ConfirmationModals setShowModal={setShowModal} handelRemove={handelRemove} />}

        </>
    );
}
export default TrtmntEdtModal