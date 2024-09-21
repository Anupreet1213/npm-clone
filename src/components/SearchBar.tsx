import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSearch } from "../hooks/useSearch";

const SearchBar = () => {
  const { searchTerm, setSearchTerm, data, isLoading } = useSearch();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Close dropdown if click is outside of it
  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setDropdownOpen(false);
    }
  };

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    // Toggle dropdown visibility based on search term
    const handleDropdownToggle = () => {
      setDropdownOpen(!!searchTerm);
    };

    handleDropdownToggle();

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchTerm]);

  // Close dropdown on link click
  const handleLinkClick = () => {
    setDropdownOpen(false);
  };

  // Handle search form submission
  const onSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
    setDropdownOpen(false);
  };

  return (
    <form
      onSubmit={onSearchSubmit}
      className="flex items-center w-full md:w-[80%] gap-4"
    >
      <div className="relative w-full">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search for packages"
          className="w-full px-4 py-2 rounded-lg text-gray-900 border border-customGray focus:outline-none"
          aria-label="Search for packages"
        />

        {/* Dropdown handling */}
        {isDropdownOpen && data?.length > 0 && (
          <div
            ref={dropdownRef}
            className="absolute w-full end-0 z-10 mt-2 rounded-md border border-gray-100 bg-white shadow-lg"
            role="menu"
            aria-label="Search results"
          >
            <div className="p-2">
              {isLoading ? (
                <p className="text-gray-500 text-sm">Loading...</p>
              ) : (
                data.map((pkg) => (
                  <Link
                    key={pkg.package.name}
                    to={`/package/${pkg.package.name}`}
                    className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                    role="menuitem"
                    onClick={handleLinkClick} // Close dropdown on link click
                  >
                    {pkg.package.name}
                  </Link>
                ))
              )}
            </div>
          </div>
        )}
      </div>
      <button type="submit" className="bg-black text-white py-2 px-4">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
