import joi from "joi";
export const signupSchema = joi.object({
    name: joi.string(),
    email: joi.string().required().email().messages({
        "string.empty": "Email không được để trống",
        "any.required": "Trường email bắt buộc",
        "string.email": "Email không đúng định dạng"
    }),
    password: joi.string().required().min(6).messages({
        "any.required": "Trường password bắt buộc",
        "string.min": "Password phải có ít nhất {#limit} ký tự",
        "string.empty": "Password không được để trống"
    }),
    confirmPassword: joi.string().valid(joi.ref("password")).required().messages({
        "any.only": "Password không khớp",
        "string.empty": "Confirmpassword không được để trống",
        "any.required": "Trường confirmpassword bắt buộc"
    })
})
export const signinSchemas = joi.object({
    email: joi.string().required().email().messages({
        "string.empty": "Email không được để trống",
        "any.required": "Trường email bắt buộc",
        "string.email": "Email không đúng định dạng"
    }),
    password: joi.string().required().min(6).messages({
        "any.required": "Trường password bắt buộc",
        "string.min": "Password phải có ít nhất {#limit} ký tự",
        "string.empty": "Password không được để trống"
    }),
})