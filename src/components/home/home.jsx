import { Box, Button, Grid, useMediaQuery } from "@mui/material";
import React from "react";

export const Home = ({ menuItems }) => {
  const matches = useMediaQuery((theme) => theme.breakpoints.up("sm"));

  return (
    <>
      <Grid
        container
        spacing={4}
        sx={{ display: "flex", alignItems: "center", padding: "32px 0" }}
      >
        <Grid size={matches ? 6 : 12}>
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
        </Grid>
        <Grid
          sx={{
            flexGrow: "1",
            display: matches ? "flex" : "none",
            justifyContent: "center",
          }}
          size="6"
        >
          <img
            src="https://podrostok-syktyvkar.ru/img/woman_and_girl.svg"
            width="100%"
            style={{ maxWidth: "400px" }}
          />
        </Grid>
      </Grid>
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
