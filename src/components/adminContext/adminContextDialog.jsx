import { useEffect, useState } from "react";
import { CustomDialog } from "../customDialog/customDialog";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { useRequest } from "../../redux/hooks/useRequest";
import {
  REQUEST_STATUS_FULFILLED,
  REQUEST_STATUS_PENDING,
  REQUEST_STATUS_REJECTED,
} from "../../redux/entities/requests/slice";
import { CustomForm } from "../customForm/customForm";

export const AdminContextDialog = ({ onSetIsAdmin }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleSubmit = (e) => {
    sendRequest(e);
  };

  useEffect(() => {
    const keysArray = [];
    const handleKeyDown = (event) => {
      keysArray.push(event.key);
      if (keysArray.length > 5) keysArray.shift();
      if (keysArray.join("") === "admin") {
        setTimeout(() => {
          setDialogOpen(true);
        });
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const checkPassword = createAsyncThunk(
    "password/checkPassword",
    async (password) => {
      const response = await fetch(
        `https://podrostok-syktyvkar.ru/api/checkPassword`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(password),
        }
      );
      const result = await response.json();
      return result;
    }
  );

  const { requestStatus, sendRequest } = useRequest(checkPassword);

  if (requestStatus === REQUEST_STATUS_FULFILLED) {
    onSetIsAdmin();
  }

  return (
    <CustomDialog
      isOpen={dialogOpen}
      onCloseDialog={handleCloseDialog}
      title="Для перехода в режим администратора введите пароль"
    >
      <CustomForm
        formControls={[
          {
            required: true,
            name: "password",
            label: "Пароль",
            type: "password",
            autoFocus: true,
            error: requestStatus === REQUEST_STATUS_REJECTED,
            helperText: "Неверный пароль",
          },
        ]}
        onSubmit={handleSubmit}
        submitText="Отправить"
        onCloseDialog={handleCloseDialog}
        loading={requestStatus === REQUEST_STATUS_PENDING}
      />
    </CustomDialog>
  );
};
