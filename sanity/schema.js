import category from "./schemas/category";
import product from "./schemas/product";
import brand from "./schemas/brand";
import color from "./schemas/color";

export const schema = {
  name: "lensify",
  types: [product, category, brand, color],
};
