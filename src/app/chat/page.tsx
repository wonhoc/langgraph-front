"use client";

import type React from "react";
import Link from "next/link";
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
import { useBoards } from "@/hooks/board.mutation";
import { SearchBoardRequest } from "@/types/board.type";
import { PlusCircle, Calendar, User } from "lucide-react";

export default function LoginForm() {
  const router = useRouter();

  // 페이지 이동 함수
  const handleNavigateToSshRegister = () => {
    router.push("/ssh/register"); // 다른 페이지로 이동
  };

  const [errorMsg, setErrorMsg] = useState<string>("");

  const [form, setForm] = useState<SearchBoardRequest>({
    keyword: "",
  });

  const { data, isLoading, refetch } = useBoards(form);

  useEffect(() => {}, [data]);

  // 서버 선택 처리
  const handleSelectServer = () => {};

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-white p-4">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Board</h1>
          </div>
          <Link href="/posts/new">
            <Button className="flex items-center gap-2">
              <PlusCircle className="w-4 h-4" />
              Create Board
            </Button>
          </Link>
        </div>

        {data.data.items ? (
          <Card className="text-center py-12">
            <CardContent>
              <p className="text-gray-500 text-lg mb-4">There is no data.</p>
              <Link href="/posts/new">
                <Button>첫 번째 글 작성하기</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6">
            {data.data.items.map((board, index) => (
              <Card key={post.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <Link href={`/posts/${post.id}`}>
                        <CardTitle className="hover:text-blue-600 transition-colors cursor-pointer">
                          {post.title}
                        </CardTitle>
                      </Link>
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          {post.author}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {post.createdAt.toLocaleDateString("ko-KR")}
                        </div>
                      </div>
                    </div>
                    <Badge variant="secondary">
                      {post.createdAt !== post.updatedAt ? "수정됨" : "새글"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 line-clamp-3">
                    {post.content.length > 150
                      ? `${post.content.substring(0, 150)}...`
                      : post.content}
                  </p>
                  <div className="mt-4">
                    <Link href={`/posts/${post.id}`}>
                      <Button variant="outline" size="sm">
                        자세히 보기
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <Card className="w-full max-w-md border border-gray-200 shadow-sm">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-black">
              Board List
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {isLoading ? (
                <div className="py-8 text-center">Loading servers...</div>
              ) : (
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="py-3 px-2 text-left font-medium text-black">
                        #
                      </th>
                      <th className="py-3 px-4 text-left font-medium text-black">
                        Title
                      </th>
                      <th className="py-3 px-4 text-left font-medium text-black">
                        Content
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data ? (
                      data.data.items.map((board, index) => (
                        <tr
                          key={index}
                          className={
                            "border-b border-gray-200 cursor-pointer transition-colors duration-200 text-black bg-wi text-white"
                          }
                          onClick={() => handleSelectServer()}
                        >
                          <td className="py-3 px-2 text-left font-medium">
                            {index + 1}
                          </td>
                          <td className="py-3 px-4 text-left">{board.title}</td>
                          <td className="py-3 px-4 text-left">
                            {board.content}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={3}
                          className="py-4 text-center text-gray-500"
                        >
                          No board found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              )}

              <Button
                type="submit"
                className="w-full bg-black text-white hover:bg-gray-800"
                disabled={!form}
              >
                Connect to Server
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center border-t border-gray-100 p-4">
            <p className="text-sm text-gray-500">Don&apos;t have a server? </p>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}
