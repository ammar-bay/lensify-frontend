import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Box, Button, Divider, Typography, IconButton } from "@mui/material";
import { H5, Small } from "components/Typography";
import { useSnackbar } from "notistack";
import DeleteIcon from "@mui/icons-material/Delete";

// ========================================================

const UploadPrescription = ({
  onChange,
  presDetails,
  title = "Drag & Drop prescription here",
}) => {
  const { enqueueSnackbar } = useSnackbar();

  const onDrop = useCallback(
    (acceptedFiles, fileRejections) => {
      if (acceptedFiles.length > 0) {
        onChange(acceptedFiles[0]); // send only the first file
      }

      if (fileRejections.length > 0) {
        fileRejections.forEach((rej) => {
          rej.errors.forEach((err) => {
            if (err.code === "file-too-large") {
              enqueueSnackbar("File is too large. Max size is 5MB.");
            } else if (err.code === "file-invalid-type") {
              enqueueSnackbar("Invalid file type. Please upload an image.");
            } else {
              enqueueSnackbar(
                "An error occurred while uploading the file, try again."
              );
              console.error(err.message);
            }
          });
        });
      }
    },
    [onChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
    multiple: false,
    maxSize: 5 * 1024 * 1024, // 5 MB
    accept: {
      "image/*": [".png", ".gif", ".jpeg", ".jpg"],
    },
  });

  const uploadedFile =
    presDetails?.prescriptionFile instanceof File
      ? presDetails.prescriptionFile
      : presDetails?.prescriptionFile
      ? {
          name:
            presDetails.prescriptionFile.name || presDetails.prescriptionFile,
          size: 0,
        }
      : null;

  return (
    <Box
      display="flex"
      minHeight="150px"
      alignItems="center"
      borderRadius="10px"
      border="1.5px dashed"
      flexDirection="column"
      borderColor="grey.300"
      justifyContent="center"
      textAlign="center"
      bgcolor={isDragActive ? "grey.200" : "grey.100"}
      sx={{
        transition: "all 250ms ease-in-out",
        outline: "none",
        p: 2,
      }}
      {...getRootProps()}
    >
      <input {...getInputProps()} />

      {/* If file is uploaded, show its details */}
      {uploadedFile ? (
        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography variant="body1" fontWeight="bold">
            {uploadedFile.name}
          </Typography>
          {uploadedFile.size > 0 && (
            <Small color="grey.600">
              {(uploadedFile.size / 1024).toFixed(1)} KB
            </Small>
          )}
          <IconButton
            color="error"
            size="small"
            onClick={(e) => {
              e.stopPropagation(); // prevent opening file dialog
              onChange(null); // remove file
            }}
            sx={{ mt: 1 }}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      ) : (
        <>
          <H5 mb={1} color="grey.600">
            {title}
          </H5>

          <Divider
            sx={{
              "::before, ::after": {
                borderColor: "grey.300",
                width: 70,
              },
            }}
          >
            <Small color="text.disabled" px={1}>
              OR
            </Small>
          </Divider>

          <Button
            type="button"
            variant="outlined"
            color="info"
            sx={{ mt: 1.5 }}
          >
            Select files
          </Button>
        </>
      )}
    </Box>
  );
};

export default UploadPrescription;
