import { getLLMDataApi } from "@/api/agentApi";
import { reqSendMessageType, resMessageType } from "@/types/agentType";

// 챗 요청
export const requestLLMMessage = async (
    chatRequest: reqSendMessageType
): Promise<resMessageType> => {
    return await getLLMDataApi(chatRequest);
};
