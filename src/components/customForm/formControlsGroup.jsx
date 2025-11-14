import { Box, IconButton, TextField } from "@mui/material";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { useEffect } from "react";

export const FormControlsGroup = ({ formControl }) => {
  const { control, reset } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    name: formControl.name,
    control: control,
  });

  const handleAddFields = () => {
    append(formControl.defaultValue);
  };

  const handleRemoveFields = (index) => {
    remove(index);
  };

  useEffect(() => {
    reset({ prices: formControl.initialValue || formControl.defaultValue });
  }, [reset]);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h3>{formControl.label}</h3>
        <IconButton onClick={handleAddFields} color="primary">
          <AddIcon />
        </IconButton>
      </Box>
      {fields.map((field, index) => (
        <Box sx={{ display: "flex", gap: "8px" }} key={field.id}>
          {formControl.children?.map((child) => (
            <Controller
              name={`${formControl.name}[${index}].${child.name}`}
              control={control}
              rules={{ required: child.required }}
              defaultValue={field[child.name]}
              render={({ field: { name, value, onChange } }) => (
                <TextField
                  name={name}
                  value={value}
                  label={child.label}
                  type={child.type}
                  margin="dense"
                  fullWidth
                  rows={child.rows}
                  multiline={child.multiline}
                  autoFocus={child.autoFocus}
                  error={child.error}
                  helperText={child.error && child.helperText}
                  sx={child.styles}
                  onChange={onChange}
                />
              )}
            />
          ))}
          <IconButton onClick={() => handleRemoveFields(index)} color="error">
            <DeleteIcon />
          </IconButton>
        </Box>
      ))}
    </>
  );
};
