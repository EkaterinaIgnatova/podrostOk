import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import logo from "../../assets/logo.svg";
import { HeaderContacts } from "./headerContacts";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import { HeaderMenu } from "./headerMenu";

export const Header = ({ onSelectMenuItem, menuItems }) => {
  const theme = useTheme();

  const matches = [
    useMediaQuery((theme) => theme.breakpoints.only("xs")),
    useMediaQuery((theme) => theme.breakpoints.up("md")),
  ];

  const [menuOpen, setMenuOpen] = useState(false);

  const handleCloseMenu = () => {
    setMenuOpen(false);
  };

  const handleOpenMenu = () => {
    setMenuOpen(true);
  };

  const handleSelectMenuItem = (index) => {
    onSelectMenuItem(index);
    handleCloseMenu();
  };

  return (
    <>
      <AppBar
        component="nav"
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
              sx={{ display: matches[1] ? "none" : "block" }}
              onClick={handleOpenMenu}
            >
              <MenuIcon />
            </IconButton>
            <Box
              sx={{
                display: matches[1] ? "flex" : "none",
                gap: "8px",
              }}
            >
              {menuItems.map(({ title }, index) => (
                <Button
                  sx={{ color: theme.palette.text.main, fontSize: "0.8rem" }}
                  onClick={() => handleSelectMenuItem(index)}
                >
                  {title}
                </Button>
              ))}
            </Box>
            <Box sx={{ display: matches[1] ? "block" : "none" }}>
              <HeaderContacts />
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Drawer
        anchor={matches[0] ? "top" : "left"}
        open={menuOpen}
        onClose={handleCloseMenu}
        sx={{
          "& .MuiDrawer-paper": {
            width: matches[0] ? "100%" : "50%",
            height: matches[0] ? "fit-content" : "100%",
            color: theme.palette.text.main,
          },
        }}
      >
        <HeaderMenu
          menuItems={menuItems}
          onSelectMenuItem={handleSelectMenuItem}
        />
      </Drawer>
    </>
  );
};
