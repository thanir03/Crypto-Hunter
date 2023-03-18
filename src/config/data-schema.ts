import * as Yup from "yup";

const loginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid Email").required(),
  password: Yup.string().required(),
});

const signUpSchema = Yup.object().shape({
  email: Yup.string().email("Invalid Email").required(),
  password: Yup.string()
    .min(6, "Password Too Short")
    .max(20, "Password Too Long")
    .matches(
      /[!@#$%^&*(),.?":{}|<>\/\\]/g,
      "Password should contain special characters"
    )
    .required(),
  confirmPassword: Yup.string()
    .required("Confirmed Password is required")
    .oneOf([Yup.ref("password")], "Password does not match"),
});

const forgetPasswordSchema = Yup.object().shape({
  email: Yup.string().required().email("Invalid Email"),
});

export { loginSchema, signUpSchema, forgetPasswordSchema };
