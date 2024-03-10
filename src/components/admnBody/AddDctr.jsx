import { useEffect, useState } from "react"
import { addDoctor, treatments } from "../../api/adminApi"
import { toast } from 'react-toastify'
import { useNavigate } from "react-router-dom";

const AddDctr = () => {

    const [treatmentData, setTreatmentData] = useState([]);
    const [selectedTreatment, setSelectedTreatment] = useState({});
    const [selectedSubTreatment, setSelectedSubTreatment] = useState('');
    const [loading, setLoading] = useState(true);

    const navigate= useNavigate()
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mob: '',
        password: '',
        confirm_password: '',
        address: '',
        experience: '',
        doctor_id: '',
        treatment: '',
        subTreatment: ''
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log('rrrrr');
                const response = await treatments();
                console.log('trtmnt for add doc--', response.data);
                setTreatmentData(response.data);
            } catch (error) {
                console.error('Error fetching treatment data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

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

        // Update selected sub-treatment
        setSelectedSubTreatment(selectedSubTreatment);

        // Update form data
        setFormData((prevFormData) => ({
            ...prevFormData,
            subTreatment: selectedSubTreatment,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate form data
        const { name, email, mob, password, confirm_password, address, experience, doctor_id, treatment, subTreatment } = formData;

        if (!name || !email || !mob || !password || !confirm_password || !address || !experience || !doctor_id || !treatment || !subTreatment) {
            console.error('Please fill in all the fields.');
            toast.error('Please fill in all the fields.')
            return;
        }

        const mobRegex = /^\d+$/;
        if (!mobRegex.test(mob) || mob.length !== 10) {
            console.error('Mobile number should have exactly 10 digits.');
            toast.error('Mobile number should have exactly 10 digits.')
            return;
        }

        if (password !== confirm_password) {
            console.error('Password and Confirm Password do not match.');
            toast.error('Password and Confirm Password do not match.')
            return;
        }

        try {
            console.log('formdata to send --', formData);

            // Add your logic for submitting the form data to the server here
            const res = await addDoctor(formData);
            if(res?.data?.message ==='added new doctor'){
                toast.success('added new doctor')
                navigate('/admin/doctors')
            }
            console.log('ddddd---', res.data.message);

        } catch (error) {
            console.log(error.message);
        }
    };

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

                                <div className="mb-4">
                                    <label htmlFor="name" className="block text-gray-600 text-sm font-medium mb-2">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        onChange={handleChange}
                                        className="border  rounded-md p-2 w-full"
                                    />
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="name" className="block text-gray-600 text-sm font-medium mb-2">
                                        Confirm Password
                                    </label>
                                    <input
                                        type="password"
                                        id="confirm_password"
                                        name="confirm_password"
                                        onChange={handleChange}
                                        className="border  rounded-md p-2 w-full"
                                    />
                                </div>
                            </div>

                            <div className=" w-1/2">
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

                                <div className="mb-4">
                                    <label htmlFor="name" className="block text-gray-600 text-sm font-medium mb-2">
                                        Doctors Id
                                    </label>
                                    <input
                                        type="text"
                                        id="doctor_id"
                                        name="doctor_id"
                                        onChange={handleChange}
                                        className="border  rounded-md p-2 w-full"
                                    />
                                </div>

                                <div>
                                    {loading ? (
                                        <p>Loading...</p>
                                    ) : (
                                        <>
                                            <div className="mb-4">
                                                <label htmlFor="treatments" className="block text-gray-600 text-sm font-medium mb-2">
                                                    Treatment
                                                </label>
                                                <select
                                                    id="treatments"
                                                    name="treatment"
                                                    value={selectedTreatment._id || ''}
                                                    onChange={handleTreatmentChange}
                                                    className="border rounded-md p-2 w-full"
                                                >
                                                    {treatmentData.map((treatment) => (
                                                        <option key={treatment._id} value={treatment._id}>
                                                            {treatment.name}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>

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
                                                    {selectedTreatment.subTreatments ? (
                                                        selectedTreatment.subTreatments
                                                            .filter((subTreatment) => subTreatment.status === true)
                                                            .map((filteredSubTreatment) => (
                                                                <option key={filteredSubTreatment.name} value={filteredSubTreatment.name}>
                                                                    {filteredSubTreatment.name}
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