import { useState, useMemo, useEffect } from "react";
import PackageListItem from "../components/PackageListItem";
import { useSearch } from "../hooks/useSearch";
import { SearchData } from "../types/searchDataTypes";
import { useLocation } from "react-router-dom";

const ITEMS_PER_PAGE = 10;

type SortOption = "Optimal" | "Popularity" | "Quality" | "Maintenance";

const SearchPage = () => {
  const { data, isLoading } = useSearch();
  const [sortOption, setSortOption] = useState<SortOption>("Optimal");
  const [currentPage, setCurrentPage] = useState(1);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query");

  // Sorting function
  const sortedData = useMemo(() => {
    if (!data) return [];

    // sorting criteria for each option
    const sortingCriteria = {
      Optimal: (a: SearchData, b: SearchData) => b.score.final - a.score.final,
      Popularity: (a: SearchData, b: SearchData) =>
        b.score.detail.popularity - a.score.detail.popularity,
      Quality: (a: SearchData, b: SearchData) =>
        b.score.detail.quality - a.score.detail.quality,
      Maintenance: (a: SearchData, b: SearchData) =>
        b.score.detail.maintenance - a.score.detail.maintenance,
    };

    return [...data].sort(sortingCriteria[sortOption]);
  }, [data, sortOption]);

  // Get the current page's data slice
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return sortedData.slice(startIndex, endIndex);
  }, [sortedData, currentPage]);

  const totalPages = Math.ceil(sortedData.length / ITEMS_PER_PAGE);

  // Handler for pagination
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  useEffect(() => {
    document.title = `${query} - npm search`;
  }, [query]);

  return (
    <div className="p-4 md:p-8 mx-auto">
      {/* Main layout with two columns */}
      <div className="flex flex-col md:flex-row">
        {/* Left side: Sorting options */}
        <div className="w-full md:w-[20%] mb-8 md:mb-0 md:pr-8">
          <h1 className="text-xl font-bold mb-4">Sort By</h1>
          <div className="flex flex-col space-y-4">
            {["Optimal", "Popularity", "Quality", "Maintenance"].map(
              (option) => (
                <div key={option}>
                  <label className="cursor-pointer">
                    <input
                      type="radio"
                      name="sortOption"
                      value={option}
                      checked={sortOption === option}
                      onChange={() => {
                        setSortOption(option as SortOption);
                        setCurrentPage(1);
                      }}
                      className="mr-2"
                    />
                    {option}
                  </label>
                  <hr
                    className={`${
                      option === "Popularity"
                        ? "border-cyan-500"
                        : option === "Quality"
                        ? "border-violet-500"
                        : option === "Maintenance"
                        ? "border-red-700"
                        : ""
                    }`}
                  />
                </div>
              )
            )}
          </div>
        </div>

        {/* Right side: Search Results */}
        <div className="w-full md:w-[80%]">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Search Results</h1>
            {sortedData && (
              <p className="mt-2 text-lg">
                {sortedData.length} package{sortedData.length !== 1 ? "s" : ""}{" "}
                found
              </p>
            )}
          </div>

          <div>
            {isLoading ? (
              <p className="text-gray-500">Loading...</p>
            ) : (
              <div className="space-y-4">
                {paginatedData.map((pkg) => (
                  <PackageListItem
                    key={pkg.package.name}
                    packageData={pkg.package}
                    scoreData={pkg.score}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Pagination */}
          <div className="mt-8 flex justify-between">
            <button
              onClick={goToPreviousPage}
              className={`px-3 py-1 bg-gray-300 rounded ${
                currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <p className="text-lg">
              Page {currentPage} of {totalPages}
            </p>
            <button
              onClick={goToNextPage}
              className={`px-3 py-1 bg-gray-300 rounded ${
                currentPage === totalPages
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
