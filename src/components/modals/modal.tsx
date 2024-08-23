import { Box, Dialog, DialogContent, DialogTitle } from "@mui/material";

export default function ActionModal({
  openModal,
  closeModal,
  children,
  titleHeader,
  backgroundColor,
}: {
  openModal: boolean;
  closeModal: any;
  children: React.ReactNode;
  titleHeader?: React.ReactNode;
  backgroundColor?: string;
}) {
  return (
    <Dialog
      open={openModal}
      onClose={closeModal}
      sx={{
        background: backgroundColor,
      }}
    >
      <DialogTitle>{titleHeader}</DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 1 }}>{children}</Box>
      </DialogContent>
    </Dialog>
  );
}
