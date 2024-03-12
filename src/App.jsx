import {BrowserRouter,Routes,Route} from 'react-router-dom'


        
//user
import Home from "./pages/user/home/home"
import Treatment from "./pages/user/treatment/treatment"
import OnlineBooking from "./pages/user/onlineBooking.jsx/onlineBooking"
import Login from "./pages/user/login/login"
import SignUp from "./pages/user/signUp/signUp"

import UserProtectedRoute from './components/UserProtectedRoute'
import AdmnProtectedRoute from './components/admnPrtctdRoute'

// admin
import AdminLogin from "./pages/admin/admin"
import AdminDash from './pages/admin/adminDash'
import Users from "./pages/admin/users/users"
import Patients from "./pages/admin/patients/patients"
import Treatments from "./pages/admin/treatments/treatments"
import Doctors from "./pages/admin/doctor/doctors"
import AddDoctor from "./pages/admin/doctor/AddDoctor"
import AddTreatment from './pages/admin/treatments/AddTreatment'
// doctor
import DoctorLogin from "./pages/doctor/doctorLogin"
import TreatmentDetail from './components/User/TreatmentDetail'

 
function App() {

  return (
    <>

    <BrowserRouter>
    <Routes>
      {/* users */}
      <Route path ='/' element ={<Home/>} />
      <Route path ='/booking' element ={<UserProtectedRoute allowedRole='user'> <OnlineBooking/> </UserProtectedRoute>} />
      <Route path="/signup" element ={<SignUp/>}/>
      <Route path = '/treatment' element = {<Treatment/>} />
      <Route path = '/treatment/:id' element = {<TreatmentDetail/>} />
      <Route path ='/login'  element ={<Login/>}/>


      {/* admin */}
      <Route path="/admin" element={<AdminLogin/>}/>

      <Route  path="/admin/dashboard"  element={<AdmnProtectedRoute allowedRole='admin'> <AdminDash/> </AdmnProtectedRoute>}/>
      <Route path='/admin/users'  element={<AdmnProtectedRoute allowedRole='admin'> <Users/> </AdmnProtectedRoute>}/>
      <Route path="/admin/patients"  element={<AdmnProtectedRoute allowedRole='admin'> <Patients/> </AdmnProtectedRoute>}/>
      <Route path="/admin/treatments" element={<AdmnProtectedRoute allowedRole='admin'> <Treatments/>  </AdmnProtectedRoute>}/>
      <Route path="/admin/doctors" element={<AdmnProtectedRoute allowedRole='admin'> <Doctors/> </AdmnProtectedRoute>} />
      <Route path="/admin/addDoc" element={<AdmnProtectedRoute allowedRole='admin'> <AddDoctor/> </AdmnProtectedRoute>} />
      <Route path="/admin/addTreat" element={<AdmnProtectedRoute allowedRole='admin'> <AddTreatment/> </AdmnProtectedRoute>} />


      {/* doctor */}
      <Route path="/doctor" element={<DoctorLogin/>}/>
    </Routes>
    </BrowserRouter>

    </>
  )
}

export default App
