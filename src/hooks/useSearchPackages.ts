import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchPackages = async (query: string) => {
  const { data } = await axios.get(
    `https://registry.npmjs.org/-/v1/search?text=${query}`
  );
  return data.objects;
};

export const useSearchPackages = (searchTerm: string) => {
  return useQuery({
    queryKey: ["search", searchTerm],
    queryFn: () => fetchPackages(searchTerm),
    enabled: !!searchTerm,
  });
};
