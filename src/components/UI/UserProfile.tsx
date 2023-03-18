import React, { useContext } from "react";
import { AppContext } from "../../store/AppContext";
import Drawer from "@material-ui/core/Drawer";
import DefaultProfile from "../../assets/default-profile.jpg";
import Wishlist from "./Wishlist";

const UserProfile = () => {
  const { user, onLogout, showDrawer, onToggleDrawer } = useContext(AppContext);

  return (
    <Drawer
      anchor="right"
      open={showDrawer}
      onClose={onToggleDrawer.bind(null, false)}
    >
      <div
        style={{
          padding: "30px",
          display: "flex",
          gridTemplateColumns: "repeat(1, 1fr)",
          rowGap: "30px",
          backgroundColor: "black",
          width: "300px",
          flexDirection: "column",
          height: "100vh",
        }}
      >
        <img
          style={{ borderRadius: "50%" }}
          height={200}
          src={user!.photoURL ?? DefaultProfile}
          alt={user!.displayName ?? "User"}
        />
        <h4 style={{ textAlign: "center", color: "white" }}>
          {user!.displayName ?? "USER"}
        </h4>

        <button
          style={{
            backgroundColor: "gold",
            color: "black",
            padding: "10px",
            borderRadius: "10px",
            cursor: "pointer",
          }}
          onClick={onLogout}
        >
          Logout
        </button>
        <Wishlist />
      </div>
    </Drawer>
  );
};

export default UserProfile;

// button
