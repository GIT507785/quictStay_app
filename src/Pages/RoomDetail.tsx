import { LocationEdit } from "lucide-react"
import React, { useEffect, useState, type JSX } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import { API_BASE_URL } from "../Constants/api"
import { toast } from "react-toastify"
import { assets, roomCommonData, roomsDummyData } from "../assets/assets"
import { FaWifi, FaSnowflake, FaTv, FaGlassMartini, FaConciergeBell } from "react-icons/fa"
import image from '../assets/haseeb.jpeg'

 


interface Amenities {
  wifi: boolean
  ac: boolean
  tv: boolean
  minibar: boolean
  roomService: boolean
}

interface Room {
  _id: string
  image: string[]   // ✅ now array
  roomType: string
  price: number
  amenities: Amenities
  isAvailable: boolean
  priceOff:number
}

const RoomDetail = () => {

  const amenityIcons: Record<string, JSX.Element> = {
    wifi: <FaWifi />,
    ac: <FaSnowflake />,
    tv: <FaTv />,
    minibar: <FaGlassMartini />,
    roomService: <FaConciergeBell />,
  }

  const { roomId } = useParams()

  const [roomData, setRoomData] = useState<Room | null>(null)
  const [mainImage, setMainImage] = useState<string | null>(null)
  const [checkIn, setCheckIn] = useState<string>("");
  const [checkOut, setCheckOut] = useState<string>("");
  const [totalGuests, setTotalGuests] = useState<number>(1);
   const [available , setAvailable] = useState<boolean>(false) 

   const handleClick = async (event:React.FormEvent<HTMLFormElement>) =>{
     event.preventDefault()
     try {
      
       const res = await axios.post(`${API_BASE_URL}/api/user/book-room`, {
        roomId,
        checkIn,
        totalGuests,
        checkOut,
        totalPrice:roomData?.price,
        isAvailable:roomData?.isAvailable
       })

       
       if (res.data.success) {
         toast.success("Booking Successful ✅");
         console.log(res.data.success) 
    } else {
    toast.error(res.data.message);
    }
    } catch (error:any) {
      console.error(error.message); 
    }

   }

  const fetchData = async () => {
    try {
      if (!roomId) return

      const { data } = await axios.get(
        `${API_BASE_URL}/api/user/get-room/${roomId}`
      )

      // console.log("ROOM 👉", data.room)

      if (data.success) {
        setRoomData(data.room)
        //  console.log(data.room)
        setMainImage(data.room.image)
        setAvailable(data.room.isAvailable)
      } else {
        toast.error(data.message)
      }
    } catch (error:any) {
      toast.error(error.message || "Failed to fetch room")
    }
  }

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return (
    <div className="sm:mt-24 mt-20 flex flex-col px-4 sm:px-10 md:px-16 lg:px-20 sm:items-start items-center justify-center">

      {/* Header */}
      <div className="flex gap-3 items-center flex-wrap text-center sm:text-left">
        <h1 className="text-2xl sm:text-3xl font-serif">The Grand Resort</h1>
        <p className="text-sm">({roomData?.roomType} Bed)</p>
      </div>
        <p>{roomData?.priceOff}</p>         
          
      {/* Rating */}
      <div className="flex mt-3 items-center gap-1">
        {
          [...Array(4)].map((_, index)=>(
            <div key={index}>
              <img src={assets.starIconFilled} alt="" />
            </div>
          ))
        }
           <img src={assets.starIconOutlined} alt="" />        
        <p className="text-xs sm:text-sm">200+ reviews</p>
      </div>

      <div className="mt-3 flex gap-1 items-center text-center sm:text-left">
        <LocationEdit className="w-4 sm:w-5 text-gray-500" />
        <p className="text-gray-500 text-xs sm:text-sm">
          Los Angeles, California, USA
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-4 w-full">

        {/* MAIN IMAGE */}
        {mainImage && (
          <img
            src={mainImage}
            alt="room"
            className="mt-6 w-full lg:w-1/2 h-64 sm:h-80 md:h-96 lg:h-[420px] object-cover rounded-2xl"
          />
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-3 mt-6 w-full">
          {roomsDummyData.map((item, index) => {
            return (
              <div key={index} onClick={() => setMainImage(item.images[0])}>
                <img
                  src={item.images[0]}
                  alt=""
                  className={`rounded-2xl cursor-pointer h-32 sm:h-40 md:h-48 w-full object-cover
              ${item.images[0] == mainImage ? "border-orange-500 border-2" : ""}`}
                />
              </div>
            );
          })}
        </div>

      </div>

      <div className="flex flex-col sm:flex-row mt-10 justify-between w-full items-start sm:items-center gap-3">
        <h1 className="font-serif text-xl sm:text-2xl md:text-3xl">
          Experience Luxury Like Never Before
        </h1>

        {/* Price */}
        <p className="text-lg sm:text-xl font-semibold">
          ${roomData?.price} / night
        </p>
      </div>

      {/* Amenities */}
      <div className="mt-5 w-full">
        <div className="flex gap-2 flex-wrap justify-center sm:justify-start">
          {roomData &&
            Object.entries(roomData.amenities).map(([key, value]) =>
              value ? (
                <span
                  key={key}
                  className="bg-green-100 text-green-700 px-3 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm"
                >
                  <div className="flex gap-2 items-center">
                    {amenityIcons[key]}
                    {key}
                  </div>
                </span>
              ) : null
            )}
        </div>
         

        <hr className="w-full sm:w-[80%] lg:w-[60%] mt-10 text-gray-300" />
          
          <form onSubmit={handleClick} className="m-10">
            <div className="h-25 w-full justify-between shadow-2xl rounded-xl p-2  flex sm:flex-row flex-col">
                    
                   <div className='flex flex-col border-r-2    border-gray-300 px-5'>
                        <label htmlFor="checkinDate" className='font-medium' >  Check-In</label>
                        <input onChange={(e)=>setCheckIn(e.target.value)} value={checkIn} required type="date" id='checkinDate' placeholder='Check-In' 
                        className='w-full rounded border border-gray-300 px-3 py-2  mt-1.5 outline-none'/>
                    </div>  

                      <div className='flex flex-col border-r-2    border-gray-300 px-5'>
                        <label htmlFor="checkoutDate" className='font-medium' >  Check-Out</label>
                        <input onChange={(e)=>setCheckOut(e.target.value)} value={checkOut} required type="date" id='checkoutDate' placeholder='Check-Out' 
                        className='w-full rounded border border-gray-300 px-3 py-2  mt-1.5 outline-none'/>
                    </div>  


                      <div className='flex flex-col border-r-2    border-gray-300 px-5'>
                        <label htmlFor="guests" className='font-medium' > Guests</label>
                        <input onChange={(e)=>setTotalGuests(Number(e.target.value))} value={totalGuests} required type="number" id='guests' placeholder='0' 
                        className='w-full rounded border border-gray-300 px-3 py-2  mt-1.5 outline-none'/>
                    </div>  

                     <div className="p-5">
                    <button className="bg-blue-600 hover:bg-blue-500 cursor-pointer items-center
                     text-white px-4 py-1.5 rounded">{available ? 'Book now' : 'Booked'}</button>
                     </div>

            </div>
          </form>

        <div className="mt-8">
          {roomCommonData.map((item, index) => (
            <div key={index} className="p-3">
              <div className="flex gap-2 items-center">
                <img src={item.icon} alt="" className="w-4 h-4 sm:w-5 sm:h-5" />
                <h1 className="font-bold text-sm sm:text-base">{item.title}</h1>
              </div>
              <h1 className="ml-6 text-slate-500 text-xs sm:text-sm">
                {item.description}
              </h1>
            </div>
          ))}
        </div>

        <hr className="w-full sm:w-[80%] lg:w-[60%] mt-10 text-gray-300" />

        <h1 className="text-slate-500  mt-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius beatae id dicta impedit inventore laudantium, sunt cupiditate animi  dolores magni  fugit  sint <br /> optio placeat alias harum saepe. Nobis, est id. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sint nesciunt facere ea temporibus, enim fugit quidem modi nihil consequatur placeat quaerat beatae architecto distinctio dignissimos quos ipsam officiis soluta vero.</h1>

        <hr className="w-full sm:w-[80%] lg:w-[60%] mt-10 text-gray-300" />

        {/* location map */}

        <div>
          <div className="flex sm:flex-row flex-col mt-10 gap-3">
            <div>
              <img src={image} className="w-30 object-[100%_10%] object-cover h-30 rounded-full" alt="" />
            </div>
             <div>
                <h1 className="font-bold text-xl">Hosted By Haseeb</h1>
                <div className="flex sm:flex-row flex-col mt-2 sm:gap-10">
                   <div className="flex gap-0.5">
               {
                 [...Array(5)].map((_, index)=>(
                   <img src={assets.starIconOutlined} className="w-3" key={index} alt=""/>
                  ))
                }
                <p className="text-slate-900">200+reviews</p>
                </div>
                <p>Response rate:100%</p>
                <p>Response time:30 min</p>
                </div>
             </div>
          </div>
           <button className="text-white cursor-pointer hover:bg-blue-700 bg-blue-800 mt-8 rounded-md items-center px-3 py-1 ">Contact Now</button>
        </div>


      </div>
    </div>
  )
}

export default RoomDetail