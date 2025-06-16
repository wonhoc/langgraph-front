"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Home,
  PlusCircle,
  Bell,
  MessageSquare,
  HelpCircle,
  FileText,
  Settings,
  Users,
  BarChart3,
  Shield,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";

export function Sidebar() {
  const pathname = usePathname();
  const [expandedSections, setExpandedSections] = useState<string[]>([
    "board",
    "management",
  ]);

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const menuSections = [
    {
      id: "main",
      title: "메인",
      items: [
        { href: "/", label: "대시보드", icon: Home },
        { href: "/posts/new", label: "글쓰기", icon: PlusCircle },
      ],
    },
    {
      id: "board",
      title: "게시판 관리",
      expandable: true,
      items: [
        { href: "/categories/notice", label: "공지사항", icon: Bell },
        { href: "/categories/free", label: "자유게시판", icon: MessageSquare },
        { href: "/categories/qna", label: "Q&A", icon: HelpCircle },
        { href: "/categories/tips", label: "팁 & 노하우", icon: FileText },
      ],
    },
    {
      id: "management",
      title: "관리",
      expandable: true,
      items: [
        { href: "/admin/users", label: "사용자 관리", icon: Users },
        { href: "/admin/statistics", label: "통계", icon: BarChart3 },
        { href: "/setting/menus", label: "메뉴 설정", icon: Settings },
        { href: "/admin/permissions", label: "권한 관리", icon: Shield },
      ],
    },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const isSectionActive = (items: any[]) => {
    return items.some((item) => isActive(item.href));
  };

  return (
    <aside className="w-64 h-screen border-r bg-white shadow-sm">
      <div className="p-4">
        {/* 로고 */}
        <Link href="/" className="flex items-center space-x-3 mb-8">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-lg">H</span>
          </div>
          <div>
            <span className="font-bold text-xl text-gray-900">HELLO</span>
          </div>
        </Link>

        {/* 메뉴 섹션들 */}
        <nav className="space-y-2">
          {menuSections.map((section) => (
            <div key={section.id}>
              {section.expandable ? (
                <div>
                  <Button
                    variant="ghost"
                    className={`w-full justify-between h-9 px-3 ${
                      isSectionActive(section.items)
                        ? "bg-blue-50 text-blue-700"
                        : "text-gray-600"
                    }`}
                    onClick={() => toggleSection(section.id)}
                  >
                    <span className="font-medium text-sm">{section.title}</span>
                    {expandedSections.includes(section.id) ? (
                      <ChevronDown className="w-4 h-4" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    )}
                  </Button>
                  {expandedSections.includes(section.id) && (
                    <div className="mt-1 ml-2 space-y-1">
                      {section.items.map((item) => {
                        const Icon = item.icon;
                        return (
                          <Link key={item.href} href={item.href}>
                            <Button
                              variant={
                                isActive(item.href) ? "default" : "ghost"
                              }
                              className="w-full justify-start gap-3 h-9 pl-4"
                              size="sm"
                            >
                              <Icon className="w-4 h-4" />
                              {item.label}
                            </Button>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <div className="px-3 py-2">
                    <span className="font-medium text-sm text-gray-600">
                      {section.title}
                    </span>
                  </div>
                  <div className="space-y-1">
                    {section.items.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Link key={item.href} href={item.href}>
                          <Button
                            variant={isActive(item.href) ? "default" : "ghost"}
                            className="w-full justify-start gap-3 h-9"
                            size="sm"
                          >
                            <Icon className="w-4 h-4" />
                            {item.label}
                          </Button>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* 하단 정보 */}
        <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <p className="text-sm font-medium text-gray-700">시스템 상태</p>
          </div>
          <p className="text-xs text-gray-600">
            모든 서비스가 정상 작동 중입니다.
          </p>
        </div>
      </div>
    </aside>
  );
}
