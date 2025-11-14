import LocationOnIcon from "@mui/icons-material/LocationOn";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import { Box } from "@mui/material";

export const HeaderContacts = () => {
  const contacts = [
    {
      icon: <LocalPhoneIcon />,
      text: "+7(912)964-93-03",
    },
    {
      icon: <LocationOnIcon />,
      text: "ул. Громова, д. 75",
    },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        fontWeight: "500",
      }}
    >
      {contacts.map(({ icon, text }) => (
        <Box sx={{ display: "flex", gap: "8px", whiteSpace: "nowrap" }}>
          {icon} <span>{text}</span>
        </Box>
      ))}
    </Box>
  );
};
