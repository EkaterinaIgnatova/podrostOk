import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  useTheme,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

export const ServiceDialog = ({ selectedService, onCloseDialog }) => {
  const theme = useTheme();

  const handleCloseDialog = () => {
    onCloseDialog();
  };

  return (
    <Dialog
      open={selectedService}
      onClose={handleCloseDialog}
      fullWidth={true}
      maxWidth="md"
      sx={{
        "& .MuiDialog-paper": { color: theme.palette.text.main },
      }}
    >
      <DialogTitle sx={{ fontSize: "1.2rem", paddingRight: "40px" }}>
        {selectedService?.title}
        <IconButton
          onClick={handleCloseDialog}
          sx={{ position: "absolute", right: "8px", top: "8px" }}
        >
          <ClearIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Grid
          container
          spacing={4}
          sx={{
            display: "flex",
            alignItems: "center",
            flexWrap: "nowrap",
          }}
        >
          <Grid
            sx={{
              flexGrow: "1",
              display: { xs: "none", sm: "flex" },
              justifyContent: "center",
            }}
            size="6"
          >
            <img
              src={selectedService?.img}
              width="100%"
              style={{ maxHeight: "200px" }}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <p>{selectedService?.description}</p>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};
