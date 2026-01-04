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
  height: "100%", // Forces the card to take full height of the parent
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between", // Pushes content to edges
  ":hover": {
    "& .product-actions": {
      right: 10,
    },
    // Removed scale transform on hover because it breaks layout with object-fit
    // unless you apply it to the image wrapper, but usually scaling a contained image looks odd.
    // If you want zoom, keep it, but ensure overflow is hidden on parent.
    "& img": {
      transform: "scale(1.1)",
    },
    "& .product-view-action": {
      opacity: 1,
    },
  },
});

const CardMedia = styled(Box)(({ theme }) => ({
  height: 250, // CHANGED: Fixed height instead of maxHeight
  width: "100%", // Ensure it spans width
  cursor: "pointer",
  overflow: "hidden",
  position: "relative",
  backgroundColor: theme.palette.grey[300],
  display: "flex", // ADDED: To center image
  alignItems: "center", // ADDED: To center image
  justifyContent: "center", // ADDED: To center image
  "& img": {
    transition: "0.3s",
    width: "100%", // ADDED: Constraint width
    height: "100%", // ADDED: Constraint height
    objectFit: "contain", // ADDED: Ensures image aspect ratio is preserved
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
        <Link
          href={`/product/${product.slug.current}`}
          style={{ width: "100%", height: "100%" }}
        >
          {/* Wrap LazyImage in a container or ensure LazyImage passes className/style props to the img tag */}
          <LazyImage
            width={250}
            height={250}
            style={{
              borderRadius: "5px",
              width: "100%",
              height: "100%",
              objectFit: "cover", // Explicitly adding it here as a fallback
            }}
            alt={product.name}
            className="product-img"
            src={urlForImage(product.thumbnail).url()}
          />
        </Link>

        {/* ... Buttons (AddToCart, etc) ... */}

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

      <Box
        p={1}
        textAlign="center"
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Paragraph fontWeight="bold">{product.name}</Paragraph>

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
      </Box>
    </Card>
  );
};
export default ProductCard18;
