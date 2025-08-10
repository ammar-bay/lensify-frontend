import { Fragment } from "react";
import { Grid, Pagination } from "@mui/material";
import { FlexBetween } from "components/flex-box";
import ProductCard1 from "components/product-cards/ProductCard1";
import { Span } from "components/Typography";
import { urlForImage } from "../../../sanity/lib/image";
// ========================================================

const ProductList1 = ({ products }) => {
  return (
    <Fragment>
      <Grid container spacing={3}>
        {products.map((item) => (
          <Grid item lg={4} sm={6} xs={12} key={item._id}>
            <ProductCard1
              id={item._id}
              slug={item.slug.current}
              title={item.name}
              price={item.price}
              // rating={item.rating}
              imgUrl={urlForImage(item.thumbnail).url()}
              discount={item.discount}
            />
          </Grid>
        ))}
      </Grid>

      {/* <FlexBetween flexWrap="wrap" mt={4}>
        <Span color="grey.600">Showing 1-9 of 1.3k Products</Span>
        <Pagination count={10} variant="outlined" color="primary" />
      </FlexBetween> */}
    </Fragment>
  );
};
export default ProductList1;
