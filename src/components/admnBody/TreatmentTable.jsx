import { Card, Typography } from "@material-tailwind/react";
import styles from '../../tailwind.module.css';
import { useEffect, useState } from "react";
import { treatments, trtMntStatus } from "../../api/adminApi";
import { AddTBtn } from "./AddBtn";
import ConfirmationModals from "../modals/confirmationModals";
import TrtmntEdtModal from "../modals/TrtmntEdtModal";
import TreatmentModal from "../modals/TreatmentModal";

const TABLE_HEAD = ["Main Treatment", "Action", "Status", "Sub Treatments", "Action"];

const TreatmentTable = () => {

  //state variable to show on table
  const [treatmentData, setTreatmentData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('')   //state variable to get the serch value
  const [currentPage, setCurrentPage] = useState(1)   //state variable to get the pagination details
  const [itemsPerPage] = useState(3)

  //state variables for modal and to get id
  const [showModal, setShowModal] = useState(false)

  //subtreatment modal
  const [trtmntModal, setTrtmntModal] = useState(false)
  const [id, setId] = useState('')
  const [editTrtmntId, setEditTrtmntId] = useState('')

  //treatment modal
  const [treatmentModal, setTreatmentModal] = useState(false)


  // get the treatments when the page is loaded
  useEffect(() => {
    const getTreatments = async () => {
      try {
        const res = await treatments();
        setTreatmentData(res.data);
        paginationData()
      } catch (error) {
        console.error('Error fetching treatments:', error);
      }
    };

    getTreatments();
  }, [showModal, trtmntModal,treatmentModal]);

  //get the search data
  const handleSearch = (event) => {
    setSearchTerm(event.target.value)
  }

  const filteredTreatments = treatmentData.filter((item) => {
    const trtmntName = `${item.name}`.toLowerCase()
    const searchT = `${searchTerm}`.toLowerCase()

    return (trtmntName.includes(searchT))
  })


  //get pagination data
  const paginationData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return filteredTreatments.slice(startIndex, endIndex)
  }

  const totalPages = Math.ceil(treatmentData.length / itemsPerPage)

  // subTreatment edit status modal confirmation 
  const modalConfirmation = async (editId) => {
    setId(editId)
    setShowModal(true)
  }

  //treatment edit modal
  const editTrtmntModalConfirmation = async (id) => {
    setEditTrtmntId(id)
    setTreatmentModal(true)
  }

  //subTreatment edit modal
  const editTrtmntModal = async (trtmntId) => {
    setTrtmntModal(true)
    setEditTrtmntId(trtmntId)
  }

  // handle status 
  const handleStatus = async () => {
    const res = await trtMntStatus(id)
    console.log(res);
    setShowModal(false)
  }


  //function to implement pagination
  const PaginationControls = () => {

    const handlePrev = () => {
      setCurrentPage((prevPage) => prevPage > 1 ? prevPage - 1 : 1)
    }

    const handleNext = () => {
      setCurrentPage((prevPage) => prevPage < totalPages ? prevPage + 1 : totalPages)
    }

    return (
      <div className="flex justify-center  mt-4 mb-4">
        <button className="px-4 py-2 mr-2 bg-gray-200 rounded shadow-sm shadow-black" onClick={handlePrev} disabled={currentPage === 1}>prev</button>
        <p className="px-4 py-2 mr-2  font-sans">{currentPage}</p>
        <button className="px-4 py-2 bg-gray-200 rounded shadow-sm shadow-black  " onClick={handleNext} disabled={currentPage === totalPages}>next</button>
      </div>
    )
  }


  return (
    <>
      <div className=" mt-5 p-5 ">
        <div className="flex items-center justify-center mb-5 ">
          <div className="bg-[#d3dd64] flex flex-col items-center rounded-lg shadow-md p-3 w-1/2 ">
            <h1>TREATMENTS</h1>
          </div>
        </div>

        {/* add treatment button */}
        <AddTBtn handleSearch={handleSearch} searchTerm={searchTerm} />

        <div className="mt-5 px-20 ">
          <Card className="h-full w-full overflow-scroll shadow-lg ">
            <table className="w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  {TABLE_HEAD.map((head) => (
                    <th key={head} className={styles.tableHead}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal leading-none opacity-70  "
                      >
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paginationData().length > 0 ? (paginationData().map(({ _id, name, status, subTreatments }, index) => {
                  const isLast = index === treatmentData.length - 1;
                  const cellClass = isLast
                    ? styles.tableCellLast
                    : styles.tableCell;

                  return (
                    <tr key={_id}>
                      <td className={cellClass}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {name}
                        </Typography>
                      </td>
                      {/* status and edit  */}

                      <td className={cellClass}>

                        <button className="px-2 py-1 bg-blue-500 text-white rounded"
                          onClick={() => { editTrtmntModalConfirmation(_id) }}
                        >
                          Edit
                        </button>


                      </td>

                      <td className={cellClass}>
                        <button
                          onClick={() => { modalConfirmation(_id) }}
                          className={`px-2 py-1 rounded ${status ? "bg-green-500 text-white" : "bg-red-500 text-white"
                            }`}
                        >
                          {status ? "Active" : "Not Active"}
                        </button>
                      </td>

                      <td className={cellClass}>
                        <Typography
                          as="div"
                          variant="small"
                          color="blue-gray"
                          className={styles.editLink}
                        >
                          <ul className="list-disc list-inside">
                            {subTreatments.map((subTreatment) => (
                              <li key={subTreatment._id}>
                                {subTreatment.name}
                              </li>
                            ))}
                          </ul>
                        </Typography>
                      </td>


                      {/*   edit  */}

                      <td className={cellClass}>

                        <button className="px-2 py-1 bg-blue-500 text-white rounded"
                          onClick={() => { editTrtmntModal(_id) }}
                        >
                          Edit Sub
                        </button>

                      </td>

                    </tr>
                  );
                })) : (<div className="text-black flex justify-center p-5"> No treatments were added </div>)}
              </tbody>
            </table>
          </Card>
        </div>

        <PaginationControls currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
      </div>

      {showModal  && <ConfirmationModals handleStatus={handleStatus} setShowModal={setShowModal} />}
      {trtmntModal  && <TrtmntEdtModal  setTrtmntModal={setTrtmntModal} editTrtmntId={editTrtmntId} />}
      {treatmentModal && <TreatmentModal setTreatmentModal={setTreatmentModal} editTrtmntId={editTrtmntId} />}
    </>
  );
};

export default TreatmentTable;
