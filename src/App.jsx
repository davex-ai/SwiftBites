import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/Protected";
import ProductsPage from "./pages/Product";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/products" element={<ProductsPage/>} />
          <Route element={<ProtectedRoute />}>
          {/* <Route path="/profile" element={<Profile />} /> */}
          </Route>
        </Routes>
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      </Router>
    </AuthProvider>
  );
}

export default App;
