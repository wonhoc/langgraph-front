import { useMutation } from "@tanstack/react-query";
import { login } from "@/service/user.service";
import { LoginRequest, LoginResponse } from "@/types/user.type";

export const useLoginMutation = () => {
    return useMutation<LoginResponse, Error, LoginRequest>({
        mutationFn: login,
    });
};
