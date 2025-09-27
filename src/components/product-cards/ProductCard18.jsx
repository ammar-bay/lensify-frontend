import { AddShoppingCart, Favorite, FavoriteBorder } from "@mui/icons-material";
import { Box, Button, IconButton, Rating, styled } from "@mui/material";
import { FlexBox, FlexRowCenter } from "components/flex-box";
import LazyImage from "components/LazyImage";
import ProductViewDialog from "components/products/ProductViewDialog";
import { H4, Paragraph } from "components/Typography";
import { useAppContext } from "contexts/AppContext";
import { calculateDiscount, currency } from "lib";
import Link from "next/link";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { urlForImage } from "../../../sanity/lib/image";
// custom styled components
const Card = styled(Box)({
  ":hover": {
    "& .product-actions": {
      right: 10,
    },
    "& img": {
      transform: "scale(1.1)",
    },
    "& .product-view-action": {
      opacity: 1,
    },
  },
});
const CardMedia = styled(Box)(({ theme }) => ({
  maxHeight: 300,
  cursor: "pointer",
  overflow: "hidden",
  position: "relative",
  backgroundColor: theme.palette.grey[300],
  "& img": {
    transition: "0.3s",
  },
}));
const AddToCartButton = styled(IconButton)({
  top: 10,
  right: -40,
  position: "absolute",
  transition: "right 0.3s .1s",
});
const FavouriteButton = styled(IconButton)({
  top: 45,
  right: -40,
  position: "absolute",
  transition: "right 0.3s .2s",
});
const QuickViewButton = styled(Button)({
  left: 0,
  bottom: 0,
  opacity: 0,
  borderRadius: 0,
  position: "absolute",
  transition: "all 0.3s",
});

// ==============================================================

// ==============================================================

const ProductCard18 = ({ product }) => {
  const { enqueueSnackbar } = useSnackbar();
  const { state, dispatch } = useAppContext();
  const [openDialog, setOpenDialog] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const cartItem = state.cart.find(
    (item) => item.slug === product.slug.current
  );

  // handle favourite
  const handleFavorite = () => setIsFavorite((fav) => !fav);

  // handle add to cart
  const handleAddToCart = (product) => () => {
    const payload = {
      id: product.id,
      slug: product.slug.current,
      name: product.name,
      price: product.price,
      imgUrl: urlForImage(product.thumbnail).url(),
      qty: (cartItem?.qty || 0) + 1,
    };
    dispatch({
      type: "CHANGE_CART_AMOUNT",
      payload,
    });
    enqueueSnackbar("Added to Cart", {
      variant: "success",
    });
  };

  return (
    <Card>
      <CardMedia>
        <Link href={`/product/${product.slug.current}`}>
          <LazyImage
            width={300}
            height={300}
            style={{ borderRadius: "5px" }}
            alt="category"
            className="product-img"
            src={urlForImage(product.thumbnail).url()}
          />
        </Link>

        {/* <AddToCartButton
          className="product-actions"
          onClick={handleAddToCart(product)}
        >
          <AddShoppingCart color="disabled" fontSize="small" />
        </AddToCartButton> */}

        {/* <FavouriteButton className="product-actions" onClick={handleFavorite}>
          {isFavorite ? (
            <Favorite color="primary" fontSize="small" />
          ) : (
            <FavoriteBorder color="disabled" fontSize="small" />
          )}
        </FavouriteButton> */}

        <QuickViewButton
          fullWidth
          size="large"
          color="dark"
          variant="contained"
          className="product-view-action"
          onClick={() => setOpenDialog(true)}
        >
          Quick View
        </QuickViewButton>
      </CardMedia>

      <ProductViewDialog
        openDialog={openDialog}
        handleCloseDialog={() => setOpenDialog(false)}
        product={{
          id: product.id,
          slug: product.slug.current,
          title: product.name,
          price: product.price,
          imgGroup: product.images,
          description: product.description,
          categories: product.categories,
          discount: product.discount,
        }}
      />

      <Box p={1} textAlign="center">
        {/* {product.categories.length > 0 && (
          <Small color="grey.500">{product.categories[0].name}</Small>
        )} */}
        <Paragraph fontWeight="bold">{product.name}</Paragraph>
        {/* <H4 fontWeight={700} py={0.5}>
          {currency(product.price)}
        </H4> */}
        <Box flexDirection={"column"} alignItems="center" gap={1} mt={0.5}>
          <Box
            fontWeight="600"
            color={product?.discount ? "primary.main" : "text.primary"}
          >
            <H4 fontWeight={700} py={0.5}>
              {product?.discount
                ? calculateDiscount(product?.price, product?.discount)
                : currency(product?.price)}
            </H4>
          </Box>

          {product?.discount && (
            <Box color="grey.600" fontWeight="600">
              <del>{currency(product?.price)}</del>
            </Box>
          )}
        </Box>

        {/* <FlexRowCenter gap={1}>
          <Rating
            name="read-only"
            value={4}
            readOnly
            sx={{
              fontSize: 16,
            }}
          />
          <Small fontWeight={600} color="grey.500">
            ({product.reviews.length} Reviews)
          </Small>
        </FlexRowCenter> */}
      </Box>
    </Card>
  );
};
export default ProductCard18;
