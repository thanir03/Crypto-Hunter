import React, { useContext, useState } from "react";
import { TextField, Button } from "@material-ui/core";
import { useFormik } from "formik";
import { loginSchema } from "../../config/data-schema";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebaseConfig";
import { AppContext } from "../../store/AppContext";
import { FirebaseError } from "firebase/app";
import GoogleButton from "./GoogleButton";
import ShowPassword from "./ShowPassword";
import GithubButton from "./GithubButton";

interface LoginFormData {
  email: string;
  password: string;
}

const LoginForm = () => {
  const { onChangeAlert, onToggleModal } = useContext(AppContext);
  const [showPassword, setShowPassword] = useState(false);
  const data = useFormik<LoginFormData>({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit(values) {
      handleLoginViaEmail(values.email, values.password);
    },
    validationSchema: loginSchema,
  });

  const handleLoginViaEmail = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      onToggleModal(false);
      onChangeAlert(true, `Signed in successfully with ${email}`, "success");
    } catch (error) {
      const authError = error as FirebaseError;
      onChangeAlert(true, authError.message, "error");
    }
  };

  const handleShowPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    setShowPassword(isChecked);
  };

  return (
    <>
      <form className="login-form" onSubmit={data.handleSubmit}>
        <TextField
          type="email"
          onChange={data.handleChange}
          color="primary"
          onBlur={data.handleBlur}
          id="email"
          label="Enter Email"
          variant="filled"
          value={data.values.email}
          autoComplete="on"
        />
        {data.touched.email && data.errors.email && (
          <p className="error">{data.errors.email}</p>
        )}
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
        {data.touched.password && data.errors.password && (
          <p className="error">{data.errors.password}</p>
        )}
        <ShowPassword
          showPassword={showPassword}
          onShowPassword={handleShowPassword}
        />
        <Button
          type="submit"
          style={{ color: "black", backgroundColor: "gold" }}
        >
          Login
        </Button>
      </form>

      <h3 style={{ textAlign: "center", margin: "30px 0px" }}>OR</h3>
      <GoogleButton />
      <GithubButton />
    </>
  );
};

export default LoginForm;

// Email-Password Login Option
// Email Input
// Password Input
// Login Button

// Oauth login option
// Sign in with google
// Sign in with github
