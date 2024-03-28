import FileSec from "../../components/doctor/FileSec"
import SideBar from "../../components/doctor/SideBar"
import DocNav from "../../components/doctor/docNav"
import Profile from "../../components/doctor/profile"

const DoctorPro = () => {
    return (
        <div>
            <DocNav />
            <div className="flex flex-col justify-evenly md:flex-row  px-10 mb-5  gap-10 mt-10">
                <div className="h-3/4 md:w-1/4 sm:w-full flex justify-center   mb-5 w-full">
                    <SideBar />
                </div>
                <FileSec />
                <Profile />

            </div>

        </div>
    )
}

export default DoctorPro

