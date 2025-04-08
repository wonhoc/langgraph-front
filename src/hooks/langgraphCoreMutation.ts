import { useMutation } from '@tanstack/react-query';
import { ChatRequest } from '@/types/langgraphCoreType';
import { requestLLMMessage } from '@/service/langgraphCoreService';

export const useGetLLMMutation = () => {
    return useMutation<string, Error, ChatRequest>({
      mutationFn: requestLLMMessage,
    });
};