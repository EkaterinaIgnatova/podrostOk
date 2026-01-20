import { CustomDialog } from "../customDialog/customDialog";
import { useRequest } from "../../redux/hooks/useRequest";
import {
  REQUEST_STATUS_FULFILLED,
  REQUEST_STATUS_PENDING,
} from "../../redux/entities/requests/slice";
import { postQuestion } from "../../redux/entities/questions/postQuestion";
import { putQuestion } from "../../redux/entities/questions/putQuestion";
import { CustomForm } from "../customForm/customForm";

export const QuestionDialog = ({ onCloseDialog, data, isNew }) => {
  const { requestStatus: postRequestStatus, sendRequest: sendPostRequest } =
    useRequest(postQuestion);
  const { requestStatus: putRequestStatus, sendRequest: sendPutRequest } =
    useRequest(putQuestion);

  const handleSubmit = (e) => {
    const dataObj = { ...data, ...e, file: e.file ? e.file : data.file };
    const formData = new FormData();
    Object.keys(dataObj).forEach((key) => {
      formData.append(key, dataObj[key]);
    });

    isNew ? sendPostRequest(formData) : sendPutRequest(formData);
  };

  const handleCloseDialog = () => {
    onCloseDialog();
  };

  if (
    postRequestStatus === REQUEST_STATUS_FULFILLED ||
    putRequestStatus === REQUEST_STATUS_FULFILLED
  ) {
    handleCloseDialog();
  }

  return (
    <CustomDialog
      isOpen
      onCloseDialog={handleCloseDialog}
      title={isNew ? "Создание вопроса" : "Редактирование вопроса"}
    >
      <CustomForm
        formControls={[
          {
            required: true,
            name: "title",
            label: "Заголовок",
            type: "text",
            autoFocus: true,
            initialValue: data?.title,
            defaultValue: "",
          },
          {
            required: true,
            name: "text",
            label: "Текст",
            type: "text",
            multiline: true,
            rows: 4,
            initialValue: data?.text,
            defaultValue: "",
          },
          {
            name: "order",
            label: "Порядок",
            type: "number",
            initialValue: data?.order,
            helperText: "Число должно быть больше 0",
          },
          {
            name: "file",
            type: "file",
            styles: { ".MuiInputBase-root": { flexGrow: 1 } },
          },
        ]}
        onSubmit={handleSubmit}
        onCloseDialog={handleCloseDialog}
        loading={
          postRequestStatus === REQUEST_STATUS_PENDING ||
          putRequestStatus === REQUEST_STATUS_PENDING
        }
      />
    </CustomDialog>
  );
};
