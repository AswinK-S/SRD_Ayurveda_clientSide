import { Card, Typography } from "@material-tailwind/react";
import styles from '../../tailwind.module.css';
import { useEffect, useState } from "react";
import { treatments } from "../../api/adminApi";
import { AddTBtn } from "./AddBtn";

const TABLE_HEAD = ["Main Treatment Name", "Sub Treatments"];

const TreatmentTable = () => {
  //state variable to show on table
  const [treatmentData, setTreatmentData] = useState([]);
  const [searchTerm,setSearchTerm]=useState('')   //state variable to get the serch value
  const [currentPage,setCurrentPage] = useState(1)   //state variable to get the pagination details
  const [itemsPerPage]=useState(3)

  // get the treatments when the page is loaded
  useEffect(() => {
    const getTreatments = async () => {
      try {
        const res = await treatments();
        console.log('treatment list for table --', res.data);
        setTreatmentData(res.data);
        paginationData()
      } catch (error) {
        console.error('Error fetching treatments:', error);
      }
    };

    getTreatments();
  }, []);

  //get the search data
  const handleSearch =(event)=>{
    setSearchTerm(event.target.value)
  }

  const filteredTreatments = treatmentData.filter((item)=>{
    const trtmntName = `${item.name}`.toLowerCase()
    const searchT = `${searchTerm}`.toLowerCase()

    return (trtmntName.includes(searchT))
  })


  //get pagination data
  const paginationData = ()=>{
    const startIndex =(currentPage -1)*itemsPerPage
    const endIndex = startIndex +itemsPerPage
    return filteredTreatments.slice(startIndex,endIndex)
  }

  const totalPages = Math.ceil(treatmentData.length/itemsPerPage)


  //function to implement pagination

  const PaginationControls =()=>{

    const handlePrev =()=>{
        setCurrentPage((prevPage)=>prevPage >1?prevPage-1:1)
    }

    const handleNext =()=>{
        setCurrentPage(( prevPage)=>prevPage<totalPages?prevPage+1:totalPages)
    }

    return(
      <div className="flex justify-center  mt-4 mb-4">
        <button className="px-4 py-2 mr-2 bg-gray-200 rounded shadow-sm shadow-black" onClick={handlePrev} disabled={currentPage===1}>prev</button>
        <button className="px-4 py-2 bg-gray-200 rounded shadow-sm shadow-black  " onClick={handleNext} disabled={currentPage===totalPages}>next</button>
      </div>
    )
  }


  return (
    <>
      <div className=" mt-5 p-5">
        <div className="flex items-center justify-center mb-5 ">
          <div className="bg-[#d3dd64] flex flex-col items-center rounded-lg shadow-md p-3 w-1/2 ">
            <h1>TREATMENTS</h1>
          </div>
        </div>

        {/* add treatment button */}
        <AddTBtn handleSearch={handleSearch} searchTerm={searchTerm} />

        <div className="mt-5 p-5 ">
          <Card className="h-full w-full overflow-scroll shadow-lg ">
            <table className="w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  {TABLE_HEAD.map((head) => (
                    <th key={head} className={styles.tableHead}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal leading-none opacity-70"
                      >
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paginationData().map(({ _id, name, subTreatments }, index) => {
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
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Card>
        </div>

        <PaginationControls currentPage={currentPage} totalPages={totalPages} onPageChange ={setCurrentPage}/>
      </div>
    </>
  );
};

export default TreatmentTable;
