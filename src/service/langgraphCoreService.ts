import { useMutation } from "@tanstack/react-query";
import { getLLMDataApi } from "@/api/langgraphcoreApi";
import { ChatRequest, LLMResponse } from "@/types/langgraphCoreType"

// 마지막 AIMessage의 content만 추출하는 함수
const extractLastAIMessageContent = (data: LLMResponse): string | null => {
    const aiMessage = [...data.response]
      .reverse()
      .find((msg) => msg.id[2] === 'AIMessage');
  
    return aiMessage?.kwargs.content ?? null;
  };

// 챗 요청
export const requestLLMMessage = async (chatRequest: ChatRequest): Promise<string> => {
    const res = await getLLMDataApi(chatRequest);
    return extractLastAIMessageContent(res) ?? '(AI 응답 없음)';
};