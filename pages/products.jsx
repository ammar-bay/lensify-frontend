import { useCallback, useEffect, useState } from "react";
import { Apps, FilterList, ViewList } from "@mui/icons-material";
import {
  Box,
  Card,
  Container,
  Grid,
  IconButton,
  MenuItem,
  TextField,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import Sidenav from "components/Sidenav";
import { FlexBox } from "components/flex-box";
import { H5, Paragraph } from "components/Typography";
import ShopLayout1 from "components/layouts/ShopLayout1";
import ProductList1 from "components/products/ProductList1";
import ProductList2 from "components/products/ProductList2";
import ProductFilterCard from "pages-sections/product-details/ProductFilterCard";
import { client } from "../sanity/lib/client";
import { useRouter } from "next/router";
import { useAppContext } from "contexts/AppContext";
// const a = [1, 24];

const ProductSearchResult = ({ products }) => {
  const router = useRouter();
  const searchCat = router.query.category || "";
  const [view, setView] = useState("grid");
  const [filteredProducts, setFilteredProducts] = useState(products);
  const categories = [
    ...new Set(
      products
        .flatMap((p) => p.categories?.map((c) => c.name) || [])
        .filter(Boolean)
    ),
  ];
  const brands = [
    ...new Set(products.map((p) => p.brand?.name).filter(Boolean)),
  ];
  const colorList = [
    ...new Set(
      products
        .map((p) => ({ name: p.color?.name, hexa: p.color?.hexa }))
        .filter(Boolean)
    ),
  ];

  const { state, dispatch } = useAppContext();
  const downMd = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const toggleView = useCallback((v) => () => setView(v), []);
  const [productFilters, setProductFilters] = useState({
    category: [],
    priceRange: { low: null, high: null },
    brands: [],
    colors: [],
    bestselling: null,
    instock: null,
    featured: null,
    onsale: null,
    newarrival: null,
  });
  const [sort, setSort] = useState("date");

  // console.log(productFilters);

  useEffect(() => {
    const q = state?.searchVal?.toLowerCase();
    const {
      category,
      brands,
      colors,
      priceRange,
      // instock,
      // onsale,
      newarrival,
      bestselling,
      featured,
    } = productFilters;



    setFilteredProducts(
      products.filter((p) => {
        const fields = [
          p.name,
          p.brand?.name,
          p.description,
          p.color?.name,
          ...p.categories?.map((c) => c.name),
        ];
        console.log("FIEMLKNLDFN", fields)
        return (
          (!q ||
            fields?.filter(Boolean)?.some((v) => v?.toLowerCase()?.includes(q))) &&
          (!category.length ||
            p.categories?.some((c) => category?.includes(c.name))) &&
          (!brands?.length || brands?.includes(p?.brand?.name)) &&
          (!colors?.length || colors?.includes(p?.color?.name)) &&
          (priceRange?.low == null || p?.price >= priceRange.low) &&
          (priceRange?.high == null || p?.price <= priceRange.high) &&
          // (!instock || (instock && p.instock))
          // (!onsale || (onsale && p.onsale)) &&
          (!newarrival || (newarrival && p.newArrival)) &&
          (!bestselling || (bestselling && p.bestSeller)) &&
          (!featured || (featured && p.featured))
        );
      })
    );
  }, [state?.searchVal, products, productFilters]);

  useEffect(() => {
    if (!searchCat) return;
    setProductFilters((prevVal) => ({
      ...prevVal,
      category: [...prevVal.category, searchCat],
    }));
  }, [searchCat]);

  useEffect(() => {
    if (!sort) return;

    setFilteredProducts((p) =>
      [...p].sort((a, b) => {
        switch (sort) {
          case "date":
            return new Date(b._createdAt) - new Date(a._createdAt);
          case "priceUp":
            return a.price - b.price;
          case "priceDown":
            return b.price - a.price;
          default:
            return 0;
        }
      })
    );
  }, [sort]);

  return (
    <ShopLayout1>
      <Container
        sx={{
          mt: 4,
          mb: 6,
        }}
      >
        {/* TOP BAR AREA */}
        <Card
          elevation={1}
          sx={{
            mb: "55px",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            p: {
              sm: "1rem 1.25rem",
              md: "0.5rem 1.25rem",
              xs: "1.25rem 1.25rem 0.25rem",
            },
          }}
        >
          <Box>
            {state?.searchVal && (
              <>
                <H5>Searching for “{state?.searchVal}”</H5>
                <Paragraph color="grey.600">
                  {filteredProducts.length} results found
                </Paragraph>
              </>
            )}
          </Box>

          <FlexBox
            alignItems="center"
            columnGap={4}
            flexWrap="wrap"
            my="0.5rem"
          >
            <FlexBox alignItems="center" gap={1} flex="1 1 0">
              <Paragraph color="grey.600" whiteSpace="pre">
                Sort by:
              </Paragraph>

              <TextField
                select
                fullWidth
                size="small"
                variant="outlined"
                placeholder="Short by"
                defaultValue={sortOptions[0].value}
                onChange={(e) => setSort(e.target.value)}
                sx={{
                  flex: "1 1 0",
                  minWidth: "150px",
                }}
              >
                {sortOptions.map((item) => (
                  <MenuItem value={item.value} key={item.value}>
                    {item.label}
                  </MenuItem>
                ))}
              </TextField>
            </FlexBox>

            <FlexBox alignItems="center" my="0.25rem">
              <Paragraph color="grey.600" mr={1}>
                View:
              </Paragraph>

              <IconButton onClick={toggleView("grid")}>
                <Apps
                  color={view === "grid" ? "primary" : "inherit"}
                  fontSize="small"
                />
              </IconButton>

              <IconButton onClick={toggleView("list")}>
                <ViewList
                  color={view === "list" ? "primary" : "inherit"}
                  fontSize="small"
                />
              </IconButton>

              {/* SHOW IN THE SMALL DEVICE */}
              {downMd && (
                <Sidenav
                  handle={
                    <IconButton>
                      <FilterList fontSize="small" />
                    </IconButton>
                  }
                >
                  <ProductFilterCard
                    categories={categories}
                    brands={brands}
                    setProductFilters={setProductFilters}
                    productFilters={productFilters}
                    colorList={colorList}
                  />
                </Sidenav>
              )}
            </FlexBox>
          </FlexBox>
        </Card>

        <Grid container spacing={3}>
          {/* PRODUCT FILTER SIDEBAR AREA */}
          <Grid
            item
            md={3}
            sx={{
              display: {
                md: "block",
                xs: "none",
              },
            }}
          >
            <ProductFilterCard
              categories={categories}
              brands={brands}
              setProductFilters={setProductFilters}
              productFilters={productFilters}
              colorList={colorList}
            />
          </Grid>

          {/* PRODUCT VIEW AREA */}
          <Grid item md={9} xs={12}>
            {view === "grid" ? (
              <ProductList1 products={filteredProducts} />
            ) : (
              <ProductList2 products={filteredProducts} />
            )}
          </Grid>
        </Grid>
      </Container>
    </ShopLayout1>
  );
};
const sortOptions = [
  {
    label: "Date",
    value: "date",
  },
  {
    label: "Price Low to High",
    value: "priceUp",
  },
  {
    label: "Price High to Low",
    value: "priceDown",
  },
];

export const getStaticProps = async () => {
  const query = '*[_type == "products"]';

  const products = await client.fetch(`
    *[_type == "products" ]{
      ...,
      categories[]->{
        ...
      },
      brand->{
        name
      },
      color->{
        name,
        hexa
      }
    }
  `);

  return {
    props: { products },
  };
};

export default ProductSearchResult;
