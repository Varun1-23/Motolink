import mongoose from "mongoose";
import dotenv from 'dotenv'
import bcrypt from "bcryptjs";
import Admin from './models/admin.models.js'

dotenv.config()

const createAdmin = async () => {
    await mongoose.connect(process.env.MONGODB_URI)

    const existingAdmin = await Admin.findOne({ email: process.env.ADMIN_EMAIL})
    if(existingAdmin)
    {
        console.log('admin exists');
        return process.exit(0)
    }

    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10)

    await Admin.create({
        username: 'admin',
        email: process.env.ADMIN_EMAIL,
        password: hashedPassword,
        role: 'admin'
    })

    console.log('admin created successfully');
    process.exit(0)
}

createAdmin()