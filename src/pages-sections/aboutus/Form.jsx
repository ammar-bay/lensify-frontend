import { Box, Button, Grid, TextField } from "@mui/material";
import { H1, H6 } from "components/Typography";
import { Formik } from "formik";
import useWindowSize from "hooks/useWindowSize";
import { useRouter } from "next/router";
import { Fragment, useState } from "react";
// import toast from "react-hot-toast";
import * as yup from "yup";
import axios from "utils/axios";
import { useSnackbar } from "notistack";

const PaymentForm = () => {
  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const width = useWindowSize();
  const router = useRouter();
  const isMobile = width < 769;
  const { enqueueSnackbar } = useSnackbar();

  const handleFormSubmit = async (values) => {
    // console.log(values);
    try {
      const response = await axios.post("/aboutus", values);
      console.log(response.data);
      enqueueSnackbar("Form Submitted Successfully", { variant: "success" });
    } catch (error) {
      console.log(error);
      enqueueSnackbar("Failed to Submit Form", { variant: "error" });
    }
  };

  const handlePaymentMethodChange = ({ target: { name } }) => {
    setPaymentMethod(name);
  };

  return (
    <Box m={"20px"}>
      <H1 style={{ marginBottom: "20px" }}>Contact Us</H1>
      <H6 style={{ margin: "20px 0" }}>
        Please fill out the form below, and we will get in touch with you.
      </H6>
      <Fragment>
        {/* <Card1
        sx={{
          mb: 4,
        }}
      > */}
        {/* <FormControlLabel
          sx={{
            mb: 3,
          }}
          name="credit-card"
          onChange={handlePaymentMethodChange}
          label={<Paragraph fontWeight={600}>Pay with credit card</Paragraph>}
          control={
            <Radio
              checked={paymentMethod === "credit-card"}
              color="primary"
              size="small"
            />
          }
        />

        <Divider
          sx={{
            mb: 3,
            mx: -4,
          }}
        /> */}

        {/* {paymentMethod === "credit-card" && ( */}

        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
          validationSchema={checkoutSchema}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => (
            <form onSubmit={handleSubmit}>
              <Box mb={3}>
                <Grid container spacing={3}>
                  <Grid item sm={6} xs={12}>
                    <TextField
                      fullWidth
                      name="name"
                      color="primary"
                      label="Name"
                      onBlur={handleBlur}
                      value={values.name}
                      onChange={handleChange}
                      helperText={touched.card_no && errors.card_no}
                    />
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    <TextField
                      fullWidth
                      name="email"
                      label="Email"
                      placeholder="email"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.email}
                      helperText={touched.exp_date && errors.exp_date}
                    />
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    <TextField
                      fullWidth
                      name="phone"
                      onBlur={handleBlur}
                      value={values.phone}
                      label="Phone Number"
                      onChange={handleChange}
                      helperText={touched.name && errors.name}
                    />
                  </Grid>
                  {/* <Grid item sm={6} xs={12}>
                    <TextField
                      fullWidth
                      name="company"
                      onBlur={handleBlur}
                      value={values.company}
                      label="Company Name"
                      onChange={handleChange}
                      helperText={touched.name && errors.name}
                    />
                  </Grid> */}
                  <Grid item sm={6} xs={12}>
                    <TextField
                      fullWidth
                      name="comment"
                      onBlur={handleBlur}
                      value={values.comment}
                      label="Any Comment"
                      onChange={handleChange}
                      helperText={touched.name && errors.name}
                    />
                  </Grid>
                </Grid>
              </Box>

              <Button
                variant="outlined"
                // color="primary"
                type="submit"
                sx={{
                  mb: 4,
                  color: "white",
                  //   borderColor: "white",
                  backgroundColor: "black",
                  "&:hover": {
                    backgroundColor: "#224329",
                  },
                }}
              >
                Submit
              </Button>

              {/* <Divider
                sx={{
                  mb: 3,
                  mx: -4,
                }}
              /> */}
            </form>
          )}
        </Formik>
        {/* )} */}

        {/* <FormControlLabel
          name="paypal"
          sx={{
            mb: 3,
          }}
          onChange={handlePaymentMethodChange}
          label={<Paragraph fontWeight={600}>Pay with Paypal</Paragraph>}
          control={
            <Radio
              checked={paymentMethod === "paypal"}
              color="primary"
              size="small"
            />
          }
        />

        <Divider
          sx={{
            mb: 3,
            mx: -4,
          }}
        />

        {paymentMethod === "paypal" && (
          <Fragment>
            <FlexBox alignItems="flex-end" mb={4}>
              <TextField
                fullWidth
                name="email"
                type="email"
                label="Paypal Email"
                sx={{
                  mr: isMobile ? "1rem" : "30px",
                }}
              />
              <Button variant="outlined" color="primary" type="button">
                Submit
              </Button>
            </FlexBox>

            <Divider
              sx={{
                mb: 3,
                mx: -4,
              }}
            />
          </Fragment>
        )}

        <FormControlLabel
          name="cod"
          onChange={handlePaymentMethodChange}
          label={<Paragraph fontWeight={600}>Cash On Delivery</Paragraph>}
          control={
            <Radio
              checked={paymentMethod === "cod"}
              color="primary"
              size="small"
            />
          }
        />*/}
        {/* </Card1> */}

        {/* <Grid container spacing={7}>
        <Grid item sm={6} xs={12}>
          <Link href="/checkout" passHref>
            <Button variant="outlined" color="primary" type="button" fullWidth>
              Back to checkout details
            </Button>
          </Link>
        </Grid>
        <Grid item sm={6} xs={12}>
          <Link href="/orders" passHref>
            <Button variant="contained" color="primary" type="submit" fullWidth>
              Review
            </Button>
          </Link>
        </Grid>
      </Grid> */}
      </Fragment>
    </Box>
  );
};

const initialValues = {
  name: "",
  email: "",
  phone: "",
  comment: "",
};
const checkoutSchema = yup.object().shape({
  name: yup.string().required("required"),
  phone: yup.string().required("required"),
  // shipping_zip: yup.string().required("required"),
  // shipping_country: yup.object().required("required"),
  // shipping_address1: yup.string().required("required"),
  // billing_name: yup.string().required("required"),
  // billing_email: yup.string().required("required"),
  // billing_contact: yup.string().required("required"),
  // billing_zip: yup.string().required("required"),
  // billing_country: yup.string().required("required"),
  // billing_address1: yup.string().required("required"),
});
export default PaymentForm;
