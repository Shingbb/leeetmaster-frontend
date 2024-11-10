import { MenuDataItem } from "@ant-design/pro-layout";
import { CrownOutlined } from "@ant-design/icons";
import ACCESS_ENUM from "@/access/accessEnum";

// 菜单列表
export const menus = [
  {
    path: "/",
    name: "主页",
  },
  {
    path: "/banks",
    name: "题库",
  },
  {
    path: "/questions",
    name: "题目",
  },
  {
    name: "面试大师",
    path: "https://github.com/Shingbb/leetmaster-frontend",
    target: "_blank",
  },
  {
    path: "/admin",
    name: "管理",
    icon: <CrownOutlined />,
    access: ACCESS_ENUM.ADMIN,
    children: [
      {
        path: "/admin/user",
        name: "用户管理",
        access: ACCESS_ENUM.ADMIN,
      },
      {
        path: "/admin/question",
        name: "题目管理",
        access: ACCESS_ENUM.ADMIN,
      },
      {
        path: "/admin/questionBank",
        name: "题库管理",
        access: ACCESS_ENUM.ADMIN,
      },
    ],
  },
] as MenuDataItem[];

/**
 * 根据路径查找所有菜单项
 * @param path - 菜单项的路径
 * @returns MenuDataItem | null - 找到的菜单项，若未找到则返回 null
 */
export const findAllMenuItemByPath = (path: string): MenuDataItem | null => {
  return findMenuItemByPath(menus, path);
};

/**
 * 根据路径递归查找菜单项
 * @param menus - 菜单项数组
 * @param path - 目标菜单项路径
 * @returns MenuDataItem | null - 找到的菜单项，若未找到则返回 null
 */
export const findMenuItemByPath = (
  menus: MenuDataItem[],
  path: string,
): MenuDataItem | null => {
  for (const menu of menus) {
    // 检查当前菜单项路径是否匹配
    if (menu.path === path) {
      return menu;
    }
    // 若有子菜单项，则递归查找
    if (menu.children) {
      const matchedMenuItem = findMenuItemByPath(menu.children, path);
      if (matchedMenuItem) {
        return matchedMenuItem;
      }
    }
  }
  // 未找到匹配的菜单项，返回 null
  return null;
};
