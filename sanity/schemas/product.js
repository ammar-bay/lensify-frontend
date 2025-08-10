export default {
  name: "products",
  title: "Products",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Title",
      type: "string",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 100,
      },
      validation: (Rule) => Rule.required().error("This field is required"),
    },
    {
      name: "price",
      title: "Price",
      type: "number",
      validation: (Rule) => Rule.min(0),
    },
    {
      name: "thumbnail",
      title: "Thumbnail",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "images",
      title: "Images",
      type: "array",
      of: [{ type: "image" }],
      options: {
        hotspot: true,
      },
    },
    {
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{ type: "reference", to: [{ type: "category" }] }],
    },
    {
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
    },
    {
      name: "description",
      title: "Description",
      type: "text",
    },
    {
      name: "brand",
      title: "Brand",
      type: "reference",
      to: [{ type: "brand" }],
    },
    {
      name: "color",
      title: "Color",
      type: "reference",
      to: [{ type: "color" }],
    },
    {
      name: "relatedProducts",
      title: "Related Products",
      type: "array",
      of: [{ type: "reference", to: [{ type: "products" }] }],
    },

    // extras
    {
      name: "bestSeller",
      title: "Best Seller",
      type: "boolean",
      description: "Best selling products will be shown on the home page",
    },
    {
      name: "newArrival",
      title: "New Arrival",
      type: "boolean",
      description: "Newly added products will be shown on the home page",
    },
    {
      name: "featured",
      title: "Featured",
      type: "boolean",
      description: "Featured product will be shown on the home page",
    },
    {
      name: "instock",
      title: "In Stock",
      type: "boolean",
      description: "Is the Stock Available for this product",
      initialValue: true,
    },
    {
      name: "discount",
      title: "Discount",
      type: "number",
      validation: (Rule) => Rule.min(0).max(100),
    },
  ],

  preview: {
    select: {
      title: "name",
      media: "thumbnail",
    },
  },
};
