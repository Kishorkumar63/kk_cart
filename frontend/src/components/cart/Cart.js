import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { removeItemFromCart } from "../../slices/cartSlice";
export const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.cartState);
  const checkOutHandler = () => {
    navigate("/login?redirect=shipping");
  };
  return (
    <Fragment>
      {items.length === 0 ? (
        <h2 className="mt-5">
          Your Cart Is Empty <b>items</b>
        </h2>
      ) : (
        <Fragment>
          <h2 className="mt-5">
            Your Cart: <b>{items.length} items</b>
          </h2>

          <div className="row d-flex justify-content-between">
            <div className="col-12 col-lg-8">
              {items.map((item) => (
                <Fragment>
                  <hr />
                  <div className="cart-item">
                    <div className="row">
                      <div className="col-4 col-lg-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          height="90"
                          width="115"
                        />
                      </div>

                      <div className="col-5 col-lg-3">
                        <Link to={`/product/${item.product}`}>
                          {" "}
                          {item.name}
                          OPPO F21s Pro 5G (Dawnlight Gold, 8GB RAM, 128
                          Storage) with No Cost EMI/Additional Exchange Offers
                        </Link>
                      </div>

                      <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                        <p id="card_item_price">${item.price}</p>
                      </div>

                      <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                        <div className="stockCounter d-inline">
                          <span className="btn btn-danger minus">-</span>
                          <input
                            type="number"
                            className="form-control count d-inline"
                            value="1"
                            readOnly
                          />

                          <span className="btn btn-primary plus">+</span>
                        </div>
                      </div>

                      <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                        <i
                          onClick={() =>
                            dispatch(removeItemFromCart(item.product))
                          }
                          id="delete_cart_item"
                          className="fa fa-trash btn btn-danger"
                        ></i>
                      </div>
                    </div>
                  </div>
                </Fragment>
              ))}

              <hr />
            </div>

            <div className="col-12 col-lg-3 my-4">
              <div id="order_summary">
                <h4>Order Summary</h4>
                <hr />
                <p>
                  Subtotal:{" "}
                  <span className="order-summary-values">
                    {items.reduce((acc, item) => acc + item.quantity, 0)}{" "}
                    (Units)
                  </span>
                </p>
                <p>
                  Est. total:{" "}
                  <span className="order-summary-values">
                    {items.reduce(
                      (acc, item) => acc + item.quantity * item.price,
                      0
                    )}
                  </span>
                </p>

                <hr />
                <button
                  onClick={checkOutHandler}
                  id="checkout_btn"
                  className="btn btn-primary btn-block"
                >
                  Check out
                </button>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};
