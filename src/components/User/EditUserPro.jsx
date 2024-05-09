import { useState } from "react";
import { useSelector } from "react-redux";
import { profileImageUpload } from "../../api/userApi";

const EditUserPro = () => {

    const [uploading, setUploading] = useState('')
    const [profileImage, setProfileImage] = useState(null);

    const user = useSelector((state)=>state.user.user)
    //formData 
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mob: '',

    })


    //image uploading state change
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        console.log('profile image--->', file)
        if (file) {
            setProfileImage(file)
        } else {
            setProfileImage(null)
        }
    };

    //upload Image
    const uploadImage = (e) => {
        e.preventDefault()
        setUploading('uploading')

        const imageUpload=async( image)=>{
            const result = await profileImageUpload(image)
        }

        if(profileImage){
            const formData = new FormData();
            formData.append('image', profileImage);
            formData.append('id',user?._id)
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

        console.log('errors--', Object.keys(newErrors).length);
        if (Object.keys(newErrors).length > 0) {
            // Update errors state with new error messages
            setErrors(newErrors);
            return; // Exit early if there are errors
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
                                <span className="inline-flex rounded px-4 border border-[#1e1d1d]  text-base font-medium text-[#07074D]">
                                    Browse
                                </span>
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
                                    className="w-full  p-2 border rounded-md" />
                                {errors.email && <p className="text-red-500 text-sm mb-2">{errors.email}</p>}

                            </div>

                            <div className="flex  flex-col  items-start mt-2 mb-2">
                                <label className="text-sm text-gray-600">Full Name</label>
                                <input type="text" placeholder="Enter full name" name='name' onChange={handleChange}
                                    className="w-full  p-2 border rounded-md" />
                                {errors.name && <p className="text-red-500 text-sm mb-2">{errors.name}</p>}

                            </div>

                            <div className="flex  flex-col  items-start mt-2 mb-2">
                                <label className="text-sm text-gray-600">Mobile</label>
                                <input type="number" placeholder="Enter valid mobile" name='mob' onChange={handleChange}
                                    className="w-full  p-2 border rounded-md" />
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