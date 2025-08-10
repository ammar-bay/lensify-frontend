import { Box, Container } from "@mui/material";
import Carousel from "components/carousel/Carousel";
import { CarouselCard1 } from "components/carousel-cards";
// ======================================================

export const carouselData = [
  {
    title: "Lensify Collection",
    imgUrl: "/assets/images/products/Fashion/Accessories/8.RayBanMattBlack.png",
    description: "Discover the latest trends in eyewear",
    buttonText: "Shop Now",
    buttonLik: "/products",
  },
  {
    title: "Exclusive Offers",
    imgUrl: "/assets/images/products/Fashion/Accessories/9.RayBanBlack.png",
    description: "Grab the best deals on our exclusive collection",
    buttonText: "Explore Glasses",
    buttonLik: "/products",
  },
];

const Section1 = () => {
  return (
    <Box bgcolor="grey.100" mb={7.5}>
      <Container
        sx={{
          py: 4,
        }}
      >
        <Carousel
          spacing="0px"
          totalSlides={2}
          infinite={true}
          showDots={true}
          autoPlay={true}
          visibleSlides={1}
          showArrow={false}
          interval={5000}
        >
          {carouselData.map((item, ind) => (
            <CarouselCard1
              key={ind}
              buttonColor="dark"
              title={item.title}
              imgUrl={item.imgUrl}
              buttonLik={item.buttonLik}
              buttonText={item.buttonText}
              description={item.description}
            />
          ))}
        </Carousel>
      </Container>
    </Box>
  );
};
export default Section1;
