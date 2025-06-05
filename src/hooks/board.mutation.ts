import { useMutation, useQuery, UseQueryResult } from "@tanstack/react-query";
import { getBoards } from "@/service/board.service";
import { SearchBoardRequest, GetBoardsResponse } from "@/types/board.type";

export const useBoards = (
    searchParams: SearchBoardRequest
): UseQueryResult<GetBoardsResponse> => {
    return useQuery({
        queryKey: ["boardList", searchParams],
        queryFn: () => getBoards(searchParams),
    });
};
