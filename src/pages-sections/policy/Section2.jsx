import { Box, Container, styled } from "@mui/material";
import { H2, H4 } from "components/Typography";
import styles from "./Section2.module.css";

const StyledBox = styled(Box)(({ theme }) => ({
  bgcolor: "white",
  // margin: "0 5% 5%",
  [theme.breakpoints.down("md")]: {
    margin: "0",
    marginBottom: "5%",
  },
}));

const StyledContainer = styled(Container)(({ theme }) => ({
  padding: "0 10% !important",
  [theme.breakpoints.down("md")]: {
    padding: "0 5% !important",
  },
}));
const Section1 = () => {
  return (
    <StyledContainer
      sx={{
        mt: 8,
      }}
    >
      <StyledBox>
        <H2 textAlign="start" mb={4} fontSize="30px" fontWeight="600">
          Domestic Shipping Rates and Estimates
        </H2>

        <H4 textAlign="start" mb={4} fontWeight="500">
          <span style={{ fontWeight: "800" }}>
            For simple flat rate shipping:
          </span>{" "}
          We offer flat rate shipping to following cities and their surrounding
          areas
        </H4>

        {/* Wrap table in a container instead of H4 */}
        <Box textAlign="start" mb={4} fontWeight="500">
          <table>
            <thead>
              <tr>
                <th style={{ paddingRight: "50px" }}>Shipping option</th>
                <th>Price (PKR)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Lahore</td>
                <td>100</td>
              </tr>
              <tr>
                <td>Karachi</td>
                <td>200</td>
              </tr>
              <tr>
                <td>Islamabad</td>
                <td>100</td>
              </tr>
            </tbody>
          </table>
        </Box>

        <H4 textAlign="start" mb={4} fontWeight="500">
          Deliveries are made from 9am to 5pm on [available days]. Courier
          Service will contact you via text message with the phone number you
          provided at checkout to notify you on the day of our arrival.
        </H4>
      </StyledBox>
      <StyledBox>
        <H2 textAlign="start" mb={4} fontSize="30px" fontWeight="600">
          How do I check the status of my order?
        </H2>
        <H4 textAlign="start" mb={4} fontWeight="500">
          When your order has shipped, you will receive an email notification
          from us which will include a tracking number you can use to check its
          status. Please allow 48 hours for the tracking information to become
          available.
        </H4>
        <H4 textAlign="start" mb={4} fontWeight="500">
          If you haven’t received your order within 4 days of receiving your
          shipping confirmation email, please contact us at
          theblooming000@gmail.com with your name and order number, and we will
          look into it for you.
        </H4>
      </StyledBox>
      <StyledBox>
        <H2 textAlign="start" mb={4} fontSize="30px" fontWeight="600">
          Refunds, returns, and exchanges
        </H2>
        <H4 textAlign="start" mb={4} fontWeight="500">
          In the event that your order arrives damaged in any way, please email
          us as soon as possible, after getting the delivery, at
          theblooming000@gmail.com with your order number and a photo of the
          item’s condition. But please don’t unbox the whole plant and only open
          the outbox and send us the photo on our WhatsApp or email us and it is
          clearly visible if plant is damaged after only opening the outbox so,
          please don’t open the inner sheet rolled around plant if you don’t
          want to keep the plant. We address these issues on a case-by-case
          basis but will try our best to work towards a satisfactory solution.
          But if you have unbox the inner sheet, you have to keep the plant as
          there will be no way for us to retrieving the plant in safe condition
          again.
        </H4>
        <H4 textAlign="start" mb={4} fontWeight="500">
          We accept returns up to 1 days after delivery, as plants are delicate
          living beings it’s very difficult to ship them safely and so, if the
          plants have reached you in good condition and we have received the
          plants in same condition, and we will refund the full order amount
          minus the shipping costs for the return. But if the plant get damaged
          during return, we can’t refund you the full amount.
        </H4>
        <H4 textAlign="start" mb={4} fontWeight="500">
          If you have any further questions, please don't hesitate to contact us
          at theblooming000@gmail.com
        </H4>
      </StyledBox>
    </StyledContainer>
  );
};

export default Section1;
