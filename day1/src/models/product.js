
import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        minLength: 3,
    },
    price: {
        type: Number,
    },
    categoryId: {
        type: mongoose.Types.ObjectId,
        ref: "Category"
    }
},
    { timestamps: true, versionKey: false }
)

export default mongoose.model("Product", productSchema);