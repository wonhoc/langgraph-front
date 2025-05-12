import {
    getSSHLoginApi,
    getServerListApi,
    connectServerApi,
} from "@/api/sshApi";
import { rtnSSHLogin, rtnServerInfo } from "@/types/sshType";
import { rtnCommonType } from "@/types/commonType";

interface ServerListResponse {
    serverList: rtnServerInfo[];
    // 다른 필요한 필드가 있다면 추가
}

// 로그인 여부 확인
export const requestSSHLogin = async (
    sshLoginInfo: FormData
): Promise<rtnSSHLogin> => {
    const res: rtnSSHLogin = await getSSHLoginApi(sshLoginInfo);

    if (res.result) {
        location.href = "/chat";
    }

    return res;
};

// 로그인 여부 확인
export const requestServerList = async (): Promise<rtnServerInfo[]> => {
    const response = (await getServerListApi()) as unknown as {
        serverList: rtnServerInfo[];
    };

    return response.serverList || [];
};

// 서버 연결
export const connectServer = async (): Promise<rtnCommonType> => {
    const response: rtnCommonType = await connectServerApi();

    console.log("asdsad");
    if (response.result) {
        location.href = "/chat";
    }

    return response;
};
