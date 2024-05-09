import { useState, useEffect } from "react";

import SearchIcon from "@mui/icons-material/Search";
import { InputBase, List, ListItem, Box, styled } from "@mui/material";

import { useSelector, useDispatch } from "react-redux"; // hooks
import { getProducts as listProducts } from "../../Redux/Actions/productsActions";
import { Link } from "react-router-dom";

const SearchContainer = styled(Box)`
  border-radius: 12px;
  margin-left:5px;
  margin-right:-23px;
  width: 130%;
  background-color: #e9f7ff;
  display: flex;
  margin-bottom: 0px;
  border:2px solid #8fd4ff
`;

const SearchIconWrapper = styled(Box)`
  margin-left: auto;
  padding: 5px;
  display: flex;
  color: #2874f0;
`;

const ListWrapper = styled(List)`
  position: absolute;
  color: #000;
  background: #ffffff;
  margin-top: 40px;
`;

const InputSearchBase = styled(InputBase)`
  font-size: unset;
  width: 150%;
  padding-left: 20px;
`;
const Search = () => {
  const [text, setText] = useState("");
  const [open, setOpen] = useState(true);

  const getText = (text) => {
    setText(text);
    setOpen(false);
  };

  const getProducts = useSelector((state) => state.getProducts);
  const { products } = getProducts;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <SearchContainer>
      <InputSearchBase
        placeholder="Search for products, brands and more"
        inputProps={{ "aria-label": "search" }}
        onChange={(e) => getText(e.target.value)}
      />
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      
      {text && (
        <ListWrapper hidden={open}>
          {products
            .filter((product) => product.title.longTitle.toLowerCase().includes(text.toLowerCase()))
            .map((product, index) => (
              <ListItem key={index}>
                <Link
                  to={`/product/${product.id}`}
                  style={{ textDecoration: "none", color: "inherit", display: 'flex', alignItems: 'center' }}
                  onClick={() => setOpen(true)}
                >
                  <img src={product.url} alt={product.title.longTitle} style={{ width: '40px', height: '40px', marginRight: '10px' }} />
                  {product.title.longTitle}
                </Link>
              </ListItem>
            ))}
        </ListWrapper>
        
      )}
    </SearchContainer>
  );
};

export default Search;