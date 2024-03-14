import SideBar from "../../components/doctor/SideBar"
import DocNav from "../../components/doctor/docNav"
import Profile from "../../components/doctor/profile"

const DoctorPro = () => {
    return (
        <div>
            <DocNav />
            <div className="flex flex-col justify-around md:flex-row border px-10   gap-10 mt-10">
                <SideBar />
                <Profile />
            </div>

        </div>
    )
}

export default DoctorPro

