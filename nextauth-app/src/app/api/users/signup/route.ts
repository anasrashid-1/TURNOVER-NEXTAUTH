import { NextRequest, NextResponse } from 'next/server';
import { connect } from '@/dbConfig/dbConnection';
import bcryptjs from 'bcryptjs';

export async function POST(request: NextRequest, response: NextResponse) {
    try {
        const connection = await connect();

        const requestBody = await request.json();
        const { username, email, password } = requestBody;

        // Check if user already exists
        const [existingUsers]: any[] = await connection.execute('SELECT * FROM users WHERE email = ?', [email]);
        if (existingUsers && existingUsers.length > 0) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 });
        }

        // Hash password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        // Insert new user
        await connection.execute('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, hashedPassword]);

        return NextResponse.json({ message: "User created successfully" }, { status: 201 });
    } catch (error: any) {
        console.log(error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
