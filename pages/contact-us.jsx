import { Box, useTheme } from "@mui/material";
import ShopLayout1 from "components/layouts/ShopLayout1";
import SEO from "components/SEO";
import Section1 from "pages-sections/contactus/Section1";
import Section2 from "pages-sections/contactus/Section2";
import Section3 from "pages-sections/contactus/Section3";

const contactus = () => {
  const theme = useTheme();

  return (
    <ShopLayout1 topbarBgColor={theme.palette.grey[900]}>
      <SEO title="Contact Us" />
      <Box bgcolor="#fff">
        {/* INTRO SECTION */}
        {/* <Section1 /> */}
        <Section2 />
        {/* <Section3 /> */}
      </Box>
    </ShopLayout1>
  );
};

export default contactus;
