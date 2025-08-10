import { Box, Chip, Grid, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useState } from "react";
// import productVariants from "data/product-variants";
import Card1 from "components/Card1";
import UploadPrescription from "./UploadPrescription";
import { FlexBox } from "components/flex-box";

const Heading = ({ title }) => {
  return (
    <FlexBox gap={1.5} alignItems="center" mb={1}>
      <Typography fontSize="18px" fontWeight={500}>
        {title}
      </Typography>
    </FlexBox>
  );
};

export const presOptions = ["Enter Prescription", "Upload Card"];

const PrescriptionDetails = ({ setPresDetails, presDetails }) => {
  const handleChange = (e) => {
    setPresDetails((prevVal) => ({
      ...prevVal,
      [e.target.name]: e.target.value,
    }));
  };

  const handlePresOptChange = (e) => {
    setPresDetails((prevVal) => ({
      ...prevVal,
      type: e,
    }));
  };

  const handleFileUpload = (file) => {
    setPresDetails((prevVal) => ({
      ...prevVal,
      prescriptionFile: file, // store file in state
    }));
  };

  return (
    <Card1
      sx={{
        mb: 1,
        padding: "20px",
      }}
    >
      <Heading title="Prescription Details" />

      {presOptions.map((opt) => (
        <Chip
          key={opt}
          label={opt}
          onClick={() => handlePresOptChange(opt)}
          sx={{
            borderRadius: "4px",
            mr: 1,
            mb: 1.5,
            cursor: "pointer",
          }}
          color={presDetails.type === opt ? "primary" : "default"}
        />
      ))}

      {presDetails.type === presOptions[0] ? (
        <Box mb={1.5}>
          <Typography mb={1.5}>Enter Card Information</Typography>
          <Grid container spacing={1.5}>
            <Grid item sm={6} xs={12}>
              <TextField
                fullWidth
                type="number"
                name="sphere"
                onChange={handleChange}
                label="Sphere"
                value={presDetails.sphere || ""}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <TextField
                fullWidth
                type="number"
                name="cylinder"
                onChange={handleChange}
                label="Cylinder"
                value={presDetails.cylinder || ""}
              />
            </Grid>
            <Grid item sm={12} xs={12}>
              <Box display="flex" justifyContent="space-between">
                <TextField
                  fullWidth
                  type="number"
                  name="axis"
                  label="Axis"
                  onChange={handleChange}
                  value={presDetails.axis || ""}
                  // error={!!touched.cardCVC && !!errors.cardCVC}
                  // helperText={touched.cardCVC && errors.cardCVC}
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
      ) : (
        <UploadPrescription
          onChange={handleFileUpload}
          presDetails={presDetails}
        />
      )}
    </Card1>
  );
};

export default PrescriptionDetails;
