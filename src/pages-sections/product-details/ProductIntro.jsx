import { Add, ContentPasteOffSharp, Remove } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Chip,
  FormControlLabel,
  Grid,
} from "@mui/material";
import LazyImage from "components/LazyImage";
import { H1, H2, H3, H6, Span } from "components/Typography";
import { useAppContext } from "contexts/AppContext";
import { currency } from "lib";
import { useEffect, useState } from "react";
import { FlexBox, FlexRowCenter } from "../../components/flex-box";
import { urlForImage } from "../../../sanity/lib/image";
import PrescriptionDetails, { presOptions } from "./PrescriptionDetails";
import { useSnackbar } from "notistack";
import { useSwipeable } from "react-swipeable";

// ================================================================

// ================================================================

const ProductIntro = ({ product }) => {
  const { _id: id, price, name: title, images, slug, thumbnail } = product;
  const { state, dispatch } = useAppContext();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedCat, setSelectedCat] = useState();
  const [selectedType, setSelectedType] = useState();
  const [productPrice, setProductPrice] = useState(price);
  const [laserToggel, setLaserToggel] = useState(false);
  const [presDetails, setPresDetails] = useState({ type: presOptions[0] });

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (!state?.cart) return;

    // Find this product in the cart
    const cartItem = state.cart.find((item) => item.id === id);

    // console.log(cartItem);

    if (cartItem) {
      // Restore persisted values
      setSelectedCat(cartItem.lensCat || undefined);
      setSelectedType(cartItem.lensType || undefined);
      setProductPrice(cartItem.price || price);
      setLaserToggel(cartItem.laserToggel || false);
      setPresDetails(cartItem.presDetails || { type: presOptions[0] });
    }
  }, [state]);

  // HANDLE CHANGE TYPE AND OPTIONS
  const handleChangeCat = (value) => () => {
    setSelectedCat((prevVal) => (prevVal === value ? null : value));
  };

  const handleChangeType = (value) => () => {
    setSelectedType((prevVal) => (prevVal === value ? null : value));
  };

  // CHECK PRODUCT EXIST OR NOT IN THE CART
  const cartItem = state.cart.find((item) => item.id === id);

  // HANDLE SELECT IMAGE
  const handleImageClick = (ind) => () => setSelectedImage(ind);

  // swipe handlers
  const handlers = useSwipeable({
    onSwipedLeft: () => {
      setSelectedImage((prev) =>
        prev < product.images.length - 1 ? prev + 1 : 0
      );
    },
    onSwipedRight: () => {
      setSelectedImage((prev) =>
        prev > 0 ? prev - 1 : product.images.length - 1
      );
    },
    preventDefaultTouchmoveEvent: true,
    trackMouse: true, // also works with mouse drag (nice for testing on desktop)
  });

  // HANDLE CHANGE CART
  const handleCartAmountChange = (amount, increasing) => () => {
    if (!selectedType && increasing)
      return enqueueSnackbar("Select a Lens Type", { variant: "error" });

    if (!selectedCat && increasing)
      return enqueueSnackbar("Select a Lens Category", { variant: "error" });

    if (!product.instock && increasing)
      return enqueueSnackbar("This Item is Out of Stock", { variant: "error" });

    if (
      increasing &&
      selectedType === lensType[1] &&
      ((presDetails.type === presOptions[0] &&
        (!presDetails.sphereR ||
          !presDetails.axisR ||
          !presDetails.cylinderR ||
          !presDetails.sphereL ||
          !presDetails.axisL ||
          !presDetails.cylinderL)) ||
        (presDetails.type === presOptions[1] && !presDetails?.prescriptionFile))
    )
      return enqueueSnackbar("Please Fill the prescription details correctly.");

    dispatch({
      type: "CHANGE_CART_AMOUNT",
      payload: {
        presDetails,
        laserToggel,
        lensType: selectedType,
        lensCat: selectedCat,
        price: productPrice,
        qty: amount,
        name: title,
        imgUrl: urlForImage(thumbnail).url(),
        id,
        slug: slug.current,
      },
    });
  };

  useEffect(() => {
    setProductPrice(
      price +
        (lensCategory.find((cat) => cat.label == selectedCat)?.price || 0) +
        (lensType.find((type) => type.label == selectedType)?.price || 0)
    );
  }, [selectedType, selectedCat]);

  const handleLaserToggle = () => {
    setLaserToggel((prevVal) => !prevVal);
  };

  return (
    <Box width="100%">
      <Grid container spacing={3} justifyContent="space-around">
        <Grid item md={6} xs={12} alignItems="center">
          {/* Wrap main image with swipe handler */}
          <FlexBox justifyContent="center" mb={6} {...handlers}>
            <LazyImage
              alt={title}
              width={300}
              height={300}
              loading="eager"
              src={urlForImage(product.images[selectedImage]).url()}
              sx={{
                objectFit: "contain",
                borderRadius: "5px",
              }}
            />
          </FlexBox>

          {/* Thumbnails */}
          <FlexBox overflow="auto">
            {product.images.map((url, ind) => (
              <FlexRowCenter
                key={ind}
                width={64}
                height={64}
                minWidth={64}
                bgcolor="white"
                border="1px solid"
                borderRadius="10px"
                ml={ind === 0 ? "auto" : 0}
                style={{ cursor: "pointer" }}
                onClick={handleImageClick(ind)}
                mr={ind === product.images.length - 1 ? "auto" : "10px"}
                borderColor={
                  selectedImage === ind ? "primary.main" : "grey.400"
                }
              >
                <Avatar
                  src={urlForImage(url).url()}
                  variant="square"
                  sx={{
                    height: 40,
                    borderRadius: "5px",
                  }}
                />
              </FlexRowCenter>
            ))}
          </FlexBox>
        </Grid>

        <Grid item md={6} xs={12} alignItems="center">
          <H1 mb={1}>{title}</H1>

          {product?.brand?.name && (
            <FlexBox alignItems="center" mb={1}>
              <Box>Brand: </Box>
              <H6>{product?.brand?.name}</H6>
            </FlexBox>
          )}

          {/* <FlexBox alignItems="center" mb={2}>
            <Box lineHeight="1">Rated:</Box>
            <Box mx={1} lineHeight="1">
              <BazaarRating
                color="warn"
                fontSize="1.25rem"
                value={4}
                readOnly
              />
            </Box>
            <H6 lineHeight="1">(50)</H6>
          </FlexBox> */}
          <Box mb={2}>
            <H6 mb={1}>Lens Category</H6>

            {lensCategory.map((cat) => (
              <Chip
                key={cat.label}
                label={cat.label}
                onClick={handleChangeCat(cat.label)}
                sx={{
                  borderRadius: "4px",
                  mr: 1,
                  mb: 1,
                  cursor: "pointer",
                }}
                color={selectedCat === cat.label ? "primary" : "default"}
              />
            ))}
          </Box>

          <Box mb={2}>
            <H6 mb={1}>Lens Type</H6>

            {lensType.map((type) => (
              <Chip
                key={type.label}
                label={type.label}
                onClick={handleChangeType(type.label)}
                sx={{
                  borderRadius: "4px",
                  mr: 1,
                  cursor: "pointer",
                }}
                color={selectedType === type.label ? "primary" : "default"}
              />
            ))}
          </Box>

          {selectedType == lensType[1].label && (
            <PrescriptionDetails
              setPresDetails={setPresDetails}
              presDetails={presDetails}
            />
          )}

          <FormControlLabel
            sx={{ display: "flex" }}
            label={<Span>{"Add Laser + Card"}</Span>}
            control={
              <Checkbox
                size="medium"
                color="primary"
                checked={laserToggel}
                onChange={() => handleLaserToggle()}
              />
            }
          />

          <Box pt={1} mb={3}>
            <H2 color="primary.main" mb={0.5} lineHeight="1">
              {currency(productPrice)}
            </H2>
            <Box color={product.instock ? "inherit" : "red"}>
              {product.instock ? "Stock Available" : "Out of Stock"}
            </Box>
          </Box>

          {!cartItem?.qty ? (
            <Button
              color="primary"
              variant="contained"
              onClick={handleCartAmountChange(1)}
              sx={{
                mb: 4.5,
                px: "1.75rem",
                height: 40,
              }}
            >
              Add to Cart
            </Button>
          ) : (
            <FlexBox alignItems="center" mb={4.5}>
              <Button
                size="small"
                sx={{
                  p: 1,
                }}
                color="primary"
                variant="outlined"
                onClick={handleCartAmountChange(cartItem?.qty - 1, true)}
              >
                <Remove fontSize="small" />
              </Button>

              <H3 fontWeight="600" mx={2.5}>
                {cartItem?.qty.toString().padStart(2, "0")}
              </H3>

              <Button
                size="small"
                sx={{
                  p: 1,
                }}
                color="primary"
                variant="outlined"
                onClick={handleCartAmountChange(cartItem?.qty + 1, false)}
              >
                <Add fontSize="small" />
              </Button>
            </FlexBox>
          )}

          {/* <FlexBox alignItems="center" gap={1} mb={2}>
            <Box>Sold By:</Box>
            <Link href="/shops/scarlett-beauty">
              <H6>Mobile Store</H6>
            </Link>
          </FlexBox> */}
        </Grid>
      </Grid>
    </Box>
  );
};

const lensCategory = [
  {
    label: "Screen Lens",
    price: 1200,
  },
  {
    label: "Transition Lens",
    price: 1400,
  },
  {
    label: "Screen + Transition",
    price: 2200,
  },
];
const lensType = [
  {
    label: "No Eyesight",
    price: 0,
  },
  {
    label: "Eyesight",
    price: 1000,
  },
];

export default ProductIntro;
