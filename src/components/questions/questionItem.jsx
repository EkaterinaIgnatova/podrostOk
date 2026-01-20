import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  useTheme,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { selectQuestionById } from "../../redux/entities/questions/slice";
import { useSelector } from "react-redux";
import { EditButton } from "../actionButtons/editButton";
import { DeleteButton } from "../actionButtons/deleteButton";
import { QuestionDialog } from "./questionDialog";
import { deleteQuestion } from "../../redux/entities/questions/deleteQuestion";
import { useRef } from "react";

export const QuestionItem = ({ id, isAdmin }) => {
  const theme = useTheme();
  const question = useSelector((state) => selectQuestionById(state, id));

  const questionActionsRef = useRef(null);
  const toggleActionsVisibility = (visible) => {
    if (questionActionsRef.current)
      questionActionsRef.current.style.display = visible ? "flex" : "none";
  };

  const download = async () => {
    const url = question.file;
    const res = await fetch(url);
    const blob = await res.blob();
    console.warn(blob);
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "Текстовый документ.txt";
    link.click();
    URL.revokeObjectURL(link.href);
  };

  return (
    <Accordion
      disableGutters
      sx={{
        boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.2)",
        color: theme.palette.text.main,
        position: "static",
      }}
      onMouseEnter={() => toggleActionsVisibility(true)}
      onMouseLeave={() => toggleActionsVisibility(false)}
    >
      <Box sx={{ position: "relative" }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          sx={{
            fontWeight: "600",
            gap: "8px",
          }}
        >
          {question.title}
        </AccordionSummary>
        {isAdmin && (
          <Box
            ref={questionActionsRef}
            sx={{
              width: "calc(100% - 32px)",
              height: "100%",
              position: "absolute",
              left: 0,
              top: 0,
              display: "none",
              justifyContent: "end",
              zIndex: "100",
              background: "rgba(255, 255, 255, 0.7)",
              padding: "8px",
              boxSizing: "border-box",
            }}
          >
            <EditButton component={<QuestionDialog />} data={question} />
            <DeleteButton
              id={id}
              title="Вы уверены, что хотите удалить вопрос?"
              method={deleteQuestion}
            />
          </Box>
        )}
      </Box>
      <AccordionDetails sx={{ whiteSpace: "pre-line" }}>
        {question.text}
        {question.file && (
          <p>
            <a href={question.file} download>
              {question.file.split("/").at(-1).split("-")[1]}
            </a>
          </p>
        )}
      </AccordionDetails>
    </Accordion>
  );
};
