import React from "react";
import { Box, Container, Grid, useTheme } from "@mui/material";
import ShopLayout1 from "components/layouts/ShopLayout1";
import SEO from "components/SEO";
// import Section1 from "pages-sections/policy/Section1";
import Section2 from "pages-sections/policy/Section2";
import TermsAndConditions from "pages-sections/termsandconditions";
// import Section4 from "pages-sections/policy/Section4";

const TermsAndConditionsPage = () => {
  const theme = useTheme();
  return (
    <ShopLayout1 topbarBgColor={theme.palette.grey[900]}>
      <SEO title="Terms & Conditions" />
      <Box bgcolor="#FFF">
        {/* INTRO SECTION */}
        {/* <Section1 /> */}
        <TermsAndConditions />
        {/* <Section3 /> */}
        {/* <Section4 /> */}
      </Box>
    </ShopLayout1>
  );
};

export default TermsAndConditionsPage;
