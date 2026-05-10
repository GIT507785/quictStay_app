import axios from "axios"
import { API_BASE_URL } from "../Constants/api" 
import { toast } from "react-toastify"


export const LoginUser = async (email: string, password: string) =>{
    try {
          const data =  await axios.post(`${API_BASE_URL}/api/user/login`, {email , password})       
          return data
    } catch (error:any) {
      console.log(error)
        toast.error(error.message)             
    }
}


export const RegisterUser = async (name:string , email:string , password:string) =>{
    try {
          const data =  await axios.post(`${API_BASE_URL}/api/user/register`, {name , email , password})    
          return data
        } catch (error:any) {
          console.log(error)
          toast.error(error.message)             
        }
    }

export const GetUserProfile = async (token: string) => {
  const res = await axios.get(`${API_BASE_URL}/api/user/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
}

export const fetchRoomsData = async ()=>{
   try {
     const data = await axios.get(`${API_BASE_URL}/api/user/get-all-rooms`,{})
     return data
   } catch (error:any) {
    toast.error(error.message);
    
   }
} 


export const fetchRoomDetails = async (roomId : string) =>{
  try {
    const data = await axios.get(`${API_BASE_URL}/api/user/get-room/${roomId}`)
    return data
  } catch (error:any) {
    toast.error(error.message);
  }
}

export const getBookings = async (token: string) => {
  try {
    const res = await axios.get(`${API_BASE_URL}/api/user/allbookings`, {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
    return res.data;
  } catch (error:any) {
    toast.error(error.message);
  }
};

