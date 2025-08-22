import { Box, useTheme } from "@mui/material";
import ShopLayout1 from "components/layouts/ShopLayout1";
import SEO from "components/SEO";
import Section1 from "pages-sections/aboutus/Section1";
import Section2 from "pages-sections/aboutus/Section2";
import Section3 from "pages-sections/aboutus/Section3";

const aboutus = () => {
  const theme = useTheme();

  return (
    <ShopLayout1 topbarBgColor={theme.palette.grey[900]}>
      <SEO title="About Us" />
      <Box bgcolor="#fff">
        {/* INTRO SECTION */}
        {/* <Section1 /> */}
        <Section2 />
        {/* <Section3 /> */}
      </Box>
    </ShopLayout1>
  );
};

export default aboutus;
