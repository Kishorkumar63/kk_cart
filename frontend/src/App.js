import "./App.css";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Header from "./components/layouts/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ToastContainer } from "react-toastify";
import ProductDetail from "./components/Product/ProductDeatils";
import ProductSearch from "./components/Product/ProductSearch";
import Login from "./components/user/Login";
import Register from "./components/user/Register";
import { useEffect, useState } from "react";
import { loadUser } from "./actions/userAction";
import { useDispatch } from "react-redux";
import Page_Not_Fount from "./components/layouts/Page_Not_Fount";
import Profile from "./components/user/Profile";
import { ProtectedRoute } from "./components/route/ProtectedRoute";
import { UpdateProfile } from "./components/user/UpdateProfile";
import ChangePassword from "./components/user/ChangePassword";
import { ForgotPassword } from "./components/user/ForgotPassword";
import { ResetPassword } from "./components/user/ResetPassword";
import { Cart } from "./components/cart/Cart";
import Shipping from "./components/cart/Shipping";
import { Confirmorder } from "./components/cart/Confirmorder";
import { Payment } from "./components/cart/Payment";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { languages } from "countries-list";
function App() {
  const [stripeApiKey, setStripeApiKey] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser);
    async function getStripeApiKey() {
      const { data } = await axios.get("api/v1/stripeapi");
      setStripeApiKey(data.stripeApiKey)
    }
    getStripeApiKey();
  }, []);
  return (
    <Router>
      <div className="App">
        <HelmetProvider>
          <Header />
          <div className="container conatiner-fluid">
            <ToastContainer theme="dark" />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/search/:keyword"
                element={<ProductSearch />}
              ></Route>
              <Route path="/product/:id" element={<ProductDetail />}></Route>
              <Route path="/login" element={<Login />}></Route>
              <Route path="/register" element={<Register />}></Route>
              <Route
                path="/myprofile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              ></Route>
              <Route
                path="/myprofile/update"
                element={
                  <ProtectedRoute>
                    <UpdateProfile />
                  </ProtectedRoute>
                }
              ></Route>
              <Route
                path="/myprofile/update/password"
                element={
                  <ProtectedRoute>
                    <ChangePassword />
                  </ProtectedRoute>
                }
              ></Route>
              <Route
                path="/password/forgot"
                element={<ForgotPassword />}
              ></Route>
              <Route
                path="/password/reset/:token"
                element={<ResetPassword />}
              ></Route>
              <Route path="/cart" element={<Cart />}></Route>
              <Route
                path="/shipping"
                element={
                  <ProtectedRoute>
                    <Shipping />
                  </ProtectedRoute>
                }
              ></Route>
              <Route
                path="/order/confirm"
                element={
                  <ProtectedRoute>
                    <Confirmorder />
                  </ProtectedRoute>
                }
              ></Route>
{stripeApiKey&&
              <Route
                path="/payment"
                element={
                  <ProtectedRoute>
                    <Elements stripe={loadStripe(stripeApiKey)}>
                      <Payment />
                    </Elements>
                  </ProtectedRoute>
                }
              />
              }
              <Route path="*" element={<Page_Not_Fount />}></Route>
            </Routes>
          </div>

          <Footer />
        </HelmetProvider>
      </div>
    </Router>
  );
}

export default App;
