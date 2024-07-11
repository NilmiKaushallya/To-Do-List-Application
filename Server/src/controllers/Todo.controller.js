import { validationResult } from "express-validator";
import Todo from "../models/Todo.js";
import User from "../models/User.js";
import { StatusCode } from "../utils/constants.js";
import { jsonGenerate } from "../utils/helpers.js";

export const createTodo = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.json(
      jsonGenerate(
        StatusCode.VALIDATION_ERROR,
        "Validation error",
        error.mapped()
      )
    );
  }

  const { title, desc, dueDate } = req.body; // Extract title, desc, and dueDate from req.body

  try {
    const newTodo = {
      userId: req.userId,
      title: title,
      desc: desc,
      dueDate: dueDate || null,  // Set dueDate if provided, otherwise default to null
    };

    const result = await Todo.create(newTodo);

    if (result) {
      await User.findOneAndUpdate(
        { _id: req.userId },
        { $push: { todos: result } }
      );
      return res.json(
        jsonGenerate(StatusCode.SUCCESS, "Todo created successfully", result)
      );
    }
  } catch (error) {
    return res.json(
      jsonGenerate(
        StatusCode.UNPROCESSABLE_ENTITY,
        "Something went wrong",
        error
      )
    );
  }
};
