import React, { createContext, useState } from "react";
import { useSearchPackages } from "../hooks/useSearchPackages";
import { SearchData } from "../types/searchDataTypes";

interface SearchContextProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  data: SearchData[];
  isLoading: boolean;
}

export const SearchContext = createContext<SearchContextProps | undefined>(
  undefined
);

export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const { data, isLoading } = useSearchPackages(searchTerm);

  return (
    <SearchContext.Provider
      value={{ searchTerm, setSearchTerm, data, isLoading }}
    >
      {children}
    </SearchContext.Provider>
  );
};
