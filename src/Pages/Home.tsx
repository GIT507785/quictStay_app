import ExclusiveOffer from "../Components/ExclusiveOffer"
import FuturedHotels from "../Components/FuturedHotels"
import Header from "../Components/Header"
import NewsLetter from "../Components/NewsLetter"
import Testimonial from "../Components/Testimonial"

const Home = () => {
  return (
    <div>
        <Header/>
        <FuturedHotels/>
        <ExclusiveOffer/>
        <Testimonial/>
        <NewsLetter/>
    </div>
  )
}

export default Home