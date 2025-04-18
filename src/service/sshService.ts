import { getSSHLoginApi } from "@/api/sshApi";
import { rtnSSHLogin } from "@/types/sshType";

// 로그인 여부 확인
export const requestSSHLogin = async (
  sshLoginInfo: FormData
): Promise<rtnSSHLogin> => {
  const res: rtnSSHLogin = await getSSHLoginApi(sshLoginInfo);
  return res;
};
