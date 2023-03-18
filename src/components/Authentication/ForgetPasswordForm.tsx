import { Button, TextField } from "@material-ui/core";
import { useFormik } from "formik";
import React, { useContext } from "react";
import { forgetPasswordSchema } from "../../config/data-schema";
import { AppContext } from "../../store/AppContext";
import { auth } from "../../config/firebaseConfig";
import { sendPasswordResetEmail } from "firebase/auth";

const ForgetPasswordForm = () => {
  const { onToggleModal, onChangeAlert, onLogout } = useContext(AppContext);
  const handleForgetPassword = async (data: { email: string }) => {
    try {
      await sendPasswordResetEmail(auth, data.email);
      onToggleModal(false);
      onChangeAlert(
        true,
        `Password reset link is sent to ${data.email} `,
        "success"
      );
      onLogout();
    } catch (error) {
      onChangeAlert(true, "Error changing password.Try again", "error");
    }
  };

  const data = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: handleForgetPassword,
    validationSchema: forgetPasswordSchema,
  });
  return (
    <form
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "10px",
      }}
      onSubmit={data.handleSubmit}
    >
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
      <Button
        type="submit"
        style={{ color: "black", backgroundColor: "gold", marginTop: "30px" }}
      >
        Forget Password
      </Button>
    </form>
  );
};

export default ForgetPasswordForm;
