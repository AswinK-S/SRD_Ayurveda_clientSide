import DocAddSlot from "../../components/doctor/DocAddSlot"
import SideBar from "../../components/doctor/SideBar"
import DocNav from "../../components/doctor/docNav"

const AddSlot = () => {
    return (
        <>
            <DocNav />
            <div className="flex flex-col md:flex-row mt-10">
                <div className=" flex  justify-center md:w-1/4 md:mt-5 w-full mb-5">
                    <SideBar />
                </div>
                <div className="flex flex-col rounded-xl mx-10 items-center justify-evenly mb-2 md:flex-row flex-grow p-10 bg-gradient-to-r from-lime-100 via-lime-50 to-lime-100 shadow-md shadow-black">
                    <DocAddSlot />
                </div>
            </div>
        </>
    )
}

export default AddSlot