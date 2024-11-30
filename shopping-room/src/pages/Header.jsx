import React, { useState, useContext } from 'react';
import { ProductContext } from './ProductProvider'; // Correct path to ProductContext
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch, FaShoppingCart, FaUser } from "react-icons/fa";
import './SearchBar.css';
import { AuthContext } from './AuthProvider';
import { IoBagCheckOutline } from "react-icons/io5";
import { TbLogout2 } from "react-icons/tb";

const Header = () => {
  const { products } = useContext(ProductContext); // Access context here
  const [searchActive, setSearchActive] = useState(false);
  const [query, setQuery] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdownclose, setIsDropdownclose] = useState(true);

  const { user, logout } = useContext(AuthContext); // Get user and logout from context
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
    setIsDropdownclose((prev) => !prev);
  };
  
  const handleLogout = () => {
    logout(); // Clear authentication
    setIsDropdownOpen(false); // Close the dropdown
  };


  const handleSearchClick = () => {
    setSearchActive(true);
  };

  const closeSearch = () => {
    setSearchActive(false);
    setQuery("");
    setFilteredResults([]);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    // Filter results
    const results = products.filter((product) =>
      product.title && product.title.toLowerCase().startsWith(value.toLowerCase())
    );
    setFilteredResults(results);
  };

  return (
    <>
      <header className="bg-gray-800 text-white">
        <nav className="container mx-auto flex justify-between items-center py-4 px-6">
          <div className="text-lg font-bold">
            <Link to="/">Victoire's Store</Link>
          </div>
          <ul className="flex space-x-6">
            <li>
              <Link to="/cart" className="hover:text-gray-400">
                <FaShoppingCart size={24} title="Cart" />
              </Link>
            </li>
            <li className="hover:text-gray-400">
              <FaSearch size={24} title="Search" onClick={handleSearchClick} />
            </li>
           {/* user icon */}
            <li className="relative">
              <FaUser
                size={24}
                title="User"
                onClick={toggleDropdown}
                className="cursor-pointer"
              />
              {user && isDropdownOpen? (
                <div className="absolute right-0 mt-2 bg-white border rounded shadow-md z-10">
                  <ul >
                    <li
                      className="block py-2 px-4 text-black hover:cursor-pointer hover:bg-gray-200"
                      onClick={handleLogout}
                    >
                      <TbLogout2 title='Logout' size={24}/>
                    </li>
                    <Link to='/checkout'>
                    <li title='Checkout ' className='rounded px-4 py-2 hover:bg-gray-200 block'>
                    <IoBagCheckOutline size={24} className=' text-black' />
                    </li>
                    </Link>
                  </ul>
                </div>
              ):!isDropdownclose && (
                <div className="absolute right-0 mt-2 bg-white border rounded shadow-md z-10">
                  <ul>
                  <Link to='/Signup'>
                    <li
                      className="block py-2 px-6 text-nowrap text-black hover:cursor-pointer hover:bg-gray-200"
                    >
                      Sign Up
                    </li>
               </Link>
              <Link to='/Login'>
              <li title='Login' className='rounded px-8 py-2 text-black hover:bg-gray-200 block'>
                Login
              </li>
              </Link>
                  </ul>
                </div>
              )}
            </li>
            {/* user icon */}
          </ul>
        </nav>
      </header>

      {searchActive && (
        <div className="search-overlay">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search Products"
              value={query}
              onChange={handleInputChange}
              className="search-input"
            />
            <button className="close-btn" onClick={closeSearch}>
              x
            </button>
          </div>
          <ul className="results-list">
            {filteredResults.map((product) => (
              <Link key={product.id} to={`/preview/${product.id}`}>
                <li>{product.title}</li>
              </Link>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default Header;
