import { useMutation } from "@tanstack/react-query";
import { reqSendMessageType, resMessageType } from "@/types/agentType";
import { requestLLMMessage } from "@/service/agentCoreService";

export const useGetLLMMutation = () => {
    return useMutation<resMessageType, Error, reqSendMessageType>({
        mutationFn: requestLLMMessage,
    });
};
