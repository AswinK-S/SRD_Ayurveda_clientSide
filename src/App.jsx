import Home from "./pages/user/home/home"
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Treatment from "./pages/user/treatment/treatment"
import OnlineBooking from "./pages/user/onlineBooking.jsx/onlineBooking"
import Login from "./pages/user/login/login"
import SignUp from "./pages/user/signUp/signUp"

// admin
import AdminLogin from "./pages/admin/admin"

// doctor
import DoctorLogin from "./pages/doctor/doctorLogin"


 
function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path ='/' element ={<Home/>} />
      <Route path ='/login' element ={<Login/>} />
      <Route path="/signup" element ={<SignUp/>}/>
      <Route path = '/treatment' element = {<Treatment/>} />
      <Route path ='/booking'  element ={<OnlineBooking/>}/>


      {/* admin */}
      <Route path="/admin" element={<AdminLogin/>}/>

      {/* doctor */}
      <Route path="/doctor" element={<DoctorLogin/>}/>
    </Routes>
    </BrowserRouter>
      
    </>
  )
}

export default App
