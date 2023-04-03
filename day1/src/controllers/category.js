import axios from "axios";
import Joi from "joi";
import dotenv from "dotenv"
import Category from "../models/category"
import Product from "../models/product";


dotenv.config();
const { API_URI } = process.env;

const categoryShema = Joi.object({
    name: Joi.string().required(),

})
export const getAll = async (req, res) => {

    try {
        // const { data: products } = await axios.get(`${API_URI}/products`);
        const categories = await Category.find()
        if (categories.length === 0) {
            return res.json({
                message: "Không có danh mục nào nào",
            });
        }
        return res.json(categories);
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};
export const get = async function (req, res) {
    try {
        // const { data: product } = await axios.get(`${API_URI}/products/${req.params.id}`);
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.json({
                message: "Không có danh mục nào",
            });
        }
        const products = await Product.find({ categoryId: req.params.id })
        return res.json({ ...category.toObject(), products });
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};
export const create = async function (req, res) {
    try {
        const { error } = categoryShema.validate(req.body);
        if (error) {
            return res.status(400).json({
                message: error.details.map(err => err.message)
            })
        }
        // const { data: product } = await axios.post(`${API_URI}/products`, req.body);
        const category = await Category.create(req.body);
        if (!category) {
            return res.json({
                message: "Không thêm được danh mục",
            });
        }
        return res.json({
            message: "Thêm danh mục thành công",
            category
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};
export const update = async function (req, res) {
    try {
        const { error } = categoryShema.validate(req.body);
        if (error) {
            return res.status(400).json({
                message: error.details.map(err => err.message)
            })
        }
        // const { data: product } = await axios.patch(`${API_URI}/products/${req.params.id}`, req.body);
        // const product = await Product.updateOne({ _id: req.params.id }, req.body)
        const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!category) {
            return res.json({
                message: "Cập nhật danh mục không thành công",
            });
        }
        return res.json({
            message: "Cập nhật danh mục thành công",
            category
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};
export const remove = async function (req, res) {
    try {
        // await axios.delete(`${API_URI}/products/${req.params.id}`);
        // await Product.deleteOne({ _id: req.params.id })
        const category = await Category.findByIdAndDelete(req.params.id);
        return res.json({
            message: "Xóa sản phẩm thành công",
            category
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};
