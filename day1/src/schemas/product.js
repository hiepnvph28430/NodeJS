import joi from "joi";
export const productSchema = joi.object({
    name: joi.string().required().min(6).messages({
        "any.required": "Tên sản phải là trường bắt buộc",
        "string.empty": "Tên sản phẩm không được để trống",
        "string.min": "Tên sản phẩm phải có ít nhất {#limit} ký tự"
    }),
    price: joi.number().required().messages({
        "any.required": "Giá sản phẩm là trường bắt buộc",
        "number.empty": "Giá sản phẩm không được để trống",


    })
})