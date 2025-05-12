import sshApi from "@/lib/sshAxios";
import { rtnSSHLogin, rtnServerInfo } from "@/types/sshType";
import { rtnCommonType } from "@/types/commonType";

export const getSSHLoginApi = async (
    sshLoginInfo: FormData
): Promise<rtnSSHLogin> => {
    const response = await sshApi.post(
        "/api/ssh/registerServerInfo",
        sshLoginInfo
    ); // 백엔드 API 주소

    return response.data;
};

export const getServerListApi = async (): Promise<rtnServerInfo[]> => {
    const response = await sshApi.get("/api/ssh/getServerList"); // 백엔드 API 주소

    return response.data;
};

export const connectServerApi = async (): Promise<rtnCommonType> => {
    const response = await sshApi.post("/api/ssh/connectServer"); // 백엔드 API 주소

    return response.data;
};
