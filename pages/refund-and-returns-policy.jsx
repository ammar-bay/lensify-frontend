import React from "react";
import { Box, useTheme } from "@mui/material";
import ShopLayout1 from "components/layouts/ShopLayout1";
import SEO from "components/SEO";
import RefundAndReturnPolicy from "pages-sections/refund-and-returns-policy/refundreturns";

const RefundAndReturnsPolicyPage = () => {
  const theme = useTheme();

  return (
    <ShopLayout1 topbarBgColor={theme.palette.grey[900]}>
      <SEO title="Refund & Return Policy" />
      <Box bgcolor="#FFF">
        <RefundAndReturnPolicy />
      </Box>
    </ShopLayout1>
  );
};

export default RefundAndReturnsPolicyPage;
