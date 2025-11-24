import { IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import React, { useState } from "react";

export const AddButton = ({ component }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const toggleDialog = () => {
    setDialogOpen((prevState) => !prevState);
  };

  return (
    <>
      <IconButton onClick={toggleDialog} color="primary">
        <AddIcon />
      </IconButton>
      {dialogOpen &&
        React.cloneElement(component, {
          onCloseDialog: toggleDialog,
          isNew: true,
        })}
    </>
  );
};
