import { Box, Button, useMediaQuery } from "@mui/material";
import React from "react";

export const Home = ({ menuItems }) => {
  const matches = useMediaQuery((theme) => theme.breakpoints.up("sm"));

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          padding: "32px 0",
          gap: "32px",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <h1>Психолог для подростков и взрослых</h1>
          <Box
            sx={{
              display: "flex",
              gap: "16px",
            }}
          >
            <Button variant="contained" href="tel:+79129649303">
              Позвонить
            </Button>
            <Button
              variant="outlined"
              href="https://vk.com/podrostok_syktyvkar"
            >
              Группа ВК
            </Button>
          </Box>
        </Box>
        {matches && (
          <img
            src="https://podrostok-syktyvkar.ru/img/woman_and_girl.svg"
            width="50%"
            style={{ maxHeight: "240px" }}
          />
        )}
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "32px",
          paddingBottom: "32px",
        }}
      >
        {menuItems.map(({ title, component }) => (
          <div>{React.cloneElement(component, { title: title })}</div>
        ))}
      </Box>
    </>
  );
};
