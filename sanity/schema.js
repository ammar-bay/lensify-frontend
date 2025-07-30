import category from "./schemas/category";
import product from "./schemas/product";


export const schema = {
  name: 'watch_store_schema',
  types: [product, category],
}
