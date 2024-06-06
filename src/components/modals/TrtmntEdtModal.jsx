import { useEffect, useState } from "react";
import { removeSubTreatment, treatment, updateTreatment } from "../../api/adminApi";
import ConfirmationModals from "./confirmationModals";
// import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

/* eslint-disable react/prop-types */
export function TrtmntEdtModal({ setTrtmntModal, editTrtmntId, }) {

    const [getTreatment, setTreatment] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [id, setId] = useState('')
    const [subName, setSubName] = useState('')
    const [sub_trtmnt, setSub_trtmnt] = useState([''])
    const [errorMessage, setErrorMessage] = useState('')
    const [arr1, setArr1] = useState(new Set()); 

    // const navigate = useNavigate()


    useEffect(() => {
        const fetchData = async (editTrtmntId) => {
            const result = await treatment(editTrtmntId)
            setTreatment(result.data)
        }

        fetchData(editTrtmntId)
        

    }, [editTrtmntId])

    useEffect(() => {
        const uniqueNames = new Set(getTreatment.subTreatments?.map(treatment => treatment.name));
        setArr1(uniqueNames);
    }, [getTreatment]);


   

    //subTreatment remove confirmation modal
    const modalConfirmation = async (trtmntId, subTrtmntName) => {
        setShowModal(true)
        setId(trtmntId)
        setSubName(subTrtmntName)
    }



   // Handle sub-treatment change
   const handleSubTrtmntChange = (index, value) => {
    const updatedSubTreatments = [...sub_trtmnt];
    updatedSubTreatments[index] = value;
    setSub_trtmnt(updatedSubTreatments);


    
    // Clear the error message when the input field is cleared
    if (value === '' && errorMessage !=='Reached sub-treatments limit!') {
        setErrorMessage('');
    }
};




    // Handle add treatment
    const handleAddSubTrtmnt = () => {
        const newSubTreatment = sub_trtmnt[sub_trtmnt.length - 1]; // Get the last sub-treatment entered

        if(newSubTreatment.trim()===''){
            setErrorMessage('treatment cannot be empty')
            return
        }

        // Check for duplicates in both arrays
        if (arr1.has(newSubTreatment)) {
            
            setErrorMessage('Sub-treatment already exists!');
            return;
        }

        if (sub_trtmnt.length + getTreatment.subTreatments.length >= 5) {
            setArr1(prevArr1 => new Set([...prevArr1, newSubTreatment]));

            setErrorMessage('Reached sub-treatments limit!');
            return;
        }



        setArr1(prevArr1 => new Set([...prevArr1, newSubTreatment]));
        setSub_trtmnt([...sub_trtmnt,'']);

       
        setErrorMessage(''); 

    };


const handleSubmit = async(e) => {
    e.preventDefault();
    const newTreatmentData = {
        id: getTreatment._id,
        subTreatments: sub_trtmnt.map(subTreatment => ({ name: subTreatment })),
      }

   const result = await updateTreatment( newTreatmentData )
   if(result.data.message ==='empty data is not allowed'){
    setErrorMessage('empty submission not allowded')
    return
   }
   if(result.data.message === 'duplicate treatment name is not allowed'){
    setErrorMessage('Duplicate subtreatment')
    return
   }
   if(result.data.message ==='cannot add more  than five!'){
    setErrorMessage('cannot add more  than five!')
    return
   }
   if(result.data.message ==='success'){
   toast.success('updated')
   setTrtmntModal(false)
   }


}


    const handelRemove = async () => {
        const editData = { id, subName }
        const result = await removeSubTreatment(editData)
        if (result?.status === 200) {
            setShowModal(false)
            setTrtmntModal(false)
            toast.success('Sub treatment removed')

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

                    <form   onSubmit={handleSubmit}
>
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
                                            <button type="button" onClick={() => { modalConfirmation(getTreatment._id, subTreatment.name) }} className="ml-2 bg-red-500 text-white rounded px-2 py-1">
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            
                                {getTreatment?.subTreatments?.length <5 &&
                                    sub_trtmnt.map((subTreatment, index) => (

                                        <div className="mb-4" key={index}>
                                            {errorMessage  && <p className='text-red-500 text-sm'> {errorMessage}</p>}

                                            <div className="flex">
                                                <input
                                                    type="text"
                                                    id={`subTreatment-${index}`}
                                                    name={`subTreatment-${index}`}
                                                    value={subTreatment}
                                                    onChange={(e) => {
                                                        handleSubTrtmntChange(index, e.target.value);
                                                    }}
                                                    className="border rounded-md p-2 w-full"
                                                />
                                                {  sub_trtmnt?.length + getTreatment?.subTreatments?.length <= 5 && errorMessage !== 'Reached sub-treatments limit!' && (
                                                    <button
                                                        type="button"
                                                        onClick={handleAddSubTrtmnt}
                                                        className="ml-2 bg-green-500 text-white rounded px-2 py-1-2"
                                                    >
                                                        +
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    )
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