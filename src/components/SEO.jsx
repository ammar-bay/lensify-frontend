import Head from "next/head";

// ====================================================================

// ====================================================================

const SEO = ({ title, description, sitename = "Eyeglasses, Sunglasses & Lenses with 24/7 Eye-Care" }) => {
  return (
    <Head>
      <title>{`${title} | ${sitename}`}</title>
      <meta name="description" content={description} />
    </Head>
  );
};
export default SEO;
