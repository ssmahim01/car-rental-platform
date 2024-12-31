import { Link } from "react-router-dom";
import errorImg from "../assets/images/error-404.png";

const Error = () => {
    return (
        <div className="lg:my-24 my-16 flex flex-col gap-5 justify-center items-center">
            <img className="lg:w-3/5 w-11/12 lg:h-96 md:h-72 h-60 rounded-xl" src={errorImg} alt="Image of Error not found" />

            <h3 className="lg:text-4xl md:text-3xl text-2xl text-rose-600 font-bold">404: Page Not Found</h3>

            <Link to="/"><button className="btn btn-outline border border-primary rounded-full text-lg text-primary font-bold shadow-md px-6 hover:btn-primary">Back to Home</button></Link>
        </div>
    );
};

export default Error;