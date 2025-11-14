import { Box, CircularProgress } from "@mui/material";
import { useRequest } from "../../redux/hooks/useRequest";
import { useSelector } from "react-redux";
import { getServices } from "../../redux/entities/services/getServices";
import { selectServicesIds } from "../../redux/entities/services/slice";
import {
  REQUEST_STATUS_IDLE,
  REQUEST_STATUS_PENDING,
} from "../../redux/entities/requests/slice";
import { ServiceItem } from "./serviceItem";
import { use, useEffect } from "react";
import { AdminContext } from "../adminContext/adminContext";
import { AddButton } from "../addButton/addButton";
import { ServiceDialog } from "./serviceDialog";

export const Services = ({ title }) => {
  const { isAdmin } = use(AdminContext);

  const { requestStatus, sendRequest } = useRequest(getServices);
  const servicesIds = useSelector(selectServicesIds);

  useEffect(() => {
    sendRequest();
  }, []);

  if (
    requestStatus === REQUEST_STATUS_IDLE ||
    requestStatus === REQUEST_STATUS_PENDING
  ) {
    return (
      <>
        <h2>{title}</h2>
        <Box sx={{ textAlign: "center" }}>
          <CircularProgress size={30} />
        </Box>
      </>
    );
  }

  if (!servicesIds.length) {
    return (
      <>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h2>{title}</h2>
          {isAdmin && <AddButton component={<ServiceDialog />} />}
        </Box>
        <p style={{ textAlign: "center", opacity: "0.7" }}>
          Список услуг пуст.
        </p>
      </>
    );
  }

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h2>{title}</h2>
        {isAdmin && <AddButton component={<ServiceDialog />} />}
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {servicesIds.map((id) => (
          <ServiceItem id={id} key={id} isAdmin={isAdmin} />
        ))}
      </Box>
    </>
  );
};
