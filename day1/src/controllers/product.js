import axios from "axios";
import dotenv from "dotenv"
import joi from "joi"
const productSchema = joi.object({
    name: joi.string().required(),
    price: joi.number().required(),
    description: joi.string(),
});

dotenv.config()

const { API_URL } = process.env;

export const getAll = async (req, res) => {
    try {

        const { data: products } = await axios.get(`${API_URL}/products`);
        if (products.length === 0) {
            return res.json({
                message: "Không có sản phẩm nào",
            });
        }
        return res.json(products);
    } catch (error) {
        return res.status(400).json({
            message: error,
        });
    }
};
export const get = async function (req, res) {
    try {
        const { data: product } = await axios.get(`${API_URL}/products/${req.params.id}`);
        if (!product) {
            return res.json({
                message: "Không có sản phẩm nào",
            });
        }
        return res.json(product);
    } catch (error) {
        return res.status(400).json({
            message: error,
        });
    }
};
export const create = async function (req, res) {
    try {
        const { error } = productSchema.validate(req.body);
        if (error) {
            return res.status(400).json({
                message: error.details[0].message,
            });
        }
        const { data: product } = await axios.post(`${API_URL}/products`, req.body);
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
        const { data: product } = await axios.patch(`${API_URL}/products/${req.params.id}`, req.body);
        if (!product) {
            return res.json({
                message: "Cập nhật sản phẩm không thành công",
            });
        }
        return res.json({
            message: "Cập nhật sản phẩm thành công",
            data: product,
        });
    } catch (error) {
        return res.status(400).json({
            message: error,
        });
    }
};
export const remove = async function (req, res) {
    try {
        await axios.delete(`${API_URL}/products/${req.params.id}`);
        res.json({
            message: "Xóa sản phẩm thành công",
        });
    } catch (error) {
        return res.status(400).json({
            message: error,
        });
    }
};
