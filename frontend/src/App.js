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
import { useEffect } from "react";
import { loadUser } from "./actions/userAction";
import { useDispatch } from "react-redux";
import Page_Not_Fount from "./components/layouts/Page_Not_Fount";
import Profile from "./components/user/Profile";
import { ProtectedRoute } from "./components/route/ProtectedRoute";
import { UpdateProfile } from "./components/user/UpdateProfile";

import ChangePassword from "./components/user/ChangePassword";
import { ForgotPassword } from "./components/user/ForgotPassword";
import { ResetPassword } from "./components/user/ResetPassword";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser);
  });
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
                <Route path="/myprofile/update/password" element={<ProtectedRoute><ChangePassword/></ProtectedRoute>   }></Route>
                <Route path="/password/forgot" element={<ForgotPassword/>}></Route>
                <Route path="/password/reset/:token" element={<ResetPassword/>}></Route>
              <Route path="*" element={<Page_Not_Fount/>}></Route>
            </Routes>
          </div>

          <Footer />
        </HelmetProvider>
      </div>
    </Router>
  );
}

export default App;
