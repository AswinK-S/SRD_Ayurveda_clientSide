
import PropTypes from 'prop-types';
import { useState } from 'react';
import { confirmConsultation } from '../../api/doctorApi';
import PrescriptionModal from '../doctor/PrescriptionModal';

const CustomTable = ({ data, tableHeadings, dataKeys, doctor, setData }) => {
  const [modalOpen, setModalOpen] = useState(false)
  const [modalContent, setModalContent] = useState('')
  const [id, setId] = useState('')
  const [pModal,setPmodal] =useState(false)
  const [uEmail,setUemail] = useState('')

  const handleModalOpen = (status, bId) => {
    let content = '';
    switch (status) {
      case 'Pending':
        content = 'Do you want to complete consultation?';
        break;
      case 'Consulted':
        content = 'Consulted';
        break;
      case 'Cancelled':
        content = 'Booking cancelled by the user.';
        break;
      default:
        content = '';
    }
    setModalContent(content);
    setId(bId)
    setModalOpen(true);
  };

const handlePmodal =(email)=>{
  setPmodal(true)
  setUemail(email)
}


  const handleConsultaion = async () => {
    const doc = JSON.parse(doctor)
    const docId = doc?._id
    try {
      const result = await confirmConsultation(docId, id)
      if (result) {
        const updatedData = data.map((item) => {
          if (item?.bookingId === id) {
            return { ...item, status: result?.status }
          }
          return item;

        })
        setData(updatedData)
        setModalOpen(false)
      }
    } catch (error) {
      console.log(error.message);
    }
  }


  return (
    <div className="overflow-x-auto ">
      <table className="shadow-md shadow-black w-full md:max-w-5xl sm:max-w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {tableHeadings?.map((heading, index) => (
              <th key={index} scope="col" className="px-6 py-3">
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data?.length ? (
            data?.map((item, index) => (
              <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                {dataKeys.map((key, colIndex) => (
                  <td key={colIndex} className="px-6 py-4">
                    {key === 'status' ? (
                      <button
                        className={`px-3 py-1 rounded ${item[key] === 'Consulted' ? 'bg-green-500' : item[key] === 'Pending' ? 'bg-orange-500' : 'bg-red-500'
                          } text-white`}
                        onClick={() => handleModalOpen(item[key], item['bookingId'])}
                      >
                        {item[key]}
                      </button>
                    ):key ==='btn'?(
                      <button className='px-3 py-1 rounded bg-blue-500 text-white' onClick={()=>handlePmodal(item?.email)}>
                        Add Prescription
                      </button>
                    ) : (
                      item[key]
                    )}
                  </td>

                ))}
              </tr>

            ))
          ) :(
          <tr>
            <td colSpan={tableHeadings.length}>
              <div className="flex flex-col items-center justify-center bg-white h-96 ">
                <img className='h-full' src="/noData.jpg" alt="" />
              </div>
            </td>
          </tr>
          )}
        </tbody>
      </table>

      {
        modalOpen && (
          <div className="fixed  inset-0 z-10 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-[#E7EE9D] p-6 rounded-md w-1/3 flex flex-col justify-center items-center">
              <div className='flex justify-center items-center'>
                <h1 className='text-lg font-bold'>consultaion</h1>
              </div>
              <p className='text-gray-700'>{modalContent}</p>

              {modalContent === 'Do you want to complete consultation?' ? (<div className="mt-4 flex justify-center">
                <button className="mr-2 px-4 py-2 bg-green-500 text-white rounded-md" onClick={() => handleConsultaion()}>
                  Confirm
                </button>
                <button className="px-4 py-2 bg-red-500 text-white rounded-md" onClick={() => setModalOpen(false)}>
                  Cancel
                </button>
              </div>) : modalContent === 'Consulted' ? (
                <button className=" mt-2 px-4 py-2 bg-red-500 text-white rounded-md" onClick={() => setModalOpen(false)}>
                  Cancel
                </button>
              ) : modalContent === "Booking cancelled by the user." ? (
                <button className=" mt-2 px-4 py-2 bg-red-500 text-white rounded-md" onClick={() => setModalOpen(false)}>
                  Cancel
                </button>
              ) : <></>}

            </div>
          </div>

        )
      }

    {pModal&&<PrescriptionModal setPmodal={setPmodal} uEmail={uEmail}/>}

    </div>
  );
};

CustomTable.propTypes = {
  data: PropTypes.array.isRequired,
  tableHeadings: PropTypes.array.isRequired,
  dataKeys: PropTypes.array.isRequired,
  doctor: PropTypes.string.isRequired,
  setData: PropTypes.array.isRequired
};

export default CustomTable;
