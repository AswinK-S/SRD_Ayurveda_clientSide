import { BrowserRouter, Routes, Route } from 'react-router-dom'



//user
import Home from "./pages/user/home/home"
import Treatment from "./pages/user/treatment/treatment"
import OnlineBooking from "./pages/user/onlineBooking.jsx/onlineBooking"
import Login from "./pages/user/login/login"
import SignUp from "./pages/user/signUp/signUp"
import UserProfile from './pages/user/profile/Profile'
import Message from './pages/user/message/Message'


import UserProtectedRoute from './components/UserProtectedRoute'
import AdmnProtectedRoute from './components/admnPrtctdRoute'
import DoctorPrtctdRoute from './components/doctorPrtctdRoute'


// admin
import AdminLogin from "./pages/admin/admin"
import AdminDash from './pages/admin/adminDash'
import Users from "./pages/admin/users/users"
import Treatments from "./pages/admin/treatments/treatments"
import Doctors from "./pages/admin/doctor/doctors"
import AddDoctor from "./pages/admin/doctor/AddDoctor"
import AddTreatment from './pages/admin/treatments/AddTreatment'
// doctor
import DoctorLogin from "./pages/doctor/doctorLogin"
import Overview from './pages/doctor/Overview'
import DoctorPro from './pages/doctor/DoctorPro'
import AddSlot from './pages/doctor/AddSlot'
import Slot from './pages/doctor/Slot'
import BookTreatment from './pages/user/onlineBooking.jsx/BookTreatment'
import BookingSuccess from './pages/user/onlineBooking.jsx/BookingSuccess'
import BookingCancel from './pages/user/onlineBooking.jsx/BookingCancel'
import ChangePassword from './pages/doctor/ChangePassword'
import ForgotPassword from './pages/user/login/ForgotPassword'
import NwPsswrd from './pages/user/login/NwPsswrd'
import DocMessage from './pages/doctor/DocMessage'
import Patients from './pages/doctor/Patients'




function App() {

  return (
    <>

      <BrowserRouter>
        <Routes>
          {/* users */}
          <Route path='/' element={<Home />} />
          <Route path='/booking' element={<UserProtectedRoute allowedRole='user'> <OnlineBooking /> </UserProtectedRoute>} />
          <Route path="/signup" element={<SignUp />} />
          <Route path='/treatment' element={<Treatment />} />
          <Route path='/treatment/:id' element={<UserProtectedRoute allowedRole='user'> <BookTreatment /> </UserProtectedRoute>} />
          <Route path='/login' element={<Login />} />


            <Route path='/forgotPassword' element={<ForgotPassword />} />
            <Route path='/newPassword' element={<NwPsswrd />} />

          <Route path='/message' element={ <UserProtectedRoute allowedRole='user'>  <Message/> </UserProtectedRoute> }/>
          <Route path='/success' element={<BookingSuccess />} />
          <Route path='/cancel' element={<BookingCancel />} />
          <Route path='/userProfile' element={ <UserProtectedRoute allowedRole='user'> <UserProfile/> </UserProtectedRoute>  }/>


          {/* admin */}
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdmnProtectedRoute allowedRole='admin'> <AdminDash /> </AdmnProtectedRoute>} />
          <Route path='/admin/users' element={<AdmnProtectedRoute allowedRole='admin'> <Users /> </AdmnProtectedRoute>} />
          {/* <Route path="/admin/patients" element={<AdmnProtectedRoute allowedRole='admin'> <Patients /> </AdmnProtectedRoute>} /> */}
          <Route path="/admin/treatments" element={<AdmnProtectedRoute allowedRole='admin'> <Treatments />  </AdmnProtectedRoute>} />
          <Route path="/admin/doctors" element={<AdmnProtectedRoute allowedRole='admin'> <Doctors /> </AdmnProtectedRoute>} />
          <Route path="/admin/addDoc" element={<AdmnProtectedRoute allowedRole='admin'> <AddDoctor /> </AdmnProtectedRoute>} />
          <Route path="/admin/addTreat" element={<AdmnProtectedRoute allowedRole='admin'> <AddTreatment /> </AdmnProtectedRoute>} />


          {/* doctor */}
          <Route path="/doctor" element={<DoctorLogin />} />
          <Route path='/doctor/overView' element={<DoctorPrtctdRoute allowedRole='doctor'> <Overview /> </DoctorPrtctdRoute>} />
          <Route path='/doctor/profile' element={<DoctorPrtctdRoute allowedRole='doctor'> <DoctorPro /> </DoctorPrtctdRoute>} />
          <Route path='/doctor/AddSlot' element={<DoctorPrtctdRoute allowedRole='doctor'> <AddSlot /> </DoctorPrtctdRoute>} />
          <Route path='/doctor/slot' element={<DoctorPrtctdRoute allowedRole='doctor'> <Slot /> </DoctorPrtctdRoute>} />
          <Route path='/doctor/changePassword' element={<DoctorPrtctdRoute allowedRole='doctor'> <ChangePassword /> </DoctorPrtctdRoute>} />
          <Route path='/doctor/docMessage' element={<DoctorPrtctdRoute allowedRole='doctor'> <DocMessage/> </DoctorPrtctdRoute> }/>
          <Route path='/doctor/patients' element={<DoctorPrtctdRoute allowedRole='doctor'> <Patients/>  </DoctorPrtctdRoute>}/>
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
