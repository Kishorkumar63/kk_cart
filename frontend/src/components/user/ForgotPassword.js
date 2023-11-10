import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword, clearAuthError } from "../../actions/userAction";
import { toast } from "react-toastify";

export const ForgotPassword = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const {  error, message } = useSelector(
    (state) => state.authState
  );
  const handlerSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", email);
    dispatch(forgotPassword(formData));
  };
  useEffect(() => {
    if (message) {
      toast("profile Updated Successfully", {
        type: "success",
        position: toast.POSITION.BOTTOM_CENTER,
        onOpen: () => {
          dispatch(clearAuthError);
        },
      });
      return;
    }
    if (error) {
        toast("profile Updated Successfully", {
          type: "error",
          position: toast.POSITION.BOTTOM_CENTER,
          onOpen: () => {
            dispatch(clearAuthError);
          },
        });
        return;
      }
  });
  return (
    <div class="row wrapper">
      <div className="col-10 col-lg-5">
        <form onSubmit={handlerSubmit} className="shadow-lg">
          <h1 className="mb-3">Forgot Password</h1>
          <div className="form-group">
            <label htmlFor="email_field">Enter Email</label>
            <input
              type="email"
              id="email_field"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button
            id="forgot_password_button"
            type="submit"
            className="btn btn-block py-3"
          >
            Send Email
          </button>
        </form>
      </div>
    </div>
  );
};
