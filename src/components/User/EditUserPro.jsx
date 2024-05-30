import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { profileImageUpload, updateUserData } from "../../api/userApi";
import { toast } from "react-toastify";
import { loginSuccess } from "../../featuers/user/userSlice";

const EditUserPro = () => {

    const [uploading, setUploading] = useState('')
    const [profileImage, setProfileImage] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null)
    const dispatch = useDispatch()

    const user = useSelector((state) => state.user.user)
    //formData 
    const [formData, setFormData] = useState({
        name: user?.name,
        email: user?.email,
        mob: user?.mob,
        id: user?._id

    })


    //image uploading state change
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfileImage(file)
            const imageUrl = URL.createObjectURL(file);
            setSelectedImage(imageUrl);
        } else {
            setProfileImage(null)
            setSelectedImage(null)
        }
    };

    //upload Image
    const uploadImage = (e) => {
        e.preventDefault()
        setUploading('uploading')

        const imageUpload = async (image) => {
            const result = await profileImageUpload(image)
            console.log('pro img upld result',result);
            if (result) {
                setUploading('Uploaded')
                toast.success('Profile image updated')
                dispatch(loginSuccess(result))
                setProfileImage(null)
            }
            if(result.message =='Network Error'){
                toast.error('Something went wrong')
                setUploading('')
                return
            }
        }

        if (profileImage) {
            const formData = new FormData();
            formData.append('image', profileImage);
            formData.append('id', user?._id)
            imageUpload(formData)
        }

    }

    //input field errors
    const [errors, setErrors] = useState({
        name: '',
        email: '',
        mob: '',

    });

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData({ ...formData, [name]: value });
        if (name === 'name' && value.length >= 3) {
            setErrors({ ...errors, name: '' });
        } else if (name === 'email' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            setErrors({ ...errors, email: '' });
        } else if (name === 'mob' && value.length === 10 && !isNaN(value)) {
            setErrors({ ...errors, mob: '' });
        }
    };



    const handleSubmit = async (e) => {

        e.preventDefault();
        // Validation
        let newErrors = {};
        if (!formData.name || formData.name.length < 3) {
            newErrors.name = 'Name must be at least 3 characters long';
        }
        if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }
        if (!formData.mob || formData.mob.length !== 10 || isNaN(formData.mob)) {
            newErrors.mob = 'Mobile number should have exactly 10 digits';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const result = await updateUserData(formData)
        if(result){
            toast.success('Profile Updated')
            dispatch(loginSuccess(result))

        }

    }


    return (
        <>
            {/* component */}
            <div className="flex items-center justify-center p-12">

                <div className="mx-auto w-full max-w-[550px] bg-gradient-to-r from-lime-200 via-lime-100 to-lime-200 rounded-lg
                 shadow-black shadow-sm">
                    <div className=" mt-4 py-3 px-9">
                        <label className="mb-5 flex justify-center text-md font-semibold text-[#07074D]">
                            Upload Profile Image
                        </label>
                        <div >
                            <input type="file" name="image" id="image"
                                className="sr-only"
                                accept="image/*"
                                onChange={handleImageChange}

                            />
                            <label
                                htmlFor="image"
                                className="relative flex min-h-[50px] items-center justify-center rounded-md border border-dashed border-[#515050] p-2 text-center"
                            >
                                {selectedImage ? (
                                    <img src={selectedImage} alt="Selected" className="w-20 h-20 object-cover rounded-full" />
                                ) : (
                                    <span className="inline-flex rounded px-4 border border-[#1e1d1d] text-base font-medium text-[#07074D]">
                                        Browse
                                    </span>
                                )}
                            </label>
                        </div>
                        <div className=" mt-2  flex justify-center">
                            {uploading === 'uploading' ? (
                                <div className="p-2 rounded text-xs shadow-md  bg-teal-500 text-white">
                                    Uploading image...
                                </div>
                            ) : (
                                <button
                                    className="p-2 rounded text-xs shadow-md bg-teal-500 text-white"
                                    onClick={uploadImage}
                                >
                                    Upload image
                                </button>
                            )}

                        </div>
                    </div>

                    <form
                        className="py-6 px-9"
                        onSubmit={handleSubmit}
                    >
                        <label className=" flex justify-center  text-md font-semibold text-[#07074D]">
                            Edit Profile
                        </label>
                        <div className="mb-6 ">
                            <div className="flex  flex-col  items-start mt-2 mb-2">
                                <label className="text-sm text-gray-600">Email</label>
                                <input type="email" placeholder="Enter email" name='email' onChange={handleChange}
                                    className="w-full  p-2 border rounded-md"
                                    value={formData?.email}
                                    disabled />
                                {errors.email && <p className="text-red-500 text-sm mb-2">{errors.email}</p>}

                            </div>

                            <div className="flex  flex-col  items-start mt-2 mb-2">
                                <label className="text-sm text-gray-600">Full Name</label>
                                <input type="text" placeholder="Enter full name" name='name' onChange={handleChange}
                                    className="w-full  p-2 border rounded-md"
                                    value={formData?.name} />
                                {errors.name && <p className="text-red-500 text-sm mb-2">{errors.name}</p>}

                            </div>

                            <div className="flex  flex-col  items-start mt-2 mb-2">
                                <label className="text-sm text-gray-600">Mobile</label>
                                <input type="number" placeholder="Enter valid mobile" name='mob' onChange={handleChange}
                                    className="w-full  p-2 border rounded-md"
                                    value={formData?.mob} />
                                {errors.mob && <p className="text-red-500 text-sm mb-2">{errors.mob}</p>}

                            </div>


                        </div>
                        <div>
                            <button className="hover:shadow-form w-full rounded-md bg-teal-500 hover:bg-teal-600 py-3 px-8 text-center text-base font-semibold text-white outline-none">
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>

    )
}

export default EditUserPro