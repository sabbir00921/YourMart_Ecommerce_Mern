import React, { useState } from "react";
import { Link } from "react-router-dom";
import CommonForm from "../../components/common/form";
import { loginFromControls } from "../../../config";
import { useDispatch } from "react-redux";
import { loginUser } from "../../store/auth-slice";
import toastData from "../../lib/toastData";

const initialState = {
  email: "",
  password: "",
};

const Login = () => {
  const { SuccessToast, InfoToast, ErrorToast } = toastData;
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  function onSubmit(e) {
    e.preventDefault();
    dispatch(loginUser(formData)).then((data) => {
      if (data?.payload?.success) {
        SuccessToast(data.payload?.message);
      }else{
        ErrorToast(data.payload?.message);
      }
    });
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Sign in to your account
        </h1>
        <p className="mt-2">
          Don't have an account!!
          <Link
            className="font-medium ml-2 hover:underline text-primary"
            to="/auth/register"
          >
            Register
          </Link>
        </p>
      </div>
      <CommonForm
        fromControls={loginFromControls}
        buttonText={"Sign In"}
        fromData={formData}
        setFromData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default Login;
