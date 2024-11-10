"use client";
import {
  GithubFilled,
  LogoutOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { ProLayout } from "@ant-design/pro-components";
import { Dropdown, Input, message } from "antd";
import React, { useCallback } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
import GlobalFooter from "@/components/GlobalFooter";
import { menus } from "../../../config/menus";
import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/stores";
import { userLogoutUsingPost } from "@/api/user";
import { DEFAULT_USER, setLoginUser } from "@/stores/loginUser";
import getAccessibleMenus from "@/access/menuAccess";

/**
 * 搜索条
 * @constructor
 */
const SearchInput = () => {
  return (
    <div
      key="SearchOutlined"
      aria-hidden
      style={{
        display: "flex",
        alignItems: "center",
        marginInlineEnd: 24,
      }}
      onMouseDown={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
    >
      <Input
        style={{
          borderRadius: 4,
          marginInlineEnd: 12,
        }}
        prefix={<SearchOutlined />}
        placeholder="搜索题目"
        variant="borderless"
      />
    </div>
  );
};

interface Props {
  children: React.ReactNode;
}

/**
 * 全局通用布局
 * @param children
 * @constructor
 */
export default function BasicLayout({ children }: Props) {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const loginUser = useSelector((state: RootState) => state.loginUser);

  /**
   * 退出登录函数
   */
  const handleLogout = useCallback(async () => {
    try {
      const res = await userLogoutUsingPost(); // 调用退出登录接口
      if (res.data) {
        // 清除 Redux 中的用户状态
        dispatch(setLoginUser(DEFAULT_USER));
        message.success("已成功退出登录");
      } else {
        message.error("退出登录失败，请稍后再试");
      }
    } catch (error) {
      message.error("退出登录失败，请稍后再试");
    }
  }, [dispatch]);

  return (
    <div
      id="basicLayout"
      style={{
        height: "100vh",
        overflow: "auto",
      }}
    >
      <ProLayout
        title="面试大师刷题平台"
        layout="top"
        logo={
          <Image
            src="/assets/leetmaster_logo.png"
            height={32}
            width={32}
            alt="面试大师网站 - Shing"
          />
        }
        location={{
          pathname,
        }}
        avatarProps={{
          src: loginUser.userAvatar,
          size: "small",
          title: loginUser.userName,
          render: (props, dom) => {
            return (
              <Dropdown
                menu={{
                  items: [
                    {
                      key: "logout",
                      icon: <LogoutOutlined />,
                      label: "退出登录",
                      onClick: handleLogout, // 点击触发退出登录
                    },
                  ],
                }}
              >
                {dom}
              </Dropdown>
            );
          },
        }}
        actionsRender={(props) => {
          if (props.isMobile) return [];
          return [
            <SearchInput key="search" />,
            <a
              key="github"
              href="https://github.com/Shingbb/leetmaster-frontend"
              target="_blank"
            >
              <GithubFilled key="GithubFilled" />
            </a>,
          ];
        }}
        headerTitleRender={(logo, title, _) => {
          return (
            <a>
              {logo}
              {title}
            </a>
          );
        }}
        // 渲染底部栏
        footerRender={() => {
          return <GlobalFooter />;
        }}
        onMenuHeaderClick={(e) => console.log(e)}
        // 定义有哪些菜单
        menuDataRender={() => {
          return getAccessibleMenus(loginUser, menus);
        }}
        // 定义了菜单项如何渲染
        menuItemRender={(item, dom) => (
          <Link href={item.path || "/"} target={item.target}>
            {dom}
          </Link>
        )}
      >
        {/*{JSON.stringify(loginUser)}*/}
        {children}
      </ProLayout>
    </div>
  );
}
