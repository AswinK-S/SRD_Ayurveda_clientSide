import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getDataForOverview } from "../../api/doctorApi";

const OverViewComponent = () => {

  const [patients, setPatients] = useState({})

  const doctorData = useSelector((state) => state.doctor.doctor)
  const doctor = JSON.parse(doctorData)

  const fetch = useCallback(async () => {
    const result = await getDataForOverview(doctor?._id);
    console.log('doctor id',doctor?._id);
    setPatients(result);
  }, [doctor]);

  useEffect(() => {
    fetch()
  }, [])

  return (
    <>
      <div className=" flex justify-center">
        <div className="bg-[#d3dd64] m-5 flex flex-row justify-center   rounded-lg shadow-md shadow-black p-2 md:w-1/2    md:overflow-x-auto">
          <h1>Overview</h1>
        </div>
      </div>

      <div className="flex flex-wrap  gap-5 p-2 items-center justify-center ">

        {/* Card for Total Patients */}
        <div className=" w-full md:w-1/3 p-4 bg-gradient-to-r from-lime-300 via-lime-100 to-lime-300 shadow-md shadow-black  rounded-lg">
          <div className="flex flex-col items-center ">
            <div className="text-xl font-semibold text-blue-800">Total Patients</div>
            <div className="text-2xl font-bold">{patients?.total}</div>
            <div className="mt-4 text-gray-600">Total number of patients</div>
          </div>
        </div>

        {/* Card for Confirmed Patients */}
        <div className=" w-full md:w-1/3 p-4 bg-gradient-to-r from-lime-300 via-lime-100 to-lime-300 shadow-md shadow-black  rounded-lg mt-4 md:mt-0">
          <div className="flex flex-col items-center">
            <div className="text-xl font-semibold text-green-800">Consulted Patients</div>
            <div className="text-2xl font-bold">{patients?.consulted}</div>
            <div className="mt-4 text-gray-600">Number of consulted patients</div>
          </div>
        </div>

        {/* Card for pending Patients */}
        <div className=" w-full md:w-1/3 p-4 bg-gradient-to-r from-lime-300 via-lime-100 to-lime-300 shadow-md shadow-black  rounded-lg mt-4 md:mt-0">
          <div className="flex flex-col items-center">
            <div className="text-xl font-semibold text-orange-800">Pending Patients</div>
            <div className="text-2xl font-bold">{patients?.pending}</div>
            <div className="mt-4 text-gray-600">Number of pending patients</div>
          </div>
        </div>

        {/* Card for Cancelled Patients */}
        <div className=" w-full md:w-1/3 p-4 bg-gradient-to-r from-lime-300 via-lime-100 to-lime-300 shadow-md shadow-black  rounded-lg mt-4 md:mt-0">
          <div className="flex flex-col items-center">
            <div className="text-xl font-semibold text-red-800">Cancelled Patients</div>
            <div className="text-2xl font-bold">{patients?.cancelled}</div>
            <div className="mt-4 text-gray-600">Booking cancelled by the user</div>
          </div>
        </div>
      </div>
    </>
  );
};



export default OverViewComponent