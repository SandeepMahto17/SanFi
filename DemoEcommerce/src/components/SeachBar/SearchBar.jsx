import { useState } from "react";
import "./searchbar.css";
import {  FaSearch } from 'react-icons/fa';

import { products } from "../../utils/products";
// import useDebounce from "../../hooks/useDebounce";
const SearchBar = ({ setFilterList }) => {
  const [searchWord, setSearchWord] = useState(null);
  // const debounceSearchWord = useDebounce(searchWord, 300);
  const handelChange = (input) => {
    setSearchWord(input.target.value);
    setFilterList(
      products.filter((item) =>
        item.productName?.toLowerCase().includes(searchWord?.toLowerCase())
      )
    );
  };
  return (
    <div className="search-container">
      <input type="text" placeholder="Search..." onChange={handelChange} />
      <FaSearch className="search-icon" />
    </div>
  );
};

export default SearchBar;
