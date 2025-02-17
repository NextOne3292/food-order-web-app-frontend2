import { useState } from "react";
import { useForm } from "react-hook-form";
import { axiosInstance } from "../../config/axiosInstance";
import { toast } from "react-toastify";

export const CreateRestaurantForm = () => {
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const onSubmit = async (data) => {
        try {
            setLoading(true);
            const formData = new FormData();
            formData.append("name", data.name);
            formData.append("address", data.address);
            formData.append("contact", data.contact);
            formData.append("cuisine", data.cuisine);
            formData.append("image", data.image[0]);

            await axiosInstance.post("/restaurants", formData);
            toast.success("Restaurant created successfully!");
            reset();
        } catch (error) {
            console.error(error);
            toast.error("Error creating restaurant.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-xl border border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Create a New Restaurant</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-4">
                {/* Name */}
                <div className="form-control">
                    <label className="label font-medium">Restaurant Name</label>
                    <input
                        type="text"
                        className="input input-bordered w-full"
                        placeholder="Enter restaurant name"
                        {...register("name", { required: "Name is required" })}
                    />
                    {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
                </div>

                {/* Image Upload */}
                <div className="form-control">
                    <label className="label font-medium">Upload Image</label>
                    <input
                        type="file"
                        className="file-input file-input-bordered w-full"
                        {...register("image", { required: "Image is required" })}
                    />
                    {errors.image && <span className="text-red-500 text-sm">{errors.image.message}</span>}
                </div>

                {/* Address */}
                <div className="form-control">
                    <label className="label font-medium">Address</label>
                    <input
                        type="text"
                        className="input input-bordered w-full"
                        placeholder="Enter address"
                        {...register("address", { required: "Address is required" })}
                    />
                    {errors.address && <span className="text-red-500 text-sm">{errors.address.message}</span>}
                </div>

                {/* Contact */}
                <div className="form-control">
                    <label className="label font-medium">Contact Info</label>
                    <input
                        type="text"
                        className="input input-bordered w-full"
                        placeholder="Enter contact info"
                        {...register("contact", { required: "Contact info is required" })}
                    />
                    {errors.contact && <span className="text-red-500 text-sm">{errors.contact.message}</span>}
                </div>

                {/* Cuisine Type */}
                <div className="form-control">
                    <label className="label font-medium">Cuisine Type</label>
                    <select className="select select-bordered w-full" {...register("cuisine")}> 
                        <option value="Indian">Indian</option>
                        <option value="Chinese">Chinese</option>
                        <option value="Italian">Italian</option>
                        <option value="Mexican">Mexican</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                <button type="submit" className="btn btn-primary w-full mt-4" disabled={loading}>
                    {loading ? "Creating..." : "Create Restaurant"}
                </button>
            </form>
        </div>
    );
};
