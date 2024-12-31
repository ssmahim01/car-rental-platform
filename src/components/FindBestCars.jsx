import {motion} from "motion/react";
import bestCar1 from "../assets/images/luxurious-best-car.jpg";
import bestCar2 from "../assets/images/white-offRoader-best.jpg";
import { Link } from "react-router-dom";

const FindBestCars = () => {
    return (
        <div className="my-14 lg:px-14 px-8">
            {/* <h2 className="md:text-left text-center md:text-4xl text-3xl font-extrabold mb-8">Find Best Cars</h2> */}

            <div className="flex lg:flex-row flex-col justify-between items-center gap-8">
                <div className="lg:w-1/2 md:block hidden">
                    <motion.img 
                    src={bestCar1}
                    alt="Image of Luxurious Car"
                    animate={{y: [30, 50, 30]}}
                    transition={{duration: 6, repeat: Infinity}}
                    className="lg:w-[450px] md:w-96 h-60 object-cover border-t-8 border-r-8 border-secondary rounded-tr-xl"
                    />

                    <motion.img 
                    src={bestCar2}
                    alt="Image of Luxurious Car"
                    animate={{x: [40, 80, 40]}}
                    transition={{duration: 6, repeat: Infinity}}
                    className="lg:w-[450px] md:w-96 h-60 object-cover border-b-8 border-l-8 border-emerald-500 rounded-bl-xl"
                    />
                </div>

                <div className="md:hidden block space-y-4">
                    <img 
                    src={bestCar1}
                    alt="Image of Luxurious Car"
                    className="w-full object-cover border-t-8 border-r-8 border-secondary rounded-tr-xl"
                    />

                    <img 
                    src={bestCar2}
                    alt="Image of Luxurious Car"
                    className="w-full object-cover border-b-8 border-l-8 border-emerald-500 rounded-bl-xl"
                    />
                </div>

                <div className="md:space-y-5 space-y-3 lg:w-1/2">
                    <h2 className="md:text-5xl text-3xl md:text-left text-gray-800 text-center font-bold">Find & Choice Best Cars</h2>

                    <p className="lg:w-3/4 text-gray-600 font-medium md:text-left text-center">The car rented platform is provide cars for rent. Customers want to explore this platform then they would like to book any cars. Also owner may provide a lower price car which is quality full. Non-logged users cannot show car details and book any cars.</p>

                   <Link to="/my-bookings"><button className="block md:mx-0 mx-auto md:mt-8 mt-5 btn bg-neutral text-white text-lg px-6 font-bold rounded-none">Check Bookings</button></Link>
                </div>
            </div>
        </div>
    );
};

export default FindBestCars;