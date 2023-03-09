// import http from "http";

// const products = [
//     { id: 1, name: "Product A" },
//     { id: 2, name: "Product B" }
// ]
// const server = http.createServer(function (req, res) {

//     if (req.url == "/") {
//         res.setHeader("Content-Type", "text/html");
//         res.end(`
//             <form action="/api/products" method="post">
//                 <input type="text" name="name"/>
//                 <button type="submit">Add</button>
//             </form>
//         `);
//     }
//     if (req.url === "/api/products" && req.method === "POST") {
//         const body = [];
//         req.on("data", function (chunk) {
//             body.push(chunk); // [ <Buffer 6e 61 6d 65 3d 50 72 6f 64 75 63 74 20 41> ]
//         });
//         req.on("end", function () {
//             const parsedBody = Buffer.concat(body).toString(); // name=Product A
//             const name = parsedBody.split("=")[1]; // Product A
//             console.log(name);
//         });
//         // res.setHeader("Content-Type", "application/json");
//         // res.end(JSON.stringify(products));
//     }
// });

// server.listen(8080, function () {
//     console.log("Server running on port 8080");
// })
import express from "express";
const app = express();
// middleware
app.use(express.json())
// List
app.get("/api/products", async function (req, res) {
    const response = await fetch("https://63f5d86059c944921f67a58c.mockapi.io/products");
    const products = await response.json();
    res.json(products);
});
//signle
app.get("/api/products/:id", async function (req, res) {
    const id = req.params.id;
    const response = await fetch(`https://63f5d86059c944921f67a58c.mockapi.io/products/${id}`);
    const product = await response.json();
    res.json({
        message: "Detail product",
        data: product,
    });
});
//ADD
app.post("/api/products", async function (req, res) {
    const body = req.body;

    const response = await fetch("https://63f5d86059c944921f67a58c.mockapi.io/products", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });
    const product = await response.json();

    res.json({
        message: "Thêm sản phẩm thành công",
        data: product,
    });
});
// UPDATE
app.put("/api/products/:id", async function (req, res) {
    const id = req.params.id;
    const body = req.body;

    const response = await fetch(`https://63f5d86059c944921f67a58c.mockapi.io/products/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });
    const product = await response.json();

    res.json({
        message: "Cập nhật sản phẩm thành công",
        data: product,
    });
});
// DELETE
app.delete("/api/products/:id", async function (req, res) {
    const id = req.params.id;

    const response = await fetch(`https://63f5d86059c944921f67a58c.mockapi.io/products/${id}`, {
        method: "DELETE",
    });
    const product = await response.json();

    res.json({
        message: "Xóa sản phẩm thành công",
        data: product,
    });
});
app.listen(8080, function () {
    console.log("8080")
})