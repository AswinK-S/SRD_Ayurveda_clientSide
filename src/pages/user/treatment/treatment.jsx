import Footer from "../../../components/footer/footer"
import ImgComponent from "../../../components/imgCmpnt/ImgComponent"
import Nav from "../../../components/navbar/nav"
import TreatmentCard from "./TreatmentCard"

const Treatment = () => {

  return (
    <>
      <div>
        <div className=" flex justify-center">
          <Nav />
        </div>
        <ImgComponent text='TREATMENTS' />
        <div>
          <TreatmentCard />
        </div>
        <Footer/>
      </div>

    </>
  )
}

export default Treatment