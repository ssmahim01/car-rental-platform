import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";
import SharedLogin from "../components/SharedLogin";

const RegistrationPage = () => {
  const { registerUser, updateUserProfile, loginWithGoogle, logOutUser } = useAuth();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    setError("");

    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const photo = form.photo.value;

    if(name.length < 5){
      return setError("Name at least 5 character or long.");
    }

    if(!/^\S+@\S+\.\S+$/.test(email)){
      return setError("Please provide a valid email address.");
    }

    if (password.length < 6) {
      return setError("Password must be at least 6 character.");
    }

    if(photo && !/^(https?:\/\/[^\s]+)$/.test(photo)){
      return setError("Photo URL must be a valid URL starting with https://");
    }

    registerUser(email, password)
    .then((userInfo) => {
      const user = userInfo?.user;
      // console.log(user);

      updateUserProfile({ displayName: name, photoURL: photo })
      .then(() => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: `${user?.displayName} is successfully registered`,
          showConfirmButton: false,
          timer: 2500,
        });
        logOutUser()
      });
      navigate("/log-in");
    })
    .catch(error => {
      // console.log(error.message);
      setError("Failed to register! Please try again");
    })
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
        <h2 className="text-4xl font-bold">Register Here</h2>
        <p className="md:text-base text-sm text-gray-600 text-center font-medium">
          You can register with name, email, password and Photo URL. If you have
          an account, Go to Login page.
        </p>
      </div>

      <div className="border border-gray-200 card bg-base-100 lg:w-2/5 md:w-3/4 w-11/12 mx-auto shadow-md rounded-lg">
        <div className="pt-8">
        <SharedLogin handleGoogleLogin={handleGoogleLogin} />
        </div>

        <div className="w-11/12 mx-auto divider text-gray-600 font-medium">Or register with Email</div>
        
        {error && (
          <p className="mt-5 text-center text-rose-600 font-semibold">
            {error}
          </p>
        )}

        <form className="card-body pt-4" onSubmit={handleRegister}>
          <div className="form-control">
            <label className="label">
              <span className="label-text font-bold">Name</span>
            </label>
            <input
              type="text"
              name="name"
              placeholder="Write your Name"
              className="input input-bordered"
              required
            />
          </div>

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

          <div className="form-control">
            <label className="label">
              <span className="label-text font-bold">Photo URL</span>
            </label>
            <input
              type="url"
              name="photo"
              placeholder="Provide your Photo URL"
              className="input input-bordered"
              required
            />
          </div>

          <div className="form-control mt-6">
            <button className="btn bg-purple-600 text-lg text-white/90 hover:btn-primary hover:text-white font-bold">
              Register
            </button>
          </div>
        </form>

        <p className="text-center font-semibold pb-6">
          Already Have An Existing Account?{" "}
          <Link to="/log-in" className="text-cyan-600 font-bold underline">
            Login Here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegistrationPage;
