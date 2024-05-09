import { useEffect, useState } from 'react';
// import { Card } from '@material-tailwind/react';
import { docImage, getdoctor, uploadDocument } from '../../api/doctorApi';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { docloginSuccess, uploadFileSuccess, uploadProfileImage } from '../../featuers/doctor/doctorSlice';
import DocChngePswrdMdl from '../modals/DocChngePswrdMdl';
import { useNavigate } from 'react-router-dom';
// import { Link } from 'react-router-dom';


const FileSec = () => {
    const [profileImage, setProfileImage] = useState(null);
    const [fileUpload, setFileUpload] = useState(null)

    const [uploading, setUploading] = useState('')
    const [doctorDetails, setDoctorDetails] = useState(null)
    const dispatch = useDispatch()

    const [pswrdModal, setPswrdModal] = useState(false)

    // const doctorData = useSelector((state) => state.doctor.doctor)

    const navigate = useNavigate()
    //document
    // const doctorfile = useSelector((state)=>state.doctor.doctorFile)
    //profile image
    const docProfile = useSelector((state)=>state.doctor.docImgFile)
   
    

    useEffect(() => {
        const token = localStorage.getItem('doctortoken')
        if (token) {
            const doctor = jwtDecode(token)
            if (doctor.role === 'doctor') {

                const fetch = async (id) => {
                    try {
                        const result = await getdoctor(id)
                        setDoctorDetails(result.data)
                        dispatch(docloginSuccess(result.data));
                        dispatch(uploadFileSuccess(result.data));
                    dispatch(uploadProfileImage(result.data))



                    } catch (error) {
                        console.log(error.message);
                    }
                }
                fetch(doctor.id)
            }else{
                navigate('/doctor')

            }
        }else{
            console.log('no token');
            navigate('/doctor')
        }
    }, [dispatch, setDoctorDetails, setProfileImage, setUploading, setFileUpload,navigate])



    //document image change
    const handleFileChange = (e) => {
        const document = e.target.files[0]
        if (document) {
            setFileUpload(document)
        }
        else {
            setFileUpload(false)
        }
    }

    //document image upload
    const uploadDoc = (e) => {
        e.preventDefault()

        if (fileUpload) {
            const uploadfile = async (document) => {
                try {
                    const docUpload = await uploadDocument(document)
                    if (docUpload) {
                        dispatch(uploadFileSuccess(docUpload.data));
                        toast.success("Document uploaded successfully")
                    }

                } catch (error) {
                    console.log('file upload error', error.message);
                }
            }
            const token = localStorage.getItem('doctortoken')

            if (token) {
                const decode = jwtDecode(token)
                console.log('token ', decode);
                const id = decode.id
                const formData = new FormData();
                formData.append('image', fileUpload);
                formData.append('id', id)
                //call the function to make api call
                uploadfile(formData)
            }

        }

    }


    //image uploading state change
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        console.log(file)
        if (file) {
            setProfileImage(file)
        } else {
            setProfileImage(null)
        }
    };

    // uploading image 
    const uploadImage = (e) => {
        e.preventDefault()
        setUploading('uploading')

        const res = async (image) => {
            try {
                //api call to upload image
                const result = await docImage(image)
                if (result.request.status === 200) {
                    const uploadImg = result.data
                    setDoctorDetails((prevDetails) => ({
                        ...prevDetails,
                        ...uploadImg,
                    }));
                    dispatch(uploadProfileImage(uploadImg))
                    // dispatch(docloginSuccess(uploadImg))
                    toast.success('Image Uploaded')
                    setUploading('uploaded')
                }
            } catch (error) {
                console.log(error.message);
            }
        }


        if (profileImage) {
            const token = localStorage.getItem('doctortoken')
            if (token) {
                const decode = jwtDecode(token)
                const id = decode.id
                const formData = new FormData();
                formData.append('image', profileImage);
                formData.append('id', id)
                //call the function to make api call
                res(formData)
            }
        } else {
            console.error('No image selected or selected file is not an image');
        }

    }



    const passwordModal = () => {
        setPswrdModal(true)
    }

    return (
        <>
            <div className=''>

                <div className="flex flex-col md:flex-row bg-gradient-to-r from-lime-300 via-lime-100 to-lime-300 shadow-md shadow-gray-800 antialiased rounded-md p-3">
                    <div className="md:w-auto p-4">
                        <div className="flex justify-center mb-4">
                            {docProfile ? (
                                <img
                                    src={docProfile?.image}
                                    alt="Profile"
                                    className=" w-32 h-32 rounded-full shadow-md shadow-black "
                                />
                            ) : (
                                <div className="w-32 h-32 bg-gray-300 rounded-full flex items-center justify-center">
                                    <span className="text-gray-500">No Image</span>
                                </div>
                            )}
                        </div>
                        <div>
                            <div className="mb-4">
                                <label htmlFor="image" className="block text-gray-900 font-bold mb-2">
                                    Profile Image
                                </label>
                                <input
                                    type="file"
                                    id="image"
                                    name="image"
                                    accept="image/*"
                                    // disabled={uploading}
                                    onChange={handleImageChange}
                                    className="border border-gray-600   rounded-md p-2 w-full"
                                />

                                <div className=" mt-2 mb-2">
                                    {uploading === 'uploading' ? (
                                        <div className="p-2 rounded text-xs shadow-md shadow-gray-700 bg-[#BEC944] text-white">
                                            Uploading image...
                                        </div>
                                    ) : (
                                        <button
                                            className="p-2 rounded text-xs shadow-md shadow-gray-700 bg-[#BEC944] hover:bg-[#d5e887]"
                                            onClick={uploadImage}
                                        >
                                            Upload image
                                        </button>
                                    )}

                                </div>
                            </div>
                                    
                            <div className="mb-4">
                                <label htmlFor="document" className="block text-gray-900 font-bold mb-2">
                                    Upload Document image
                                </label>
                                <input
                                    type="file"
                                    id="document"
                                    name="document"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="border border-gray-600 rounded-md p-2 w-full"
                                />

                                <div className=' mt-2 mb-2'>
                                    <button className='p-2 rounded bg-[#BEC944]  hover:bg-[#d5e887] text-xs shadow-md shadow-gray-700' onClick={uploadDoc}> Upload file</button>
                                </div>
                            </div>

                            <div className="flex justify-center mb-4">
                                {fileUpload ? (
                                    <div >
                                        <div
                                            className="bg-blue-500 h-2 w-auto rounded-full shadow-md shadow-black"
                                        >
                                        </div>
                                        <span className="text-xs text-white"> file selected</span>

                                    </div>
                                ) : (
                                    <div>
                                        <div className="w-auto h-2 bg-white shadow-md shadow-black ">
                                        </div>
                                        <span className="text-xs text-black">No file selected</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                </div>

                <button className='m-5 p-3 bg-[#c6d14d]  rounded shadow-md shadow-gray-700 hover:scale-105 duration-1000' onClick={passwordModal}> <p className='text-blue-800 text-sm' > Change Password</p></button>


            </div>
            {pswrdModal && <DocChngePswrdMdl setPswrdModal={setPswrdModal} doctorDetails={doctorDetails} />}

        </>
    );
};

export default FileSec;