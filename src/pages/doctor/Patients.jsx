import { useEffect, useState } from "react";
import SideBar from "../../components/doctor/SideBar"
import DocNav from "../../components/doctor/docNav"
import CustomTable from "../../components/table/CustomTable"
import { getPatients } from "../../api/doctorApi";
import { useSelector } from "react-redux";

const Patients = () => {
    const TableData = [{}];
    const tableHeadings = [' Name', 'Treatment', 'Sub-Trt', 'Checkup-Date', 'Status'];
    const dataKeys = ['name', 'treatment', 'subTrt', 'checkupDate', 'status'];

    const [currentPage, setCurrentPage] = useState(1)
    const [data, setData] = useState([])
    const [totalPages, setTotalPages] = useState(0)
    const limit = 8
    const doctor = useSelector((state)=>state.doctor.doctor)

    const fetch = async()=>{
        try {
            const doc = JSON.parse(doctor)
            const result = await getPatients(doc?._id,currentPage,limit)
        } catch (error) {
            console.log(error.message);
        }
    }
    useEffect(()=>{
        fetch()
    },[currentPage])


    return (
        <>
            <DocNav />
            <div className="flex flex-col md:flex-row px-10 mb-5 gap-10 mt-10">
                <div className="md:w-1/4 sm:w-full flex justify-center mb-5 w-full">
                    <SideBar />
                </div>
                <div className="md:w-3/4 sm:w-full w-full overflow-x-auto">
                    <CustomTable data={TableData} tableHeadings={tableHeadings} dataKeys={dataKeys} />
                    <div>
                        <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
                            Previous
                        </button>
                        <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Patients