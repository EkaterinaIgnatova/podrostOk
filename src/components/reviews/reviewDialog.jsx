import { CustomDialog } from "../customDialog/customDialog";
import { useRequest } from "../../redux/hooks/useRequest";
import { postReview } from "../../redux/entities/reviews/postReview";
import {
  REQUEST_STATUS_FULFILLED,
  REQUEST_STATUS_PENDING,
} from "../../redux/entities/requests/slice";
import { putReview } from "../../redux/entities/reviews/putReview";
import { CustomForm } from "../customForm/customForm";

export const ReviewDialog = ({ onCloseDialog, data, isNew }) => {
  const { requestStatus: postRequestStatus, sendRequest: sendPostRequest } =
    useRequest(postReview);
  const { requestStatus: putRequestStatus, sendRequest: sendPutRequest } =
    useRequest(putReview);

  const handleSubmit = (e) => {
    const dataObj = { ...data, ...e };
    isNew ? sendPostRequest(dataObj) : sendPutRequest(dataObj);
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
      title={isNew ? "Создание отзыва" : "Редактирование отзыва"}
    >
      <CustomForm
        formControls={[
          {
            required: true,
            name: "name",
            label: "Имя",
            type: "text",
            autoFocus: true,
            initialValue: data?.name || "",
          },
          {
            required: true,
            name: "text",
            label: "Текст",
            type: "text",
            multiline: true,
            rows: 4,
            initialValue: data?.text || "",
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
