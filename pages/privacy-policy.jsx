import React from "react";
import { Box, useTheme } from "@mui/material";
import ShopLayout1 from "components/layouts/ShopLayout1";
import SEO from "components/SEO";
import Section2 from "pages-sections/policy/Section2";

const PrivacyPolicyPage = () => {
  const theme = useTheme();
  return (
    <ShopLayout1 topbarBgColor={theme.palette.grey[900]}>
      <SEO title="Privacy Policy | Lensifyco" />
      <Box bgcolor="#FFF">
        <Section2 />
      </Box>
    </ShopLayout1>
  );
};

export default PrivacyPolicyPage;
