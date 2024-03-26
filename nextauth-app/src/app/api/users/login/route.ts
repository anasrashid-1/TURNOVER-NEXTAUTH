import { connect } from '@/dbConfig/dbConnection';
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
export async function POST(request: NextRequest, response: NextResponse) {
    try {
        const connection = await connect();
        const reqBody = await request.json()
        const { email, password } = reqBody;
        console.log(reqBody);

        // Check if user exists
        const [users]: any[] = await connection.execute('SELECT * FROM users WHERE email = ?', [email]);
        const user = users[0];
        if (!user) {
            return NextResponse.json({ error: "User does not exist" }, { status: 400 })
        }
        console.log("user exists");

        // Check if password is correct
        const validPassword = await bcryptjs.compare(password, user.password)
        if (!validPassword) {
            return NextResponse.json({ error: "Invalid password" }, { status: 400 })
        }
        console.log(user);

        // Create token data
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }
        // Create token
        const token = await jwt.sign(tokenData, "sec", { expiresIn: "1d" })
        const response = NextResponse.json({
            message: "Login successful",
            success: true,
        })
        response.cookies.set("token", token, {
            httpOnly: true, 
        })
        return response;
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
