import sshApi from "@/lib/sshAxios";
import { rtnSSHLogin } from "@/types/sshType";

export const getSSHLoginApi = async (
  sshLoginInfo: FormData
): Promise<rtnSSHLogin> => {
  const response = await sshApi.post(
    "/api/ssh/registerServerInfo",
    sshLoginInfo
  ); // 백엔드 API 주소

  return response.data;
};
