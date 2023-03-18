import React, { useContext } from "react";
import { Modal, makeStyles } from "@material-ui/core";
import AuthModal from "./AuthModal";
import { AppContext } from "../../store/AppContext";

const useStyles = makeStyles(() => ({
  modal: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const LoginModal = () => {
  const { onToggleModal, showModal } = useContext(AppContext);
  const classes = useStyles();

  return (
    <Modal
      open={showModal}
      onClose={onToggleModal.bind(null, false)}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      className={classes.modal}
    >
      <div>
        <AuthModal />
      </div>
    </Modal>
  );
};

export default LoginModal;
