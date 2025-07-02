import bcrypt from "bcryptjs";
import User from "../models/user.js";

const createDefaultAdmin= async () => {
    try {
        const existingAdmin = await User.findOne({
            email : "admin@gmail.com"
        })

        if (!existingAdmin) {
            const hashedPassword = await bcrypt.hash('admin@swift', 10);
            const admin = new User({
                name : 'admin',
                email : "admin@gmail.com",
                password : hashedPassword,
                role : 'admin'
            });
            await admin.save();
            console.log('Default admin created');
        }
    }
    catch (err) {
        console.error("Failed to create admin : ", err.message);
    }
}

export default createDefaultAdmin;