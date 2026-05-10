import React, { useEffect, useMemo, useState } from "react";
import { assets, roomsDummyData } from "../assets/assets";

/* ================= TYPES ================= */

interface CheckboxProps {
  label: string;
  selected?: boolean;
  onChange?: (checked: boolean) => void;
}

interface RadioProps {
  label: string;
  selected?: boolean;
  onChange?: () => void;
}

/* ================= SMALL COMPONENTS ================= */

const CheckboxOptions = ({
  label,
  selected = false,
  onChange = () => {},
}: CheckboxProps) => {
  return (
    <label className="flex gap-3 items-center cursor-pointer mt-2 text-sm">
      <input
        type="checkbox"
        checked={selected}
        onChange={(e) => onChange(e.target.checked)}
        className="accent-black"
      />
      <span className="font-light select-none">{label}</span>
    </label>
  );
};

const RadioButton = ({
  label,
  selected = false,
  onChange = () => {},
}: RadioProps) => {
  return (
    <label className="flex gap-3 items-center cursor-pointer mt-2 text-sm">
      <input
        type="radio"
        name="sortOptions"
        checked={selected}
        onChange={onChange}
        className="accent-black"
      />
      <span className="font-light select-none">{label}</span>
    </label>
  );
};

/* ================= MAIN ================= */

function HotelRooms() {
  const [openFilter, setOpenFilter] = useState(false);

  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedPrices, setSelectedPrices] = useState<string[]>([]);
  const [sort, setSort] = useState("");

  /* DATA */
  const roomTypes = ["Single Bed", "Double Bed", "Family Room", "Luxury Room"];

  const prices = [
    "2500 to 5000",
    "5000 to 10000",
    "10000 to 15000",
    "15000 to 20000",
  ];

  const sortOptions = [
    "Price: Low to High",
    "Price: High to Low",
    "Rating: High to Low",
    "Newest First",
  ];

  /* HANDLERS */
  const handleCheckbox = (
    value: string,
    list: string[],
    setList: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    if (list.includes(value)) {
      setList(list.filter((item) => item !== value));
    } else {
      setList([...list, value]);
    }
  };

  const clearFilters = () => {
    setSelectedTypes([]);
    setSelectedPrices([]);
    setSort("");
  };

  /* ================= FILTER LOGIC ================= */
// const [rooms, setRooms] = useState<any[]>([]);

// 🔹 Fetch data (API call)
//  useEffect(() => {
//   const fetchRooms = async () => {
//     try {
//       const res = await axios.get(`${API_BASE_URL}/api/user/get-all-rooms`);
//       if (res.data.success) {
//         setRooms(res.data.rooms);
//       }
//     } catch (error) {
//       console.error("Error fetching rooms", error);
//     }
//   };

//   fetchRooms();
// }, []);


// 🔹 Filter + Sort (useMemo)
const filteredRooms = useMemo(() => {
  let data = [...roomsDummyData];

  // FILTER BY TYPE
  if (selectedTypes.length > 0) {
    data = data.filter((room) =>
      selectedTypes.includes(room.roomType)
    );
  }

  // FILTER BY PRICE
  if (selectedPrices.length > 0) {
    data = data.filter((room) => {
      return selectedPrices.some((range) => {
        const [min, max] = range.split(" to ").map(Number);
        return room.price >= min && room.price <= max;
      });
    });
  }

  // SORTING
  if (sort === "Price: Low to High") {
    data.sort((a, b) => a.price - b.price);
  } else if (sort === "Price: High to Low") {
    data.sort((a, b) => b.price - a.price);
  } else if (sort === "Rating: High to Low") {
    data.sort((a, b) => (b.hotel?.rating || 0) - (a.hotel?.rating || 0));
  } else if (sort === "Newest First") {
    data = [...data].reverse();
  }

  return data;
}, [rooms, selectedTypes, selectedPrices, sort]);
 
   
  


  return (
    <div className="mt-20  flex flex-col-reverse lg:flex-row gap-10 sm:px-24 px-4 mb-10">
      
      {/* LEFT SIDE */}
      <div className="flex-1">
        <h1 className="text-2xl sm:text-3xl font-serif pt-4">
          Hotel Rooms
        </h1>

        <p className="text-gray-600">
          Take advantage of our offers and create unforgettable memories.
        </p> 

         <p> haseeb  <br /> ali , hamza</p>

        <div className="mt-10 space-y-10">
          {filteredRooms.length === 0 ? (
            <p>No rooms found 😢</p>
          ) : (
            filteredRooms.map((item, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row gap-6 border-b pb-6"
              >
                <img
                  src={item.images[0]}
                  className="w-full sm:w-72 h-48 object-cover rounded-xl"
                  alt={item.name}
                />

                <div className="flex-1">
                  <p className="text-gray-500">{item.hotel.address}</p>
                  <h2 className="text-xl font-bold">{item.name}</h2>
                  <p className="font-semibold">{item.hotel.name}</p>

                  <div className="flex gap-2 items-center mt-2">
                    <img src={assets.starIconOutlined} alt="" />
                    <p>{item.hotel.rating} rating</p>
                  </div>

                  <div className="flex gap-1 mt-2">
                    <img src={assets.locationIcon} alt="" />
                    <p className="text-gray-500">{item.hotel.city}</p>
                  </div>

                  <p className="mt-4 font-bold text-lg">
                     {item.price}$
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-4">
                    <div className="flex gap-2 bg-gray-100 rounded px-2 py-1">
                      <img src={assets.freeWifiIcon} alt="" />
                      <p className="text-sm">Free wifi</p>
                    </div>
                    <div className="flex gap-2 bg-gray-100 rounded px-2 py-1">
                      <img src={assets.freeBreakfastIcon} alt="" />
                      <p className="text-sm">Breakfast</p>
                    </div>
                    <div className="flex gap-2 bg-gray-100 rounded px-2 py-1">
                      <img src={assets.roomServiceIcon} alt="" />
                      <p className="text-sm">Room service</p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* RIGHT SIDE FILTER */}
      <div className="w-full lg:w-72">
        <div className="border rounded-lg shadow-sm bg-white">
          
          {/* HEADER */}
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="font-semibold">Filters</h2>

            <div className="flex gap-3 items-center">
              <button
                onClick={clearFilters}
                className="text-sm text-gray-500 hover:text-black"
              >
                Clear
              </button>

              <button
                className="lg:hidden text-sm"
                onClick={() => setOpenFilter(!openFilter)}
              >
                {openFilter ? "Close" : "Open"}
              </button>
            </div>
          </div>

          {/* CONTENT */}
          <div className={`${openFilter ? "block" : "hidden"} lg:block p-4`}>
            
            {/* ROOM TYPE */}
            <p className="font-semibold">Room Type</p>
            {roomTypes.map((item) => (
              <CheckboxOptions
                key={item}
                label={item}
                selected={selectedTypes.includes(item)}
                onChange={() =>
                  handleCheckbox(item, selectedTypes, setSelectedTypes)
                }
              />
            ))}

            {/* PRICE */}
            <p className="font-semibold mt-4">Price</p>
            {prices.map((item) => (
              <CheckboxOptions
                key={item}
                label={item}
                selected={selectedPrices.includes(item)}
                onChange={() =>
                  handleCheckbox(item, selectedPrices, setSelectedPrices)
                }
              />
            ))}

            {/* SORT */}
            <p className="font-semibold mt-4">Sort By</p>
            {sortOptions.map((item) => (
              <RadioButton
                key={item}
                label={item}
                selected={sort === item}
                onChange={() => setSort(item)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HotelRooms;