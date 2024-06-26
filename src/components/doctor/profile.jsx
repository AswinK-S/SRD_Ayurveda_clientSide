import { useState } from "react";
import { postDetails } from "../../api/doctorApi";
import { formValidation } from "../../utils/doctor/prfile";
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const Profile = () => {

  const [errors, setErrors] = useState('')
  const [modifiedData, setModifiedData] = useState('')
  const [noUpdate, setNoUpdate] = useState('')

  const doctor = useSelector((state) => state.doctor.doctor)
  const navigate = useNavigate()

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setModifiedData((prevModifiedData) => ({
      ...prevModifiedData,
      [name]: value,
    }))

  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Handle form submission logic
      const token = localStorage.getItem('doctortoken')
      if (token) {

        const decode = jwtDecode(token)
        if (decode.role === 'doctor') {

          const id = decode.id
          const modifiedFieldsKeys = Object.keys(modifiedData);

          if (modifiedFieldsKeys.length > 0) {
            const formValidateErrors = formValidation(modifiedData);

            if (Object.keys(formValidateErrors).length > 0) {
              setErrors(formValidateErrors);
            } else {
              setErrors('');
              await postDetails(modifiedData, id);

              // Reset modifiedFields after successful update
              setModifiedData({});
            }
          } else {
            setNoUpdate('No fields were modified.')
          }

        } else {

          navigate('/doctor')
        }
      } else {
        navigate('/doctor')
      }



    } catch (error) {
      console.log(error.message)
    }

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
            value={doctor?.name}
            onChange={handleInputChange}
            className="border border-gray-400 rounded-md p-2 w-full"
          />

        </div>
        {errors && <p className="text-red-500 text-sm mb-2">{errors.name}</p>}

        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-900 mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={doctor?.email}
            disabled
            onChange={handleInputChange}
            className="border border-gray-400 rounded-md p-2 w-full  bg-gray-200"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="mobile" className="block text-gray-900  mb-2">
            Mobile
          </label>
          <input
            type="tel"
            id="mob"
            name="mob"
            value={doctor?.mob}
            onChange={handleInputChange}
            className="border border-gray-400 rounded-md p-2 w-full"
          />
        </div>
        {errors && <p className="text-red-500 text-sm mb-2">{errors.mob}</p>}

        <div className="mb-4">
          <label htmlFor="address" className="block text-gray-900  mb-2">
            Address
          </label>
          <textarea
            id="address"
            name="address"
            value={doctor?.address}
            onChange={handleInputChange}
            className="border border-gray-400 rounded-md p-2 w-full"
          ></textarea>
        </div>
        {errors && <p className="text-red-500 text-sm mb-2">{errors.address}</p>}

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
            value={doctor?.experience}
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
            value={doctor?.doctor_id}
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
            value={doctor?.treatment}
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
            value={doctor?.subTreatment}
            disabled
            className="border border-gray-400 rounded-md p-2 w-full bg-gray-200"
          />
        </div>
        {noUpdate && <p className="text-blue-800 text-sm mb-2">{noUpdate}</p>}

        <div className="flex justify-end">
          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-[#BEC944] hover:bg-[#d5e887] text-black font-bold py-2 px-4 rounded shadow-md shadow-gray-800 antialiased "
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  )
}

export default Profile


