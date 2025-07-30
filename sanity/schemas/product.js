// schemas/product.js

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
      validation: (Rule) => Rule.required().error('This field is required'),
    },
    {
      name: "description",
      title: "Description",
      type: "text",
    },
    {
      name: "price",
      title: "Price",
      type: "number",
      validation: (Rule) => Rule.min(0),
    },
    {
      name: "image",
      title: "Product Image",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "category" }],
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
    // {
    //   name: "sale",
    //   title: "Sale",
    //   type: "boolean",
    //   description: "Products on sale will be shown on the home page",
    // },
    // {
    //   name: "salePrice",
    //   title: "Sale Price",
    //   type: "number",
    //   description: "Sale price in Rupees",
    //   validation: (Rule) => Rule.min(0).max(100000),
    // },
  ],

  preview: {
    select: {
      title: "name",
      media: "image",
    },
  },
};
