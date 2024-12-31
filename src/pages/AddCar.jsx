import { useState } from "react";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";

const AddCar = () => {
  const { user } = useAuth();
  const [availability, setAvailability] = useState(true);
  //   console.log(availability);

  const handleAddCar = (e) => {
    e.preventDefault();

    const model = e.target.model.value;
    const price = e.target.price.value;
    const registrationNumber = e.target.registrationNumber.value;
    const features = e.target.features.value;
    const description = e.target.description.value;
    let bookingCount = e.target.bookingCount.value;
    let image = e.target.image.value;
    const location = e.target.location.value;
    const userDetails = {
      username: user?.displayName,
      photo: user?.photoURL,
      email: user?.email,
    };

    const carInfo = {
      model,
      price,
      availability,
      registrationNumber,
      features,
      description,
      userDetails,
      bookingCount,
      bookingStatus: availability === true ? "Available" : "Not Available",
      dateAdded: new Date().toISOString(),
      image,
      location,
    };

    // console.log(carInfo);

    try {
      fetch(`${import.meta.env.VITE_UNIQUE_URL}/cars`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(carInfo),
      })
        .then((res) => res.json())
        .then((data) => {
          // console.log(data)
          if(data.insertedId){
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Successfully added a car",
              showConfirmButton: false,
              timer: 2500,
            });
          }
        })
        .catch(error => {
          // console.log(error.message);
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Failed to add a car",
            showConfirmButton: false,
            timer: 2500,
          });
        })
    } catch (error) {
      // console.error(error);
    }
  };

  return (
    <div className="pt-7 pb-14 flex flex-col justify-center items-center">
      <div className="text-center mb-6">
        <h2 className="text-4xl font-bold">Add a Car</h2>
      </div>

      <div className="border border-gray-200 card bg-base-100 lg:w-3/5 w-11/12 mx-auto shadow-md rounded-lg">
        <form className="card-body pt-4" onSubmit={handleAddCar}>
          <div className="flex gap-4 md:flex-row flex-col items-center *:w-full">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold">Car Model</span>
              </label>
              <input
                type="text"
                name="model"
                placeholder="Provide Car Model"
                className="input input-bordered"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold">Daily Rental Price</span>
              </label>
              <input
                type="number"
                name="price"
                placeholder="Daily Rental Price"
                className="input input-bordered"
                required
              />
            </div>
          </div>

          <div className="form-control pt-2">
            <div className="flex items-center gap-2 cursor-pointer">
              <label className="label">
                <span className="label-text font-bold">Availability :</span>
              </label>

              <input
                type="checkbox"
                name="availability"
                checked={availability}
                onChange={(e) => setAvailability(e.target.checked)}
                className="checkbox checkbox-primary"
              />
              <span className="text-gray-700 font-semibold">{availability ? "Available" : "Not Available"}</span>
            </div>
          </div>

          <div className="flex gap-4 md:flex-row flex-col items-center *:w-full">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold">
                  Vehicle Registration Number
                </span>
              </label>
              <input
                type="text"
                name="registrationNumber"
                placeholder="Vehicle Registration Number"
                className="input input-bordered"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold">Features</span>
              </label>
              <input
                type="text"
                name="features"
                placeholder="Features (e.g., GPS, AC, etc.)"
                className="input input-bordered"
                required
              />
            </div>
          </div>

          <div className="flex gap-4 md:flex-row flex-col *:w-full">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-bold">Description</span>
            </label>
            <textarea
              name="description"
              placeholder="Write your Description"
              className="textarea textarea-bordered"
            ></textarea>
          </div>

          <div className="form-control">
              <label className="label">
                <span className="label-text font-bold">Booking Count</span>
              </label>
              <input
                type="number"
                name="bookingCount"
                value={0}
                readOnly
                placeholder="Booking Count"
                className="input input-bordered"
                required
              />
            </div>
          </div>

          <div className="flex gap-4 md:flex-row flex-col items-center *:w-full">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold">Image URL</span>
              </label>
              <input
                type="url"
                name="image"
                placeholder="Provide URL of image"
                className="input input-bordered"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold">Location</span>
              </label>
              <input
                type="text"
                name="location"
                placeholder="Provide a location"
                className="input input-bordered"
                required
              />
            </div>
          </div>

          <div className="form-control mt-6 lg:w-3/5 md:w-3/4 mx-auto w-full">
            <button className="w-full btn bg-emerald-500 text-lg text-white/90 hover:btn-accent hover:text-white font-bold rounded-full">
              Add Car
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCar;
