/* eslint-disable react/no-unescaped-entities */
import { Box, styled } from "@mui/material";
// import PaymentForm from "pages-sections/payment/PaymentForm";
// import Form from "pages-sections/bulkbuy/Form";

import React from "react"; // custom styled components
import styles from "./CC.module.css";
const CardWrapper = styled(Box)(({ theme, img, mode }) => ({
  minHeight: 500,
  display: "flex",
  margin: "5% auto",
  alignItems: "center",
  justifyContent: "space-between",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundImage: `url(${img})`,
  backgroundColor: "white",
  // backgroundColor: mode === "dark" ? "#000" : "#fff",
  color: mode === "light" ? theme.palette.dark.main : "#fff",
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    justifyContent: "center",
    padding: 24,
    textAlign: "center",
    backgroundImage: "none",
  },
})); // ===============================================================

// ===============================================================
const CarouselCard4 = ({ bgImage, mode = "dark", content }) => {
  return (
    <CardWrapper img={bgImage} mode={mode}>
      {/* <Form /> */}
      <img
        style={{
          objectFit: "contain",
        }}
        src="/assets/images/bulkbuy2.jpg"
        // src="https://cdn.shopify.com/s/files/1/0260/3037/4957/files/CORP-image_96ad43dd-999c-4410-8bca-6ee4f573a1c7_1080x.jpg?v=1641425389"
        className={styles.giftImage}
      />
    </CardWrapper>
  );
};

export default CarouselCard4;
