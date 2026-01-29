import { Box, Button, Divider, useMediaQuery, useTheme } from "@mui/material";
import { CustomDialog } from "../customDialog/customDialog";
import { selectServiceById } from "../../redux/entities/services/slice";
import { useSelector } from "react-redux";
import { useRef, useState } from "react";
import { EditButton } from "../actionButtons/editButton";
import { DeleteButton } from "../actionButtons/deleteButton";
import { deleteService } from "../../redux/entities/services/deleteService";
import { ServiceDialog } from "./serviceDialog";

export const ServiceItem = ({ id, isAdmin }) => {
  const theme = useTheme();
  const service = useSelector((state) => selectServiceById(state, id));

  const [dialogOpen, setDialogOpen] = useState(false);
  const toggleReviewDialog = () => {
    setDialogOpen((prevState) => !prevState);
  };

  const serviceActionsRef = useRef(null);
  const toggleActionsVisibility = (visible) => {
    if (serviceActionsRef.current)
      serviceActionsRef.current.style.display = visible ? "flex" : "none";
  };

  const matches = [
    useMediaQuery((theme) => theme.breakpoints.up("sm")),
    useMediaQuery((theme) => theme.breakpoints.up("md")),
  ];

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: matches[0] ? "row" : "column",
          gap: matches[0] ? "8px" : 0,
          alignItems: "center",
          padding: "0 16px",
          boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.2)",
          position: "relative",
        }}
        onMouseEnter={() => toggleActionsVisibility(true)}
        onMouseLeave={() => toggleActionsVisibility(false)}
      >
        <h3
          style={{
            textTransform: "uppercase",
            textAlign: matches[0] ? "start" : "center",
          }}
        >
          {service.title}
        </h3>
        {isAdmin && (
          <Box
            ref={serviceActionsRef}
            sx={{
              width: matches[0] ? "calc(100% - 128px)" : "100%",
              height: matches[0] ? "100%" : "calc(100% - 50px)",
              position: "absolute",
              left: 0,
              top: 0,
              display: "flex",
              justifyContent: "end",
              zIndex: "100",
              background: "rgba(255, 255, 255, 0.7)",
              borderRadius: "4px",
              padding: "8px",
              boxSizing: "border-box",
            }}
          >
            <EditButton component={<ServiceDialog />} data={service} />
            <DeleteButton
              id={id}
              title="Вы уверены, что хотите удалить услугу?"
              method={deleteService}
            />
          </Box>
        )}
        <Button
          onClick={toggleReviewDialog}
          variant="contained"
          sx={{
            width: matches[0] ? "auto" : "100%",
            flexShrink: "0",
            marginBottom: matches[0] ? 0 : "16px",
          }}
        >
          Подробнее
        </Button>
      </Box>

      <CustomDialog
        isOpen={dialogOpen}
        onCloseDialog={toggleReviewDialog}
        title={service.title}
        maxWidth="md"
      >
        <Box
          sx={{
            display: "flex",
            gap: "32px",
            alignItems: "center",
            flexDirection: matches[1] ? "row" : "column",
          }}
        >
          <img src={service.img} width="240px" style={{ maxHeight: "240px" }} />
          <Box
            sx={{
              whiteSpace: "pre-line",
              width: matches[1] ? "auto" : "100%",
              flexGrow: 1,
            }}
          >
            {service.text}
          </Box>
        </Box>
        <h3>Стоимость</h3>
        <Box
          sx={{
            textTransform: "uppercase",
            marginTop: "16px",
            display: "flex",
            flexDirection: "column",
            boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.2)",
            padding: "8px",
            borderRadius: "4px",
          }}
        >
          {service.prices.map((price, index) => (
            <>
              {index > 0 && <Divider sx={{ margin: "8px 0" }}></Divider>}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: matches[1] ? "row" : "column",
                  justifyContent: "space-between",
                  textAlign: matches[1] ? "start" : "center",
                }}
              >
                {price.name}
                <Box
                  sx={{
                    fontWeight: "600",
                    color: theme.palette.primary.main,
                    whiteSpace: "nowrap",
                  }}
                >
                  {price.value} руб
                </Box>
              </Box>
            </>
          ))}
        </Box>
      </CustomDialog>
    </>
  );
};
