import { useQuery } from "react-query";

import { getProduct } from "../apis/product.api";

export const useGetProduct = (PageNumber, Quantity, keyword, isAscending) => {
  const query = useQuery({
    queryKey: [getProduct.name],
    queryFn: async () => {
      return getProduct.fn(PageNumber, Quantity, keyword, isAscending);
    },
    refetchOnWindowFocus: false,
    retry: 3,
    retryDelay: 3000,
  });

  return query;
};
