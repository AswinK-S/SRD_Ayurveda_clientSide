import { useEffect, useState } from 'react';
import { treatments } from '../../../api/userApi';
import { Link } from 'react-router-dom';

const TreatmentCard = () => {
  const [treatmentData, setTreatmentData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTreatmentData = async () => {
      try {
        const response = await treatments();
        setTreatmentData(response.data);
      } catch (error) {
        console.error('Error fetching treatment data:', error);
        setError('Error fetching treatment data');
      } finally {
        setLoading(false);
      }
    };

    fetchTreatmentData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>

      <div className='w-full   gap-10  flex flex-wrap   flex-row justify-center my-10'>
        {treatmentData.map((treatment) => (
          
          <div key={treatment.id} className="relative flex flex-col my-6 text-gray-700 bg-gradient-to-r from-lime-300 via-lime-100 to-lime-300 shadow-md shadow-black bg-clip-border rounded-xl sm:w-full md:w-1/2 lg:w-1/3 xl:w-1/4 hover:scale-105 duration-1000 ">
            <div className="relative h-56 mx-4 -mt-6 overflow-hidden text-white shadow-lg bg-clip-border rounded-xl ">
              <img
                src="/hmImg2.jpg"
                alt="card-image"
                className="object-cover w-full h-full"
              />
            </div>

            <div className="p-6  ">
            <div className='border flex justify-center '>
            <h5 className="block mb-5 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                {treatment.name}
              </h5>
              <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
                {treatment.description}
              </p>
            </div>
              {treatment.subTreatments && treatment.subTreatments.length > 0 && (
                
                <div className="mt-4 border  ">
                  <h6 className="font-bold">Sub-Treatments:</h6>
                  <ul className="list-disc ml-4">
                    {treatment.subTreatments.map((subTreatment) => (
                      <li key={subTreatment.id}>{subTreatment.name}</li>
                    ))}
                  </ul>
                </div>

              )}
            </div>

          </div>
        ))}
      </div>

    </>

  );
};

export default TreatmentCard;






