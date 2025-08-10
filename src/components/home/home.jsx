import { Box, Button, Grid } from "@mui/material";
import womanAndGirl from "../../assets/woman_and_girl.svg";
import { useOutletContext } from "react-router";

export const Home = () => {
  const menuItems = useOutletContext();

  return (
    <>
      <Grid
        container
        spacing={4}
        sx={{ display: "flex", alignItems: "center", padding: "32px 0" }}
      >
        <Grid size={{ xs: 12, sm: 6 }}>
          <h1>
            Услуги психолога для детей школьного возраста, подростков и их
            родителей в Сыктывкаре
          </h1>
          <Box
            sx={{
              display: "flex",
              gap: "1rem",
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
            display: { xs: "none", sm: "flex" },
            justifyContent: "center",
          }}
          size="6"
        >
          <img src={womanAndGirl} width="100%" style={{ maxWidth: "400px" }} />
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
          <div>
            <h2>{title} </h2>
            {component}
          </div>
        ))}
      </Box>
    </>
  );
};
