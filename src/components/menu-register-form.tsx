"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DynamicIcon } from "@/components/dynamic-icon";
import {
  getAvailableIcons,
  getAvailablePermissions,
  createMenu,
  updateMenu,
} from "@/lib/menu-api";
import { getMenus } from "@/lib/menu";
import type { MenuItem } from "@/types/menu";
import { useCreateMenu } from "@/hooks/menu.mutation";

interface MenuFormProps {
  menu?: MenuItem;
  parentId?: number;
  mode: "create" | "edit";
}

export function MenuForm({ menu, parentId, mode }: MenuFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [availableIcons] = useState(getAvailableIcons());
  const [availablePermissions] = useState(getAvailablePermissions());
  const [parentMenus, setParentMenus] = useState<MenuItem[]>([]);

  const [formData, setFormData] = useState({
    name: menu?.name || "",
    description: menu?.description || "",
    url: menu?.url || "",
    icon: menu?.icon || "circle",
    parentId: parentId || menu?.parentId || null,
    sortOrder: menu?.sortOrder || 1,
    level: menu?.level || 1,
    isActive: menu?.isActive ?? true,
    isVisible: menu?.isVisible ?? true,
    type: menu?.type || "menu",
    permission: menu?.permission || "",
    config: menu?.config || "{}",
    createdBy: menu?.createdBy || "admin",
    updatedBy: "admin",
  });

  const { mutate } = useCreateMenu();

  useEffect(() => {
    async function fetchParentMenus() {
      const menus = await getMenus();
      // 현재 수정 중인 메뉴와 그 하위 메뉴들은 부모로 선택할 수 없도록 필터링
      const filteredMenus = menus.filter((m) => {
        if (mode === "edit" && menu) {
          return m.id !== menu.id && !isDescendant(m, menu.id, menus);
        }
        return true;
      });
      setParentMenus(filteredMenus);
    }
    fetchParentMenus();
  }, [mode, menu]);

  // 하위 메뉴인지 확인하는 함수
  const isDescendant = (
    menuItem: MenuItem,
    ancestorId: number,
    allMenus: MenuItem[]
  ): boolean => {
    if (menuItem.parentId === ancestorId) return true;
    if (menuItem.parentId === null) return false;

    const parent = allMenus.find((m) => m.id === menuItem.parentId);
    return parent ? isDescendant(parent, ancestorId, allMenus) : false;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // config JSON 유효성 검사
      try {
        JSON.parse(formData.config);
      } catch (e) {
        alert("설정(Config)은 유효한 JSON 형식이어야 합니다.");
        setIsSubmitting(false);
        return;
      }

      if (mode === "create") {
        mutate(formData);
      } else if (menu) {
        await updateMenu(menu.id, formData);
      }

      router.push("/settings/menus");
      router.refresh();
    } catch (error) {
      alert("오류가 발생했습니다.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleParentChange = (value: string) => {
    const parentId = value === "null" ? null : Number(value);
    const parentMenu = parentMenus.find((m) => m.id === parentId);
    const level = parentMenu ? parentMenu.level + 1 : 1;

    setFormData({
      ...formData,
      parentId,
      level,
    });
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>
          {mode === "create" ? "새 메뉴 추가" : "메뉴 수정"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">메뉴명 *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="메뉴명을 입력하세요"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="url">URL *</Label>
              <Input
                id="url"
                value={formData.url}
                onChange={(e) =>
                  setFormData({ ...formData, url: e.target.value })
                }
                placeholder="/example"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">설명</Label>
            <Input
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: formData.description })
              }
              placeholder="메뉴에 대한 설명을 입력하세요"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="icon">아이콘</Label>
              <Select
                value={formData.icon}
                onValueChange={(value) =>
                  setFormData({ ...formData, icon: value })
                }
              >
                <SelectTrigger>
                  <SelectValue>
                    <div className="flex items-center gap-2">
                      <DynamicIcon name={formData.icon} className="w-4 h-4" />
                      {formData.icon}
                    </div>
                  </SelectValue>
                </SelectTrigger>
                <SelectContent className="max-h-60">
                  {availableIcons.map((icon) => (
                    <SelectItem key={icon} value={icon}>
                      <div className="flex items-center gap-2">
                        <DynamicIcon name={icon} className="w-4 h-4" />
                        {icon}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="permission">권한 *</Label>
              <Select
                value={formData.permission}
                onValueChange={(value) =>
                  setFormData({ ...formData, permission: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="권한을 선택하세요" />
                </SelectTrigger>
                <SelectContent>
                  {availablePermissions.map((permission) => (
                    <SelectItem key={permission} value={permission}>
                      {permission}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {mode === "edit" && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="parentId">부모 메뉴</Label>
                <Select
                  value={String(formData.parentId)}
                  onValueChange={handleParentChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="부모 메뉴를 선택하세요" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="null">최상위 메뉴</SelectItem>
                    {parentMenus.map((parentMenu) => (
                      <SelectItem
                        key={parentMenu.id}
                        value={String(parentMenu.id)}
                      >
                        {"  ".repeat(parentMenu.level - 1)}
                        <DynamicIcon
                          name={parentMenu.icon}
                          className="w-4 h-4 inline mr-2"
                        />
                        {parentMenu.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="sortOrder">정렬 순서</Label>
              <Input
                id="sortOrder"
                type="number"
                value={formData.sortOrder}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    sortOrder: Number(e.target.value),
                  })
                }
                min="1"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="config">설정 (JSON)</Label>
            <Input
              id="config"
              value={formData.config}
              onChange={(e) =>
                setFormData({ ...formData, config: formData.config })
              }
              placeholder='{"target": "_blank"}'
            />
            <p className="text-xs text-gray-500">
              JSON 형식으로 추가 설정을 입력하세요. 예: target, className 등
            </p>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="isActive"
                  checked={formData.isActive}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, isActive: checked })
                  }
                />
                <Label htmlFor="isActive">활성화</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="isVisible"
                  checked={formData.isVisible}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, isVisible: checked })
                  }
                />
                <Label htmlFor="isVisible">표시</Label>
              </div>
            </div>

            <div className="text-sm text-gray-500">
              <p>레벨: {formData.level}</p>
              <p>타입: {formData.type}</p>
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting
                ? "저장 중..."
                : mode === "create"
                ? "추가"
                : "수정"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
            >
              취소
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
