import { Box, Button, IconButton, TextField } from "@mui/material";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { FormControlsGroup } from "./formControlsGroup";
import { useRef, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";

export const CustomForm = ({
  formControls,
  onSubmit,
  submitText,
  onCloseDialog,
  loading,
}) => {
  const methods = useForm();
  const {
    control,
    formState: { isValid },
    handleSubmit,
  } = methods;

  const [img, setImg] = useState(null);

  const fileInputRef = useRef(null);
  const [files, setFiles] = useState([]);

  const handleFileChange = (event) => {
    const uploadFiles = event.target.files;
    setFiles([...files, ...uploadFiles]);
  };

  const addFile = () => {
    fileInputRef.current.click();
  };

  const removeFile = (index) => {
    const filesCopy = [...files];
    filesCopy.splice(index, 1);
    setFiles(filesCopy);
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit((e) =>
          onSubmit(
            img
              ? { ...e, img: img }
              : files.length
                ? { ...e, files: files }
                : e,
          ),
        )}
      >
        {formControls.map((formControl) =>
          formControl.type === "group" ? (
            <FormControlsGroup formControl={formControl} />
          ) : (
            <Controller
              name={formControl.name}
              control={control}
              rules={{ required: formControl.required }}
              defaultValue={
                formControl.initialValue || formControl.defaultValue
              }
              render={({ field: { name, value, onChange } }) =>
                formControl.type === "file" && formControl.multiple ? (
                  <Box sx={{ marginTop: "8px" }}>
                    <input
                      type="file"
                      multiple
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      style={{ display: "none" }}
                    />
                    <Button onClick={addFile}>
                      <AddIcon />
                      Добавить файлы
                    </Button>
                    {!!(files.length || formControl.initialValue.length) && (
                      <Box
                        sx={{
                          padding: "14px",
                          borderRadius: "4px",
                          border: "1px solid rgba(0, 0, 0, 0.2)",
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        {files.map((el, index) => (
                          <span>
                            {el.name}{" "}
                            <IconButton
                              onClick={() => removeFile(index)}
                              size="small"
                            >
                              <ClearIcon />
                            </IconButton>
                          </span>
                        ))}
                        {formControl.initialValue.map((el, index) => (
                          <span>
                            {el.split("/").at(-1).slice(14)}{" "}
                            <IconButton
                              onClick={() => formControl.removeMethod(index)}
                              size="small"
                            >
                              <ClearIcon />
                            </IconButton>
                          </span>
                        ))}
                      </Box>
                    )}
                  </Box>
                ) : (
                  <TextField
                    name={name}
                    value={value}
                    label={formControl.label}
                    type={formControl.type}
                    margin="dense"
                    fullWidth
                    rows={formControl.rows}
                    multiline={formControl.multiline}
                    autoFocus={formControl.autoFocus}
                    error={
                      formControl.error ||
                      (formControl.type === "number" && value < 1)
                    }
                    helperText={
                      (formControl.error ||
                        (formControl.type === "number" && value < 1)) &&
                      formControl.helperText
                    }
                    sx={formControl.styles}
                    onChange={(e) => {
                      onChange(e);
                      if (formControl.type === "file")
                        setImg(e.target.files[0]);
                    }}
                  />
                )
              }
            />
          ),
        )}
        <Box sx={{ display: "flex", justifyContent: "end", marginTop: "8px" }}>
          <Button onClick={onCloseDialog}>Отмена</Button>
          <Button
            variant="contained"
            onClick={handleSubmit((e) =>
              onSubmit(
                img
                  ? { ...e, img: img }
                  : files.length
                    ? { ...e, files: files }
                    : e,
              ),
            )}
            disabled={!isValid}
            loading={loading}
          >
            {submitText ? submitText : "Сохранить"}
          </Button>
        </Box>
      </form>
    </FormProvider>
  );
};
