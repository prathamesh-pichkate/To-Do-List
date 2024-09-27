const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
//create the todo:
export const createTodo = async (todoData) => {
  const response = fetch(`${API_BASE_URL}/api/todos/create-todo`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todoData),
  });

  if (!response.ok) {
    throw new Error("Failed to create todo");
  }

  return response.json();
};

export const allTodos = async () => {
  try {
    // Await the fetch call to ensure the promise resolves
    const response = await fetch(`${API_BASE_URL}/api/todos/get-todos`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Check if the response is not OK (e.g., non-200 status code)
    if (!response.ok) {
      throw new Error("Failed to get todos");
    }

    // Await the response's JSON conversion
    const data = await response.json();
    return data; // Return the parsed data
  } catch (error) {
    // Log any errors that occur
    console.error("Error fetching todos:", error);
    throw error; // Rethrow the error to be caught by React Query
  }
};

export const deleteTodo = async (id) => {
  try {
    // Await the fetch call to ensure the promise resolves
    const response = await fetch(
      `${API_BASE_URL}/api/todos/delete-todo/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // Check if the response is not OK (e.g., non-200 status code)
    if (!response.ok) {
      throw new Error("Failed to delete todo");
    }

    // Await the response's JSON conversion
    const data = await response.json();
    return data; // Return the parsed data
  } catch (error) {
    // Log any errors that occur
    console.error("Error deleting todo:", error);
    throw error; // Rethrow the error to be caught by React Query
  }
};
