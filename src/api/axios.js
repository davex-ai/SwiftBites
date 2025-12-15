import axios from "axios"

export const BASE_IMAGE_URL = "https://swiftbites-backend-cwmy.onrender.com";

const api = axios.create({
    baseURL: "https://swiftbites-backend-cwmy.onrender.com/api",
    headers: {
        "Content-Type": "application/json"
    }
})

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token")
    if (token) {
        config.headers.Authorization =  `Bearer ${token}`
    }
    return config
})
export default  api