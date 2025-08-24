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

// Custom Heading Style for Section Titles
const SectionHeading = styled(H4)(({ theme }) => ({
  fontWeight: "700",
  fontSize: "1.3rem", // slightly bigger than normal H4
  marginBottom: theme.spacing(2),
}));

export default function RefundAndReturnPolicy() {
  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      {/* Page Title */}
      <H2 sx={{ textAlign: "center", mb: 6 }}>Refund & Return Policy</H2>

      {/* Section 1 */}
      <StyledBox>
        <SectionHeading>Refund Policy</SectionHeading>
        <p>
          We are happy to accept the return of any{" "}
          <strong>undamaged and unscratched glasses</strong> within{" "}
          <strong>7 working days</strong> of purchase for either a refund or an exchange.
        </p>
        <p>
          Customers are required to send the parcel back through any reliable courier service at their own expense.
        </p>
        <p>
          Please note that <strong>delivery charges are non-refundable</strong>.
        </p>
        <p>
          Once the returned item is received and inspected, refund requests will be processed within{" "}
          <strong>2–3 working days</strong>.
        </p>
        <p>
          For assistance, WhatsApp Us:{" "}
          <Box component="span" sx={{ color: "#e53935", fontWeight: "bold" }}>
            03328519715
          </Box>
        </p>
      </StyledBox>

      {/* Section 2 */}
      <StyledBox>
        <SectionHeading>Steps to Follow</SectionHeading>
        <p>
          <strong>1. Repack the Parcel</strong>
          <br />
          Ensure the product is securely packed. Any damaged item will not be accepted.
          <br />
          Include the following information inside the parcel: your order name, phone number, and order details.
        </p>

        <p>
          <strong>2. Ship To</strong>
          <br />
          Return the parcel through a traceable delivery service (courier or registered post) at your own expense to:
        </p>
        <p>
          <strong>Lensifyco Returns Department</strong>
          <br />
          ALREHMAN OPTICAL, SHOP#58, MOBI PLAZA,OPPOSITE CEROZE CENIMA SADDAR, RAWALPINDI
          <br />
          <strong>Telephone Support:</strong> 03328519715 (Mon – Sat, 10:00 AM – 5:00 PM)
        </p>

        <p>
          <strong>3. Customer Care Follow-Up</strong>
          <br />
          After receiving your parcel, our representative will contact you. Your refund or exchange will then be processed within{" "}
          <strong>2–3 working days</strong>.
        </p>
      </StyledBox>

      {/* Section 3 */}
      <StyledBox>
        <SectionHeading>Customized Glasses Refund Policy</SectionHeading>
        <p>
          The <strong>lens cost is non-refundable</strong>. Only the frame amount will be refunded if the prescription is correct and the customer chooses not to keep the product.
        </p>
        <p>If the prescription is correct, the following deductions will apply:</p>
        <ul>
          <li>For Screen/Transition Glasses: <strong>Rs. 1000</strong> will be deducted.</li>
          <li>For Screen + Transition Glasses: <strong>Rs. 2000</strong> will be deducted.</li>
        </ul>
        <p>
          If the prescription is <strong>incorrect</strong>, the company will recheck it, and in such cases, the <strong>full amount will be refunded</strong>.
        </p>
      </StyledBox>
    </Container>
  );
}
