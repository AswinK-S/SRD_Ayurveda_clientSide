import EditUserPro from "../../../components/User/EditUserPro"
import Footer from "../../../components/footer/footer"
import ImgComponent from "../../../components/imgCmpnt/ImgComponent"
import Nav from "../../../components/navbar/nav"

const EditProfile = () => {
  return (
    <>
    <Nav/>
    <ImgComponent text={'Edit Profile'}/>
    <EditUserPro/>
    <Footer/>
    </>
  )
}

export default EditProfile