import { Box, CircularProgress } from "@mui/material";
import { useRequest } from "../../redux/hooks/useRequest";
import { useSelector } from "react-redux";
import { getServices } from "../../redux/entities/services/getServices";
import { selectServicesIds } from "../../redux/entities/services/slice";
import {
  REQUEST_STATUS_IDLE,
  REQUEST_STATUS_PENDING,
} from "../../redux/entities/requests/slice";
import { ServiceItem } from "../serviceItem/serviceItem";

export const Services = ({ title }) => {
  const requestStatus = useRequest(getServices);
  const servicesIds = useSelector(selectServicesIds);

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
        <h2>{title}</h2>
        <p style={{ textAlign: "center", opacity: "0.7" }}>
          Список услуг пуст.
        </p>
      </>
    );
  }

  return (
    <>
      <h2>{title}</h2>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {servicesIds.map((id) => (
          <ServiceItem id={id} key={id} />
        ))}
      </Box>
    </>
  );
};
