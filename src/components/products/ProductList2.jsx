import { Box } from "@mui/material";
import ProductCard9 from "components/product-cards/ProductCard9";
import { urlForImage } from "../../../sanity/lib/image";

// ==========================================================

const ProductList2 = ({ products }) => {
  return (
    <Box>
      {products.map((item) => (
        <ProductCard9
          id={item._id}
          key={item._id}
          slug={item.slug.current}
          title={item.name}
          price={item.price}
          off={item.discount}
          // rating={item.rating}
          imgUrl={urlForImage(item.thumbnail).url()}
        />
      ))}

      {/* <FlexBetween flexWrap="wrap" mt={4}>
        <Span color="grey.600">Showing 1-9 of 1.3k Products</Span>
        <Pagination count={10} variant="outlined" color="primary" />
      </FlexBetween> */}
    </Box>
  );
};
export default ProductList2;
