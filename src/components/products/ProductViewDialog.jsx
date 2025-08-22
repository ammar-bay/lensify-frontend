import { Add, BorderAllRounded, Close, Remove } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  Divider,
  Grid,
  IconButton,
  styled,
} from "@mui/material";
import { FlexBox } from "components/flex-box";
import BazaarImage from "components/BazaarImage";
import BazaarRating from "components/BazaarRating";
import Carousel from "components/carousel/Carousel";
import { H1, H2, H3, H6, Paragraph } from "components/Typography";
import { useAppContext } from "contexts/AppContext";
import { currency } from "lib";
import { urlForImage } from "../../../sanity/lib/image";

// styled components
const ContentWrapper = styled(Box)(({ theme }) => ({
  "& .carousel:hover": {
    cursor: "pointer",
    "& .carousel__back-button": {
      opacity: 1,
      left: 10,
    },
    "& .carousel__next-button": {
      opacity: 1,
      right: 10,
    },
  },
  "& .carousel__next-button, & .carousel__back-button": {
    opacity: 0,
    boxShadow: "none",
    transition: "all 0.3s",
    background: "transparent",
    color: theme.palette.primary.main,
    ":disabled": {
      color: theme.palette.grey[500],
    },
    ":hover": {
      color: theme.palette.primary.main,
      backgroundColor: "transparent",
    },
  },
  "& .carousel__back-button": {
    left: 0,
  },
  "& .carousel__next-button": {
    right: 0,
  },
}));

// =====================================================

// =====================================================

const ProductViewDialog = (props) => {
  const { product, openDialog, handleCloseDialog } = props;
  const { state, dispatch } = useAppContext();
  const cartItem = state.cart.find((item) => item.id === product.id);
  const handleCartAmountChange = (amount) => () => {
    dispatch({
      type: "CHANGE_CART_AMOUNT",
      payload: {
        ...product,
        qty: amount,
        name: product.title,
        // imgUrl: urlForImage(product.thumbnail).url(),
      },
    });
  };
  return (
    <Dialog
      open={openDialog}
      maxWidth={false}
      onClose={handleCloseDialog}
      sx={{
        zIndex: 1501,
      }}
    >
      <DialogContent
        sx={{
          maxWidth: 900,
          width: "100%",
        }}
      >
        <ContentWrapper>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <Carousel totalSlides={product.imgGroup.length} visibleSlides={1}>
                {product.imgGroup.map((item, index) => (
                  <BazaarImage
                    key={index}
                    src={
                      typeof item === "string" ? item : urlForImage(item).url()
                    }
                    sx={{
                      mx: "auto",
                      width: {
                        xs: 250,
                        sm: 350,
                        md: 400,
                        lg: 450,
                      },
                      height: {
                        xs: 250,
                        sm: 400,
                        md: 400,
                        lg: 450,
                      },
                      objectFit: "contain",
                      display: "block",
                      backgroundColor: "grey.100",
                    }}
                  />
                ))}
              </Carousel>
            </Grid>

            <Grid
              item
              md={6}
              xs={12}
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <H2>{product.title}</H2>

                <Paragraph
                  py={1}
                  color="grey.500"
                  fontWeight={600}
                  fontSize={13}
                >
                  {product?.categories?.length > 0 &&
                    "CATEGORY: " + product.categories[0].name}
                </Paragraph>

                <H1 color="primary.main">{currency(product.price)}</H1>

                {/* <FlexBox alignItems="center" gap={1}>
                  <BazaarRating
                    color="warn"
                    fontSize="1.25rem"
                    value={4}
                    readOnly
                  />
                  <H6 lineHeight="1">(50)</H6>
                </FlexBox> */}

                <Paragraph my={2}>{product.description}</Paragraph>
              </div>
              <div>
                <Divider
                  sx={{
                    mb: 2,
                  }}
                />
                {!cartItem?.qty ? (
                  <Button
                    size="large"
                    color="primary"
                    variant="contained"
                    onClick={handleCartAmountChange(1)}
                    sx={{
                      height: 45,
                    }}
                  >
                    Add to Cart
                  </Button>
                ) : (
                  <FlexBox alignItems="center">
                    <Button
                      size="small"
                      color="primary"
                      variant="outlined"
                      sx={{
                        p: ".6rem",
                        height: 45,
                      }}
                      onClick={handleCartAmountChange(cartItem?.qty - 1)}
                    >
                      <Remove fontSize="small" />
                    </Button>

                    <H3 fontWeight="600" mx={2.5}>
                      {cartItem?.qty.toString().padStart(2, "0")}
                    </H3>

                    <Button
                      size="small"
                      color="primary"
                      variant="outlined"
                      sx={{
                        p: ".6rem",
                        height: 45,
                      }}
                      onClick={handleCartAmountChange(cartItem?.qty + 1)}
                    >
                      <Add fontSize="small" />
                    </Button>
                  </FlexBox>
                )}
              </div>
            </Grid>
          </Grid>
        </ContentWrapper>

        <IconButton
          sx={{
            position: "absolute",
            top: 3,
            right: 3,
          }}
          onClick={handleCloseDialog}
        >
          <Close fontSize="small" color="secondary" />
        </IconButton>
      </DialogContent>
    </Dialog>
  );
};
export default ProductViewDialog;
