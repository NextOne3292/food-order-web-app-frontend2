import { CreateRestaurantForm } from "../components/Admin/CreateRestaurantForm";

const CreateRestaurantPage = () => {
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
            <div className="w-full max-w-3xl bg-white shadow-lg rounded-xl p-6">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Add a New Restaurant</h1>
                <CreateRestaurantForm />
            </div>
        </div>
    );
};

export default CreateRestaurantPage;
