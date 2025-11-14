import { Box, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import React, { useState } from "react";

export const EditButton = ({ component, data }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const toggleDialog = () => {
    setDialogOpen((prevState) => !prevState);
  };

  return (
    <Box>
      <IconButton onClick={toggleDialog}>
        <EditIcon />
      </IconButton>
      {dialogOpen &&
        React.cloneElement(component, {
          onCloseDialog: toggleDialog,
          data: data,
        })}
    </Box>
  );
};
