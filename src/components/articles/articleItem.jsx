import { useSelector } from "react-redux";
import { selectArticleById } from "../../redux/entities/articles/slice";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  useTheme,
} from "@mui/material";
import { ArticleDialog } from "./articleDialog";
import { EditButton } from "../actionButtons/editButton";
import { DeleteButton } from "../actionButtons/deleteButton";
import { deleteArticle } from "../../redux/entities/articles/deleteArticle";
import { useRef } from "react";

export const ArticleItem = ({ id, isAdmin, size }) => {
  const theme = useTheme();
  const article = useSelector((state) => selectArticleById(state, id));

  const articleActionsRef = useRef(null);
  const toggleActionsVisibility = (visible) => {
    if (articleActionsRef.current)
      articleActionsRef.current.style.display = visible ? "flex" : "none";
  };

  return (
    <>
      <Grid size={size}>
        <Box
          sx={{
            position: "relative",
            height: "100%",
          }}
          onMouseEnter={() => toggleActionsVisibility(true)}
          onMouseLeave={() => toggleActionsVisibility(false)}
        >
          {isAdmin && (
            <Box
              ref={articleActionsRef}
              sx={{
                width: "100%",
                position: "absolute",
                display: "none",
                justifyContent: "end",
                alignItems: "start",
                zIndex: "100",
                background: "rgba(255, 255, 255, 0.7)",
                padding: "8px",
                boxSizing: "border-box",
              }}
            >
              <EditButton component={<ArticleDialog />} data={article} />
              <DeleteButton
                id={id}
                title="Вы уверены, что хотите удалить статью?"
                method={deleteArticle}
              />
            </Box>
          )}
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

              <CardContent
                sx={{
                  color: theme.palette.text.main,
                  height: "140px",
                  overflow: "hidden",
                  position: "relative",
                  whiteSpace: "pre-line",
                  marginBottom: "16px",
                  "&:after": {
                    background:
                      "linear-gradient(to bottom, rgba(255, 255, 255, 0), white 100%)",
                    content: "''",
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    left: 0,
                    height: "16px",
                  },
                }}
              >
                <h3 style={{ textTransform: "uppercase", marginTop: 0 }}>
                  {article.title}
                </h3>
                {article.text}
              </CardContent>
            </CardActionArea>
          </Card>
        </Box>
      </Grid>
    </>
  );
};
