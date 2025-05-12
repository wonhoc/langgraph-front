import chatApi from "@/lib/chatAxios";
import { reqSendMessageType, resMessageType } from "@/types/agentType";

export const getLLMDataApi = async (
    chatRequest: reqSendMessageType
): Promise<resMessageType> => {
    const response = await chatApi.post(
        "/api/agent/executeCommand",
        chatRequest
    ); // 백엔드 API 주소
    return response.data;
};
