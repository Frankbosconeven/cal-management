import db from "../../../lib/dbConnect";
import User from "../../../models/user";
import bcrypt from "bcryptjs";

async function handler(req, res) {
    if (req.method !== "POST") {
        res.status(405).json({error: "only POST method is allow"});
        return;
    }
    const {name, email, password} = req.body;
    await db.connect();


    // check if the email is not in use
    const emailExists = await User.findOne({ email });

    if (emailExists) {
        res.status(409).json({message: "Email is already exists"});
        await db.disconnect();
        return;
    }
    
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
    })
    await db.disconnect();

    res.status(201).json({user})
}

export default handler