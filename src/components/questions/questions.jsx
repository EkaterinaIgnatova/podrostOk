import { Box, CircularProgress } from "@mui/material";
import { useRequest } from "../../redux/hooks/useRequest";
import { getQuestions } from "../../redux/entities/questions/getQuestions";
import { useSelector } from "react-redux";
import { selectQuestionsIds } from "../../redux/entities/questions/slice";
import { QuestionItem } from "../questionItem.jsx/questionItem";
import {
  REQUEST_STATUS_IDLE,
  REQUEST_STATUS_PENDING,
} from "../../redux/entities/requests/slice";

export const Questions = ({ title }) => {
  const requestStatus = useRequest(getQuestions);
  const questionsIds = useSelector(selectQuestionsIds);

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

  if (!questionsIds.length) {
    return (
      <>
        <h2>{title}</h2>
        <p style={{ textAlign: "center", opacity: "0.7" }}>
          Список вопросов пуст.
        </p>
      </>
    );
  }

  return (
    <>
      <h2>{title}</h2>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {questionsIds.map((id) => (
          <QuestionItem id={id} key={id} />
        ))}
      </Box>
    </>
  );
};
