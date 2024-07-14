// React Slick css
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Toastify css
import 'react-toastify/ReactToastify.css'

import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import { Layout } from "./components/component";
// Pages
import {
  AddProduct,
  Cart,
  Dashboard,
  Home,
  LogIn,
  NoPageFound,
  Order,
  ProductInfo,
  Products,
  SignUp,
  UpdateProducts,
} from "./pages/pages";
import { ToastContainer } from "react-toastify";


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="" element={<Home />} />
            <Route path="/order" element={<Order />} />
            <Route path="/allproducts" element={<Products />} />
            <Route path="/productinfo/:id" element={<ProductInfo />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/*" element={<NoPageFound />} />
          </Route>
          {/* Login and signup routes */}
          <Route path="/register" element={<SignUp />} />
          <Route path="/login" element={<LogIn />} />
          {/* Add and update Products */}
          <Route path="/addproduct" element={<AddProduct />} />
          <Route path="/updateproduct" element={<UpdateProducts />} />
         
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </>
  );
}

export default App;
