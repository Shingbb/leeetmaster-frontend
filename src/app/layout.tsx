// 指定此文件在客户端环境下运行
"use client";
// 导入AntdRegistry组件，用于在Next.js中注册Ant Design组件
import { AntdRegistry } from "@ant-design/nextjs-registry";
// 导入基础布局组件
import BasicLayout from "@/layouts/BasicLayout";
// 导入React库中的useCallback和useEffect钩子
import React, { useCallback, useEffect } from "react";
// 导入全局样式文件
import "./globals.css";
// 导入Provider组件和配置好的Redux store
import { Provider, useDispatch } from "react-redux";
import store, { AppDispatch } from "@/stores";
import { getLoginUserUsingGet } from "@/api/user";
import { setLoginUser } from "@/stores/loginUser";
import AccessLayout from "@/access/AccessLayout";

/**
 * 执行初始化逻辑的布局（多封装一层）
 * @param children
 * @constructor
 */
const InitLayout: React.FC<
  Readonly<{
    children: React.ReactNode;
  }>
> = ({ children }) => {
  const dispatch = useDispatch<AppDispatch>();
  /**
   * 全局初始化函数，有全局单次调用的代码，都可以写到这里
   */
  const doInit = useCallback(async () => {
    console.log("hello 欢迎来到我的项目");
    // 初始化全局用户状态
    const res = await getLoginUserUsingGet();
    if (res.data) {
      // 更新全局用户状态
      dispatch(setLoginUser(res.data));
    } else {
      /*setTimeout(() => {
                    // 获取失败，使用默认测试用户登录
                    const testUser = {
                      id: 1,
                      userName: "test",
                      nickName: "测试用户",
                      userAvatar:
                        "https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png",
                    };
                    dispatch(setLoginUser(testUser));
                  }, 3000);*/
      return;
    }
    /*    // 获取当前页面路径
                // eslint-disable-next-line react-hooks/rules-of-hooks
                const pathname = usePathname();
                // 登录和注册页不用获取登录信息
                if (pathname !== "/user/login" && pathname !== "/user/register") {
                }
                {
                  // 这里可以添加逻辑，例如跳转到首页或者加载页面数据
                  console.log("用户已登录，正在访问页面:", pathname);
                  // 还可以在此处进行页面数据的初始加载
                  // 示例：fetchPageData(pathname);
                }*/
  }, []);
  // 只执行一次
  useEffect(() => {
    doInit();
  }, []);
  return children;
};
/**
 * 应用的根布局组件
 * @param children
 * @constructor
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // 返回应用的HTML结构，包括Ant Design组件的注册、Redux的Provider以及自定义的InitLayout和BasicLayout
  return (
    <html lang="zh">
      <body>
        <AntdRegistry>
          <Provider store={store}>
            <InitLayout>
              <BasicLayout>
                <AccessLayout>{children}</AccessLayout>
              </BasicLayout>
            </InitLayout>
          </Provider>
        </AntdRegistry>
      </body>
    </html>
  );
}
