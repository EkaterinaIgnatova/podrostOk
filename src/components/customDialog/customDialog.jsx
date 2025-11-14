import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  useTheme,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

export const CustomDialog = ({
  isOpen,
  onCloseDialog,
  title,
  maxWidth,
  children,
  showActions,
  submitText,
  onSubmit,
  loading,
}) => {
  const theme = useTheme();

  const handleCloseDialog = () => {
    onCloseDialog();
  };

  return (
    <Dialog
      open={isOpen}
      onClose={handleCloseDialog}
      fullWidth={true}
      maxWidth={maxWidth}
      sx={{
        "& .MuiDialog-paper": { color: theme.palette.text.main },
      }}
    >
      <DialogTitle sx={{ paddingRight: "40px", textTransform: "none" }}>
        {title}
        <IconButton
          onClick={handleCloseDialog}
          sx={{ position: "absolute", right: "8px", top: "8px" }}
        >
          <ClearIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
      {showActions && (
        <DialogActions sx={{ padding: "0 24px 16px 24px" }}>
          <Button onClick={onCloseDialog}>Отмена</Button>
          <Button variant="contained" onClick={onSubmit} loading={loading}>
            {submitText}
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
};
