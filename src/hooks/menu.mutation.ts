import mainApi from "@/lib/main.axios";
import {
  useMutation,
  useQuery,
  UseQueryResult,
  useQueryClient,
} from "@tanstack/react-query";
import { useEffect } from "react";
import { RtnCommonType } from "@/types/commonType";
import { getMenus, createMenus } from "@/service/menus.service";
import { useRouter } from "next/navigation";
import { CreateMenuRequest } from "@/types/menu";

export const useMenus = () => {
  return useQuery<RtnCommonType, Error>({
    queryKey: ["menus"],
    queryFn: () => getMenus(),
  });
};

export const useCreateMenu = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation<RtnCommonType, Error, CreateMenuRequest>({
    mutationFn: createMenus,
    onSuccess: (data: RtnCommonType) => {
      queryClient.invalidateQueries({ queryKey: ["menus"] });

      router.push("/setting/menus");
    },
    onError: (error: Error) => {
      console.error("Menu creation error:", error);
    },
  });
};
