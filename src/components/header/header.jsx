import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import logo from "../../assets/logo.svg";
import { HeaderContacts } from "../header-contacts/header-contacts";
import { useTheme } from "@mui/material/styles";
import { Divider } from "@mui/material";

export const Header = ({ onSelectMenuItem, menuItems }) => {
  const theme = useTheme();

  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen((prevState) => !prevState);
  };

  const handleSelectMenuItem = (index) => {
    onSelectMenuItem(index);
    handleDrawerToggle();
  };

  const drawerContent = (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <List>
        {menuItems.map((item, index) => (
          <ListItem disablePadding>
            <ListItemButton
              sx={{ textAlign: "center" }}
              onClick={() => handleSelectMenuItem(index)}
            >
              <ListItemText
                sx={{
                  textTransform: "uppercase",
                  "& .MuiListItemText-root": { fontSize: "0.8rem" },
                }}
                primary={item.title}
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

  return (
    <>
      <AppBar
        sx={{
          backgroundColor: "white",
          boxShadow: "0px 1px 4px 0px rgba(0, 0, 0, 0.2)",
          position: "sticky",
          color: theme.palette.text.main,
        }}
      >
        <Container maxWidth="xl">
          <Toolbar
            sx={{
              justifyContent: "space-between",
              gap: "16px",
            }}
          >
            <img src={logo} />
            <IconButton
              sx={{ display: { xs: "block", md: "none" } }}
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                gap: "8px",
              }}
            >
              {menuItems.map((item, index) => (
                <Button
                  sx={{ color: theme.palette.text.main, fontSize: "0.8rem" }}
                  onClick={() => handleSelectMenuItem(index)}
                >
                  {item.title}
                </Button>
              ))}
            </Box>
            <Box sx={{ display: { xs: "none", md: "block" } }}>
              <HeaderContacts />
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Drawer
        open={drawerOpen}
        onClose={handleDrawerToggle}
        sx={{
          display: { xs: "none", sm: "block", md: "none" },
          "& .MuiDrawer-paper": {
            width: { xs: "100%", sm: "50%" },
            height: { xs: "fit-content", sm: "100%" },
            color: theme.palette.text.main,
          },
        }}
      >
        {drawerContent}
      </Drawer>
      <Drawer
        anchor="top"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            width: { xs: "100%", sm: "50%" },
            height: { xs: "fit-content", sm: "100%" },
            color: theme.palette.text.main,
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
};
