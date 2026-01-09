import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/Protected";
import ProductsPage from "./pages/Product";
import ProductDetail from "./pages/ProductDetail";
import { CartWishlistProvider } from "./context/CartWishlistContext";
import Wishlist from "./pages/Wishlist";
import Profile from "./pages/Profile";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";

function App() {
  return (
    <AuthProvider>
      <CartWishlistProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/products" element={<ProductsPage/>} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/wishlist" element={<Wishlist/>} />
          <Route path="/checkout" element={<Checkout/>} />
          <Route path="/cart" element={<Cart/>} />
          {/* <Route path="/order" element={<Order/>} /> */}
          </Route>
        </Routes>
      </Router>
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      </CartWishlistProvider>
    </AuthProvider>
  );
}

export default App;
