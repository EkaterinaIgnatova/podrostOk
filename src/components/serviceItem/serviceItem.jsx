import { Box, Button, Grid, useMediaQuery } from "@mui/material";
import { CustomDialog } from "../customDialog/customDialog";
import { selectServiceById } from "../../redux/entities/services/slice";
import { useSelector } from "react-redux";
import { useState } from "react";

export const ServiceItem = ({ id }) => {
  const service = useSelector((state) => selectServiceById(state, id));

  const [dialogOpen, setDialogOpen] = useState(false);

  const toggleReviewDialog = () => {
    setDialogOpen((prevState) => !prevState);
  };

  const matches = useMediaQuery((theme) => theme.breakpoints.up("sm"));
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: matches ? "row" : "column",
          gap: "8px",
          alignItems: "center",
          padding: "0 16px",
          boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.2)",
        }}
      >
        <h3 style={{ textTransform: "uppercase" }}>{service.title}</h3>
        <Button
          onClick={toggleReviewDialog}
          variant="contained"
          sx={{ width: matches ? "auto" : "100%", flexShrink: "0" }}
        >
          Подробнее
        </Button>
      </Box>

      <CustomDialog
        isOpen={dialogOpen}
        onCloseDialog={toggleReviewDialog}
        title={service.title}
        maxWidth="md"
        showActions={false}
      >
        <Grid
          container
          spacing={4}
          sx={{
            display: "flex",
            alignItems: "center",
            flexWrap: "nowrap",
          }}
        >
          <Grid
            sx={{
              flexGrow: "1",
              display: matches ? "flex" : "none",
              justifyContent: "center",
            }}
            size="6"
          >
            <img
              src={"https://podrostok-syktyvkar.ru/img/" + service.img}
              width="100%"
              style={{ maxHeight: "200px" }}
            />
          </Grid>
          <Grid size={matches ? 6 : 12}>
            <p>{service.description}</p>
          </Grid>
        </Grid>
      </CustomDialog>
    </>
  );
};
