import { useForm } from "react-hook-form";
import { useMutation, QueryClient } from "react-query";
import { createTodo } from "../api-client";
import { useNavigate } from "react-router-dom";

const CreateForm = () => {
  const navigate = useNavigate(); // Initialize the navigate hook

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const queryClient = new QueryClient();

  const mutation = useMutation(createTodo, {
    onSuccess: () => {
      // Invalidate and refetch the todos after a successful creation
      queryClient.invalidateQueries("todos", {
        onSuccess: () => {
          // Navigate to the home page after invalidating queries
          navigate("/");
        },
      });
    },
    onError: (error) => {
      // Handle the error
      console.error("Error creating todo:", error);
    },
  });

  const onSubmit = (todoData) => {
    try {
      // Use mutation to send the data to the backend
      mutation.mutate(todoData);
      console.log("Todo created successfully");
    } catch (error) {
      console.error("Error creating todo:", error.message);
    }
  };

  return (
    <div className="flex justify-center content-center max-w-96 lg:max-w-[30%] h-fit mx-auto my-auto border-2 p-10 mt-20 rounded-lg">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col flex-1">
        <h1 className="text-2xl md:text-4xl font-bold text-center mb-4">
          Create To-Do
        </h1>

        {/* Title Field */}
        <div className="mt-4">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="w-full text-black text-sm border border-black rounded-md px-2 py-2"
            {...register("title", {
              required: "The title is required.",
              maxLength: {
                value: 30,
                message: "Title cannot exceed 30 characters",
              },
            })}
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}
        </div>

        {/* Description Field */}
        <div className="mt-4">
          <label htmlFor="description">Description</label>
          <textarea
            className="w-full text-black text-sm border border-black rounded-md px-2 py-2"
            {...register("description", {
              required: "The description is required.",
              maxLength: {
                value: 100,
                message: "Description cannot exceed 100 characters",
              },
            })}
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}
        </div>

        {/* Start Date Field */}
        <div className="mt-4">
          <label htmlFor="startDate">Start Date</label>
          <input
            type="date"
            className="w-full text-black text-sm border border-black rounded-md px-2 py-2"
            {...register("startDate", {
              required: "The start date is required.",
            })}
          />
          {errors.startDate && (
            <p className="text-red-500 text-sm">{errors.startDate.message}</p>
          )}
        </div>

        {/* End Date Field */}
        <div className="mt-4">
          <label htmlFor="endDate">End Date</label>
          <input
            type="date"
            className="w-full text-black text-sm border border-black rounded-md px-2 py-2"
            {...register("endDate", {
              required: "The end date is required.",
              validate: (value) =>
                value >= new Date().toISOString().split("T")[0] ||
                "End date must be a future date.",
            })}
          />
          {errors.endDate && (
            <p className="text-red-500 text-sm">{errors.endDate.message}</p>
          )}
        </div>

        {/* Priority Field */}
        <div className="mt-4">
          <label htmlFor="priority">Priority</label>
          <select
            className="w-full text-black text-sm border border-black rounded-md px-2 py-2"
            {...register("priority", { required: "Priority is required." })}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>

          {errors.priority && (
            <p className="text-red-500 text-sm">{errors.priority.message}</p>
          )}
        </div>

        {/* Status Field */}
        <div className="mt-4">
          <label htmlFor="status">Status</label>
          <select
            className="w-full text-black text-sm border border-black rounded-md px-2 py-2"
            {...register("status", { required: "Status is required." })}
          >
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
          {errors.status && (
            <p className="text-red-500 text-sm">{errors.status.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="mt-6">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded"
          >
            Create Todo
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateForm;
