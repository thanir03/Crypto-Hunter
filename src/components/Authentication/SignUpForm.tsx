import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import { signUpSchema } from "../../config/data-schema";
import { TextField, Button } from "@material-ui/core";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebaseConfig";
import { AppContext } from "../../store/AppContext";
import { FirebaseError } from "firebase/app";
import GoogleButton from "./GoogleButton";
import ShowPassword from "./ShowPassword";
import GithubButton from "./GithubButton";

interface SignUpFormData {
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUpForm = () => {
  const { onChangeAlert, onToggleModal } = useContext(AppContext);
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    setShowPassword(isChecked);
  };
  const data = useFormik<SignUpFormData>({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit(values) {
      // Post request to send data to the firebase servers to authenticate users
      handleCreateUserViaEmail(values.email, values.confirmPassword);
    },
    validationSchema: signUpSchema,
  });

  const handleCreateUserViaEmail = async (email: string, password: string) => {
    try {
      // prettier-ignore
      await createUserWithEmailAndPassword(auth,email,password);
      onToggleModal(false);
      onChangeAlert(true, `Signed up with ${email}`, "success");
    } catch (error) {
      const authError = error as FirebaseError;
      onChangeAlert(true, authError.message, "error");
    }
  };

  return (
    <>
      <form className="login-form" onSubmit={data.handleSubmit}>
        <TextField
          type="email"
          onChange={data.handleChange}
          onBlur={data.handleBlur}
          id="email"
          label="Enter Email"
          variant="filled"
          value={data.values.email}
          autoComplete="on"
        />
        {data.touched.email && <p className="error">{data.errors.email}</p>}
        <TextField
          type={showPassword ? "text" : "password"}
          onChange={data.handleChange}
          onBlur={data.handleBlur}
          id="password"
          label="Enter Password"
          variant="filled"
          value={data.values.password}
          autoComplete="on"
        />
        {data.touched.password && (
          <p className="error">{data.errors.password}</p>
        )}
        <TextField
          type={showPassword ? "text" : "password"}
          onChange={data.handleChange}
          onBlur={data.handleBlur}
          id="confirmPassword"
          label="Confirm Password"
          variant="filled"
          value={data.values.confirmPassword}
          autoComplete="on"
        />
        {data.touched.confirmPassword && (
          <p className="error">{data.errors.confirmPassword}</p>
        )}
        <ShowPassword
          showPassword={showPassword}
          onShowPassword={handleShowPassword}
        />
        <Button
          type="submit"
          style={{ color: "black", backgroundColor: "gold" }}
        >
          Sign Up
        </Button>
      </form>
      <h3 style={{ textAlign: "center", margin: "30px 0px" }}>OR</h3>
      <GoogleButton />
      <GithubButton />
    </>
  );
};

export default SignUpForm;
