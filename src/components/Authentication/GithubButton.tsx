import { signInWithPopup } from "firebase/auth";
import React, { useContext } from "react";
import { auth, githubProvider } from "../../config/firebaseConfig";

import GithubLogo from "../../assets/github.png";
import { AppContext } from "../../store/AppContext";
import { FirebaseError } from "firebase/app";

const GithubButton = () => {
  const { onChangeAlert, onToggleModal } = useContext(AppContext);
  const handleLoginViaGithub = async () => {
    try {
      const result = await signInWithPopup(auth, githubProvider);
      onChangeAlert(
        true,
        `Signed in successfully with ${result.user.email}`,
        "success"
      );
      onToggleModal(false);
    } catch (error) {
      const authError = error as FirebaseError;
      onChangeAlert(true, `${authError.message}`, "error");
    }
  };

  return (
    <button
      onClick={handleLoginViaGithub}
      style={{
        color: "white",
        backgroundColor: "black",
        display: "flex",
        fontSize: "16px",
        alignItems: "center",
        justifyContent: "center",
        gap: "10px",
        padding: "5px",
        marginTop: "10px",
        cursor: "pointer",
      }}
    >
      <img height={30} src={GithubLogo} alt="Github logo" />
      <p>SIGN IN WITH GITHUB</p>
    </button>
  );
};

export default GithubButton;
