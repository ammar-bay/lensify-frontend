// schemas/category.js

export default {
  name: "category",
  title: "Category",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Category Name",
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
    },
    {
      name: "bestSeller",
      title: "Best Seller",
      type: "boolean",
      description: "Best Selling categories will be shown on the home page",
    },
    {
      name: "image",
      title: "Product Image",
      type: "image",
      validation: (Rule) =>
        Rule.custom((image, context) => {
          if (context.document.bestSeller && !image) {
            return "Image is required for best selling categories";
          }
          return true; // passes validation
        }),
    },
  ],
  preview: {
    select: {
      title: "name",
      media: "image",
    },
  },
};
