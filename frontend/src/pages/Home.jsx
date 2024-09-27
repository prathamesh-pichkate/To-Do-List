import { useQuery, useMutation, useQueryClient } from "react-query"; // Import useMutation
import { allTodos, deleteTodo } from "../api-client"; // Import deleteTodo
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const queryClient = useQueryClient(); // Initialize query client

  // Fetch all todos using React Query
  const { data, error, isLoading, isError } = useQuery("todos", allTodos);

  // Mutation for deleting a todo
  const mutation = useMutation(deleteTodo, {
    onSuccess: () => {
      // Invalidate and refetch todos after successful deletion
      queryClient.invalidateQueries("todos");
    },
    onError: (error) => {
      console.error("Error deleting todo:", error);
    },
  });

  // Handle loading and error states
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  // Render todos in card format
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Todo Of the day</h1>
      <div className="m-4 flex justify-center">
        <button
          className="bg-purple-600 py-2 px-4 hover:bg-purple-400 text-white rounded-sm"
          onClick={() => navigate("/create-todo")}
        >
          Create New Todo
        </button>
      </div>

      {data?.data.length === 0 ? ( // Check if there are no todos
        <div className="text-center text-gray-600">No todos available.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.data.map((todo) => (
            <div
              key={todo._id}
              className="card bg-gradient-to-br from-gray-200 to-slate-400 p-6 rounded-lg shadow-md transition-transform transform hover:scale-105 hover:shadow-xl"
            >
              <h2 className="text-xl font-semibold mb-2">{todo.title}</h2>
              <p className="mb-2 text-gray-700">{todo.description}</p>
              <p className="mb-2">
                <span className="font-bold">Status:</span> {todo.status}
              </p>
              <p className="mb-2">
                <span className="font-bold">Priority:</span> {todo.priority}
              </p>
              <p className="mb-2">
                <span className="font-bold">Start Date:</span>{" "}
                {new Date(todo.startDate).toLocaleDateString()}
              </p>
              <p className="mb-2">
                <span className="font-bold">End Date:</span>{" "}
                {new Date(todo.endDate).toLocaleDateString()}
              </p>
              <p className="mb-2">
                <span className="font-bold">Timespan:</span> {todo.timespan}{" "}
                hours
              </p>
              <span className="flex flex-row space-x-4">
                <button className="bg-purple-600 py-2 px-4 hover:bg-purple-400 text-white rounded-sm">
                  Edit
                </button>
                <button
                  className="bg-red-400 py-2 px-4 hover:bg-purple-400 text-white rounded-sm"
                  onClick={() => mutation.mutate(todo._id)} // Call deleteTodo with todo ID
                >
                  Delete
                </button>
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
