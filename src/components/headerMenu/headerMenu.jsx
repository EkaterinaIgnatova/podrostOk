import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { HeaderContacts } from "../headerContacts/headerContacts";

export const HeaderMenu = ({ menuItems, onSelectMenuItem }) => {
  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <List>
        {menuItems.map(({ title }, index) => (
          <ListItem disablePadding>
            <ListItemButton
              sx={{ textAlign: "center" }}
              onClick={() => onSelectMenuItem(index)}
            >
              <ListItemText
                sx={{
                  textTransform: "uppercase",
                  "& .MuiListItemText-root": { fontSize: "0.8rem" },
                }}
                primary={title}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          padding: "16px 0",
        }}
      >
        <HeaderContacts />
      </Box>
    </Box>
  );
};
