import { Box, Container, styled } from "@mui/material";
import CarouselCard7 from "components/carousel-cards/CarouselCard7";
import Carousel from "components/carousel/Carousel";
// ======================================================
const data = {
  title: "Fashionable Collection",
  imgUrl:
    // "https://cdn.shopify.com/s/files/1/0260/3037/4957/files/hero-image2_4783da1f-2f7f-4663-a24d-c4004e927475_1728x.jpg?v=1654188927",
    "/assets/images/bannerimg.avif",
  description: "Get Free Shipping on all orders over $99.00",
  buttonText: "Shop Now",
  buttonLik: "#",
};

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: "white",
  margin: "0 10%",
  [theme.breakpoints.down("md")]: {
    margin: "0",
    marginBottom: "5%",
  },
}));
const Section1 = () => {
  return (
    <StyledBox>
      <Container
        sx={{
          py: 4,
        }}
      >
        <CarouselCard7 {...data} buttonColor="dark" />
      </Container>
    </StyledBox>
  );
};

export default Section1;
