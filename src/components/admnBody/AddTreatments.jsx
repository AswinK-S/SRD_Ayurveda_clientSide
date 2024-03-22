import { useState } from 'react';
import { addTreatments } from '../../api/adminApi';
import { useNavigate } from 'react-router-dom';

const AddTreatments = () => {
  const [treatmentName, setTreatmentName] = useState(null);
  const [subTreatments, setSubTreatments] = useState(['']);
  const [errorMessage, setErrorMessage] = useState('')

  const navigate = useNavigate()

  const handleTreatmentNameChange = (e) => {
    setTreatmentName(e.target.value);

  };

  //adding subTreatments and checking if there is any duplicate values 
  const handleSubTreatmentChange = (index, value) => {
    const newSubTreatments = [...subTreatments];
    const isDuplicate = newSubTreatments.some((subTreatment, i) => i !== index && subTreatment === value);

    if (isDuplicate) {
      setErrorMessage('Same data exists');
      return; // Exit the function if a duplicate is found
    } else {
      setErrorMessage('')
    }
    console.log('nw subTrtmnts:----', newSubTreatments);
    newSubTreatments[index] = value;
    if (subTreatments.length <= 5) setSubTreatments(newSubTreatments);

  };

  //limiting the length of subtreatments and prevent add empty fields
  const handleAddSubTreatment = () => {
    console.log('sub trtmnts---------- :', subTreatments);
    if (subTreatments.length == 5) {
      console.log('subT lngth----', subTreatments.length);
      setErrorMessage('SubTreatments limit is only five')
    }

    // show error message when we enter an empty treatment 
    const subtrtmnt = subTreatments.some((element) => element.trim() == '')
    console.log('ssss---', subtrtmnt);
    if (subtrtmnt) setErrorMessage('fields should not be empty')

    if (treatmentName.trim() !== '' && subTreatments.every(subTreatment => subTreatment.trim() !== '') && subTreatments.length <= 5) {
      setSubTreatments([...subTreatments, '']);
    }
  };


  const handleSubmit = (e) => {

    e.preventDefault();

    if (treatmentName.trim() !== '' && subTreatments.every(subTreatment => subTreatment.trim() !== '')) {
      const newTreatmentData = {
        name: treatmentName,
        subTreatments: subTreatments.map(subTreatment => ({ name: subTreatment })),
      }

      console.log('New Treatment Data:', newTreatmentData);
      const sendData = async (newTreatmentData) => {
        try {
          const res = await addTreatments(newTreatmentData)
          console.log('data added--', res);
          if (res) {
            navigate('/admin/treatments')
          }
        } catch (error) {
          console.log(error.message);
        }
      }
      sendData(newTreatmentData)
    } else {
      setSubTreatments([''])
      setErrorMessage('')
    }
  };


  return (
    <div>
      <div className="flex justify-center mb-8 ">
        <div className="w-1/2 mt-8 p-10 rounded-md shadow-2xl bg-[#E7EE9D]">
          <div className="flex justify-center mb-5 mt-5">
            <h2 className="text-2xl font-semibold mb-4">Add Treatment</h2>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="flex flex-row gap-5 justify-around">
              <div className="w-1/2">
                <div className="mb-4">
                  <label htmlFor="name" className="block text-gray-600 text-sm font-medium mb-2">
                    Treatment Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={treatmentName}
                    onChange={handleTreatmentNameChange}
                    className="border rounded-md p-2 w-full"
                  />
                </div>
                {errorMessage && <p className='text-red-500 text-sm'> {errorMessage}</p>}

                {subTreatments.map((subTreatment, index) => (

                  <div className="mb-4" key={index}>
                    <label htmlFor={`subTreatment${index}`} className="block text-gray-600 text-sm font-medium mb-2">
                      Add SubTreatments
                    </label>
                    <div className="flex">
                      <input
                        type="text"
                        id={`subTreatment${index}`}
                        name={`subTreatment${index}`}
                        value={subTreatment}
                        onChange={(e) => handleSubTreatmentChange(index, e.target.value)}
                        className="border rounded-md p-2 w-full"
                      />
                      {index === subTreatments.length - 1 && (
                        <button type="button" onClick={handleAddSubTreatment} className="ml-2">
                          +
                        </button>
                      )}

                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4">
              <button
                type="submit"
                className="bg-[#CEB047] text-white py-2 px-4 rounded-md hover:bg-[#dfc258]"
              >
                Add Treatment
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTreatments;
