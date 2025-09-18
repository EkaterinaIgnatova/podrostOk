import { useSelector } from "react-redux";
import { selectArticleById } from "../../redux/entities/articles/slice";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  useTheme,
} from "@mui/material";

export const ArticleItem = ({ id }) => {
  const theme = useTheme();
  const article = useSelector((state) => selectArticleById(state, id));

  return (
    <>
      <Grid
        size={{
          xs: 12,
          sm: 6,
          md: 4,
          lg: 3,
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
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "start",
            }}
            href={article.link}
            target="_blank"
          >
            <CardMedia component="img" height="200" image={article.img} />

            <CardContent sx={{ color: theme.palette.text.main }}>
              <h3 style={{ textTransform: "uppercase" }}>{article.title}</h3>
              {article.description}
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    </>
  );
};
