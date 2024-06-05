import { useEffect, useState } from "react";
import SideBar from "../../components/doctor/SideBar"
import DocNav from "../../components/doctor/docNav"
import CustomTable from "../../components/table/CustomTable"
import { getPatients } from "../../api/doctorApi";
import { useSelector } from "react-redux";
import { FaSearch } from "react-icons/fa";

const Patients = () => {
    const tableHeadings = [' Name', 'Treatment', 'Sub-Trt', 'Checkup-Date', 'Status','Prescription','Id'];
    const dataKeys = ['userName', 'treatmentName', 'subTrtmntName', 'consultingDate', 'status','btn','bookingId'];
    const text = "PATIENTS"

    const [currentPage, setCurrentPage] = useState(1)
    const [data, setData] = useState([])
    const [totalPages, setTotalPages] = useState(0)
    const [searchTerm, setSearchTerm] = useState('')
    const limit = 8
    const doctor = useSelector((state) => state.doctor.doctor)

    const fetch = async () => {
        try {
            const doc = JSON.parse(doctor)
            const result = await getPatients(doc?._id, currentPage, limit)
            setData(result)
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        fetch()
    }, [currentPage])
    const refreshData = () => {
        fetch(); 
    };

    const handleSearch = async (e) => {
        setSearchTerm(e.target.value)
    }

    const filteredData = data?.filter((item)=>{
        const treatmentName = `${item.treatmentName}`.toLowerCase()
        const subTreatmentName = `${item.subTrtmntName}`.toLowerCase()
        const patientName = `${item.userName}`.toLowerCase()
        const status = `${item.status}`.toLowerCase()
        const searchTermS = searchTerm.toLowerCase()

        return (   treatmentName.includes(searchTermS) || subTreatmentName.includes(searchTermS)|| patientName.includes(searchTermS) || status.includes(searchTermS))
     })

    return (
        <>
            <DocNav />
            <div className="flex flex-col md:flex-row px-10 mb-5 gap-10 mt-10">
                <div className="h-3/4 md:w-1/4 sm:w-full flex justify-center   mb-5 w-full">
                    <SideBar />
                </div>
                <div className="md:w-3/4 sm:w-full w-full overflow-x-auto">
                    <div className="flex flex-col items-center justify-center mb-5 ">
                        <div className="bg-[#d3dd64] flex flex-row justify-around  items-center rounded-lg shadow-md p-2 md:w-1/2    md:overflow-x-auto">
                            <h1>{text}</h1>
                            <div className="flex items-center justify-between   ">
                                <div className="flex items-center border border-lime-200 shadow-sm   shadow-black rounded">
                                    <span className="px-2 text-gray-500">
                                        <FaSearch />
                                    </span>
                                    <input
                                        type="text"
                                        placeholder="search"
                                        className="px-4 py-2"
                                        onChange={handleSearch}
                                        value={searchTerm}

                                    />
                                </div>
                            </div>
                        </div>

                    </div>
                    <CustomTable  data={filteredData} tableHeadings={tableHeadings} dataKeys={dataKeys} text={text} doctor={doctor} 
                    setData={setData} refreshData={refreshData} />
                    <div className="flex justify-center  m-4">
                        <button className="px-3 py-1 text-xs bg-blue-gray-100 rounded-md shadow-sm shadow-black" onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
                            Prev
                        </button>
                        <p className="px-4 py-2 mr-2  font-sans">{currentPage}</p>

                        <button className="px-3 py-1 text-xs bg-blue-gray-100 rounded-md shadow-sm shadow-black" onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Patients