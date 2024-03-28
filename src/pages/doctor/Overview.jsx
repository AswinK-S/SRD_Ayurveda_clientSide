import OverViewComponent from "../../components/doctor/OverViewComponent"
import SideBar from "../../components/doctor/SideBar"
import DocNav from "../../components/doctor/docNav"



const Overview = () => {


  return (
    <>
        <DocNav />
        <div className="flex flex-col md:flex-row px-10 mb-5 gap-10 mt-10">
          <div className="md:w-1/4 sm:w-full flex justify-center mb-5 w-full">
            <SideBar />
          </div>
          <div className="md:w-3/4 sm:w-full w-full overflow-x-auto">
            <OverViewComponent />
          </div>
        </div>
    </>
  );
  
}

export default Overview