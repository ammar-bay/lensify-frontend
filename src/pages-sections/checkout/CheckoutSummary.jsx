import { Divider, Typography } from "@mui/material";
import Card1 from "components/Card1";
import { FlexBetween } from "components/flex-box";
import { useAppContext } from "contexts/AppContext";
import { currency } from "lib";

const shippingCost = 1000;

const CheckoutSummary = () => {
  const { state, dispatch } = useAppContext();
  const cartList = state.cart;

  const getSubTotalPrice = () => {
    return cartList.reduce((accum, item) => {
      const price = item?.discount
        ? Number((item.price - item.price * (item.discount / 100)).toFixed(2))
        : item.price;
      return accum + price * item.qty;
    }, 0);
  };

  const getTotalPrice = () => {
    return getSubTotalPrice() + shippingCost;
  };

  return (
    <Card1>
      <FlexBetween mb={1}>
        <Typography color="grey.600">Subtotal:</Typography>
        <Typography fontSize="18px" fontWeight="600" lineHeight="1">
          {currency(getSubTotalPrice())}
        </Typography>
      </FlexBetween>

      <FlexBetween mb={1}>
        <Typography color="grey.600">Shipping:</Typography>
        <Typography fontSize="18px" fontWeight="600" lineHeight="1">
          {currency(shippingCost)}
        </Typography>
      </FlexBetween>

      {/* <FlexBetween mb={1}>
        <Typography color="grey.600">Tax:</Typography>
        <Typography fontSize="18px" fontWeight="600" lineHeight="1">
          {currency(40)}
        </Typography>
      </FlexBetween> */}

      {/* <FlexBetween mb={2}>
        <Typography color="grey.600">Discount:</Typography>
        <Typography fontSize="18px" fontWeight="600" lineHeight="1">
          {currency(0)}
        </Typography>
      </FlexBetween> */}

      <Divider
        sx={{
          mb: "1rem",
        }}
      />

      <Typography
        fontSize="25px"
        fontWeight="600"
        lineHeight="1"
        textAlign="right"
        // mb={3}
      >
        {currency(getTotalPrice())}
      </Typography>

      {/* <TextField
        placeholder="Voucher"
        variant="outlined"
        size="small"
        fullWidth
      />
      <Button
        variant="outlined"
        color="primary"
        fullWidth
        sx={{
          mt: "1rem",
          mb: "30px",
        }}
      >
        Apply Voucher
      </Button> */}
    </Card1>
  );
};
export default CheckoutSummary;
