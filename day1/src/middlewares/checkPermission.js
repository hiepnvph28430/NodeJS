import jwt from "jsonwebtoken";
import User from "../models/user"

export const checkPermission = async (req, res, next) => {
    try {
        // check đăng nhập
        if (!req.headers.authorization) {
            throw new Error("Bạn cần đăng nhập để thực hiện chắc năng này")
        }

        // lấy jwt token từ header
        const token = req.headers.authorization.split(" ")[1];

        // xác thực jwt token 
        const { _id } = jwt.verify(token, "passnay");

        // lấy thông tin user từ database
        const user = await User.findById(_id);
        // kiểm tra xem user có quyền thực hiện hành động này không
        if (user.role != "admin") {
            return res.status(400).json({
                message: "Bạn không có quyền thực hiện hành động này"
            })
        }
        console.log("user", user)
        // lưu thông tin user vào request để sử dụng trong middleware khác 
        req.user = user;
        next();
    } catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
}