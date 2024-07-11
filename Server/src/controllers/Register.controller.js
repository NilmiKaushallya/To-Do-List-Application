import { validationResult } from "express-validator";
import { jsonGenerate } from "../utils/helpers.js";
import { StatusCode, JWT_TOKEN_SECRET } from "../utils/constants.js";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import Jwt from 'jsonwebtoken';

const Register = async (req, res) => {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(StatusCode.VALIDATION_ERROR).json(
            jsonGenerate(StatusCode.VALIDATION_ERROR, "Validation error", errors.mapped())
        );
    }

    const { name, username, password, email } = req.body;

    try {
        // Check if user or email already exists
        const userExist = await User.findOne({ $or: [{ email }, { username }] });
        if (userExist) {
            return res.status(StatusCode.UNPROCESSABLE_ENTITY).json(
                jsonGenerate(StatusCode.UNPROCESSABLE_ENTITY, "User or Email already exists")
            );
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        // Create new user
        const result = await User.create({
            name,
            email,
            password: hashPassword,
            username
        });

        // Generate JWT token
        const token = Jwt.sign({ userId: result._id }, JWT_TOKEN_SECRET);

        // Send success response
        return res.status(StatusCode.SUCCESS).json(
            jsonGenerate(StatusCode.SUCCESS, "Registration successful", { userId: result._id, token })
        );

    } catch (error) {
        console.error(error);
        return res.status(StatusCode.INTERNAL_SERVER_ERROR).json(
            jsonGenerate(StatusCode.INTERNAL_SERVER_ERROR, "Internal Server Error")
        );
    }
};

export default Register;
