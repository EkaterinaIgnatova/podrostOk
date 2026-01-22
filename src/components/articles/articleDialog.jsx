import { CustomDialog } from "../customDialog/customDialog";
import { useRequest } from "../../redux/hooks/useRequest";
import {
  REQUEST_STATUS_FULFILLED,
  REQUEST_STATUS_PENDING,
} from "../../redux/entities/requests/slice";
import { postArticle } from "../../redux/entities/articles/postArticle";
import { putArticle } from "../../redux/entities/articles/putArticle";
import { CustomForm } from "../customForm/customForm";

export const ArticleDialog = ({ onCloseDialog, data, isNew }) => {
  const { requestStatus: postRequestStatus, sendRequest: sendPostRequest } =
    useRequest(postArticle);
  const { requestStatus: putRequestStatus, sendRequest: sendPutRequest } =
    useRequest(putArticle);

  const handleSubmit = (e) => {
    const dataObj = { ...data, ...e, img: e.img ? e.img : data.img };
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
      title={isNew ? "Создание статьи" : "Редактирование статьи"}
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
            required: true,
            name: "link",
            label: "Ссылка на статью",
            type: "text",
            autoFocus: true,
            initialValue: data?.link,
            defaultValue: "",
          },
          {
            required: isNew,
            name: "img",
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
