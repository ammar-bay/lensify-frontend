import { Box, Container, styled } from "@mui/material";
import { H2, H3, H4 } from "components/Typography";

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: "#f8f9fa", // light gray for section contrast
  borderRadius: "12px",
  padding: "30px",
  marginBottom: "40px",
  boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
}));

const StyledContainer = styled(Container)(({ theme }) => ({
  padding: "0 5% !important",
}));

const Section1 = () => {
  return (
    <StyledContainer sx={{ mt: 8, mb: 8 }}>
      <H3
        textAlign="center"
        mb={6}
        fontSize="40px"
        fontWeight="600"
        color="#212121" // dark text
      >
        About Us
      </H3>

      {/* Brand Philosophy */}
      <StyledBox>
        <H2 mb={3} fontSize="26px" fontWeight="600" color="#212121">
          Eyecare Meets Eyewear
        </H2>
        <H4 fontWeight="400" color="#555555" lineHeight="1.7">
          At Lensifyco, we believe that eyewear is more than just vision
          correction—it’s about confidence, style, and complete eye health. Our
          mission is simple: to combine professional ophthalmologist care,
          stylish frames, and innovative technology into a seamless experience
          for everyone.
        </H4>
      </StyledBox>

      {/* Our Story */}
      <StyledBox>
        <H2 mb={3} fontSize="26px" fontWeight="600" color="#212121">
          Our Story
        </H2>
        <H4 fontWeight="400" color="#555555" lineHeight="1.7">
          Lensifyco was created with the vision of making eyecare accessible,
          trustworthy, and stylish. We realized that people often had to choose
          between quality lenses, premium frames, or reliable consultation. At
          Lensifyco, you get it all: lenses crafted for clarity, frames that
          match your style, and free consultation with ophthalmologists who
          truly care for your eyes.
        </H4>
      </StyledBox>

      {/* Mission */}
      <StyledBox>
        <H2 mb={3} fontSize="26px" fontWeight="600" color="#212121">
          Our Mission
        </H2>
        <H4 fontWeight="400" color="#555555" lineHeight="1.7">
          To redefine eyewear by merging healthcare and fashion. From everyday
          essentials to luxury designs, we aim to provide options for everyone
          while ensuring that vision care remains at the heart of what we do.
        </H4>
      </StyledBox>

      {/* Try-On */}
      <StyledBox>
        <H2 mb={3} fontSize="26px" fontWeight="600" color="#212121">
          Try Before You Buy
        </H2>
        <H4 fontWeight="400" color="#555555" lineHeight="1.7">
          With our Virtual Try-On model, you can explore how frames look on you
          before making a choice. This way, you get the perfect fit—both in
          style and comfort—without any guesswork.
        </H4>
      </StyledBox>

      {/* Ophthalmologist Care */}
      <StyledBox>
        <H2 mb={3} fontSize="26px" fontWeight="600" color="#212121">
          Guided by Experts
        </H2>
        <H4 fontWeight="400" color="#555555" lineHeight="1.7">
          Every purchase comes with a free consultation from our experienced
          ophthalmologists. Because at Lensifyco, protecting your eyesight is
          just as important as enhancing your style.
        </H4>
      </StyledBox>

      {/* Support */}
      <StyledBox>
        <H2 mb={3} fontSize="26px" fontWeight="600" color="#212121">
          Here for You
        </H2>
        <H4 fontWeight="400" color="#555555" lineHeight="1.7">
          Whether you’re looking for your first pair of glasses, upgrading to a
          luxury design, or just need expert advice, our team is here to help.
          Email us at{" "}
          <span style={{ color: "#e53935", fontWeight: "600" }}>
            support@lensifyco.com
          </span>{" "}
          or fill out the form below—we’ll be in touch with you right away.
        </H4>
      </StyledBox>
    </StyledContainer>
  );
};

export default Section1;
