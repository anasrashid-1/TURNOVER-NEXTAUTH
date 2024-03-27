"use client"
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

const LoginPage = () => {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: ""
    })

    const onLogin = async (e: any) => {
        e.preventDefault()
        try {
            const res = await axios.post("/api/users/login", user);
            console.log("login success", res.data);
            console.log(user)
            router.push('/')
        } catch (error) {
            console.log(error)
        }
    }
        ;
    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="w-full max-w-md bg-white p-8 border rounded-lg  border-gray-300">
            <h1 className="text-2xl font-semibold mb-6 text-center text-black">Login</h1>
            <h1 className="text-lg mb-2 text-center text-black">Welcome back to ECOMMERCE</h1>
            <h1 className="text-sm mb-4 text-center text-black">The next gen business marketplace</h1>

                <form onSubmit={onLogin}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 font-medium">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={user.email}
                            onChange={(e) => setUser({ ...user, email: e.target.value })}
                            className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none text-black focus:border-blue-500"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700 font-medium">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={user.password}
                            onChange={(e) => setUser({ ...user, password: e.target.value })}
                            className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none text-black focus:border-blue-500"
                            required
                        />
                    </div>
                    <button type="submit" className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-blue-100 transition duration-300">Login</button>
                    <div className="text-black flex gap-2 my-5 justify-center">
                        <p>Dont have an Account?</p>
                        <p className="text-bold" ><Link href='/signup'>Sign Up</Link></p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginPage;

