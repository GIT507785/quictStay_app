import { useState, useEffect, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, User } from "lucide-react";
import { assets } from "../assets/assets";
import { AppContext } from "../Context/AppContext";

const Navbar = () => {
  // const {userId} = useParams()
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
const {token , setToken} = useContext<any>(AppContext)
  const NavLinks = [
    { name: "Home", path: "/" },
    { name: "Hotels", path: "/hotel-rooms" },
    { name: "About", path: "/about" },
    // { name: "Experience", path: "/experience" },
  ];

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

     

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

    

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div className="flex justify-between items-center px-6 md:px-14 py-3">
        
        {/* Logo */}
        <Link to="/">
          <img src={assets.logo} alt="logo" className="h-10 cursor-pointer" />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8">
          {NavLinks.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              className={({ isActive }) =>
                `font-medium transition ${
                  isActive
                    ? "text-green-500"
                    : isScrolled
                    ? "text-black"
                    : "text-white"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>

        {/* Right Side */}
        <div className="hidden md:flex items-center gap-6">

          {/* Profile Dropdown */}
          <div className="relative group cursor-pointer">
            {token && (
              <User
                size={26}
                className={`${isScrolled ? "text-black" : "text-white"}`}
              />
            )}

            {/* Dropdown */}
            <div className="absolute right-0 mt-3 w-44 bg-white shadow-lg rounded-lg p-4 text-sm text-gray-600 hidden group-hover:block group-hover:visible duration-200  z-50 transition-all">
              <Link
                to="/profile"
                className="block hover:text-black mb-2"
              >
                My Profile
              </Link>

              <Link
                to={`/my-bookings`}
                className="block hover:text-black mb-2"
              >
                My Bookings
              </Link>

              <button onClick={()=> {
                setToken(null);
                localStorage.removeItem("token");
                window.location.href = "/login"
              }} className="hover:text-red-500 cursor-pointer">
                Logout
              </button>
            </div>
          </div>

          {/* Login Button */}
          {!token && (

            <Link to="/login">
            <button
              className={`px-5 py-2 rounded-full transition ${
                isScrolled
                ? "bg-black text-white"
                : "bg-white text-black border border-gray-500"
                }`}
                >
              Login
            </button>
          </Link>
            )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          {isOpen ? (
            <X
              size={28}
              onClick={() => setIsOpen(false)}
              className="cursor-pointer"
            />
          ) : (
            <Menu
              size={28}
              onClick={() => setIsOpen(true)}
              className="cursor-pointer"
            />
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md px-6 py-5 flex flex-col gap-5">
          
          {NavLinks.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `text-lg ${
                  isActive ? "text-green-500" : "text-black"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}

          {/* Mobile Profile */}
          <div className="flex items-center gap-3 mt-4">
            <User size={22} />
            <Link to="/login">
              <button className="bg-black text-white px-5 py-2 rounded-full">
                Login
              </button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;