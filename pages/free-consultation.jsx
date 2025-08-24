import React from "react";
import { Box, useTheme } from "@mui/material";
import ShopLayout1 from "components/layouts/ShopLayout1";
import SEO from "components/SEO";
import FreeConsultation from "pages-sections/freeconsultation/freeconsultation";

const FreeConsultationPage = () => {
  const theme = useTheme();

  return (
    <ShopLayout1 topbarBgColor={theme.palette.grey[900]}>
      <SEO title="Free Consultation" />
      <Box bgcolor="#FFF">
        <FreeConsultation />
      </Box>
    </ShopLayout1>
  );
};

export default FreeConsultationPage;
