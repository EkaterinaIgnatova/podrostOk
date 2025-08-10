import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { Home } from "../home/home";
import { Layout } from "../layout/layout";
import { createTheme, ThemeProvider } from "@mui/material/styles";

export const App = () => {
  let theme = createTheme({
    palette: {
      text: {
        main: "#716A5F",
      },
      primary: {
        main: "#FFA616",
        dark: "#EE9300",
      },
    },
  });

  theme = createTheme(theme, {
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: "16px",
            variants: [
              {
                props: { variant: "contained" },
                style: {
                  color: "white",
                  boxShadow: "none",
                  "&:hover": {
                    boxShadow: "none",
                  },
                },
              },
              {
                props: { variant: "text" },
                style: {
                  "&:hover": {
                    backgroundColor: "transparent",
                  },
                },
              },
            ],
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="*" element={<Navigate to={"/"} replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
