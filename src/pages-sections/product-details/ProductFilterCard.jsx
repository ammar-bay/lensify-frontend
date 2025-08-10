import {
  Box,
  Card,
  Checkbox,
  Divider,
  FormControlLabel,
  TextField,
} from "@mui/material";
import { FlexBetween, FlexBox } from "components/flex-box";
import { H5, H6, Span } from "components/Typography";

const ProductFilterCard = ({
  categories,
  brands,
  setProductFilters,
  productFilters,
  colorList
}) => {
  const toggleArrayValue = (field, value) => {
    setProductFilters((prev) => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter((v) => v !== value)
        : [...prev[field], value],
    }));
  };

  const updatePrice = (key, val) => {
    setProductFilters((prev) => ({
      ...prev,
      priceRange: { ...prev.priceRange, [key]: val ? +val : null },
    }));
  };

  const toggleBooleanField = (field) => {
    setProductFilters((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  return (
    <Card sx={{ p: "18px 27px", overflow: "auto" }} elevation={1}>
      {/* CATEGORY FILTER */}
      <H6 mb={1.25}>Categories</H6>
      {categories?.map((item) => (
        <FormControlLabel
          key={item}
          sx={{ display: "flex" }}
          label={<Span>{item}</Span>}
          control={
            <Checkbox
              size="small"
              color="secondary"
              checked={productFilters.category.includes(item)}
              onChange={() => toggleArrayValue("category", item)}
            />
          }
        />
      ))}

      <Divider sx={{ mt: 2, mb: 3 }} />

      {/* PRICE FILTER */}
      <H6 mb={2}>Price Range</H6>
      <FlexBetween>
        <TextField
          placeholder="0"
          type="number"
          size="small"
          fullWidth
          value={productFilters.priceRange.low || ""}
          onChange={(e) => updatePrice("low", e.target.value)}
        />
        <H5 color="grey.600" px={1}>
          -
        </H5>
        <TextField
          placeholder="250"
          type="number"
          size="small"
          fullWidth
          value={productFilters.priceRange.high || ""}
          onChange={(e) => updatePrice("high", e.target.value)}
        />
      </FlexBetween>

      <Divider sx={{ my: 3 }} />

      {/* BRAND FILTER */}
      <H6 mb={2}>Brands</H6>
      {brands?.map((item) => (
        <FormControlLabel
          key={item}
          sx={{ display: "flex" }}
          label={<Span>{item}</Span>}
          control={
            <Checkbox
              size="small"
              color="secondary"
              checked={productFilters.brands.includes(item)}
              onChange={() => toggleArrayValue("brands", item)}
            />
          }
        />
      ))}

      <Divider sx={{ my: 3 }} />

      {/* OTHER OPTIONS */}
      <H6 mb={2}>Other Options</H6>
      {otherOptions.map((item) => {
        const key = item.toLowerCase().replace(/\s/g, "");
        return (
          <FormControlLabel
            key={item}
            sx={{ display: "flex" }}
            label={<Span>{item}</Span>}
            control={
              <Checkbox
                size="small"
                color="secondary"
                checked={!!productFilters[key]}
                onChange={() => toggleBooleanField(key)}
              />
            }
          />
        );
      })}

      <Divider sx={{ my: 3 }} />

      {/* COLORS MULTI SELECT */}
      <H6 mb={2}>Colors</H6>
      <FlexBox mb={2} flexWrap="wrap" gap={1}>
        {colorList.map((item) => (
          <Box
            key={item}
            flexShrink={0}
            sx={{
              width: 25,
              height: 25,
              bgcolor: item,
              cursor: "pointer",
              borderRadius: "50%",
              border: productFilters.colors.includes(item)
                ? "2px solid #d24057"
                : "none",
            }}
            onClick={() => toggleArrayValue("colors", item)}
          />
        ))}
      </FlexBox>
    </Card>
  );
};

const otherOptions = [
  "On Sale",
  "In Stock",
  "Featured",
  "Best Selling",
  "New Arrival",
];
export default ProductFilterCard;
