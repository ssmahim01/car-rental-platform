import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const AvailableCars = () => {
  const [cars, setCars] = useState([]);
  const [viewType, setViewType] = useState("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [sorted, setSorted] = useState("");

  // Fetch available cars
  useEffect(() => {
    fetch(
      `${import.meta.env.VITE_UNIQUE_URL}/available-cars?sortType=${sorted}&search=${searchTerm}`
    )
      .then((res) => res.json())
      .then((data) => {
        const filter = data.filter(singleData => singleData.availability);
        setCars(filter);
      })
  }, [sorted, searchTerm]);
 
  return (
    <div className="mt-8 pb-12">
      <div className="flex flex-wrap md:flex-row flex-col md:justify-between justify-center items-center lg:px-12 px-8 mb-5">
        <h2 className="text-3xl font-bold md:mb-0 mb-4">Available Cars</h2>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search by Location"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input input-bordered input-info w-full lg:max-w-sm max-w-xs"
        />
      </div>

      {/* Sorting and View Options */}
      <div className="flex flex-wrap md:flex-row flex-col md:justify-between justify-center items-center lg:px-12 px-8 my-8">
        <select
          className="select select-primary *:font-bold md:mb-0 mb-4"
          value={sorted}
          onChange={(e) => setSorted(e.target.value)}
        >
          <option defaultValue="Sort Cars By">Sort Cars By</option>
          <option value="Date Added: Newest First">
            Date Added: Newest First
          </option>
          <option value="Date Added: Oldest First">
            Date Added: Oldest First
          </option>
          <option value="Price: Lowest First">Price: Lowest First</option>
          <option value="Price: Highest First">Price: Highest First</option>
        </select>

        {/* Toggle View Button */}
        <button
          onClick={() =>
            setViewType((prev) => (prev === "grid" ? "list" : "grid"))
          }
          className={`btn px-8 text-white text-lg rounded-full font-bold ${viewType === "grid" ? "bg-gray-500" : "bg-purple-500"}`}
        >
          {viewType === "grid" ? "List View" : "Grid View"}
        </button>
      </div>

      {/* Display Cars */}
      {cars.length === 0 ? (
        <div className="text-center">
          <p className="text-2xl text-red-500 font-bold">No cars available</p>
        </div>
      ) : (
        <div
          className={`${
            viewType === "grid"
              ? "grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-7 lg:px-12 px-8"
              : "space-y-6 lg:px-12 px-8"
          }`}
        >
          {cars.map((car) => (
            <div
              key={car._id}
              className={`${
                viewType === "grid"
                  ? "card bg-slate-50 shadow-md border border-gray-300 p-4 rounded-xl"
                  : "border border-gray-200 flex md:flex-row flex-col-reverse justify-between md:items-center items-start bg-purple-50 shadow-md p-4 rounded-lg"
              }`}
            >
              {/* Car Image */}
              <img
                src={car?.image}
                alt={car?.model}
                className={`${
                  viewType === "grid"
                    ? "w-full h-48 object-cover rounded-lg mb-4"
                    : "md:mt-0 mt-5 md:w-56 md:h-48 w-full object-cover rounded-lg"
                }`}
              />

              {/* Car Details */}
              <div className={`${viewType === "grid" ? "flex-1" : "md:mr-4"}`}>
                <h3 className="text-2xl font-bold">{car?.model}</h3>
                <p className="text-gray-600">
                  <span className="text-lg text-gray-800 font-semibold">Date Added:</span>{" "}
                  {new Date(car?.dateAdded).toLocaleDateString()}
                </p>
                <p className="text-gray-600">
                  <span className="text-lg text-gray-800 font-semibold">Location:</span>{" "}
                  {car?.location}
                </p>
                <p className="text-gray-600">
                  <span className="text-lg text-gray-800 font-semibold">Price:</span> ${car?.price}/day
                </p>
                <p className="text-gray-600">
                  <span className="text-lg text-gray-800 font-semibold">Availability:</span>{" "}
                  {car?.availability ? "Available" : "Unavailable"}
                </p>

                {/* Book Now Button */}
                <Link to={`/car-details/${car?._id}`}>
                  <button className={`btn btn-info text-white font-bold text-lg ${viewType === "grid" ? "mt-4 px-12 rounded-full" : "mt-2 px-4 rounded-none"}`}>Book Now</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AvailableCars;