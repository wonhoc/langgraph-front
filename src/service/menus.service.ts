import { menusApi } from "@/api/menus.api";
import {
  SearchBoardRequest,
  CreateBoardRequest,
  GetBoardResponse,
} from "@/types/board.type";
import { RtnCommonType } from "@/types/commonType";

// 메뉴 목록 조회
export const getMenus = async (): Promise<RtnCommonType> => {
  const res = await menusApi.getMenus();

  return res;
};

// 메뉴 생성
export const createMenus = async (): Promise<RtnCommonType> => {
  const res = await menusApi.createMenus();

  return res;
};
