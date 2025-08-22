import { Container } from "@mui/material";
import Carousel from "components/carousel/Carousel";
import { carouselStyled } from "components/carousel/CarouselStyled";
import ProductCard21 from "components/product-cards/ProductCard21";
import { H2 } from "components/Typography";
import useWindowSize from "hooks/useWindowSize";
import { useEffect, useState } from "react";

// ======================================================================

const products = [
  {
    _id: "1",
    imgurl: "/assets/images/shippinginfoimg1.jpeg",
  },
  {
    _id: "2",
    imgurl: "/assets/images/shippinginfoimg2.jpeg",
  },
  {
    _id: "3",
    imgurl: "/assets/images/shippinginfoimg3.jpeg",
  },
  {
    _id: "3",
    imgurl: "/assets/images/shippinginfoimg4.jpeg",
  },
];

const Section4 = () => {
  const width = useWindowSize();
  const [visibleSlides, setVisibleSlides] = useState(4);
  useEffect(() => {
    // console.log(products);
    if (width < 426) setVisibleSlides(1);
    else if (width < 650) setVisibleSlides(2);
    else if (width < 1024) setVisibleSlides(3);
    else setVisibleSlides(4);
  }, [width]);
  return (
    <Container
      sx={{
        mb: 3,
        mt: 8,
      }}
    >
      <H2 textAlign="center" mb={4}>
        Our Packaging
      </H2>

      <Carousel
        totalSlides={products.length}
        visibleSlides={visibleSlides}
        sx={carouselStyled}
      >
        {products.map((product) => (
          <ProductCard21 key={product._id} product={product} />
        ))}
      </Carousel>
    </Container>
  );
};

export default Section4;
