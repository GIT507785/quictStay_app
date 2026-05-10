import {ArrowRight } from "lucide-react"
import {exclusiveOffers } from "../assets/assets"

const ExclusiveOffer = () => {
  return (
    <div className="sm:px-24 px-3 py-7">
        <div className="flex sm:flex-row flex-col justify-between ">
           <div>
            <h1 className="font-bold font-serif text-3xl text-gray-900">Exclusive Offers</h1>
            <p className="text-gray-600">Take advantage of our limited-time offers and enjoy exclusive <br /> deals on our premium hotels.</p>
           </div>
           <div>
              <button className="border flex gap-2 text-gray-600 hover:bg-gray-300 border-gray-300 cursor-pointer rounded px-4 py-2 mt-4">View All Hotels <ArrowRight className="text-gray-600"/>  </button>
           </div>
        </div>
                {/* boxess */}
                 
                 <div className="grid sm:grid-cols-3 grid-cols-1  gap-5 mt-10">

              {exclusiveOffers.map((item , index)=>{
                return(
                     <div className="px-4" key={index}>
                            <div style={{backgroundImage:`url(${item.image})`}} className="h-50 rounded object-cover bg-cover">
                    <div className="pt-1">
                    <p className=" w-16  ml-4    bg-white text-black px-2 py-1
                     text-sm rounded-full top-7  left-2">{item.priceOff}%Off </p>
                     </div>

                   <h1 className="text-white text-md ml-3 pt-4 font-bold">{item.title}</h1> 
                   <p className="text-white text-sm  ml-3 "> {item.description}  </p>
                   <p className="text-gray-300 text-sm  mt-2 ml-3 ">{item.expiryDate}</p>
                   
                    <button className=" flex gap-2 text-gray-50  cursor-pointer rounded px-4 py-2 mt-4">View All Hotels <ArrowRight className="text-gray-50"/>  </button>
   
                </div>
                     </div>
                )
              })}
                          
                 </div>
    </div>
  )
}

export default ExclusiveOffer