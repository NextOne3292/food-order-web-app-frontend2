
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAddresses, deleteAddress, setSelectedAddress } from "../../redux/addressSlice";
import AddressCard from "../../components/User/AddressCard";

const AddressPage = () => {
  const dispatch = useDispatch();
  const { list, selected, loading, error } = useSelector((state) => state.address);

  useEffect(() => {
    dispatch(fetchAddresses());
  }, [dispatch]);

  const handleDelete = (id) => dispatch(deleteAddress(id));
  const handleSelect = (address) => dispatch(setSelectedAddress(address));

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat py-12 px-4"
      style={{ backgroundImage: "url('/images/pizzaaddress.jpg')" }}
    >
     <div className="max-w-5xl mx-auto bg-white bg-opacity-80 backdrop-blur-md rounded-xl shadow-xl mt-20 p-6 md:p-10">

        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-800 text-center">
          Your Saved Addresses
        </h2>

        {loading && <p className="text-gray-600">Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {list.length === 0 ? (
          <p className="text-gray-600 text-center">No addresses saved yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {list.map((addr) => (
              <AddressCard
                key={addr._id}
                address={addr}
                onDelete={handleDelete}
                onSelect={handleSelect}
                selected={selected?._id === addr._id}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AddressPage;
