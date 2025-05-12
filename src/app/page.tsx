"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { rtnServerInfo } from "@/types/sshType";
import { useServerInfoList, usePostSSHConnect } from "@/hooks/sshMutation";

export default function LoginForm() {
    const router = useRouter();

    // 페이지 이동 함수
    const handleNavigateToSshRegister = () => {
        router.push("/ssh/register"); // 다른 페이지로 이동
    };

    const [errorMsg, setErrorMsg] = useState<string>("");

    const [form, setForm] = useState<rtnServerInfo>({
        serverId: 0,
        host: "",
        username: "",
        port: 0,
    });

    const { data, isLoading, refetch } = useServerInfoList();

    // 컴포넌트 마운트 시 데이터 로드
    useEffect(() => {
        refetch();
    }, [refetch]);
    const postSSHConnect = usePostSSHConnect();

    useEffect(() => {}, [data]);

    // 서버 선택 처리
    const handleSelectServer = (server: rtnServerInfo) => {
        setForm(server);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        console.log(form);

        if (form.serverId) {
            // serverId만 전송
            postSSHConnect.mutate({ serverId: form.serverId });
        } else {
            setErrorMsg("서버를 선택해주세요");
        }
    };

    return (
        <main className="flex min-h-screen items-center justify-center bg-white p-4">
            <Card className="w-full max-w-md border border-gray-200 shadow-sm">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold text-black">
                        Server List
                    </CardTitle>
                    <CardDescription className="text-gray-500">
                        Click the Server
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {isLoading ? (
                            <div className="py-8 text-center">
                                Loading servers...
                            </div>
                        ) : (
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="border-b border-gray-200">
                                        <th className="py-3 px-2 text-left font-medium text-black">
                                            #
                                        </th>
                                        <th className="py-3 px-4 text-left font-medium text-black">
                                            Host
                                        </th>
                                        <th className="py-3 px-4 text-left font-medium text-black">
                                            Username
                                        </th>
                                        <th className="py-3 px-4 text-left font-medium text-black">
                                            Port
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data && data.length > 0 ? (
                                        data.map((server, index) => (
                                            <tr
                                                key={index}
                                                className={`border-b border-gray-200 cursor-pointer hover:bg-gray-50 ${
                                                    form.host === server.host &&
                                                    form.username ===
                                                        server.username
                                                        ? "bg-gray-100"
                                                        : ""
                                                }`}
                                                onClick={() =>
                                                    handleSelectServer(server)
                                                }
                                            >
                                                <td className="py-3 px-2 text-left font-medium text-black">
                                                    {index + 1}
                                                </td>
                                                <td className="py-3 px-4 text-left text-black">
                                                    {server.host}
                                                </td>
                                                <td className="py-3 px-4 text-left text-black">
                                                    {server.username}
                                                </td>
                                                <td className="py-3 px-4 text-left text-black">
                                                    {server.port}
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan={4}
                                                className="py-4 text-center text-gray-500"
                                            >
                                                No servers found
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        )}

                        {/* 선택된 서버 정보를 보여줄 수도 있습니다 */}
                        {form.host && (
                            <div className="mt-4 p-3 bg-gray-50 rounded-md">
                                <p className="text-sm text-gray-600">
                                    Selected server:{" "}
                                    <strong>{form.host}</strong>
                                </p>
                            </div>
                        )}

                        <Button
                            type="submit"
                            className="w-full bg-black text-white hover:bg-gray-800"
                            disabled={!form.host}
                        >
                            Connect to Server
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-center border-t border-gray-100 p-4">
                    <p className="text-sm text-gray-500">
                        Don&apos;t have a server?{" "}
                        <a
                            onClick={handleNavigateToSshRegister}
                            className="font-medium text-black hover:underline"
                        >
                            Register New Server
                        </a>
                    </p>
                </CardFooter>
            </Card>
        </main>
    );
}
