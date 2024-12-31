import {
  FaCarAlt,
  FaHeadset,
  FaMoneyBillWave,
  FaRegHandshake,
} from "react-icons/fa";

const WhyChooseUs = () => {
  return (
    <div className="my-12 px-4 md:px-12">
      <div className="text-center mb-8 space-y-2">
        <h2 className="text-3xl font-bold">Why Choose Us?</h2>
        <p className="text-gray-600 font-medium">
          Experience the best car rental service tailored for you.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

        {/* Card 1: Wide Variety of Cars */}
        <div className="flex flex-col items-center text-center p-4 bg-gray-100 rounded-lg shadow hover:shadow-lg transition-all">
          <FaCarAlt className="text-4xl text-blue-500 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Wide Variety of Cars</h3>
          <p className="text-gray-600">
            From budget-friendly options to luxury vehicles, we have it all.
          </p>
        </div>

        {/* Card 2: Affordable Prices */}
        <div className="flex flex-col items-center text-center p-4 bg-gray-100 rounded-lg shadow hover:shadow-lg transition-all">
          <FaMoneyBillWave className="text-4xl text-green-500 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Affordable Prices</h3>
          <p className="text-gray-600">
            Competitive daily rates you can count on.
          </p>
        </div>

        {/* Card 3: Easy Booking Process */}
        <div className="flex flex-col items-center text-center p-4 bg-gray-100 rounded-lg shadow hover:shadow-lg transition-all">
          <FaRegHandshake className="text-4xl text-yellow-500 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Easy Booking Process</h3>
          <p className="text-gray-600 text-sm font-medium">
            Seamlessly book your ride in just a few clicks.
          </p>
        </div>

        {/* Card 4: Customer Support */}
        <div className="flex flex-col items-center text-center p-4 bg-gray-100 rounded-lg shadow hover:shadow-lg transition-all">
          <FaHeadset className="text-4xl text-red-500 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Customer Support</h3>
          <p className="text-gray-600 font-medium">24/7 assistance for all your queries.</p>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;