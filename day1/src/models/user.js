
import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 6,
        maxLength: 255
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
    },
    role: {
        type: String,
        default: "member"
    }

},
    { timestamps: true }
)
export default mongoose.model("User", userSchema)