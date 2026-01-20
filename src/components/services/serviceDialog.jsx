import { CustomDialog } from "../customDialog/customDialog";
import { useRequest } from "../../redux/hooks/useRequest";
import {
  REQUEST_STATUS_FULFILLED,
  REQUEST_STATUS_PENDING,
} from "../../redux/entities/requests/slice";
import { postService } from "../../redux/entities/services/postService";
import { putService } from "../../redux/entities/services/putServices";
import { CustomForm } from "../customForm/customForm";

export const ServiceDialog = ({ onCloseDialog, data, isNew }) => {
  const { requestStatus: postRequestStatus, sendRequest: sendPostRequest } =
    useRequest(postService);
  const { requestStatus: putRequestStatus, sendRequest: sendPutRequest } =
    useRequest(putService);

  const handleSubmit = (e) => {
    const dataObj = { ...data, ...e, img: e.file ? e.file : data.img };
    const formData = new FormData();
    Object.keys(dataObj).forEach((key) => {
      if (key === "prices") {
        e.prices.forEach((price, index) => {
          formData.append(`prices[${index}][name]`, price.name);
          formData.append(`prices[${index}][value]`, price.value);
        });
      } else if (key !== "file") {
        formData.append(key, dataObj[key]);
      }
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
      title={isNew ? "Создание услуги" : "Редактирование услуги"}
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
            required: isNew,
            name: "img",
            type: "file",
            styles: { ".MuiInputBase-root": { flexGrow: 1 } },
          },
          {
            name: "order",
            label: "Порядок",
            type: "number",
            initialValue: data?.order,
            helperText: "Число должно быть больше 0",
          },
          {
            name: "prices",
            label: "Цены",
            type: "group",
            initialValue: data?.prices,
            defaultValue: [{ title: "", value: "" }],
            children: [
              {
                required: true,
                name: "name",
                label: "Наименование услуги",
                type: "text",
                autoFocus: true,
              },
              {
                required: true,
                name: "value",
                label: "Цена",
                type: "text",
              },
            ],
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
