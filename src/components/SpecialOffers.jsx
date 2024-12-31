import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const SpecialOffers = () => {
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    fetch("specialOffers.json")
      .then((res) => res.json())
      .then((data) => setOffers(data));
  }, []);

  return (
    <div className="py-14 lg:px-12 px-6">
      <h2 className="md:text-4xl text-3xl text-center font-extrabold mb-8">
        🎊Special Offers🎊
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {offers.map((offer, index) => (
          <motion.div
            key={index}
            className={`${
              offer?.title === "Get 15% off for weekend rentals!" &&
              "bg-emerald-500"
            } ${offer?.title === "Luxury Cars at $99/day!" && "bg-blue-500"} ${
              offer?.title === "Free GPS with Any Rental!" && "bg-purple-500"
            } rounded-xl shadow-md p-6 transition-all space-y-2 *:text-white/90 text-center`}
            initial={{ opacity: 0, x: -200 }}
            whileHover={{ scale: 1.1 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 4, delay: index * 0.3, ease: "easeInOut"}}
          >
            <h2 className="text-xl font-bold">🎉{offer?.title}🎉</h2>
            <p className="text-sm">{offer?.description}</p>

            <Link to="/available-cars">
              <button
                className={`btn ${
                  offer?.buttonText === "Book Now" && "btn-neutral"
                } ${
                  offer?.buttonText === "Learn More" && "btn-secondary"
                } mt-5 text-white/90 text-lg font-bold px-8 rounded-full border-none`}
              >
                {offer?.buttonText}
              </button>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SpecialOffers;
