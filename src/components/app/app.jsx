import { Layout } from "../layout/layout";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AdminContextProvider } from "../adminContext/adminContextProvider";
import { Provider } from "react-redux";
import { store } from "../../redux/store";

export const App = () => {
  let theme = createTheme({
    palette: {
      text: {
        main: "#716A5F",
        dark: "#22211F",
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
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <AdminContextProvider>
          <Layout />
        </AdminContextProvider>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
