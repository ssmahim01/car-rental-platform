import { format } from "date-fns";

const TableRow = ({car, index, handleUpdateCar, handleDelete }) => {
  return (
    <tr className="hover *:text-gray-700 *:font-semibold">
      <th>{index + 1}</th>
      <td>
        <img
          className="w-14 h-10 rounded-lg object-cover"
          src={car?.image}
          alt={car?.model}
        />
      </td>
      <td>{car?.model}</td>
      <td>${car?.price}</td>
      <td>{car?.bookingCount}</td>
      <td>{car?.availability ? "Available" : "Unavailable"}</td>
      <td>{new Date(car?.dateAdded).toLocaleDateString()}</td>
      <td className="flex gap-2 items-center">
        <button
          onClick={() => handleUpdateCar(car)}
          className="bg-cyan-500 text-white rounded-xl font-semibold py-2 px-4"
        >
          Update
        </button>

        <button
          onClick={() => handleDelete(car?._id)}
          className="bg-rose-500 text-white rounded-xl font-semibold py-2 px-4"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default TableRow;
