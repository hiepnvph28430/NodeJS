
import dotenv from "dotenv"
import joi from "joi"
import Product from "../models/product";

// import { productSchema } from "../schemas/product";
dotenv.config()

const { API_URL } = process.env;
const productSchema = joi.object({
    name: joi.string().required(),
    price: joi.number().required(),
    description: joi.string(),
    quantily: joi.number(),
    categoryId: joi.string().required(),
});

export const getAll = async (req, res) => {
    try {

        // const { data: products } = await axios.get(`${API_URL}/products`);
        const products = await Product.find();
        if (products.length === 0) {
            return res.json({
                message: "Không có sản phẩm nào",
            });
        }
        return res.json(products);
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};
export const get = async function (req, res) {
    try {
        // const { data: product } = await axios.get(`${API_URL}/products/${req.params.id}`);

        const product = await Product.findById(req.params.id).populate("categoryId");
        if (!product) {
            return res.json({
                message: "Không có sản phẩm nào",
            });
        }
        return res.json(product);
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};
export const create = async function (req, res) {
    try {
        const { error } = productSchema.validate(req.body, { abortEarly: false })
        if (error) {
            const errors = error.details.map(err => err.message)
            return res.status(400).json({
                message: errors
            });
        }
        // const { data: product } = await axios.post(`${API_URL}/products`, req.body);
        const product = await Product.create(req.body)
        if (!product) {
            return res.json({
                message: "Không thêm sản phẩm",
            });
        }
        return res.json({
            message: "Thêm sản phẩm thành công",
            data: product,
        });
    } catch (error) {
        return res.status(400).json({
            message: error,
        });
    }
};
export const update = async function (req, res) {
    try {
        // const { data: product } = await axios.patch(`${API_URL}/products/${req.params.id}`, req.body);
        const { error } = productShema.validate(req.body);
        if (error) {
            return res.status(400).json({
                message: error.details[0].message,
            })
        }
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!product) {
            return res.json({
                message: "Cập nhật sản phẩm không thành công",
            });
        }
        return res.json({
            message: "Cập nhật sản phẩm thành công",
            data: product

        });

    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};
export const remove = async function (req, res) {
    try {
        // await axios.delete(`${API_URL}/products/${req.params.id}`);
        const product = await Product.findByIdAndDelete(req.params.id);
        return res.json({
            message: "Xóa sản phẩm thành công",
            product
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};
