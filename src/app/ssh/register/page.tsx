"use client";

import type React from "react";

import { useState } from "react";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { SSHLogin, rtnSSHLogin } from "@/types/sshType";
import { useGetSSHMutation } from "@/hooks/sshMutation";
import { errorMessage } from "@/lib/utils";

export default function LoginForm() {
    const [errorMsg, setErrorMsg] = useState<string>("");

    const [form, setForm] = useState<SSHLogin>({
        host: "",
        username: "",
        port: 22,
        privateKey: null,
    });

    const { mutate } = useGetSSHMutation();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setForm({ ...form, privateKey: e.target.files[0] });
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle login logic here

        // FormData 생성
        const formData = new FormData();
        formData.append("host", form.host);
        formData.append("username", form.username);
        formData.append("port", String(form.port));
        if (form.privateKey) {
            formData.append("privateKey", form.privateKey);
        }

        mutate(formData, {
            onSuccess: (rtnSSHLoginInfo: rtnSSHLogin) => {
                if (rtnSSHLoginInfo.result) {
                    location.href = "/chat";
                }
            },
            onError: (error) => {
                const rtnMessage = errorMessage(error);
                setErrorMsg(rtnMessage);
            },
        });
    };

    return (
        <main className="flex min-h-screen items-center justify-center bg-white p-4">
            <Card className="w-full max-w-md border border-gray-200 shadow-sm">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold text-black">
                        Login
                    </CardTitle>
                    <CardDescription
                        className={`${
                            errorMsg ? "text-red-500" : "text-gray-500"
                        }`}
                    >
                        {errorMsg ||
                            "Enter your credentials to access your account"}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="host" className="text-black">
                                HOST
                            </Label>
                            <Input
                                value={form.host}
                                onChange={(e) =>
                                    setForm({ ...form, host: e.target.value })
                                }
                                id="host"
                                type="text"
                                placeholder="127.0.0.1"
                                required
                                className="border-gray-300 focus:border-black focus:ring-black"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="username" className="text-black">
                                USERNAME
                            </Label>
                            <div className="relative">
                                <Input
                                    value={form.username}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            username: e.target.value,
                                        })
                                    }
                                    id="username"
                                    type="text"
                                    placeholder="root"
                                    required
                                    className="border-gray-300 focus:border-black focus:ring-black pr-10"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="port" className="text-black">
                                PORT
                            </Label>
                            <div className="relative">
                                <Input
                                    value={form.port}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            port: Number(e.target.value),
                                        })
                                    }
                                    id="port"
                                    type="number"
                                    placeholder="22"
                                    required
                                    className="border-gray-300 focus:border-black focus:ring-black pr-10"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="privateKey" className="text-black">
                                PRIVATE KEY
                            </Label>
                            <div className="border-2 border-dashed border-gray-300 rounded-md p-4 hover:border-black transition-colors">
                                <div className="flex flex-col items-center justify-center gap-2">
                                    <Upload className="h-8 w-8 text-gray-400" />
                                    <p className="text-sm text-gray-500">
                                        {form.privateKey
                                            ? form.privateKey.name
                                            : "Click to upload or drag and drop"}
                                    </p>
                                    <input
                                        id="privateKey"
                                        type="file"
                                        className="hidden"
                                        required
                                        onChange={handleFileChange}
                                    />
                                    <Button
                                        type="button"
                                        variant="outline"
                                        className="mt-2 border-black text-black hover:bg-black hover:text-white"
                                        onClick={() =>
                                            document
                                                .getElementById("privateKey")
                                                ?.click()
                                        }
                                    >
                                        Select File
                                    </Button>
                                </div>
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className="w-full bg-black text-white hover:bg-gray-800"
                        >
                            Register
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </main>
    );
}
