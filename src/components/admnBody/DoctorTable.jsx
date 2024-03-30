
import { Card, Typography } from "@material-tailwind/react";
import styles from '../../tailwind.module.css'
import { useEffect, useState } from "react";
import { doctors, doctorStatus, verifyDoctor } from "../../api/adminApi";
import ConfirmationModals from "../modals/confirmationModals";
import { AddBtn } from "./AddBtn";
import VerifyDocModal from "./VerifyDocModal";
import { toast } from "react-toastify";


const TABLE_HEAD = ["Name", "Email", "Phone", "Status",'isVerified'];

export function DoctorTable() {

  const [doctor, setDoctor] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [editId, setEditId] = useState(null)
  const [verifyModal,setVerifyModal] = useState(false)
  const [vefifyId,setVerifyId] = useState(null)
  const [showDoc,setShowDoc] = useState(null)
  
  //state variables for pagination
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(4)

  const [searchTerm,setSearchTerm] = useState('')

  //get the users when the page is loaded
  const getDoctors = async () => {
    let res = await doctors()
    console.log('res for table--', res.data);
    setDoctor(res.data)
    getPaginationData()
  }
  
  useEffect(() => {
    getDoctors()
  }, [showModal,verifyModal])

  const handleStatus = async () => {
    // console.log('usrSts id', id);
    let result = await doctorStatus(editId)
    console.log('rrrr', result);
    setShowModal(false)
  }

  //block modal
  const modalConfirmation = (id) => {
    console.log(id)
    setShowModal(true)
    setEditId(id)
  }

  const handleVerify = async()=>{
    try {
      const result =await verifyDoctor(vefifyId)
      console.log('vefify result---',result);

      if(result.data.isVerified){
        setVerifyModal(false)
        console.log('vvvvvvvvv');
        toast.success('Doctor Verification Successful!');
      }else{
        toast.success('verification cancelled')
        console.log('ccccccc1111');
        setVerifyModal(false)

        console.log('ccccccc');
      }
      
      
    } catch (error) {
      console.log(error.message);
    }
   
  }

  //vefify modal
  const verifyModalConfirmation =(id,document)=>{
    console.log('verfy modal id',id);

    setVerifyModal(true)
    setVerifyId(id)
    console.log('doc-->',document);
    setShowDoc(document)
    

  }

  //take the search value
  const handleSearchChange =(event)=>{
    setSearchTerm(event.target.value)
  }

  // filter the data according to search 
  const filteredDoctors = doctor.filter((doc)=>{

    const name = `${doc.name}`.toLowerCase()
    const subTreatment =`${doc.subTreatment}`.toLowerCase()
    const mob =`${doc.mob}`.toLowerCase()
    const searchTermLower = searchTerm.toLowerCase()

    return(
      name.includes(searchTermLower) || subTreatment.includes(searchTermLower) ||mob.includes(searchTermLower)
    )
  })

  // getting the data per page 
  const getPaginationData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return filteredDoctors.slice(startIndex, endIndex)
  }

  const totalPages = Math.ceil(doctor.length / itemsPerPage)

  

  // function that defines pagination logic 
  const PaginationControls = () => {
    const handlePrevClick = () => {
      setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : 1));
    };

    const handleNextClick = () => {
      setCurrentPage((prevPage) => (prevPage < totalPages ? prevPage + 1 : totalPages));
    };

    return (
      <div className="flex justify-center mt-4 mb-4  ">
        <button
          className="px-4 py-2 mr-2 bg-gray-200 rounded shadow-sm shadow-black"
          onClick={handlePrevClick}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <button
          className="px-4 py-2 bg-gray-200 rounded shadow-sm shadow-black"
          onClick={handleNextClick}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    );
  };


  return (
    <>
      <div className=" mt-5 p-5">


        <div className="flex items-center justify-center mb-5 ">
          <div className="bg-[#d3dd64] flex flex-col items-center rounded-lg shadow-md p-3 w-1/2 ">
            <h1>DOCTORS</h1>
          </div>
        </div>

        {/* add doctor button  */}
        <AddBtn handleSearchChange={handleSearchChange} searchTerm={searchTerm} />
        

        <div className="mt-5 p-5 ">
          <Card className="h-full w-full overflow-scroll shadow-lg ">
            <table className="w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  {TABLE_HEAD.map((head) => (
                    <th key={head} className={styles.tableHead}>
                      <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {getPaginationData().map(({ _id, name, email, mob, status,document ,isVerified}, index) => {
                    const isLast = index === doctor.length - 1;
                    const cellClass = isLast ? styles.tableCellLast : styles.tableCell;

                  return (
                    <tr key={_id}>
                      <td className={cellClass}>
                        <Typography variant="small" color="blue-gray" className="font-normal">
                          {name}
                        </Typography>
                      </td>
                      <td className={cellClass}>
                        <Typography variant="small" color="blue-gray" className="font-normal">
                          {email}
                        </Typography>
                      </td>
                      <td className={cellClass}>
                        <Typography variant="small" color="blue-gray" className="font-normal">
                          {mob}
                        </Typography>
                      </td>
                      <td className={cellClass}>
                        <Typography as="a" href="#" variant="small" color="blue-gray" className={styles.editLink}>
                          {status ? (
                            <button className="bg-[#64c351] rounded-md shadow-2xl p-3" onClick={() => modalConfirmation(_id)}>
                              Block
                            </button>
                          ) : (
                            <button className="bg-[#da3c3c] rounded-md shadow-2xl p-3" onClick={() => modalConfirmation(_id)}>
                              Unblock
                            </button>
                          )}
                        </Typography>
                      </td>

                      <td className={cellClass}>
                        <Typography as="a" href="#" variant="small" color="blue-gray" className={styles.editLink}>
                          {document && isVerified ? (
                            <button className="bg-[#64c351] rounded-md shadow-2xl p-3" onClick={() => verifyModalConfirmation(_id,document)}>
                              Verified
                            </button>
                          ) : (
                            <button className="bg-[#da3c3c] rounded-md shadow-2xl p-3" onClick={() => verifyModalConfirmation(_id,document)}>
                              Not verified
                            </button>
                          )}
                        </Typography>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Card>
        </div>


        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />


      </div>
      {showModal && <ConfirmationModals handleStatus={handleStatus} setShowModal={setShowModal} />}
      {verifyModal && <VerifyDocModal showDoc={showDoc} handleVerify={handleVerify} setVerifyModal={setVerifyModal}/>}
    </>
  );
}
