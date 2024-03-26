"use client"
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";



const SignupPage = () => {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email : "",
        password: "",
        username: ""
    })

    const onSignUp = async (e: any) => {
        e.preventDefault()
        try {
          const res =  await axios.post("/api/users/signup", user);
          console.log("Signup succes", res.data);
        console.log(user)
              router.push('/login')
        } catch (error) {
            console.log(error)
        }
    }


    return (
         <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="w-full max-w-md bg-white p-8 border rounded-lg  border-gray-300">
                <h1 className="text-2xl font-semibold mb-4 text-center text-black">Create your account</h1>
                <form onSubmit={onSignUp}>
                <div className="mb-4">
                        <label htmlFor="username" className="block text-gray-700 font-medium">Name</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={user.username}
                            onChange={(e) => setUser({...user, username: e.target.value})}
                            className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none text-black focus:border-blue-500"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 font-medium">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={user.email}
                            onChange={(e) => setUser({...user, email: e.target.value})}
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
                            onChange={(e) => setUser({...user, password: e.target.value})}
                            className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 text-black"
                            required
                        />
                    </div>
                    <button type="submit" className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-blue-100 transition duration-300">Create Account</button>
                    <div className="text-black flex gap-2 my-5 justify-center">
                        <p>Have an Account?</p>
                        <p className="text-bold" ><Link href='/login'>Login</Link></p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignupPage;