import { Box } from "@mui/material";
import { H3 } from "components/Typography";
import parse from "html-react-parser";

// ======================================================

// ======================================================

const ProductDescription = ({ description }) => {
  return (
    <Box>
      <H3 mb={2}>Specification:</H3>
      <Box>{parse(description || "")}</Box>
    </Box>
  );
};
export default ProductDescription;
