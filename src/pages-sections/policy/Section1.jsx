import { Box, Container, styled } from "@mui/material";
import CarouselCard9 from "components/carousel-cards/CarouselCard9";
import Carousel from "components/carousel/Carousel";
// ======================================================
const data = {
  title: "Fashionable Collection",
  imgUrl: "/assets/images/van_image.jpg",
  description: "Get Free Shipping on all orders over $99.00",
  buttonText: "Shop Now",
  buttonLik: "#",
};
const StyledBox = styled(Box)(({ theme }) => ({
  bgcolor: "white",
  // margin: "0 5% 5%",
  [theme.breakpoints.down("md")]: {
    margin: "0",
    marginBottom: "5%",
  },
}));
const Section1 = () => {
  return (
    <StyledBox bgcolor="white" mb={7.5}>
      <Container
        sx={{
          py: 4,
        }}
      >
        <CarouselCard9 {...data} buttonColor="dark" />
      </Container>
    </StyledBox>
  );
};

export default Section1;
