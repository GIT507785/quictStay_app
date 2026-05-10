

export  interface Room{
  _id: string;
    name: string;
    images: string[];
    pricePerNight: number;
    amenities: string[];
    isAvailable: boolean;
    roomType: string;
    price: number;
    createdAt:string;
    updatedAt:string;
    hotel: {
  _id: string;
  name: string;
  rating: number;
  address: string;
  contact: string;
  city: string;
  owner:{
      _id: string;
  username: string;
  email: string;
  image: string;
  role: string;
  };
}
}