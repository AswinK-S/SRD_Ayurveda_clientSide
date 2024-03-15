import { useState } from 'react';
import { Card } from '@material-tailwind/react';
import { docImage } from '../../api/doctorApi';


const FileSec = () => {
    const [profileImage, setProfileImage] = useState(null);
    const [fileUpload, setFileUpload] = useState(null)

    // const upload_preset = 'hkdfkbsg'
    // const cloud_name = 'djmr6njuu'

    const handleFileChange = (e) => {
        console.log('files   --', e.target);

        const document = e.target.files[0]
        if (document) {
            setFileUpload(true)
        }
        else {
            setFileUpload(false)
        }
        setFileUpload(URL.createObjectURL(document))
    }

    const handleImageChange = (e) => {
        console.log('files   --', e.target.files[0]);
        const file = e.target.files[0];
        console.log(file)
        // if (file) {
        //     const reader = new FileReader()
        //     reader.readAsDataURL(file)

        //     reader.onloadend = () => {
        //         setProfileImage(reader.result)
        //     }
        //     console.log('prfl img',profileImage);
        // } else {
        //     setProfileImage(null)
        // }
        setProfileImage(file)
    };

    const uploadImage = (e) => {
        e.preventDefault()

        const res = async (image) => {
            try {
                const result = await docImage(image)
                console.log(result);
            } catch (error) {
                console.log(error.message);
            }
        }

        if (profileImage) {
            console.log('img name ---',profileImage);
            const formData = new FormData();
            formData.append('image', profileImage);      
            res(formData)

        } else {
            console.error('No image selected or selected file is not an image');
        }

    }


    const uploadFile = () => {


    }

    return (
        <>
            <div className=''>

                <div className="flex flex-col md:flex-row bg-gradient-to-r from-lime-300 via-lime-100 to-lime-300 shadow-md shadow-gray-800 antialiased rounded-md p-3">
                    <div className="md:w-auto p-4">
                        <div className="flex justify-center mb-4">
                            {profileImage ? (
                                <img
                                    src={URL.createObjectURL(profileImage)}
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
                                    onChange={handleImageChange}
                                    className="border border-gray-600   rounded-md p-2 w-full"
                                />
                                <div className=' mt-2 mb-2'>
                                    <button className='p-2 rounded text-xs shadow-md shadow-gray-700 bg-[#BEC944] hover:bg-[#e8df87]' onClick={uploadImage}> Upload image</button>
                                </div>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="document" className="block text-gray-900 font-bold mb-2">
                                    Upload Document
                                </label>
                                <input
                                    type="file"
                                    id="document"
                                    name="document"
                                    accept=".pdf,.doc,.docx"
                                    onChange={handleFileChange}
                                    className="border border-gray-600 rounded-md p-2 w-full"
                                />

                                <div className=' mt-2 mb-2'>
                                    <button className='p-2 rounded bg-[#BEC944]  hover:bg-[#e8df87] text-xs shadow-md shadow-gray-700' onClick={uploadFile}> Upload file</button>
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

                <Card className='mt-5 mb-5 bg-gradient-to-r from-lime-300 via-lime-100 to-lime-300 shadow-md shadow-gray-800 antialiased rounded-md p-3 flex items-center'>
                    <p className='text-black'>change password</p>
                </Card>
            </div>


        </>
    );
};

export default FileSec;