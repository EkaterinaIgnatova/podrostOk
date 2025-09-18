import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  useTheme,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { selectQuestionById } from "../../redux/entities/questions/slice";
import { useSelector } from "react-redux";

export const QuestionItem = ({ id }) => {
  const theme = useTheme();
  const question = useSelector((state) => selectQuestionById(state, id));

  return (
    <Accordion
      disableGutters
      sx={{
        boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.2)",
        color: theme.palette.text.main,
        position: "static",
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        sx={{
          fontWeight: "600",
          gap: "8px",
        }}
      >
        {question.title}
      </AccordionSummary>
      <AccordionDetails>
        {question.isList ? (
          <ul>
            {question.listItems.map((item) => (
              <li>{item}</li>
            ))}
          </ul>
        ) : (
          <p>{question.text}</p>
        )}
      </AccordionDetails>
    </Accordion>
  );
};
