import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import React, { useContext } from "react";
import { AppContext } from "../../store/AppContext";

const TIME_TO_CLOSE_ALERT = 3000;

const AlertBar = () => {
  const { alert, onChangeAlert } = useContext(AppContext);

  const handleCloseBar = () => {
    onChangeAlert(false, "", "success");
  };
  return (
    <div>
      <Snackbar
        open={alert.showAlert}
        autoHideDuration={TIME_TO_CLOSE_ALERT}
        onClose={handleCloseBar}
      >
        <MuiAlert
          onClose={handleCloseBar}
          variant="filled"
          elevation={10}
          severity={alert.type}
        >
          {alert.message}
        </MuiAlert>
      </Snackbar>
    </div>
  );
};

export default AlertBar;
