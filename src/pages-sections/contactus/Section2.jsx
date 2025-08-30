import { Box, Button, Container, styled } from "@mui/material";
import CarouselCard5 from "components/carousel-cards/CarouselCard5";
import Carousel from "components/carousel/Carousel";
import { H1, H2, H3, H4, H6, Paragraph } from "components/Typography";
import styles from "./Section2.module.css";
import Form from "pages-sections/contactus/Form";
// ======================================================
const data = [
  {
    title: "Fashionable Collection",
    imgUrl:
      "https://cdn.shopify.com/s/files/1/0260/3037/4957/files/hero-image2_4783da1f-2f7f-4663-a24d-c4004e927475_1728x.jpg?v=1654188927",
    description: "Get Free Shipping on all orders over $99.00",
    buttonText: "Shop Now",
    buttonLik: "#",
  },
  {
    title: "Fashionable Collection",
    imgUrl: "/assets/images/products/nike-black.png",
    description: "Get Free Shipping on all orders over $99.00",
    buttonText: "Shop Now",
    buttonLik: "#",
  },
];

const StyledBox = styled(Box)(({ theme }) => ({
  bgcolor: "white",
  // margin: "0 5% 5%",
  [theme.breakpoints.down("md")]: {
    margin: "0",
    marginBottom: "5%",
  },
}));

const StyledContainer = styled(Container)(({ theme }) => ({
  padding: "0 5% !important",
  [theme.breakpoints.down("md")]: {
    padding: "0 5% !important",
  },
}));
const Section1 = () => {
  return (
    <StyledContainer
      sx={{
        mt: 6,
      }}
    >
      {/* <hr className={styles.linebreak} /> */}
      <H3 textAlign="center" mb={4} fontSize="40px" fontWeight="400">
        Contact Us
      </H3>

      <StyledBox>
        <H2 textAlign="start" mb={4} fontSize="20px" fontWeight="400">
          You can reach out to us via
        </H2>
        <H4 textAlign="start" mb={4} fontWeight="300">
          <b>Email: </b>
          <a href="mailto:support@lensifyco.com">support@lensifyco.com</a>
        </H4>
        <H4 textAlign="start" mb={4} fontWeight="300">
          <b>Phone: </b>
          <a href="tel:+92 332 85 19 715">+92 332 85 19 715</a>
        </H4>
      </StyledBox>
      <Form />
      {/*
      <StyledBox>
        <H2 textAlign="start" mb={4} fontSize="24px" fontWeight="400">
          Our Mission:
        </H2>
        <H4 textAlign="start" mb={4} fontWeight="400">
          Our goal is to bring you closer with nature. As in this modern world,
          where we seldom get time to look at nature and appreciate its beauty,
          Blooming would help you in any possible way to change, we want o bring
          nature into your life and make it an important aspect of your life
        </H4>
      </StyledBox>
      <StyledBox>
        <H2 textAlign="start" mb={4} fontSize="24px" fontWeight="400">
          Direct From the Greenhouse
        </H2>
        <H4 textAlign="start" mb={4} fontWeight="400">
          When you buy a houseplant from a box store or nursery, it probably
          spends an average of four weeks traveling from a greenhouse to a
          drafty warehouse on a hot or cold truck. Then, it’s shipped to nursery
          in cities where it likely isn’t getting the water, light, or care it
          needs to thrive. With Blooming, our plants are cared for by plant
          experts and kept in optimal conditions at our greenhouse where they’re
          shipped directly to you. So instead of your plant spending 4 weeks in
          an uncontrolled environment, it spends 2-4 days going from our
          greenhouse to your front door. This means your plants arrive healthy
          and already thriving.
        </H4>
      </StyledBox>
      <StyledBox>
        <H2 textAlign="start" mb={4} fontSize="24px" fontWeight="400">
          Shipped to Your Door
        </H2>
        <H4 textAlign="start" mb={4} fontWeight="400">
          Our plants are shipped with care and experience. We’ve learned how to
          keep plants at the right temperature, protect their roots, and keep
          them healthy while they travel from our greenhouse to your home. Our
          innovative packaging holds plants securely in place, preventing damage
          and decreasing soil spillage. Most shipments will arrive in under a
          week and all plants will be healthy, undamaged, and ready for you to
          enjoy.
        </H4>
      </StyledBox>
      <StyledBox>
        <H2 textAlign="start" mb={4} fontSize="24px" fontWeight="400">
          All the Guidance
        </H2>
        <H4 textAlign="start" mb={4} fontWeight="400">
          Our expertise doesn’t stop once your plant leaves our greenhouse. We
          are here to help you with any and all of your plant care questions.
          From simple, customized care instructions included with your plant to
          real-time expert support, we want to make plant care easy. Feel free
          to email, chat, or dm us any question you have — the Grow-How® Team is
          standing by and ready to help!
        </H4>
        <H4 textAlign="start" mb={4} fontWeight="400">
          Email us any time at abc@gmail.com or fill the form below,
          we will get in touch with you
        </H4>
      </StyledBox> */}
    </StyledContainer>
  );
};

export default Section1;
