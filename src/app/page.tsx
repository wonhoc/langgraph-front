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
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { rtnSSHServerList } from "@/types/sshType";
import { useGetSSHMutation } from "@/hooks/sshMutation";
import { errorMessage } from "@/lib/utils";

export default function LoginForm() {
  const [errorMsg, setErrorMsg] = useState<string>("");

  const [form, setForm] = useState<rtnSSHServerList>({
    host: "",
    username: "",
    port: 22,
  });

  const { mutate } = useGetSSHMutation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here


  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-white p-4">
      <Card className="w-full max-w-md border border-gray-200 shadow-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-black">Server List</CardTitle>
          <CardDescription className="text-gray-500">
            Click the Server
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            
          <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="py-3 px-2 text-left font-medium text-black"></th>
                    <th className="py-3 px-4 text-left font-medium text-black">Host</th>
                    <th className="py-3 px-4 text-left font-medium text-black">Username</th>
                    <th className="py-3 px-4 text-left font-medium text-black">Port</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200">
                    <td className="py-3 px-2 text-left font-medium text-black"></td>
                    <td className="py-3 px-4 text-left font-medium text-black">asd</td>
                    <td className="py-3 px-4 text-left font-medium text-black">asd</td>
                    <td className="py-3 px-4 text-left font-medium text-black">asd</td>
                  </tr>
                </tbody>
              </table>

            <Button
              type="submit"
              className="w-full bg-black text-white hover:bg-gray-800"
            >
              Sign in
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center border-t border-gray-100 p-4">
          <p className="text-sm text-gray-500">
            Don&apos;t have an account?{" "}
            <a href="#" className="font-medium text-black hover:underline">
              Register the Server
            </a>
          </p>
        </CardFooter>
      </Card>
    </main>
  );
}
