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

          <div key={treatment.id} className="relative flex flex-col my-6 border border-white bg-gradient-to-r from-lime-200 via-lime-100 to-lime-300 shadow-md shadow-black bg-clip-border rounded-xl sm:w-full md:w-1/2 lg:w-1/3 xl:w-1/4 hover:scale-105 duration-1000 ">
            <div className="relative h-56 mx-4 -mt-6 overflow-hidden text-white shadow-lg bg-clip-border rounded-xl ">
              <img
                src="/hmImg2.jpg"
                alt="card-image"
                className="object-cover border border-white w-full h-full"
              />
            </div>

            <div className="p-6  flex flex-col items-center">
              <div className=' flex justify-center '>
                <h5 className="block  font-serif text-xl uppercase antialiased font-extrabold text-black">
                  {treatment.name}
                </h5>
                <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
                  {treatment.description}
                </p>
              </div>

              {treatment.subTreatments && treatment.subTreatments.length > 0 && (

                <div className="mt-4   ">
                  <h6 className="font-bold font-serif text-blue-gray-700">Sub-Treatments:</h6>
                  <ul className="list-decimal flex flex-col items-center ml-4">
                    {treatment.subTreatments.map((subTreatment) => (
                      <li className='uppercase font-semibold font-serif' key={subTreatment.id}>{subTreatment.name}</li>
                    ))}
                  </ul>
                </div>

              )}

             <Link to={`/treatment/${treatment._id}`}> <button className='p-2 my-3 bg-lime-900 text-white rounded-md hover:bg-lime-800 shadow-md shadow-black'>Book Now</button>
             </Link>
            </div>


          </div>
        ))}
      </div>

    </>

  );
};

export default TreatmentCard;






