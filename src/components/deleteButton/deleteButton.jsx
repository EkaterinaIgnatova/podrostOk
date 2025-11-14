import { Box, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import { useRequest } from "../../redux/hooks/useRequest";
import { CustomDialog } from "../customDialog/customDialog";
import {
  REQUEST_STATUS_FULFILLED,
  REQUEST_STATUS_PENDING,
} from "../../redux/entities/requests/slice";

export const DeleteButton = ({ id, title, method }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const toggleDialog = () => {
    setDialogOpen((prevState) => !prevState);
  };

  const { requestStatus, sendRequest } = useRequest(method);
  const handleSubmit = () => {
    sendRequest(id);
  };

  if (requestStatus === REQUEST_STATUS_FULFILLED) {
    setDialogOpen(false);
  }

  return (
    <Box>
      <IconButton color="error" onClick={toggleDialog}>
        <DeleteIcon />
      </IconButton>
      <CustomDialog
        isOpen={dialogOpen}
        onCloseDialog={toggleDialog}
        title={title}
        maxWidth="sm"
        showActions
        submitText="Подтвердить"
        onSubmit={handleSubmit}
        loading={requestStatus === REQUEST_STATUS_PENDING}
      ></CustomDialog>
    </Box>
  );
};
