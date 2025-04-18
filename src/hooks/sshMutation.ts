import { useMutation } from "@tanstack/react-query";
import { rtnSSHLogin } from "@/types/sshType";
import { requestSSHLogin } from "@/service/sshService";

export const useGetSSHMutation = () => {
  return useMutation<rtnSSHLogin, Error, FormData>({
    mutationFn: requestSSHLogin,
  });
};
