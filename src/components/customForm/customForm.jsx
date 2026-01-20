import { Box, Button, TextField } from "@mui/material";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { FormControlsGroup } from "./formControlsGroup";
import { useState } from "react";

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

  const [file, setFile] = useState(null);

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit((e) => onSubmit(file ? { ...e, file: file } : e))}
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
              render={({ field: { name, value, onChange } }) => (
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
                    if (formControl.type === "file") setFile(e.target.files[0]);
                  }}
                />
              )}
            />
          )
        )}
        <Box sx={{ display: "flex", justifyContent: "end", marginTop: "8px" }}>
          <Button onClick={onCloseDialog}>Отмена</Button>
          <Button
            variant="contained"
            onClick={handleSubmit((e) =>
              onSubmit(file ? { ...e, file: file } : e)
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
