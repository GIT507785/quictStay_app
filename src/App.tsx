import { Route, Routes } from "react-router-dom"
import Home from "./Pages/Home"
import RoomDetail from "./Pages/RoomDetail"
import Navbar from "./Components/Navbar"
import Footer from "./Components/Footer"
import HotelRooms from "./Pages/HotelRooms"
import MyBookings from "./Pages/MyBookings"
import { useContext} from "react"
import Login from "./Pages/Login"
import { AppContext } from "./Context/AppContext"
import {ToastContainer} from 'react-toastify'
import Profile from "./Pages/Profile"
import About from "./Pages/About"



const App = () => {

   const {token} = useContext<any>(AppContext)

  return (
    <div>
      <ToastContainer/>
      
      {!token ? <Login/> : 
       <Navbar/>
      }

      {!token ? null :
    <Routes>
     {!token && <Route  path="/login" element={<Login/>}/>}
    <Route  path="/" element={<Home/>}/>
    <Route  path="/room/:roomId" element={<RoomDetail/>}/>
    <Route  path="/hotel-rooms" element={<HotelRooms/>}/>
    <Route  path="/my-bookings" element={<MyBookings/>}/>
    <Route  path="/profile" element={<Profile/>}/>
    <Route  path="/about" element={<About/>}/>

   </Routes>
}
      {token && <Footer/> } 

    </div>
  )
}

export default App