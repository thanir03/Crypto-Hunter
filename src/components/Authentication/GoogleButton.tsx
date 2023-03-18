import React, { useContext } from "react";
import GoogleLogo from "../../assets/google-logo.png";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../config/firebaseConfig";
import { AppContext } from "../../store/AppContext";
import { FirebaseError } from "firebase/app";

const GoogleButton = () => {
  const { onChangeAlert, onToggleModal } = useContext(AppContext);
  const handleSignInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      onChangeAlert(true, `Signed in with ${result.user.email}`, "success");
      onToggleModal(false);
    } catch (error) {
      const authError = error as FirebaseError;
      onChangeAlert(true, `Signed in with ${authError.message}`, "error");
    }
  };
  return (
    <button
      onClick={handleSignInWithGoogle}
      style={{
        color: "black",
        backgroundColor: "white",
        display: "flex",
        gap: "10px",
        padding: 10,
        justifyContent: "center",
        alignItems: "center",
        fontSize: "16px",
        cursor: "pointer",
        border: "white",
      }}
    >
      <img src={GoogleLogo} height={25} alt="Google Logo" />
      <p>SIGN IN WITH GOOGLE</p>
    </button>
  );
};

export default GoogleButton;
