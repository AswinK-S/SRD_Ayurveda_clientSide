import OverViewComponent from "../../components/doctor/OverViewComponent"
import SideBar from "../../components/doctor/SideBar"
import DocNav from "../../components/doctor/docNav"



const Overview = () => {


  return (
    <>
      <DocNav />
      <div className="flex flex-col md:flex-row border px-10   gap-10 mt-10">
        <SideBar />
        <OverViewComponent />
      </div>
    </>

  )
}

export default Overview