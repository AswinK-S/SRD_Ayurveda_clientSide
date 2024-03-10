import  { useState } from 'react';
import { addTreatments } from '../../api/adminApi';
import { useNavigate } from 'react-router-dom';

const AddTreatments = () => {
  const [treatmentName, setTreatmentName] = useState(null);
  const [subTreatments, setSubTreatments] = useState(['']);

  const navigate = useNavigate()
  const handleTreatmentNameChange = (e) => {
    setTreatmentName(e.target.value);
  };

  const handleSubTreatmentChange = (index, value) => {
    const newSubTreatments = [...subTreatments];
    newSubTreatments[index] = value;
    setSubTreatments(newSubTreatments);
  };

  const handleAddSubTreatment = () => {
    if (treatmentName.trim() !== '' && subTreatments.every(subTreatment => subTreatment.trim() !== '')) {
      setSubTreatments([...subTreatments, '']);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (treatmentName.trim() !== '' && subTreatments.every(subTreatment => subTreatment.trim() !== '')) {
      const newTreatmentData = {
        name: treatmentName,
        subTreatments: subTreatments.map(subTreatment => ({ name: subTreatment })),
      };
  
      console.log('New Treatment Data:', newTreatmentData);
      const sendData = async(newTreatmentData)=>{
        try {
          const res = await addTreatments(newTreatmentData)
          console.log('data added--',res);
          if(res){
            navigate('/admin/treatments')
          }
        } catch (error) {
          console.log(error.message);
        }
      }
      sendData(newTreatmentData)
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
