import { useQuery } from "@tanstack/react-query";

import { getProductSelector } from "../apis/notification.api";

export const useGetProductSelector = (itemURL, itemSelector) => {
  const query = useQuery({
    queryKey: [getProductSelector.name],
    queryFn: async () => {
      return getProductSelector.fn(itemURL, itemSelector);
    },
    refetchOnWindowFocus: false,
    retry: 3,
    retryDelay: 3000,
  });

  return query;
};
