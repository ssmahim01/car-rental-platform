import { useState } from "react";
import SharedLogin from "../components/SharedLogin";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";

const LoginPage = () => {
  const { loginWithEmailPass, loginWithGoogle } = useAuth();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLoginWithEmailPass = (e) => {
    e.preventDefault();
    setError("");

    const email = e.target.email.value;
    const password = e.target.password.value;

    if(!/^\S+@\S+\.\S+$/.test(email)){
      return setError("Please provide a valid email address.");
    }

    if (password.length < 6) {
      return setError("Password must be at least 6 character");
    }

    loginWithEmailPass(email, password)
      .then((credentials) => {
        const user = credentials?.user;
        Swal.fire({
          position: "center",
          icon: "success",
          title: `${user?.displayName} is successfully logged in`,
          showConfirmButton: false,
          timer: 2500,
        });
        navigate("/");
      })
      .catch((error) => {
        // console.log(error.message);
        setError("Failed to Log-in");
      });
  };

  const handleGoogleLogin = () => {
    setError("");

    loginWithGoogle()
      .then((credentials) => {
        const user = credentials?.user;
        Swal.fire({
          position: "center",
          icon: "success",
          title: `${user?.displayName} is successfully logged in with Google`,
          showConfirmButton: false,
          timer: 2500,
        });
        navigate("/");
      })
      .catch((error) => {
        // console.log(error.message);

        setError("Failed to Log-in with Google");
      });
  };

  return (
    <div className="pt-7 pb-14 flex flex-col justify-center items-center">
      <div className="text-center mb-6 space-y-2 lg:w-2/6 md:w-3/4 w-11/12">
        <h2 className="text-4xl font-bold">Log-in Here</h2>
        <p className="md:text-base text-sm text-gray-600 text-center font-medium">
          You can login with email/password or Google. If you are a new user,
          first you have to register your account.
        </p>
      </div>

      <div className="border border-gray-200 card bg-base-100 lg:w-2/5 md:w-3/4 w-11/12 mx-auto shadow-md rounded-lg">
        {error && (
          <p className="mt-5 text-center text-rose-600 font-semibold">
            {error}
          </p>
        )}

        <form className="card-body pt-4" onSubmit={handleLoginWithEmailPass}>
          <div className="form-control">
            <label className="label">
              <span className="label-text font-bold">Email</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="Type your Email"
              className="input input-bordered"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-bold">Password</span>
            </label>
            <input
              type="password"
              name="password"
              placeholder="Type your Password"
              className="input input-bordered"
              required
            />
          </div>

          <div className="form-control mt-6">
            <button className="btn btn-info text-lg text-white/90 hover:btn-success hover:text-white font-bold">
              Log In
            </button>
          </div>
        </form>

        <div className="divider w-11/12 mx-auto pb-6 text-gray-600 font-semibold">
          Or
        </div>

        <SharedLogin handleGoogleLogin={handleGoogleLogin} />

        <p className="text-center font-semibold pb-6">
          New user on this site? Please{" "}
          <Link
            to="/registration"
            className="text-purple-600 underline font-bold"
          >
            Register Here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
