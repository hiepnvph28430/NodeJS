import jwt from "jsonwebtoken"
import User from "../models/user"


export const checkPermission = async (req, res, next) => {
    try {
        // kiểm tra xem user có đăng nhập không
        if (!req.headers.authorization) {
            throw new Error("Bạn cần phải đăng nhập để thực hiện hành động này")
        }

        // lấy jwt token từ headers
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, "passnay", async (err, payload) => {
            if (err) {
                if (err.name === "JsonWebTokenError") {
                    return res.json({
                        message: "Token không hợp lệ",
                    });
                }
                if (err.name === "TokenExpiredError") {
                    return res.json({
                        message: "Token hết hạn",
                    });
                }
            }
            // Xác thực jwt token
            // const { _id } = jwt.verify(token, "passnay");


            // lấy thông tin user từ database
            const user = await User.findById(payload._id)

            // kiểm tra xem user có quyền thực hiện chức năng này không
            if (user.role != "admin") {
                return res.json({
                    message: "Bạn không có quyền để thực hiện hành động này",
                });
            }
            console.log("user", user)
            // lưu thông tin user vào request để sử dụng trong các middleware khác
            req.user = user;

            next();
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
}