import { notFound } from "next/navigation";
import { MenuForm } from "@/components/menu-register-form";
import { getMenus } from "@/lib/menu";

interface EditMenuPageProps {
  params: {
    id: string;
  };
}

export default async function EditMenuPage({ params }: EditMenuPageProps) {
  const menus = await getMenus();

  // 모든 메뉴에서 해당 ID 찾기 (중첩된 구조에서)
  const findMenuById = (menuList: any[], id: number): any => {
    for (const menu of menuList) {
      if (menu.id === id) return menu;
      if (menu.children && menu.children.length > 0) {
        const found = findMenuById(menu.children, id);
        if (found) return found;
      }
    }
    return null;
  };

  const menu = findMenuById(menus, Number(params.id));

  if (!menu) {
    notFound();
  }

  return (
    <div className="p-8">
      <MenuForm menu={menu} mode="update" />
    </div>
  );
}
