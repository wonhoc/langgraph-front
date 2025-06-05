import { boardApi } from "@/api/board.api";
import {
    SearchBoardRequest,
    CreateBoardRequest,
    UpdateBoardRequest,
    GetBoardsResponse,
} from "@/types/board.type";

// 로그인
export const getBoards = async (
    searchBoardRequest: SearchBoardRequest
): Promise<GetBoardsResponse> => {
    const res = await boardApi.getBoards(searchBoardRequest);

    return res;
};
