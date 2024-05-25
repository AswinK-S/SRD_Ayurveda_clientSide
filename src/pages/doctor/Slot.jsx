import SideBar from "../../components/doctor/SideBar"
import Slots from "../../components/doctor/Slots"
import DocNav from "../../components/doctor/docNav"

const Slot = () => {
    return (
        <>
            <DocNav />
            <div className="flex flex-col  md:flex-row mt-10">
                <div className="h-3/4 md:w-1/4 sm:w-full flex justify-center   mb-5 w-full">
                    <SideBar />
                </div>
                <div className="flex  w-auto flex-col rounded-xl mx-10 items-center justify-evenly mb-2 md:flex-row flex-grow p-10 
                bg-gradient-to-r from-lime-100 via-lime-50 to-lime-100 shadow-md shadow-black">
                        <Slots />
                
                </div>

            </div>
        </>
    )
}

export default Slot


