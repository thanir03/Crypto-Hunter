import React from "react";

interface ShowPasswordProps {
  showPassword: boolean;
  onShowPassword: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ShowPassword = (props: ShowPasswordProps) => {
  return (
    <div style={{ display: "flex", justifyContent: "space-evenly" }}>
      <label htmlFor="show-pwd">Show Password</label>
      <input
        type="checkbox"
        name="show-pwd"
        id="show-pwd"
        checked={props.showPassword}
        onChange={props.onShowPassword}
      />
    </div>
  );
};

export default ShowPassword;
