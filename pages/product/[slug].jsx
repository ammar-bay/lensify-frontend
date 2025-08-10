import { useState } from "react";
import { useRouter } from "next/router";
import { Box, Container, styled, Tab, Tabs } from "@mui/material";
import { H2 } from "components/Typography";
import ShopLayout1 from "components/layouts/ShopLayout1";
import ProductIntro from "pages-sections/product-details/ProductIntro";
import ProductReview from "pages-sections/product-details/ProductReview";
import AvailableShops from "pages-sections/product-details/AvailableShops";
import RelatedProducts from "pages-sections/product-details/RelatedProducts";
import FrequentlyBought from "pages-sections/product-details/FrequentlyBought";
import ProductDescription from "pages-sections/product-details/ProductDescription";
import { client } from "../../sanity/lib/client";

// styled component
const StyledTabs = styled(Tabs)(({ theme }) => ({
  minHeight: 0,
  marginTop: 80,
  marginBottom: 24,
  borderBottom: `1px solid ${theme.palette.text.disabled}`,
  "& .inner-tab": {
    minHeight: 40,
    fontWeight: 600,
    textTransform: "capitalize",
  },
}));

// ===============================================================

// ===============================================================

const ProductDetails = ({ product }) => {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState(0);
  const handleOptionClick = (_, value) => setSelectedOption(value);

  // Show a loading state when the fallback is rendered
  if (router.isFallback) {
    return <h1>Loading...</h1>;
  }
  return (
    <ShopLayout1>
      <Container
        sx={{
          my: 4,
        }}
      >
        {/* PRODUCT DETAILS INFO AREA */}
        {product ? <ProductIntro product={product} /> : <H2>Loading...</H2>}

        {/* PRODUCT DESCRIPTION AND REVIEW */}
        <StyledTabs
          textColor="primary"
          value={selectedOption}
          indicatorColor="primary"
          onChange={handleOptionClick}
        >
          <Tab className="inner-tab" label="Description" />
          {/* <Tab className="inner-tab" label="Review (3)" /> */}
        </StyledTabs>

        <Box mb={6}>
          {selectedOption === 0 && (
            <ProductDescription description={product?.description} />
          )}
          {/* {selectedOption === 1 && <ProductReview />} */}
        </Box>

        {/* {frequentlyBought && (
          <FrequentlyBought productsData={frequentlyBought} />
        )} */}

        {/* <AvailableShops /> */}

        {product?.relatedProducts && (
          <RelatedProducts productsData={product?.relatedProducts} />
        )}
      </Container>
    </ShopLayout1>
  );
};

export const getStaticPaths = async () => {
  const query = '*[_type == "products"]{slug}';
  let products = [];

  try {
    products = await client.fetch(query);
    // console.log("Fetched products:", products); // Debugging log
  } catch (error) {
    console.error("Error fetching products:", error);
  }

  const paths = products
    .filter((product) => product.slug && product.slug.current) // Ensure valid slugs
    .map((product) => ({
      params: { slug: product.slug.current },
    }));

  if (paths.length === 0) {
    console.warn(
      "No paths generated. Check if your Sanity dataset contains products."
    );
  }

  return {
    paths,
    fallback: "blocking", // Use 'blocking' for dynamic slugs
  };
};

export const getStaticProps = async ({ params }) => {
  if (!params?.slug) {
    return {
      notFound: true, // Return a 404 if slug is missing
    };
  }

  const query = `*[slug.current == "${params.slug}"][0]{
    ...,
    category[]->{
      ...
    },
    brand->{
      ...
    },
    relatedProducts[]->{
      ...
    }
  }`;
  const product = await client.fetch(query);

  if (!product || !product?.slug?.current) {
    return {
      notFound: true, // Return a 404 if the product is not found
    };
  }

  return {
    props: {
      product,
    },
  };
};

export default ProductDetails;
