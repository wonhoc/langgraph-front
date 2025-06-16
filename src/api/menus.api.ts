import mainApi from "@/lib/main.axios";
import { createBoard } from "@/service/board.service";
import { createMenus } from "@/service/menus.service";
import { RtnCommonType } from "@/types/commonType";

// basic path: /api/main
export const menusApi = {
  getMenus: async (): Promise<RtnCommonType> => {
    const response = await mainApi.get("/menus");

    return response.data;
  },

  createMenus: async (): Promise<RtnCommonType> => {
    const response = await mainApi.post("/menus");

    return response.data;
  },
};
