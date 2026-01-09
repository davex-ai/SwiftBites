//login tastifies invalid credential even tho user email and password is correct
import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import foodtrove from './../assets/foodtrove.png'
import { useAuth } from "../context/AuthContext";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";


export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { login } = useAuth()

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await API.post("/login", { email, password });
            login(data)
            // In your browser console:
console.log(JSON.parse(localStorage.getItem('user')));
            toast.success("Login successful!");
            navigate("/");
        } catch (err) {
            toast.error(err.response?.data?.message || "Login failed");
        }
    };

    return (
        <div>
            <Navbar />
            <div className="flex justify-evenly text-white bg-[#F53E32] h-14 items-center">
                <h2>Login</h2>
                <h2>Home- Login</h2>
            </div>
            <div className="flex justify-center items-center h-screen ">
                <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-96"  >
                    <img src={foodtrove} className="mx-auto" alt="" />
                    <h2 className="mb-2 text-gray-500">Email Address*</h2>
                    <input type="email" placeholder="Enter Your Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full mb-4 p-2 border rounded" />
                    <h2 className="mb-2 text-gray-500">Password*</h2>
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full mb-4 p-2 border rounded" />
                    <div className="flex justify-between mb-6">
                        <div>
                            <input type="checkbox" name="Remember Me" id="rember" className="border-none" />
                            <label htmlFor="rember" className="ml-2 text-gray-500">Remember me</label>
                        </div>
                        <a href="" className=" text-gray-500">Forgot Password</a>
                    </div>
                    <div className="flex justify-between items-center">
                        <button type="submit" className="px-6 bg-[#F53E32] text-white p-2 rounded" > Login </button>
                        <a href="/register" className="text-gray-500">SignUp</a>
                    </div>
                </form>
            </div>
            <Footer />
        </div>
    );
}
