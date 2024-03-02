import Home from "./pages/user/home/home"
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Treatment from "./pages/user/treatment/treatment"
import OnlineBooking from "./pages/user/onlineBooking.jsx/onlineBooking"
import Login from "./pages/user/login/login"
import SignUp from "./pages/user/signUp/signUp"


// admin
import AdminLogin from "./pages/admin/admin"
import AdminDash from "./pages/admin/adminDash"

// doctor
import DoctorLogin from "./pages/doctor/doctorLogin"
import ProtectedRoute from "./components/ProtectedRoute"

 
function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path ='/' element ={<Home/>} />
      <Route path ='/booking' element ={<ProtectedRoute allowedRole='user'> <OnlineBooking/> </ProtectedRoute>} />

      <Route path="/signup" element ={<SignUp/>}/>
      <Route path = '/treatment' element = {<Treatment/>} />
      <Route path ='/login'  element ={<Login/>}/>


      {/* admin */}
      <Route path="/admin" element={<AdminLogin/>}/>
      <Route path="admin/dashboard" element ={<AdminDash/>}/>

      {/* doctor */}
      <Route path="/doctor" element={<DoctorLogin/>}/>
    </Routes>
    </BrowserRouter>
      
    </>
  )
}

export default App
