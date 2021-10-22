import { Alert, Snackbar } from "@mui/material";
import React from "react";

type UseToast = [React.FC, (property: { message: string }) => void];

const defaultToastProperty = {
  message: "",
};

function useToast(): UseToast {
  const [visible, setVisible] = React.useState<boolean>(false);
  const [toastProperty, setProperty] = React.useState<{ message: string }>(
    () => ({
      ...defaultToastProperty,
    })
  );

  const setToast = React.useCallback(
    (property) => {
      setProperty({ ...defaultToastProperty, ...property });
      setVisible(true);
    },
    [setVisible, setProperty]
  );

  // const { message, color, duration, position, buttons } = toastProperty;

  const Toast: React.FC = () => (
    <Snackbar
      open={visible}
      autoHideDuration={1500}
      onClose={() => setVisible(false)}
    >
      <Alert severity="error" sx={{ width: "100%" }}>
        {toastProperty.message}
      </Alert>
    </Snackbar>
  );

  return [Toast, setToast];
}

export default useToast;
