import axios from "axios";

const API_URI = "http://localhost:3002/products";

export const getAll = async (req, res) => {
    const { data: products } = await axios.get(`${API_URI}`);
    res.json(products);
};
export const get = async function (req, res) {
    const { data: product } = await axios.get(`${API_URI}/${req.params.id}`);
    res.json({
        message: "Detail product",
        data: product,
    });
};
export const create = async function (req, res) {
    const { data: product } = await axios.post(`${API_URI}`, req.body);
    res.json({
        message: "Thêm sản phẩm thành công",
        data: product,
    });
};
export const update = async function (req, res) {
    const { data: product } = await axios.patch(`${API_URI}/${req.params.id}`, req.body);
    res.json({
        message: "Cập nhật sản phẩm thành công",
        data: product,
    });
};
export const remove = async function (req, res) {
    const { data: product } = await axios.delete(`${API_URI}/${req.params.id}`);
    res.json({
        message: "Xóa sản phẩm thành công",
        data: product,
    });
};
