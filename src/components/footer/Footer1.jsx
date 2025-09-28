import Link from "next/link";
import { Box, Container, Grid, IconButton, styled } from "@mui/material";
import AppStore from "components/AppStore";
import Image from "components/BazaarImage";
import { FlexBox } from "components/flex-box";
import { Paragraph } from "components/Typography";
import Google from "components/icons/Google";
import Twitter from "components/icons/Twitter";
import Youtube from "components/icons/Youtube";
import Facebook from "components/icons/Facebook";
import Instagram from "components/icons/Instagram";
import { WhatsApp } from "@mui/icons-material";

// styled component
const StyledLink = styled(Link)(({ theme }) => ({
  display: "block",
  borderRadius: 4,
  cursor: "pointer",
  position: "relative",
  padding: "0.3rem 0rem",
  color: theme.palette.grey[500],
  "&:hover": {
    color: theme.palette.grey[100],
  },
}));
const Footer1 = () => {
  return (
    <footer>
      <Box bgcolor="#222935">
        <Container
          sx={{
            p: "0.5rem",
            color: "white",
          }}
        >
          <Box py={10} overflow="hidden">
            <Grid container display={"flex"} justifyContent={"space-between"} spacing={3}>
              <Grid item lg={4} md={6} sm={6} xs={12}>
                <Link href="/">
                  <Image
                    height={200}
                    width={250}
                    src="/assets/images/logo.png"
                    alt="logo"
                  />
                </Link>

                <Paragraph mb={2.5} color="grey.500">
                </Paragraph>

                {/* <AppStore /> */}
              </Grid>

              {<Grid item lg={2} md={6} sm={6} xs={12}>
                <Box
                  fontSize="18px"
                  fontWeight="600"
                  mb={1.5}
                  lineHeight="1"
                  color="white"
                >
                  About Us
                </Box>

                <div>
                  {aboutLinks.map((item, ind) => (
                    <StyledLink href={item.url} key={ind}>
                      {item.name}
                    </StyledLink>
                  ))}
                </div>
              </Grid>}

              {<Grid item lg={3} md={6} sm={6} xs={12}>
                <Box
                  fontSize="18px"
                  fontWeight="600"
                  mb={1.5}
                  lineHeight="1"
                  color="white"
                >
                  Customer Care
                </Box>

                <div>
                  {customerCareLinks.map((item, ind) => (
                    <StyledLink href={item.url} key={ind}>
                      {item.name}
                    </StyledLink>
                  ))}
                </div>
              </Grid>}

              <Grid item lg={3} md={6} sm={6} xs={12}>
                <Box
                  fontSize="18px"
                  fontWeight="600"
                  mb={1.5}
                  lineHeight="1"
                  color="white"
                >
                  Contact Us
                </Box>

                <Box py={0.6} color="grey.500" sx={{ whiteSpace: "pre-line" }}>
                ALREHMAN OPTICAL, SHOP#58{"\n"}
                MOBI PLAZA, OPPOSITE CEROZE CENIMA{"\n"}
                SADDAR RAWALPINDI
                </Box>

                <Box py={0.6} color="grey.500">
                  Email: support@lensifyco.com
                </Box>

                <Box py={0.6} mb={2} color="grey.500">
                  Phone: +92 332 85 19 715
                </Box>

                <FlexBox className="flex" mx={-0.625}>
                  {iconList.map((item, ind) => (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noreferrer noopenner"
                      key={ind}
                    >
                      <IconButton
                        sx={{
                          margin: 0.5,
                          fontSize: 12,
                          padding: "10px",
                          backgroundColor: "rgba(0,0,0,0.2)",
                        }}
                      >
                        <item.icon
                          fontSize="inherit"
                          sx={{
                            color: "white",
                          }}
                        />
                      </IconButton>
                    </a>
                  ))}
                </FlexBox>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </footer>
  );
};
const aboutLinks = [
  {
    name: "About Us",
    url: "/about-us",
  },
  {
    name: "Privacy Policy",
    url: "/privacy-policy",
  },
  {
    name: "Terms & Conditions",
    url: "/terms-and-conditions",
  },
];
const customerCareLinks = [
  { 
    name: "Free Consultation",
    url: "/free-consultation",
  },
  {
    name: "Returns & Refunds",
    url: "/refund-and-returns-policy",
  },
];
const iconList = [
  {
    icon: Facebook,
    url: "https://web.facebook.com/profile.php?id=61579979561538&_rdc=1&_rdr#",
  },
  // {
  //   icon: Twitter,
  //   url: "https://twitter.com/uilibofficial",
  // },
  // {
  //   icon: Youtube,
  //   url: "https://www.youtube.com/channel/UCsIyD-TSO1wQFz-n2Y4i3Rg",
  // },
  // {
  //   icon: Google,
  //   url: "https://www.google.com/search?q=ui-lib.com",
  // },
  {
    icon: Instagram,
    url: "https://www.instagram.com/lensify_co",
  },
  {
    icon: WhatsApp,
    url: "wa.me/+92111111111",
  },
];
export default Footer1;
