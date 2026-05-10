import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { GetUserProfile } from "../Api/User";

interface UserType {
  name: string;
  email: string;
  phone?: string;
  location?: string;
  bio?: string;
  image?: string;
}

const Profile: React.FC = () => {
  const [user, setUser] = useState<UserType | null>();
  const [loading, setLoading] = useState<boolean>(true);

  const fetchProfile = async (token: string) => {
  try {
    const data = await GetUserProfile(token);

    if (data?.user) {
      setUser(data.user);
    } else {
      toast.error("Profile not found");
    }
  } catch (error: any) {
    toast.error(error?.response?.data?.message || "Error to fetch profile");
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("Token:" , token)
    if (token) {
      fetchProfile(token);
    } else {
      toast.error("Token not provided");
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-white">
        Loading Profile...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex justify-center items-center text-white">
        No Profile Data Found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-6">
      <div className="bg-gray-900 text-white rounded-2xl shadow-2xl w-full max-w-4xl p-6 md:p-10">
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Profile Image */}
          <div className="relative">
            <img
              src={user.image || "https://i.pravatar.cc/300"}
              alt="profile"
              className="w-40 h-40 rounded-full object-cover border-4 border-gray-700"
            />
          </div>

          {/* Profile Info */}
          <div className="flex-1">
            <h2 className="text-3xl font-bold">{user.name}</h2>
            <p className="text-gray-400 mt-1">{user.email}</p>

            <div className="mt-4 space-y-2">
              <p>
                <span className="font-semibold text-gray-300">Phone: </span>
                {user.phone || "Not Provided"}
              </p>

              <p>
                <span className="font-semibold text-gray-300">Location: </span>
                {user.location || "Not Provided"}
              </p>

              <p>
                <span className="font-semibold text-gray-300">Bio: </span>
                {user.bio || "Not Provided"}
              </p>
            </div>

            <button className="mt-6 px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition">
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;