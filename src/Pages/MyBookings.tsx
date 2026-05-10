import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { User } from "lucide-react";
import { API_BASE_URL } from "../Constants/api";

interface Booking {
  _id: string;
  roomId: {
    _id: string;
    image: string;
    roomType: string;
    price: number;
  };
  checkIn: string;
  checkOut: string;
  totalGuests: number;
}

const MyBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchBookings = async () => {
      if (!token) {
        toast.error("Please login first");
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(
          `${API_BASE_URL}/api/user/allbookings`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // ✅ correct format
            },
          }
        );

        if (res.data.success) {
          setBookings(res.data.bookings || []);
        } else {
          toast.error(res.data.message);
        }
      } catch (error: any) {
        toast.error(error.message || "Failed to fetch bookings");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [token]);

  if (loading) {
    return (
      <p className="mt-24 text-center text-gray-500">
        Loading your bookings...
      </p>
    );
  }

  return (
    <div className="mt-24 px-4 sm:px-10 lg:px-24">
      <h1 className="text-3xl font-bold mb-6">My Bookings</h1>

      {bookings.length === 0 && (
        <p className="text-gray-500">No bookings found.</p>
      )}

      <div className="space-y-6">
        {bookings.map((item) => (
          <div
            key={item._id}
            className="grid grid-cols-1 md:grid-cols-[3fr_2fr_1fr] gap-6 border-b pb-6"
          >
            {/* LEFT SIDE */}
            <div className="flex gap-4">
              <img
                src={
                  item.roomId?.image ||
                  "https://via.placeholder.com/150"
                }
                className="w-40 h-28 object-cover rounded"
              />

              <div>
                <p className="font-bold text-lg">
                  {item.roomId?.roomType}
                </p>

                <div className="flex items-center gap-2 text-gray-500 text-sm mt-2">
                  <User size={16} />
                  <p>Guests: {item.totalGuests}</p>
                </div>

                <p className="mt-2 font-semibold">
                  Price: ${item.roomId?.price}
                </p>
              </div>
            </div>

            {/* DATES */}
            <div className="text-sm text-gray-600">
              <p>
                <span className="font-bold">Check-In:</span>{" "}
                {new Date(item.checkIn).toDateString()}
              </p>

              <p className="mt-2">
                <span className="font-bold">Check-Out:</span>{" "}
                {new Date(item.checkOut).toDateString()}
              </p>
            </div>

            {/* STATUS */}
            <div className="flex items-center">
              <div className="flex items-center gap-2 text-green-700">
                <div className="w-2 h-2 bg-green-700 rounded-full"></div>
                Paid
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBookings;