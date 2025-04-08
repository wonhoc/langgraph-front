import api from "@/lib/axios";
import { ChatRequest, LLMResponse} from "@/types/langgraphCoreType"

export const getLLMDataApi = async (chatRequest:ChatRequest): Promise<LLMResponse> => {
    const response = await api.post('/chat', chatRequest); // 백엔드 API 주소
    return response.data;
};