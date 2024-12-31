import axios from "axios";
import { formatDistanceToNow } from "date-fns";
import { useEffect, useState } from "react";

const RecentListings = () => {
  const [recentCars, setRecentCars] = useState([]);
  // console.log(recentCars);

  const fetchRecentListings = async () => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_UNIQUE_URL}/recent-listings`
    );
    setRecentCars(data);
  };

  useEffect(() => {
    fetchRecentListings();
  }, []);

  return (
    <div className="my-12 lg:px-14 px-6">
      <h2 className="text-center text-gray-800 md:text-4xl text-3xl font-extrabold mb-8">
        Recent Listings
      </h2>

      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10">
        {recentCars.map((car) => (
          <div
            key={car._id}
            className="card bg-base-100 rounded-xl shadow-md hover:shadow-2xl hover:scale-105 transition-transform duration-300"
          >
            <img
              className="w-full h-52 rounded-t-xl"
              src={car?.image}
              alt={car?.model}
            />

            <div className="p-4 space-y-2">
              <h2 className="text-2xl text-gray-900 font-bold">
                Model: <span className="text-gray-700">{car?.model}</span>
              </h2>

              <p className="text-lg text-gray-800 font-bold">
                Daily Price:{" "}
                <span className="text-gray-600">${car?.price}/day</span>
              </p>

              <p className="text-gray-800 text-lg font-bold">
                Availability:{" "}
                <span
                  className={`badge text-white ${
                    car?.availability ? "badge-success" : "badge-error"
                  }`}
                >
                  {car?.availability ? "Available" : "Not Available"}
                </span>
              </p>

              <p className="text-lg text-gray-800 font-bold">
                Booking_count:{" "}
                <span className="text-gray-600">{car?.bookingCount}</span>
              </p>

              <p className="text-lg text-gray-800 font-bold">
                Date Posted:{" "}
                <span className="text-gray-600">
                  Added{" "}
                  {formatDistanceToNow(new Date(car?.dateAdded), {
                    addSuffix: true,
                  })}
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentListings;
