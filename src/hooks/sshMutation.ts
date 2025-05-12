import { useMutation, useQuery } from "@tanstack/react-query";
import { rtnSSHLogin, rtnServerInfo, reqServerId } from "@/types/sshType";
import { rtnCommonType } from "@/types/commonType";
import {
    requestSSHLogin,
    requestServerList,
    connectServer,
} from "@/service/sshService";

export const useGetSSHMutation = () => {
    return useMutation<rtnSSHLogin, Error, FormData>({
        mutationFn: requestSSHLogin,
    });
};

export const useServerInfoList = () => {
    return useQuery<rtnServerInfo[], Error>({
        queryKey: ["serverList"],
        queryFn: () => requestServerList(),
    });
};

export const usePostSSHConnect = () => {
    return useMutation<rtnCommonType, Error, reqServerId>({
        mutationFn: connectServer,
    });
};
