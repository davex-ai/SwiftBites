import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import foodtrove from './../assets/foodtrove.png'
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
// import Footer from "../components/Footer";

export default function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [address, setAddress] = useState("");
    const [phoneNo, setPhoneNo] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const navigate = useNavigate();
    const { login } = useAuth()

    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const { data } = await API.post("/register", { name, email, password, address, phoneNo, city, country });
        login(data)
        toast.success("Registration successful!");
        navigate("/");
    } catch (err) {
        toast.error(err.response?.data?.message || "Registration failed");
    }
};

    return (
        <div>
            <Navbar />
            <div className="flex justify-evenly text-white bg-[#F53E32] h-14 items-center">
                <h2>Register</h2>
                <h2>Home- Register</h2>
            </div>
            <div className="flex justify-center items-center h-screen bg-gray-100">
                <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-96" >
                    <img src={foodtrove} className="mx-auto" alt="" />
                    <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="w-full mb-4 p-2 border rounded" />
                    <div className="flex gap-6">
                        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full mb-4 p-2 border rounded" />
                        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full mb-4 p-2 border rounded" />
                    </div>
                    <input type="address" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} className="w-full mb-4 p-2 border rounded" />
                    <input type="phone" placeholder="Phone Number" value={phoneNo} onChange={(e) => setPhoneNo(e.target.value)} className="w-full mb-4 p-2 border rounded" />

                    <div className="flex gap-6">
                        <input type="city" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} className="w-full mb-4 p-2 border rounded" />
                        <input type="county" placeholder="Country" value={country} onChange={(e) => setCountry(e.target.value)} className="w-full mb-4 p-2 border rounded" />
                    </div>
                    <div className="flex justify-between items-center">
                        <button type="submit" className="px-4 bg-green-500 text-white p-2 rounded ">Register</button>
                        <a href="/login" className="text-gray-500 hover:underline">Have an account</a>
                    </div>
                </form>
            </div>
        {/* <Footer/> */}
        </div>
    );
}
