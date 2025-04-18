import chatApi from "@/lib/chatAxios";
import { ChatRequest, LLMResponse } from "@/types/langgraphCoreType";

export const getLLMDataApi = async (
  chatRequest: ChatRequest
): Promise<LLMResponse> => {
  const response = await chatApi.post("/api/chat", chatRequest); // 백엔드 API 주소
  return response.data;
};
