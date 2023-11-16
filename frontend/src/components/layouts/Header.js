import React from "react";
import Search from "./Search";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {  Dropdown, Image } from "react-bootstrap";
import { logout } from "../../actions/userAction";
const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.authState);
  const { items:cartItems } = useSelector((state) => state.cartState);
  const logoutHandler = () => {
    dispatch(logout);
  };
  return (
    <nav className="navbar row">
      <div className="col-12 col-md-3">
        <div className="navbar-brand">
          <Link to="/">
            <img width="170px" src="/images/logo2.png" alt="kk.png" />
          </Link>
        </div>
      </div>

      <div className="col-12 col-md-6 mt-2 mt-md-0">
        <Search />
      </div>

      <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
        {isAuthenticated ? (
          <Dropdown className="d-inline">
            <Dropdown.Toggle
              variant="default text-white pr-5"
              id="dropdown-basic"
            >
              <figure className="avatar avatar-nav">
                <Image
                  width={"50px"}
                  src={user.avatar ?? "./images/default_avatar.jpg"}
                ></Image>
              </figure>
              <span>{user.name}</span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {user.role==="admin" &&  <Dropdown.Item
                onClick={() => navigate("/admin/dashboard")}
                className="text-dark"
              >
               Dashboard
              </Dropdown.Item>}
           
              <Dropdown.Item
                onClick={() => navigate("/myprofile")}
                className="text-dark"
              >
                Profile
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => navigate("/order")}
                className="text-dark"
              >
              Order
              </Dropdown.Item>
              <Dropdown.Item onClick={logoutHandler} className="text-danger">
                LogOut
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        ) : (
          <Link to="/login" className="btn" id="login_btn">
            Login
          </Link>
        )}

        <Link to="/cart"id="cart" className="ml-3">
          Cart
        </Link>
        <span className="ml-1" id="cart_count">
          {cartItems.length}
        </span>
      </div>
    </nav>
  );
};

export default Header;
