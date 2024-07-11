import { validationResult } from "express-validator";
import Todo from "../models/Todo.js";
import { StatusCode } from "../utils/constants.js";
import { jsonGenerate } from "../utils/helpers.js";

export const UpdateTodo = async (req, res) => {
  // Validate the request
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.json(
      jsonGenerate(
        StatusCode.VALIDATION_ERROR,
        "Todo ID and description are required",
        error.mapped()
      )
    );
  }

  const { todo_id, desc } = req.body;

  try {
    // Find the todo item and update its description
    const todo = await Todo.findOneAndUpdate(
      {
        _id: todo_id,
        userId: req.userId,
      },
      { desc: desc },
      { new: true } // Return the updated document
    );

    if (todo) {
      return res.json(jsonGenerate(StatusCode.SUCCESS, "Todo updated successfully", todo));
    } else {
      return res.json(
        jsonGenerate(StatusCode.NOT_FOUND, "Todo not found or you're not authorized to update it", null)
      );
    }
  } catch (error) {
    console.error(error);
    return res.json(
      jsonGenerate(StatusCode.UNPROCESSABLE_ENTITY, "Could not update the todo", null)
    );
  }
};
