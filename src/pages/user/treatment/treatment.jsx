import ImgComponent from "../../../components/imgCmpnt/ImgComponent"
import Nav from "../../../components/navbar/nav"
import TreatmentCard from "./TreatmentCard"

const Treatment = () => {

  return (
    <>
      <div className=" flex justify-center">
        <Nav />
      </div>
      <ImgComponent text='TREATMENTS'/>
      <div>
        <TreatmentCard />
      </div>
    </>
  )
}

export default Treatment