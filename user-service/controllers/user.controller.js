import { User } from "../schemas/user.schema.js"

export const createUser = async (req, res) => {
    const { name, email } = req.body;

    if (!email || !name) {
        return res.status(403).json({
            success: false,
            data: "Please enter all the fields"
        })
    }

    try {
        const user = new User({ name, email });
        await user.save();
        res.status(201).json({
            success: true,
            data: user
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            data: error.message
        })
    }
}

export const getUser = async (req, res) => {
    try {
        const users = await User.find();
        return res.status(200).json({
            success: true,
            data: users
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            data: error.message
        })
    }
}
