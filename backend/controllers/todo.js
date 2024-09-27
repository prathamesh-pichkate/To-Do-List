import Todo from "../modules/todo.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

// Create Todo:
const createTodo = async (req, res, next) => {
  try {
    // 1. Parse the request body for title, description, status, startDate, endDate, and priority.
    const { title, description, status, startDate, endDate, priority } =
      req.body;

    // 2. Validate that required fields (title, description, startDate, and endDate) are present.
    if (
      !title ||
      !description ||
      !status ||
      !startDate ||
      !endDate ||
      !priority
    ) {
      throw new ApiError(400, "All the fields are required!");
    }

    // 3. Check that the endDate is greater than the startDate.
    if (new Date(endDate) < new Date(startDate)) {
      throw new ApiError(400, "End date should be greater than start date!");
    }

    // 4. Calculate the timespan in hours based on startDate and endDate.
    const timespan =
      (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60); // Timespan in hours

    // 5. Create a new document using the Todo model and save it to the database.
    const newTodo = new Todo({
      title,
      description,
      status,
      startDate,
      endDate,
      priority,
      timespan,
    });

    await newTodo.save();

    // 6. Send a success response with the created to-do item.
    res
      .status(201)
      .json(new ApiResponse(201, newTodo, "Todo created successfully!"));
  } catch (error) {
    next(error); // Forward the error to error-handling middleware
  }
};

//update the todo
const updateTodo = async (req, res, next) => {
  try {
    // 1. Find the to-do by ID and update it
    const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    // 2. Check if the Todo was found and updated
    if (!updatedTodo) {
      return res
        .status(404)
        .json(new ApiResponse(404, null, "Todo does not exist"));
    }

    // 3. Send a success response with the updated Todo
    res
      .status(200)
      .json(new ApiResponse(200, updatedTodo, "Todo updated successfully!"));
  } catch (error) {
    next(error); // Forward the error to error-handling middleware
  }
};

//delete todo:
const deleteTodo = async (req, res, next) => {
  try {
    // 1. Fetch the ID from the request parameters
    const todoId = req.params.id;

    // 2. Find and delete the Todo by ID
    const deletedTodo = await Todo.findByIdAndDelete(todoId);

    // 3. Check if the Todo was found and deleted
    if (!deletedTodo) {
      return res
        .status(404)
        .json(new ApiResponse(404, null, "Todo not found!"));
    }

    // 4. Send a success response with the deleted Todo's ID
    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { id: deletedTodo._id },
          "Todo deleted successfully!"
        )
      );
  } catch (error) {
    next(error); // Forward the error to error-handling middleware
  }
};

// Get all todos
const getTodos = async (req, res, next) => {
  try {
    // 1. Fetch all Todos from the database
    const todos = await Todo.find();

    // 2. Check if any Todos were found
    if (todos.length === 0) {
      return res.status(404).json(new ApiResponse(404, [], "No Todos found."));
    }

    // 3. Send the retrieved Todos in the response
    res
      .status(200)
      .json(new ApiResponse(200, todos, "Todos retrieved successfully."));
  } catch (error) {
    next(error);
  }
};

export { createTodo, updateTodo, deleteTodo, getTodos };
