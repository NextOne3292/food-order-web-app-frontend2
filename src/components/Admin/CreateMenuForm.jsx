import { useState } from "react";
import { useForm } from "react-hook-form";
import { axiosInstance } from "../../config/axiosInstance";
import { toast } from "react-toastify";

export const CreateMenuForm = () => {
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const onSubmit = async (data) => {
        try {
            setLoading(true);
            const formData = new FormData();
            formData.append("name", data.name);
            formData.append("description", data.description);
            formData.append("price", data.price);
            formData.append("category", data.category);
            formData.append("restaurantId", data.restaurantId);
            formData.append("isAvailable", data.isAvailable);
            formData.append("image", data.image[0]);

            await axiosInstance.post("/menus/create", formData);
            toast.success("Menu item created successfully!");
            reset();
        } catch (error) {
            console.error(error);
            toast.error("Error creating menu item.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-lg mx-auto bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-semibold text-center mb-4">Create Menu Item</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-4">
                {/* Name */}
                <div className="form-control">
                    <label className="label font-medium">Menu Item Name</label>
                    <input
                        type="text"
                        className="input input-bordered w-full"
                        placeholder="Enter item name"
                        {...register("name", { required: "Name is required" })}
                    />
                    {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
                </div>
                
                {/* Description */}
                <div className="form-control">
                    <label className="label font-medium">Description</label>
                    <textarea
                        className="textarea textarea-bordered w-full"
                        placeholder="Enter description"
                        {...register("description", { required: "Description is required" })}
                    />
                    {errors.description && <span className="text-red-500 text-sm">{errors.description.message}</span>}
                </div>
                
                {/* Image */}
                <div className="form-control">
                    <label className="label font-medium">Upload Image</label>
                    <input
                        type="file"
                        className="file-input file-input-bordered w-full"
                        {...register("image", { required: "Image is required" })}
                    />
                    {errors.image && <span className="text-red-500 text-sm">{errors.image.message}</span>}
                </div>
                
                {/* Price */}
                <div className="form-control">
                    <label className="label font-medium">Price</label>
                    <input
                        type="number"
                        className="input input-bordered w-full"
                        placeholder="Enter price"
                        {...register("price", { required: "Price is required" })}
                    />
                    {errors.price && <span className="text-red-500 text-sm">{errors.price.message}</span>}
                </div>
                
                {/* Category */}
                <div className="form-control">
                    <label className="label font-medium">Category</label>
                    <input
                        type="text"
                        className="input input-bordered w-full"
                        placeholder="Enter category"
                        {...register("category", { required: "Category is required" })}
                    />
                    {errors.category && <span className="text-red-500 text-sm">{errors.category.message}</span>}
                </div>
                
                {/* Restaurant ID */}
                <div className="form-control">
                    <label className="label font-medium">Restaurant ID</label>
                    <input
                        type="text"
                        className="input input-bordered w-full"
                        placeholder="Enter restaurant ID"
                        {...register("restaurantId", { required: "Restaurant ID is required" })}
                    />
                    {errors.restaurantId && <span className="text-red-500 text-sm">{errors.restaurantId.message}</span>}
                </div>
                
                {/* Availability */}
                <div className="form-control flex items-center gap-2">
                    <input
                        type="checkbox"
                        className="toggle toggle-primary"
                        {...register("isAvailable")}
                    />
                    <label className="label font-medium">Available</label>
                </div>
                
                <button type="submit" className="btn btn-primary w-full mt-4">
                    {loading ? "Creating..." : "Create Menu Item"}
                </button>
            </form>
        </div>
    );
};
