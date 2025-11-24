import { Box, CircularProgress } from "@mui/material";
import { useRequest } from "../../redux/hooks/useRequest";
import { getQuestions } from "../../redux/entities/questions/getQuestions";
import { useSelector } from "react-redux";
import { selectQuestionsIds } from "../../redux/entities/questions/slice";
import { QuestionItem } from "./questionItem";
import {
  REQUEST_STATUS_IDLE,
  REQUEST_STATUS_PENDING,
} from "../../redux/entities/requests/slice";
import { use, useEffect } from "react";
import { AdminContext } from "../adminContext/adminContext";
import { AddButton } from "../actionButtons/addButton";
import { QuestionDialog } from "./questionDialog";

export const Questions = ({ title }) => {
  const { isAdmin } = use(AdminContext);

  const { requestStatus, sendRequest } = useRequest(getQuestions);
  const questionsIds = useSelector(selectQuestionsIds);

  useEffect(() => {
    sendRequest();
  }, []);

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
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h2>{title}</h2>
          {isAdmin && <AddButton component={<QuestionDialog />} />}
        </Box>

        <p style={{ textAlign: "center", opacity: "0.7" }}>
          Список вопросов пуст.
        </p>
      </>
    );
  }

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h2>{title}</h2>
        {isAdmin && <AddButton component={<QuestionDialog />} />}
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {questionsIds.map((id) => (
          <QuestionItem id={id} key={id} isAdmin={isAdmin} />
        ))}
      </Box>
    </>
  );
};
