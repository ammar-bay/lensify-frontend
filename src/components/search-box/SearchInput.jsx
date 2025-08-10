import Link from "next/link";
import { useEffect, useRef, useState, useTransition } from "react";
import { Box, Button, MenuItem, TextField } from "@mui/material";
import { SearchOutlinedIcon, SearchResultCard } from "./styled";
import { useAppContext } from "contexts/AppContext";
import { useRouter } from "next/router";
// import api from "utils/__api__/products";

const SearchInput = () => {
  const parentRef = useRef();
  const { state, dispatch } = useAppContext();
  const router = useRouter();

  // const [_, startTransition] = useTransition();
  // const [resultList, setResultList] = useState([]);
  // const getProducts = async (searchText) => {
  //   const data = await api.searchProducts(searchText);
  //   setResultList(data);
  // };
  const handleSearch = (e) => {
    dispatch({
      type: "SET_SEARCH_VAL",
      searchVal: e.target?.value,
    });
    // startTransition(() => {
    // const value = e.target?.value;
    // if (!value) setResultList([]);
    // else getProducts(value);
    // });
  };
  // const handleDocumentClick = () => setResultList([]);
  // useEffect(() => {
  //   window.addEventListener("click", handleDocumentClick);
  //   return () => window.removeEventListener("click", null);
  // }, []);
  const handleSearchClick = () => {
    if (router.pathname.includes("/products")) return;
    router.push(`/products?search=${state.searchVal}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearchClick();
    }
  };

  return (
    <Box
      position="relative"
      flex="1 1 0"
      maxWidth="670px"
      mx="auto"
      {...{
        ref: parentRef,
      }}
    >
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Searching for..."
        onChange={handleSearch}
        onKeyDown={handleKeyDown}
        value={state.searchVal}
        InputProps={{
          sx: {
            height: 44,
            paddingRight: 0,
            borderRadius: 300,
            color: "grey.700",
            overflow: "hidden",
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "primary.main",
            },
          },
          endAdornment: (
            <Button
              color="primary"
              disableElevation
              variant="contained"
              sx={{
                px: "3rem",
                height: "100%",
                borderRadius: "0 300px 300px 0",
              }}
              onClick={handleSearchClick}
            >
              Search
            </Button>
          ),
          startAdornment: <SearchOutlinedIcon fontSize="small" />,
        }}
      />

      {/* {resultList.length > 0 && (
        <SearchResultCard elevation={2}>
          {resultList.map((item) => (
            <Link href={`/product/search/${item}`} key={item}>
              <MenuItem key={item}>{item}</MenuItem>
            </Link>
          ))}
        </SearchResultCard>
      )} */}
    </Box>
  );
};
export default SearchInput;
