import User from "../models/user";
import bcrypt from "bcryptjs"
import { signupSchema } from "../schemas/auth";
export const signup = async function (req, res) {
    try {
        const { name, email, password, confirmPassword } = req.body;
        const { error } = signupSchema.validate(req.body, { abortEarly: false })
        if (error) {
            const errors = error.details.map((err) => err.message)
            return res.status(400).json({
                message: errors
            })
        }
        const UserExists = await User.findOne({ email })
        if (UserExists) {
            return res.status(400).json({
                message: "User đã tồn tại"
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });
        return res.status(201).json({
            message: "Tạo tài khoản thành công",
            user
        })
    } catch (error) {

    }
}