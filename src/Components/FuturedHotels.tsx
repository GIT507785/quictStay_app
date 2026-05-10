import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { fetchRoomsData } from "../Api/User"
import { toast } from "react-toastify"
import { Loader2 } from "lucide-react"

type Room = {
  _id: string
  image: string
  roomType: string
  price: number
  amenities: string
  isAvailable: boolean
}

const FuturedHotels = () => {
  const [roomData, setRoomData] = useState<Room[]>([])
  const [loading , setLoading] = useState(true)

  const fetchData = async () => {
    try {
      const { data }: any  = await fetchRoomsData()

      if (data.success) {
        setRoomData(data.rooms)
      } else {
        toast.error(data.message)
      }
    } catch (error:any) {
      toast.error(error.message)
    } finally{
      setLoading(false) 
    }
  }

  useEffect(() => {
    fetchData()
  }, [fetchData])

    if(loading){
      return (
        <div className="w-full gap-3 flex items-center mt-10 justify-center">  
        <Loader2 className="animate-spin" size={40} /> 
        <p>Loading...</p>
        </div>
        )
        }

  return (
    <div className="w-full flex flex-col items-center bg-gray-100 py-14 px-4">
      <div className="max-w-6xl w-full text-center">
        <h1 className="text-gray-800 text-4xl font-serif font-bold">
          Featured Hotels
        </h1>

        <p className="text-gray-600 mt-3 text-sm sm:text-base">
          Discover your handpicked selection of exceptional properties around
          the world, offering unparalleled <br /> luxury and unforgettable experiences.
        </p>

        {/* Responsive Grid */}
        <div className="mt-10 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {roomData.map((item) => (
            <Link
              to={`/room/${item._id}`} onClick={()=>window.scrollTo({behavior:"smooth", top:0})}
              key={item._id}
              className="bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition duration-300"
            >
              {/* Image */}
              <img
                src={item.image}
                className="w-full h-44 object-cover"
                alt="room"
              />

              {/* Content */}
              <div className="p-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-gray-700 font-semibold capitalize text-lg">
                    {item.roomType} Room
                  </h2>

                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      item.isAvailable
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {item.isAvailable ? "Available" : "Booked"}
                  </span>
                </div>

                <p className="text-gray-500 text-sm mt-2">
                  Comfortable stay with premium services.
                </p>

                {/* Price + Button */}
                <div className="flex justify-between items-center mt-4">
                  <p className="text-xl font-bold text-gray-800">
                    ${item.price}
                    <span className="text-sm font-normal text-gray-500">
                      {" "}
                      /night
                    </span>
                  </p>

                  <button className="text-sm border border-gray-300 px-3 py-1 rounded-md hover:bg-gray-200 transition">
                    View
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom Button */}
        <div className="flex justify-center mt-12">
          <button className="border border-gray-400 px-6 py-2 rounded-md hover:bg-gray-200 transition">
            View All Hotels
          </button>
        </div>
      </div>
    </div>
  )
}

export default FuturedHotels