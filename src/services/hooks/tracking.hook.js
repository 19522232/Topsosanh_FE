import { useMutation, useQuery, useQueryClient } from "react-query";
import { getProductURL, sendNotif, sendInfo } from "../apis/tracking.api";

export const useGetProductURL = (itemURL) => {
  const query = useQuery({
    queryKey: [getProductURL.name],
    queryFn: async () => getProductURL.fn(itemURL),
    refetchOnWindowFocus: false,
    retry: 3,
    retryDelay: 3000,
  });

  return query;
};

export const useSendInfor = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      const Infor = await sendInfo.fn(data);
      queryClient.invalidateQueries([getProductURL.name]);
      return Infor;
    },
  });
};

export const useSendNotif = () => {
  return useMutation({
    mutationFn: async (data) => {
      const Notif = await sendNotif.fn(data);
      return Notif;
    },
  });
};
