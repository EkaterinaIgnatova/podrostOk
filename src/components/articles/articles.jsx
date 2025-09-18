import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CircularProgress,
  Grid,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { getArticles } from "../../redux/entities/articles/getArticles";
import { useRequest } from "../../redux/hooks/useRequest";
import {
  REQUEST_STATUS_IDLE,
  REQUEST_STATUS_PENDING,
} from "../../redux/entities/requests/slice";
import { selectArticlesIds } from "../../redux/entities/articles/slice";
import { ArticleItem } from "../articleItem/articleItem";
import { useSelector } from "react-redux";

export const Articles = ({ title }) => {
  const theme = useTheme();
  const requestStatus = useRequest(getArticles);
  const articlesIds = useSelector(selectArticlesIds);

  const matches = [
    useMediaQuery((theme) => theme.breakpoints.only("xs")),
    useMediaQuery((theme) => theme.breakpoints.only("sm")),
    useMediaQuery((theme) => theme.breakpoints.only("md")),
    useMediaQuery((theme) => theme.breakpoints.up("lg")),
  ];
  const articlesCounts = [3, 3, 5, 7];

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

  if (!articlesIds.length) {
    return (
      <>
        <h2>{title}</h2>
        <p style={{ textAlign: "center", opacity: "0.7" }}>
          Список статей пуст.
        </p>
      </>
    );
  }

  return (
    <>
      <h2>{title}</h2>
      <Grid container spacing={2}>
        {articlesIds
          .slice(0, articlesCounts[matches.findIndex((match) => match)])
          .map((id) => (
            <ArticleItem id={id} key={id} />
          ))}
        <Grid
          size={{
            xs: 12,
            sm: 6,
            md: 4,
            lg: 3,
          }}
          sx={{
            minHeight: "200px",
          }}
        >
          <Card
            sx={{
              height: "100%",
              boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.2)",
            }}
          >
            <CardActionArea
              component="a"
              href="https://vk.com/@podrostok_syktyvkar"
              target="_blank"
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <CardContent
                sx={{
                  color: theme.palette.text.main,
                  fontSize: "1.4rem",
                  textAlign: "center",
                  opacity: "0.7",
                }}
              >
                Другие статьи
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};
