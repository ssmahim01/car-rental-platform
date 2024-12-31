import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const UpdateModal = ({ car, cars, setCars }) => {
  // const [cars, setCars] = useState([]);
  // console.log(car, cars);

  const {
    model,
    price,
    registrationNumber,
    features,
    description,
    image,
    location
  } = car || {};
  // console.log(car);

  const [carModel, setCarModel] = useState("");
  const [carPrice, setCarPrice] = useState("");
  const [carRegistrationNumber, setCarRegistrationNumber] = useState("");
  const [newAvailability, setNewAvailability] = useState(false);
  const [carFeatures, setCarFeatures] = useState("");
  const [carDescription, setCarDescription] = useState("");
  const [carImage, setCarImage] = useState("");
  const [locationArea, setLocationArea] = useState("");
  // console.log(newAvailability);

  useEffect(() => {
    setCarModel(model);
    setCarPrice(price);
    setNewAvailability(car?.availability);
    setCarRegistrationNumber(registrationNumber);
    setCarFeatures(features);
    setCarDescription(description);
    setCarImage(image);
    setLocationArea(location);
    // console.log(car?.availability);
  }, [car]);

  const handleUpdate = (e) => {
    e.preventDefault();

    const updateCarInfo = {
      model: carModel,
      price: carPrice,
      availability: newAvailability,
      registrationNumber: carRegistrationNumber,
      features: carFeatures,
      description: carDescription,
      image: carImage,
      location: locationArea,
    };

    fetch(`${import.meta.env.VITE_UNIQUE_URL}/update-car/${car?._id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updateCarInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data)
        if (data.modifiedCount > 0) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Successfully updated the car info",
            showConfirmButton: false,
            timer: 2500,
          });

          document.getElementById("update_modal").close();

          const updateCars = cars.map((singleCar) =>
            singleCar?._id === car?._id
              ? { ...car, ...updateCarInfo }
              : singleCar
          );

          setCars(updateCars);
        }
      })
      .catch((error) => {
        // console.log(error.message);
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Failed to update the car info",
          showConfirmButton: false,
          timer: 2500,
        });
      });
  };

  // useEffect(() => {
  //   fetch(`${import.meta.env.VITE_UNIQUE_URL}/cars`)
  //     .then((res) => res.json())
  //     .then((data) => setCars(data));
  // }, []);

  return (
    <div className="w-full flex justify-center items-center">
      <div className="modal-box">
        <h2 className="text-3xl font-bold text-center">Update The Car</h2>
        <div className="divider w-4/5 mx-auto"></div>

        <form className="card-body pt-0" onSubmit={handleUpdate}>
          <div className="flex gap-4 flex-col items-center *:w-full">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold">Car Model</span>
              </label>
              <input
                type="text"
                name="model"
                value={carModel}
                onChange={(e) => setCarModel(e.target.value)}
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
                value={carPrice}
                onChange={(e) => setCarPrice(e.target.value)}
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
                checked={newAvailability}
                onChange={(e) => setNewAvailability(e.target.checked)}
                className="checkbox checkbox-primary"
              />
              <span className="text-gray-700 font-semibold">
                {newAvailability ? "Available" : "Not Available"}
              </span>
            </div>
          </div>

          <div className="flex gap-4 flex-col items-center *:w-full">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold">
                  Vehicle Registration Number
                </span>
              </label>
              <input
                type="text"
                name="registrationNumber"
                value={carRegistrationNumber}
                onChange={(e) => setCarRegistrationNumber(e.target.value)}
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
                value={carFeatures}
                onChange={(e) => setCarFeatures(e.target.value)}
                placeholder="Features (e.g., GPS, AC, etc.)"
                className="input input-bordered"
                required
              />
            </div>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-bold">Description</span>
            </label>
            <textarea
              name="description"
              value={carDescription}
                onChange={(e) => setCarDescription(e.target.value)}
              placeholder="Write your Description"
              className="textarea textarea-bordered textarea-md"
            ></textarea>
          </div>

          <div className="flex gap-4 flex-col items-center *:w-full">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold">Image</span>
              </label>
              <input
                type="url"
                name="image"
                value={carImage}
                onChange={(e) => setCarImage(e.target.value)}
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
                value={locationArea}
                onChange={(e) => setLocationArea(e.target.value)}
                placeholder="Provide a location"
                className="input input-bordered"
                required
              />
            </div>
          </div>

          <div className="form-control mt-6">
            <button className="w-full btn bg-green-500 text-lg text-white/90 hover:btn-accent hover:text-white font-bold rounded-full">
              Save Changes
            </button>
          </div>
        </form>
        <div className="modal-action block px-9 -mt-1">
          <form method="dialog">
            <button className="btn btn-error w-full text-lg text-white font-bold rounded-full">
              Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateModal;