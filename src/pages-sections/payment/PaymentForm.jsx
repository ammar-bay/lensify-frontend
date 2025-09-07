import { Button, Divider, Grid, Radio } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Card1 from "components/Card1";
import { Paragraph } from "components/Typography";
import { useAppContext } from "contexts/AppContext";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";

import { Fragment, useState } from "react";
import axios from "utils/axios";
import UploadReceipt from "./UploadReceipt";

const PaymentForm = () => {
  const [paymentMethod, setPaymentMethod] = useState("bank-transfer");
  const [paymentReceipt, setPaymentReceipt] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const { state, dispatch } = useAppContext();
  const { enqueueSnackbar } = useSnackbar();
  // const width = useWindowSize();
  const router = useRouter();
  // const isMobile = width < 769;
  // const handleFormSubmit = async (values) => router.push("/payment");
  const handlePaymentMethodChange = ({ target: { name } }) => {
    setPaymentMethod(name);
  };

  // console.log(state);
  const handlePlaceOrder = async () => {
    if (isLoading) return;
    if (paymentMethod === "bank-transfer" && !paymentReceipt)
      enqueueSnackbar(
        "Please upload the payment receipt for the bank transfer!",
        { variant: "error" }
      );

    if (state.cart.length === 0) {
      return enqueueSnackbar("Cart is empty", { variant: "error" });
    }

    setIsLoading(true);
    // console.log(state);
    try {
      const formData = new FormData();

      // Add base order fields
      formData.append("orderDetails", JSON.stringify(state.orderDetails));
      formData.append("paymentMethod", paymentMethod);

      if (paymentMethod === "bank-transfer") {
        formData.append("paymentReceipt", paymentReceipt); // file
      }

      if (state?.user) {
        formData.append("user", state.user._id);
      }

      // Add cart items
      state.cart.forEach((item, idx) => {
        formData.append(`cart[${idx}][name]`, item.name);
        formData.append(`cart[${idx}][qty]`, item.qty);
        formData.append(`cart[${idx}][slug]`, item.slug);
        formData.append(`cart[${idx}][imgUrl]`, item.imgUrl);
        formData.append(`cart[${idx}][price]`, item.price);
        formData.append(`cart[${idx}][lensType]`, item.lensType);
        formData.append(`cart[${idx}][lensCat]`, item.lensCat);
        formData.append(`cart[${idx}][lasserToggle]`, item.lasserToggle);
        formData.append(
          `cart[${idx}][presDetails][sphereL]`,
          item.presDetails?.sphereL
        );
        formData.append(
          `cart[${idx}][presDetails][cylinderL]`,
          item.presDetails?.cylinderL
        );
        formData.append(
          `cart[${idx}][presDetails][axisL]`,
          item.presDetails?.axisL
        );
        formData.append(
          `cart[${idx}][presDetails][sphereR]`,
          item.presDetails?.sphereR
        );
        formData.append(
          `cart[${idx}][presDetails][cylinderR]`,
          item.presDetails?.cylinderR
        );
        formData.append(
          `cart[${idx}][presDetails][axisR]`,
          item.presDetails?.axisR
        );
        formData.append(
          `cart[${idx}][presDetails][type]`,
          item.presDetails?.type
        );
        // Add other item fields if any

        if (item.presDetails?.prescriptionFile) {
          formData.append(
            `cart[${idx}][presDetails][prescriptionFile]`,
            item.presDetails?.prescriptionFile // file
          );
        }
      });

      const result = await axios.post("/order", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      enqueueSnackbar("Order placed successfully", { variant: "success" });
      dispatch({ type: "EMPTY_CART" });
      router.push("/");
    } catch (error) {
      console.log(error);
      enqueueSnackbar("Could not place order, try again", { variant: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Fragment>
      <Card1
        sx={{
          mb: 4,
        }}
      >
        <FormControlLabel
          sx={{
            mb: 1,
          }}
          name="bank-transfer"
          onChange={handlePaymentMethodChange}
          label={<Paragraph fontWeight={600}>Bank Transfer</Paragraph>}
          control={
            <Radio
              checked={paymentMethod === "bank-transfer"}
              color="primary"
              size="small"
            />
          }
        />

        {/* <Divider
          sx={{
            mb: 3,
            mx: -4,
          }}
        /> */}

        {paymentMethod === "bank-transfer" && (
          <UploadReceipt
            onChange={(file) => setPaymentReceipt(file)}
            paymentReceipt={paymentReceipt}
          />
        )}

        {/*  {paymentMethod === "credit-card" && (
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
                        name="card_no"
                        label="Card Number"
                        onBlur={handleBlur}
                        value={values.card_no}
                        onChange={handleChange}
                        helperText={touched.card_no && errors.card_no}
                      />
                    </Grid>
                    <Grid item sm={6} xs={12}>
                      <TextField
                        fullWidth
                        name="exp_date"
                        label="Exp Date"
                        placeholder="MM/YY"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.exp_date}
                        helperText={touched.exp_date && errors.exp_date}
                      />
                    </Grid>
                    <Grid item sm={6} xs={12}>
                      <TextField
                        fullWidth
                        name="name"
                        onBlur={handleBlur}
                        value={values.name}
                        label="Name on Card"
                        onChange={handleChange}
                        helperText={touched.name && errors.name}
                      />
                    </Grid>
                    <Grid item sm={6} xs={12}>
                      <TextField
                        fullWidth
                        name="name"
                        onBlur={handleBlur}
                        value={values.name}
                        label="Name on Card"
                        onChange={handleChange}
                        helperText={touched.name && errors.name}
                      />
                    </Grid>
                  </Grid>
                </Box>

                <Button
                  variant="outlined"
                  color="primary"
                  sx={{
                    mb: 4,
                  }}
                >
                  Submit
                </Button>

                <Divider
                  sx={{
                    mb: 3,
                    mx: -4,
                  }}
                />
              </form>
            )}
          </Formik>
        )} */}

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
        /> */}

        {/* {paymentMethod === "paypal" && (
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
        )} */}

        <Divider
          sx={{
            mb: 3,
            mx: -4,
          }}
        />

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
        />
      </Card1>

      <Grid container spacing={7}>
        <Grid item sm={6} xs={12}>
          <Button
            LinkComponent={Link}
            href="/checkout"
            variant="outlined"
            color="primary"
            type="button"
            fullWidth
          >
            Back to checkout details
          </Button>
        </Grid>

        <Grid item sm={6} xs={12}>
          <Button
            LinkComponent={Link}
            variant="contained"
            color="primary"
            // href="/orders"
            type="submit"
            fullWidth
            onClick={handlePlaceOrder}
          >
            Place Order
          </Button>
        </Grid>
      </Grid>
    </Fragment>
  );
};

// const initialValues = {
//   card_no: "",
//   name: "",
//   exp_date: "",
//   cvc: "",
//   shipping_zip: "",
//   shipping_country: "",
//   shipping_address1: "",
//   shipping_address2: "",
//   billing_name: "",
//   billing_email: "",
//   billing_contact: "",
//   billing_company: "",
//   billing_zip: "",
//   billing_country: "",
//   billing_address1: "",
//   billing_address2: "",
// };

// const checkoutSchema = yup.object().shape({
// card_no: yup.string().required("required"),
// name: yup.string().required("required"),
// exp_date: yup.string().required("required"),
// cvc: yup.string().required("required"),
// shipping_zip: yup.string().required("required"),
// shipping_country: yup.object().required("required"),
// shipping_address1: yup.string().required("required"),
// billing_name: yup.string().required("required"),
// billing_email: yup.string().required("required"),
// billing_contact: yup.string().required("required"),
// billing_zip: yup.string().required("required"),
// billing_country: yup.string().required("required"),
// billing_address1: yup.string().required("required"),
// });

export default PaymentForm;
