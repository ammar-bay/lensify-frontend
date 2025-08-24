import { Box, Container, styled } from "@mui/material";
import { H2, H4 } from "components/Typography";

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: "#f8f9fa", // light gray for section contrast
  borderRadius: "12px",
  padding: "30px",
  marginBottom: "40px",
  boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
}));


const StyledContainer = styled(Container)(({ theme }) => ({
  padding: "0 10% !important",
  [theme.breakpoints.down("md")]: {
    padding: "0 5% !important",
  },
}));

const PrivacyPolicy = () => {
  return (
    <StyledContainer
      sx={{
        mt: 8,
        mb: 8,
      }}
    >
      {/* Title */}
      <H2 textAlign="center" mb={6} fontSize="30px" fontWeight="700">
        Privacy Policy
      </H2>

      {/* Introduction */}
      <StyledBox>
        <H2 textAlign="start" mb={3} fontSize="26px" fontWeight="600">
          Introduction
        </H2>
        <H4 textAlign="start" mb={2} fontWeight="400" color="#555555" lineHeight="1.7">
          At Lensifyco, your privacy is important to us. This Privacy Policy
          explains how we collect, store, and use your personal information when
          you interact with our website, place an order, or use our free
          ophthalmologist consultation service.
        </H4>
      </StyledBox>

      {/* Data Collection */}
      <StyledBox>
        <H2 textAlign="start" mb={3} fontSize="26px" fontWeight="600">
          Information We Collect
        </H2>
        <H4 textAlign="start" mb={2} fontWeight="400">
          We may collect the following information:
          <ul style={{ marginLeft: "20px", marginTop: "10px" }}>
            <li>Full name, phone number, email address, and shipping details</li>
            <li>
              Payment information (Cash on Delivery, bank transfer details
              including proof screenshots, or digital payments)
            </li>
            <li>
              Ophthalmologist consultation details, including vision
              prescription data (retained for up to 1 year only)
            </li>
            <li>Browsing activity and cookies for website improvement</li>
          </ul>
        </H4>
      </StyledBox>

      {/* Data Usage */}
      <StyledBox>
        <H2 textAlign="start" mb={3} fontSize="26px" fontWeight="600">
          How We Use Your Information
        </H2>
        <H4 textAlign="start" mb={2} fontWeight="400">
          We do not sell your information to third parties. However, we may use
          your data for:
          <ul style={{ marginLeft: "20px", marginTop: "10px" }}>
            <li>Processing and fulfilling your orders</li>
            <li>Providing customer support and consultations</li>
            <li>Improving our products, services, and website experience</li>
            <li>Marketing or promotional purposes related to Lensifyco</li>
            <li>Legal compliance when required by Pakistani law</li>
          </ul>
        </H4>
      </StyledBox>

      {/* Data Retention */}
      <StyledBox>
        <H2 textAlign="start" mb={3} fontSize="26px" fontWeight="600">
          Data Retention
        </H2>
        <H4 textAlign="start" mb={2} fontWeight="400">
          We store your personal and consultation data for a maximum of{" "}
          <b>1 year</b>. After this period, data is securely deleted from our
          systems.
        </H4>
      </StyledBox>

      {/* Payments */}
      <StyledBox>
        <H2 textAlign="start" mb={3} fontSize="26px" fontWeight="600">
          Payments
        </H2>
        <H4 textAlign="start" mb={2} fontWeight="400">
          Lensifyco accepts{" "}
          <b>Cash on Delivery, Bank Transfers, and Digital Payment Methods</b>.
          For bank transfers, payment screenshots are stored for record-keeping
          and fraud prevention, subject to the same data retention policy.
        </H4>
      </StyledBox>

      {/* Cookies */}
      <StyledBox>
        <H2 textAlign="start" mb={3} fontSize="26px" fontWeight="600">
          Cookies
        </H2>
        <H4 textAlign="start" mb={2} fontWeight="400">
          We may use cookies to enhance your shopping experience, remember your
          preferences, and analyze website performance. You can manage or
          disable cookies through your browser settings.
        </H4>
      </StyledBox>

      {/* Contact */}
      <StyledBox>
        <H2 textAlign="start" mb={3} fontSize="26px" fontWeight="600">
          Contact Us
        </H2>
        <H4 textAlign="start" mb={2} fontWeight="400">
          If you have any questions or concerns about this Privacy Policy or
          your personal data, please contact us at:{" "}
          <span style={{ color: "#e53935", fontWeight: "600" }}>
            support@lensifyco.com
          </span>
        </H4>
      </StyledBox>
    </StyledContainer>
  );
};

export default PrivacyPolicy;
