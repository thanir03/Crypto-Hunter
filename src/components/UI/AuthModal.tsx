import React, { useState } from "react";
import { AppBar, Tab, Tabs, makeStyles } from "@material-ui/core";
import LoginForm from "../Authentication/LoginForm";
import SignUpForm from "../Authentication/SignUpForm";
import ForgetPasswordForm from "../Authentication/ForgetPasswordForm";

const useStyles = makeStyles(() => ({
  appBar: {
    width: "max-content",
    backgroundColor: "#424242",
    color: "white",
    padding: "20px",
    borderRadius: "4px",
  },
}));

enum AuthOption {
  LOGIN = 0,
  SIGNUP = 1,
  FORGOT_PASSWORD = 2,
}

const AuthModal = () => {
  const classes = useStyles();
  const [authOption, setAuthOption] = useState(AuthOption.LOGIN);
  const handleChangeAuthOption = (event: React.ChangeEvent<{}>, value: any) => {
    setAuthOption(value as number);
  };

  return (
    <AppBar position="static" className={classes.appBar}>
      <Tabs onChange={handleChangeAuthOption} value={authOption}>
        <Tab label="LOGIN" tabIndex={AuthOption.LOGIN} />
        <Tab label="SIGN UP" tabIndex={AuthOption.SIGNUP} />
        <Tab label="FORGOT PASSWORD" tabIndex={AuthOption.FORGOT_PASSWORD} />
      </Tabs>
      {authOption === AuthOption.LOGIN && <LoginForm />}
      {authOption === AuthOption.SIGNUP && <SignUpForm />}
      {authOption === AuthOption.FORGOT_PASSWORD && <ForgetPasswordForm />}
    </AppBar>
  );
};

export default AuthModal;
