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


<div className='w-full flex flex-col gap-y-10 p-9 justify-center items-center '>
  {treatmentData.map((treatment) => (
    <div key={treatment._id} className='w-[80%] h-44 p-2 hover:translate-y-5  relative'>
      <img src="/footer-bg.jpg" alt="" className='object-cover w-full h-full absolute' />
      <Link to={`/treatment/${treatment._id}`}>
          <div className='flex justify-center flex-col items-center w-full h-full absolute top-0 left-0'>
            <h1 className="py-2 px-4 text-center font-semibold tracking-widest text-xl">{treatment.name}</h1>
            <div className=" flex w-full justify-center ">
              {treatment.subTreatments && treatment.subTreatments.length > 0 ? (
                <div className="list-disc p-4 flex justify-evenly text-sm">
                  {treatment.subTreatments.map((subTreatment) => (
                    <li key={subTreatment._id} className="mb-1">{subTreatment.name}</li>
                  ))}
                </div>
              ) : (
                <span className="italic text-gray-500">No sub-treatments</span>
              )}
            </div>
          </div>
      </Link>
    </div>
  ))}
</div>



        </>

    );
};

export default TreatmentCard;
