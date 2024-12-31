import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import UpdateModal from "../components/UpdateModal";
import Swal from "sweetalert2";
import TableRow from "../components/TableRow";
import useAxiosSecure from "../hooks/useAxiosSecure";

const MyCars = () => {
  const { user } = useAuth();
  const [cars, setCars] = useState([]);
  const [sorted, setSorted] = useState("");
  const [selectedCar, setSelectedCar] = useState({});
  const secureAxios = useAxiosSecure();
  // const [loading, setLoading] = useState(true);
  // //   console.log(sorted);
  // //   console.log(cars);
  
  const findOwnCarsData = async () => {
    const { data } = await secureAxios.get(
      `/my-cars?email=${user?.email}&sortType=${sorted}`,
      { withCredentials: true }
    );
    setCars(data);
  };
  
  
  useEffect(() => {
    findOwnCarsData();
    // setLoading(false);
  }, [user?.email, sorted]);

  const handleUpdateCar = (car) => {
    console.log(car);
    setSelectedCar(car);
    document.getElementById("update_modal").showModal();
  };

  const handleDelete = (id) => {
    // console.log(id);

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${import.meta.env.VITE_UNIQUE_URL}/delete-car/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            // console.log(data)
            if (data.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                position: "center",
                text: "Your car has been deleted.",
                icon: "success",
                timer: 2500,
                showConfirmButton: false,
              });
              const remainingCars = cars.filter((car) => car._id !== id);
              setCars(remainingCars);
            }
          })
          .catch((error) => {
            // console.log(error.message);
            Swal.fire({
              position: "center",
              icon: "error",
              title: "Failed to delete",
              showConfirmButton: false,
              timer: 2500,
            });
          });
      }
    });
  };

  // useEffect(() => {
  //   fetch(`${import.meta.env.VITE_UNIQUE_URL}/my-cars?sortType=${sorted}`)
  //     .then((res) => res.json())
  //     .then((data) => setCars(data));
  // }, [sorted]);

  return (
    <div className="pt-8 pb-12 bg-white">
      <div className="lg:px-12 px-8 flex justify-between items-center mb-7">
        <h2 className="md:text-4xl text-3xl font-bold">My Cars</h2>

          <select
            className="select select-success *:font-bold"
            value={sorted}
            onChange={(e) => setSorted(e.target.value)}
          >
            <option defaultValue="Sort Cars By">Sort Cars By</option>
            <option value="Date Added: Newest First">
              Date Added: Newest First
            </option>
            <option value="Date Added: Oldest First">
              Date Added: Oldest First
            </option>
            <option value="Price: Lowest First">Price: Lowest First</option>
            <option value="Price: Highest First">Price: Highest First</option>
          </select>
      </div>

      {cars.length === 0 && (
        <div className="min-h-[calc(100vh-440px)] flex flex-col justify-center items-center gap-y-3">
          <p className="md:text-2xl text-lg text-rose-600 text-center font-bold">
            You did not added any cars, Go to add car page
          </p>

          <Link to="/add-car">
            <button className="btn btn-info text-white font-bold hover:bg-emerald-500 hover:text-white rounded-full text-lg px-8">
              Add a Car
            </button>
          </Link>
        </div>
      )}

      {cars.length !== 0 && (
        <div className="overflow-x-auto lg:px-12 px-6">
          <table className="table">
            <thead>
              <tr className="bg-neutral *:text-white *:font-bold">
                <th>No.</th>
                <th>Car Image</th>
                <th>Car Model</th>
                <th>Daily Rental Price</th>
                <th>Booking Count</th>
                <th>Availability</th>
                <th>Date Added</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cars.map((car, index) => (
                <TableRow
                  key={car?._id}
                  car={car}
                  index={index}
                  handleUpdateCar={handleUpdateCar}
                  handleDelete={handleDelete}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}

      <dialog id="update_modal" className="modal modal-middle">
        {selectedCar && (
          <UpdateModal car={selectedCar} cars={cars} setCars={setCars} />
        )}
      </dialog>
    </div>
  );
};

export default MyCars;
