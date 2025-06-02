import { authApi } from "@/api/user.api";
import { rtnCommonType } from "@/types/commonType";
import { LoginRequest, LoginResponse } from "@/types/user.type";

// 로그인
export const login = async (
    loginRequest: LoginRequest
): Promise<LoginResponse> => {
    const res: LoginResponse = await authApi.login(loginRequest);

    return res;
};
