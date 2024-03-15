import { useState } from "react";

const Profile = () => {

    const [formData, setFormData] = useState({
        image: null,
        email: '',
        mobile: '',
        password: '',
        address: '',
        experience: '', // Not editable
        doctorId: '', // Not editable
        treatment: '', // Not editable
        subTreatment: '', // Not editable
        document: null,
      });
    
      const handleInputChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'image' || name === 'document') {
          setFormData({ ...formData, [name]: files[0] });
        } else {
          setFormData({ ...formData, [name]: value });
        }
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic
        console.log(formData);
      };

  return (
    <div className="flex flex-col md:flex-row bg-gradient-to-r from-lime-300 via-lime-100 to-lime-300 shadow-md shadow-gray-800 antialiased rounded-md p-3">
      <div className="md:w-1/2 p-4">
        <h2 className="text-lg font-bold mb-4">Personal Information</h2>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-900  mb-2">
            Name
          </label>
          <input
            type="name"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="border border-gray-400 rounded-md p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-900 mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="border border-gray-400 rounded-md p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="mobile" className="block text-gray-900  mb-2">
            Mobile
          </label>
          <input
            type="tel"
            id="mobile"
            name="mobile"
            value={formData.mobile}
            onChange={handleInputChange}
            className="border border-gray-400 rounded-md p-2 w-full"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="address" className="block text-gray-900  mb-2">
            Address
          </label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            className="border border-gray-400 rounded-md p-2 w-full"
          ></textarea>
        </div>
       
      </div>
      <div className="md:w-1/2 p-4">
        <h2 className="text-lg font-bold mb-4">Additional Information</h2>
        
        <div className="mb-4">
          <label htmlFor="experience" className="block text-gray-900  mb-2">
            Experience
          </label>
          <input
            type="text"
            id="experience"
            name="experience"
            value={formData.experience}
            disabled
            className="border border-gray-400 rounded-md p-2 w-full bg-gray-200"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="doctorId" className="block text-gray-900  mb-2">
            Doctor ID
          </label>
          <input
            type="text"
            id="doctorId"
            name="doctorId"
            value={formData.doctorId}
            disabled
            className="border border-gray-400 rounded-md p-2 w-full bg-gray-200"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="treatment" className="block text-gray-900  mb-2">
            Treatment
          </label>
          <input
            type="text"
            id="treatment"
            name="treatment"
            value={formData.treatment}
            disabled
            className="border border-gray-400 rounded-md p-2 w-full bg-gray-200"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="subTreatment" className="block text-gray-900  mb-2">
            Sub Treatment
          </label>
          <input
            type="text"
            id="subTreatment"
            name="subTreatment"
            value={formData.subTreatment}
            disabled
            className="border border-gray-400 rounded-md p-2 w-full bg-gray-200"
          />
        </div>
        
        <div className="flex justify-end">
          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-[#BEC944] hover:bg-[#e8df87] text-black font-bold py-2 px-4 rounded shadow-md shadow-gray-800 antialiased "
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  )
}

export default Profile


