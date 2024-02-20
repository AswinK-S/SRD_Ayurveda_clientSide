import Home from "./pages/user/home/home"
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Treatment from "./pages/user/treatment/treatment"
import OnlineBooking from "./pages/user/onlineBooking.jsx/onlineBooking"


 
function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path ='/' element ={<Home/>} />
      <Route path = '/treatment' element = {<Treatment/>} />
      <Route path ='booking'  element ={<OnlineBooking/>}/>
    </Routes>
    </BrowserRouter>
      
    </>
  )
}

export default App
