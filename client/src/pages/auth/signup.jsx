import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CommonForm from "../../components/common/form";
import toastData from "../../lib/toastData";
import { registerFromControls } from "../../../config";
import { useDispatch } from "react-redux";
import { registerUser } from "../../store/auth-slice";

const initialState = {
  userName: "",
  email: "",
  password: "",
};

const Signup = () => {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { SuccessToast, InfoToast, ErrorToast } = toastData;

  function onSubmit(e) {
    e.preventDefault();
    dispatch(registerUser(formData)).then((data) => {
      if (data.payload.statusCode === 200) {
        navigate("/auth/login");
        SuccessToast(data.payload.message);
      } else {
        ErrorToast(data.payload.message);
      }
    });
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Create new account
        </h1>
        <p className="mt-2">
          Already have an account
          <Link
            className="font-medium ml-2 hover:underline text-primary"
            to="/auth/login"
          >
            Login
          </Link>
        </p>
      </div>
      <CommonForm
        fromControls={registerFromControls}
        buttonText={"Sign Up"}
        fromData={formData}
        setFromData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default Signup;
