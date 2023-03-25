import User from "../models/user";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { signinSchemas, signupSchema } from "../schemas/auth";
export const signup = async function (req, res) {
    try {
        const { name, email, password } = req.body;
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
        const token = jwt.sign({ _id: user._id }, "passnay", { expiresIn: "1h" })
        user.password = undefined;
        return res.status(201).json({
            message: "Tạo tài khoản thành công",
            accessToken: token,
            user
        })
    } catch (error) {

    }
}

export const signin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const { error } = signinSchemas.validate({ email, password }, { abortEarly: false })
        if (error) {
            const errors = error.details.map(err => err.message)
            return res.status(400).json({
                message: errors
            })
        }
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({
                message: "Tài khoản không tồn tại"
            })
        }
        // check mật khẩu
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({
                message: "Mật khẩu không chính xác"
            })
        }
        const token = jwt.sign({ _id: user._id }, "passnay", { expiresIn: "1h" })
        user.password = undefined
        return res.status(201).json({
            message: "Đăng nhập thành công",
            accessToken: token,
            user
        })
    } catch (error) {

    }
}