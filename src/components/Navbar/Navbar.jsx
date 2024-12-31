import { NavLink, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import "./Navbar.css";

const Navbar = () => {
  const { user, logOutUser } = useAuth();
  const navigate = useNavigate();

  const handleLogOut = () => {
    logOutUser().then(() => {
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "Logged out successfully",
        showConfirmButton: false,
        timer: 2500,
      });

      navigate("/");
    });
  };

  const routes = (
    <div className="flex lg:flex-row flex-col lg:items-center gap-3">
        <NavLink to="/">Home</NavLink>
      <li className="lg:block hidden">|</li>
        <NavLink to="/available-cars">Available Cars</NavLink>
      <li className="lg:block hidden">|</li>
      {!user && (
          <NavLink to="/log-in">Log-in</NavLink>
      )}
      {user && (
        <>
            <NavLink to="/add-car">Add Car</NavLink>
          <li className="lg:block hidden">|</li>
            <NavLink to="/my-cars">My Cars</NavLink>
          <li className="lg:block hidden">|</li>
            <NavLink to="/my-bookings">My Bookings</NavLink>
          <li className="lg:block hidden">|</li>

            <button onClick={handleLogOut} className="text-rose-600 font-bold">
              Logout
            </button>
          <div
            className="tooltip tooltip-bottom"
            data-tip={`${user?.displayName}`}
          >
            <img
              className="hidden lg:block w-12 h-12 rounded-full border-4 border-warning"
              src={user?.photoURL}
              alt={user?.displayName}
              referrerPolicy="no-referrer"
            />
          </div>
        </>
      )}
    </div>
  );
  return (
    <div className="navbar justify-between bg-base-100 shadow-md fixed z-10 lg:px-14 px-6">
      <div className="navbar-start">
        <div className="flex gap-2 items-center">
          <img
            className="w-10 h-10 md:w-8 md:h-8 rounded-xl"
            src="car-rental-96.png"
            alt="Logo of Car rental"
          />
          <h2 className="text-2xl text-gray-800 font-bold">Car Rental</h2>
        </div>
      </div>
      <div className="dropdown">
        <div
          tabIndex={0}
          role="button"
          className="btn btn-ghost lg:hidden bg-cyan-500 text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h8m-8 6h16"
            />
          </svg>
        </div>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[10] mt-3 w-56 p-2 right-2 shadow-md *:text-gray-700 *:font-bold"
        >
          <div
            className="tooltip tooltip-bottom"
            data-tip={`${user?.displayName}`}
          >
            {user && (
              <img
                className="block mx-auto lg:hidden mb-4 w-14 h-14 rounded-full border-4 border-warning"
                src={user?.photoURL}
                referrerPolicy="no-referrer"
                alt={user?.displayName}
              />
            )}
          </div>
          {routes}
        </ul>
      </div>
      <div className="navbar-end hidden lg:flex">
        <ul className="menu menu-horizontal px-1 *:text-gray-700 *:font-bold">
          {routes}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
