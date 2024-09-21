import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchPackageDetails = async (
  name: string | undefined,
  version?: string
) => {
  const endpoint = version
    ? `https://registry.npmjs.org/${name}/${version}`
    : `https://registry.npmjs.org/${name}`;
  const { data } = await axios.get(endpoint);
  return data;
};

export const usePackageDetail = (
  name: string | undefined,
  version?: string
) => {
  return useQuery({
    queryKey: ["package", name, version],
    queryFn: () => fetchPackageDetails(name, version),
  });
};
