import { Box, Container, styled } from "@mui/material"; 
import { H2, H4 } from "components/Typography";
import React from "react";

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: "#f8f9fa",
  padding: theme.spacing(4),
  borderRadius: "12px",
  boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
  marginBottom: theme.spacing(4),
}));

export default function TermsAndConditions() {
  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      {/* Page Title */}
      <H2 sx={{ textAlign: "center", mb: 6 }}>Terms and Conditions</H2>

      {/* Section 1 */}
      <StyledBox>
        <H4>1. Acceptance of Terms</H4>
        <p>
          By accessing and using our website, you accept and agree to be bound
          by these Terms and Conditions and our Privacy Policy. If you do not
          agree, you must discontinue use of our services immediately.
        </p>
      </StyledBox>

      {/* Section 2 */}
      <StyledBox>
        <H4>2. Use of Website</H4>
        <p>
          You agree to use our website only for lawful purposes and in a way
          that does not infringe the rights of, restrict, or inhibit anyone
          else’s use and enjoyment of the site.
        </p>
      </StyledBox>

      {/* Section 3 */}
      <StyledBox>
        <H4>3. Intellectual Property Rights</H4>
        <p>
          All content, design, text, graphics, logos, and other material on this
          site are owned by or licensed to us. You may not reproduce, copy,
          distribute, or otherwise use our content without prior written
          permission.
        </p>
      </StyledBox>

      {/* Section 4 */}
      <StyledBox>
        <H4>4. Limitation of Liability</H4>
        <p>
          We are not liable for any loss or damage, direct or indirect, arising
          from your use of this website or reliance on any information provided
          herein.
        </p>
      </StyledBox>

      {/* Section 5 */}
      <StyledBox>
        <H4>5. Third-Party Links</H4>
        <p>
          Our website may include links to third-party websites. We do not
          endorse or take responsibility for the content or practices of such
          external sites.
        </p>
      </StyledBox>

      {/* Section 6 */}
      <StyledBox>
        <H4>6. Termination of Access</H4>
        <p>
          We reserve the right to restrict or terminate access to our website at
          any time, without prior notice, if you violate these Terms and
          Conditions.
        </p>
      </StyledBox>

      {/* Section 7 */}
      <StyledBox>
        <H4>7. Governing Law</H4>
        <p>
          These Terms and Conditions shall be governed by and construed in
          accordance with the laws of your jurisdiction, without regard to its
          conflict of law provisions.
        </p>
      </StyledBox>

      {/* Section 8 */}
      <StyledBox>
        <H4>8. Changes to Terms</H4>
        <p>
          We may update these Terms and Conditions from time to time. Changes
          will be posted on this page with an updated effective date. Continued
          use of the website constitutes acceptance of the updated terms.
        </p>
      </StyledBox>

      {/* Section 9 */}
      <StyledBox>
        <H4>9. Contact Us</H4>
        <p>
          If you have any questions about these Terms and Conditions, please
          contact us at{" "}
          <Box component="span" sx={{ color: "#e53935", fontWeight: "bold" }}>
            support@yourcompany.com
          </Box>
          .
        </p>
      </StyledBox>
    </Container>
  );
}
