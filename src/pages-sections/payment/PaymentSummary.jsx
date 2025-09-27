import { Divider } from "@mui/material";
import Card1 from "components/Card1";
import { FlexBetween } from "components/flex-box";
import { Paragraph } from "components/Typography";
import { useAppContext } from "contexts/AppContext";
import { currency } from "lib";

const shippingCost = 1000;

const PaymentSummary = () => {
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
        <Paragraph color="grey.600">Subtotal:</Paragraph>
        <Paragraph fontSize={18} fontWeight={600} lineHeight={1}>
          {currency(getSubTotalPrice())}
        </Paragraph>
      </FlexBetween>

      <FlexBetween mb={1}>
        <Paragraph color="grey.600">Shipping:</Paragraph>
        <Paragraph fontSize={18} fontWeight={600} lineHeight={1}>
          {currency(shippingCost)}
        </Paragraph>
      </FlexBetween>

      {/* <FlexBetween mb={1}>
        <Paragraph color="grey.600">Tax:</Paragraph>
        <Paragraph fontSize={18} fontWeight={600} lineHeight={1}>
          {currency(40)}
        </Paragraph>
      </FlexBetween> */}

      {/* <FlexBetween mb={2}>
        <Paragraph color="grey.600">Discount:</Paragraph>
        <Paragraph fontSize={18} fontWeight={600} lineHeight={1}>
          -
        </Paragraph>
      </FlexBetween> */}

      <Divider
        sx={{
          mb: 2,
        }}
      />

      <Paragraph
        fontSize={25}
        fontWeight={600}
        lineHeight={1}
        textAlign="right"
      >
        {currency(getTotalPrice())}
      </Paragraph>
    </Card1>
  );
};
export default PaymentSummary;
