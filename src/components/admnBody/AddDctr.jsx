import { useEffect, useState } from "react"
import { addDoctor, treatments } from "../../api/adminApi"
import { toast } from 'react-toastify'
import { useNavigate } from "react-router-dom";
import { generatePassword } from "../../utils/admin/generatePsswrd";
import { generateDocId } from "../../utils/admin/generateId";
import { formValidation } from "../../utils/admin/AddDoctorFormVldtn";

const AddDctr = () => {

    const [treatmentData, setTreatmentData] = useState([]);
    const [selectedTreatment, setSelectedTreatment] = useState({});
    const [selectedSubTreatment, setSelectedSubTreatment] = useState('');
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState('')

    const navigate = useNavigate()

    //get the values from the form
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mob: '',
        password: '',
        address: '',
        experience: '',
        doctor_id: '',
        treatment: '',
        subTreatment: '',
        amount:''
    });

    // fetching the data to fill select fields 
    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log('rrrrr');
                const response = await treatments();
                console.log('trtmnt for add doc--', response.data);
                const trtmnt = response?.data?.filter((item)=>item?.status)
                setTreatmentData(trtmnt);
            } catch (error) {
                console.error('Error fetching treatment data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    //password generation
    const handlePassword = async () => {
        const generatedPassword = await generatePassword()
        if (generatePassword) {
            setFormData({ ...formData, password: generatedPassword })
            console.log('psswrd-----', formData);
        }
    }

    //generate random id
    const handleDocId = async () => {
        const docId = await generateDocId()
        if (docId) {
            setFormData({ ...formData, doctor_id: docId })
        }
    }

    const handleTreatmentChange = (event) => {
        const selectedTreatmentId = event.target.value;
        const selectedTreatment = treatmentData.find((treatment) => treatment._id === selectedTreatmentId);

        setSelectedTreatment(selectedTreatment);
        setSelectedSubTreatment(''); // Reset selected sub-treatment when treatment changes

        // Update form data
        setFormData((prevFormData) => ({
            ...prevFormData,
            treatment: selectedTreatmentId,
            subTreatment: '', // Reset sub-treatment when treatment changes
        }));
    };


    const handleSubTreatmentChange = (event) => {
        const selectedSubTreatment = event.target.value;
        console.log('slctd sbTrtmnt-->',selectedSubTreatment);
        // Update selected sub-treatment
        setSelectedSubTreatment(selectedSubTreatment);

        // Update form data
        setFormData((prevFormData) => ({
            ...prevFormData,
            subTreatment: selectedSubTreatment,
        }));
    };

    // form submition
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate form data
        console.log('form data to send for vldtn----', formData);
        const validationErrors = formValidation(formData)

        if (Object.keys(validationErrors).length > 0) {
            // If there are errors, set them and do not proceed with form submission
            console.log('Errors--', validationErrors);
            setErrors(validationErrors);
        } else {
            // If there are no errors, proceed with form submission
            const sendData = async (formData) => {
                try {
                    const res = await addDoctor(formData);
                    console.log('result of adding doc---', res.data);
                    if (res.data.message === 'mail send to doctor ,added new doctor') {
                        toast.success('Added a doctor');
                        navigate('/admin/doctors');
                    } else if (res.data === 'doctor exists') {
                        toast.error(res.data)
                    }
                } catch (err) {
                    console.log(err.message);
                }
            };
            sendData(formData);
        }


    };

    // get data to the formData 
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        console.log('formData---', formData);
    };
    return (
        <>
            <div className="flex justify-center mb-8 ">
                <div className=" w-1/2 mt-8 p-10 rounded-md shadow-2xl bg-[#E7EE9D]">
                    <div className="flex justify-center mb-5 mt-5">
                        <h2 className="text-2xl font-semibold mb-4">Add Doctor</h2>
                    </div>

                    <form onSubmit={handleSubmit}>
                        {/* Add your form fields here */}

                        <div className="flex flex-row  gap-5  justify-around">
                            <div className="  w-1/2">
                                {errors && <p className="text-red-500 text-sm mb-2">{errors.name}</p>}
                                <div className="mb-4">
                                    <label htmlFor="name" className="block text-gray-600 text-sm font-medium mb-2">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        onChange={handleChange}
                                        className="border rounded-md p-2 w-full"
                                    />
                                </div>
                                {errors && <p className="text-red-500 text-sm mb-2">{errors.email}</p>}

                                <div className="mb-4">
                                    <label htmlFor="name" className="block text-gray-600 text-sm font-medium mb-2">
                                        Email
                                    </label>
                                    <input
                                        type="text"
                                        id="email"
                                        name="email"
                                        onChange={handleChange}
                                        className="border  rounded-md p-2 w-full"
                                    />
                                </div>
                                {errors && <p className="text-red-500 text-sm mb-2">{errors.mob}</p>}

                                <div className="mb-4">
                                    <label htmlFor="name" className="block text-gray-600 text-sm font-medium mb-2">
                                        Mob
                                    </label>
                                    <input
                                        type="number"
                                        id="mob"
                                        name="mob"
                                        onChange={handleChange}
                                        className="border  rounded-md p-2 w-full"
                                    />
                                </div>
                                {errors && <p className="text-red-500 text-sm mb-2">{errors.amount}</p>}

                                <div className="mb-4">
                                    <label htmlFor="name" className="block text-gray-600 text-sm font-medium mb-2">
                                        Amount
                                    </label>
                                    <input
                                        type="number"
                                        id="amount"
                                        name="amount"
                                        onChange={handleChange}
                                        className="border  rounded-md p-2 w-full"
                                    />
                                </div>

                                {errors && <p className="text-red-500 text-sm mb-2">{errors.password}</p>}

                                <div className="mb-4">
                                    <label htmlFor="name" className="block text-gray-600 text-sm font-medium mb-2">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        onChange={handleChange}
                                        value={formData.password}
                                        className="border  rounded-md p-2 w-full"
                                    />
                                </div>
                                <div className="mb-4 flex justify-center">
                                    <button className="  p-2 rounded-md text-indigo-500 text-sm  "
                                        onClick={handlePassword}
                                    >create password</button>
                                </div>


                            </div>

                            <div className=" w-1/2">
                                {errors && <p className="text-red-500 text-sm mb-2">{errors.address}</p>}

                                <div className="mb-4">
                                    <label htmlFor="name" className="block text-gray-600 text-sm font-medium mb-2">
                                        Address
                                    </label>
                                    <textarea
                                        type="text"
                                        id="address"
                                        name="address"
                                        onChange={handleChange}
                                        className="border  rounded-md p-2 w-full"
                                    />
                                </div>

                                {errors && <p className="text-red-500 text-sm mb-2">{errors.experience}</p>}

                                <div className="mb-4">
                                    <label htmlFor="name" className="block text-gray-600 text-sm font-medium mb-2">
                                        Experience
                                    </label>
                                    <input
                                        type="text"
                                        id="experience"
                                        name="experience"
                                        onChange={handleChange}
                                        className="border  rounded-md p-2 w-full"
                                    />
                                </div>

                                {errors && <p className="text-red-500 text-sm mb-2">{errors.doctor_id}</p>}

                                <div className="mb-4">
                                    <label htmlFor="name" className="block text-gray-600 text-sm font-medium mb-2">
                                        Doctors Id
                                    </label>
                                    <input
                                        type="text"
                                        id="doctor_id"
                                        name="doctor_id"
                                        value={formData.doctor_id}
                                        onChange={handleChange}
                                        className="border  rounded-md p-2 w-full"
                                    />
                                </div>
                                <div className="mb-4 flex justify-center">
                                    <button className="  p-2 rounded-md text-indigo-500 text-sm  "
                                        onClick={handleDocId}
                                    >generate ID</button>
                                </div>


                                <div>
                                    {loading ? (
                                        <p>Loading...</p>
                                    ) : (
                                        <>
                                            {errors && <p className="text-red-500 text-sm mb-2">{errors.treatment}</p>}

                                            <div className="mb-4">
                                                <label htmlFor="treatments" className="block text-gray-600 text-sm font-medium mb-2">
                                                    Treatment
                                                </label>
                                                <select
                                                    id="treatments"
                                                    name="treatment"
                                                    value={selectedTreatment?._id || ''}
                                                    onChange={handleTreatmentChange}
                                                    className="border rounded-md p-2 w-full"
                                                >
                                                    <option value="">Select Treatment</option>
                                                    {treatmentData.map((treatment) => (
                                                        <option key={treatment?._id} value={treatment?._id}>
                                                            {treatment?.name}
                                                        </option>
                                                    ))}
                                                </select>

                                            </div>
                                            {errors && <p className="text-red-500 text-sm mb-2">{errors.subTreatment}</p>}

                                            <div className="mb-4">
                                                <label htmlFor="subTreatments" className="block text-gray-600 text-sm font-medium mb-2">
                                                    Sub Treatment
                                                </label>
                                                <select
                                                    id="subTreatments"
                                                    name="subTreatment"
                                                    value={selectedSubTreatment}
                                                    onChange={handleSubTreatmentChange}
                                                    className="border rounded-md p-2 w-full"
                                                >
                                                    <option value="">Select Sub Treatment</option>
                                                    {selectedTreatment?.subTreatments ? (
                                                        selectedTreatment?.subTreatments
                                                            .filter((subTreatment) => subTreatment?.status === true)
                                                            .map((filteredSubTreatment) => (
                                                                <option key={filteredSubTreatment?._id} value={filteredSubTreatment?._id}>
                                                                    {filteredSubTreatment?.name}
                                                                </option>
                                                            ))
                                                    ) : (
                                                        <option value="">Select Treatment First</option>
                                                    )}
                                                </select>

                                            </div>
                                        </>
                                    )}
                                </div>

                            </div>
                        </div>


                        <div className="mt-4">
                            <button
                                type="submit"
                                className="bg-[#CEB047] text-white py-2 px-4 rounded-md hover:bg-[#dfc258]"
                            >
                                Add Doctor
                            </button>
                        </div>
                    </form>
                </div >
            </div >
        </>
    )
}

export default AddDctr