"use client";

import {
  AlipayCircleOutlined,
  GithubOutlined,
  LockOutlined,
  MobileOutlined,
  TaobaoCircleOutlined,
  UserOutlined,
  WechatOutlined,
} from "@ant-design/icons";
import {
  LoginForm,
  ProConfigProvider,
  ProFormCaptcha,
  ProFormCheckbox,
  ProFormText,
  setAlpha,
} from "@ant-design/pro-components";
import { message, Space, Tabs, theme } from "antd";
import type { CSSProperties } from "react";
import { useState } from "react";
import { ProForm } from "@ant-design/pro-form";
import { AppDispatch } from "@/stores";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { userLoginUsingPost } from "@/api/user";
import { setLoginUser } from "@/stores/loginUser";
import Link from "next/link";
import Image from "next/image";
import "./index.css";

type LoginType = "phone" | "account";

/**
 * 用户登录页面
 * @constructor
 */
const UserLoginPage: React.FC = () => {
  const { token } = theme.useToken();
  const [loginType, setLoginType] = useState<LoginType>("phone");
  const [form] = ProForm.useForm();
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  /**
   * 提交
   */
  const doSubmit = async (values: API.UserLoginRequest) => {
    try {
      const res = await userLoginUsingPost(values);
      if (res.data) {
        message.success("登录成功");
        // 保存用户登录状态
        dispatch(setLoginUser(res.data));
        await router.replace("/");
        form.resetFields();
      }
    } catch (e) {
      message.error("登录失败，" + e.message);
    }
  };

  /**
   * 图标布局样式
   */
  const iconStyles: CSSProperties = {
    marginInlineStart: "16px",
    color: setAlpha(token.colorTextBase, 0.2),
    fontSize: "24px",
    verticalAlign: "middle",
    cursor: "pointer",
  };

  return (
    <ProConfigProvider hashed={false}>
      <div
        id="userLoginPage"
        style={{ backgroundColor: token.colorBgContainer }}
      >
        <LoginForm
          form={form}
          logo={
            <Image
              src="/assets/leetmaster_logo.png"
              alt="LeetMaster"
              height={54}
              width={54}
            />
          }
          title="面试大师 LeetMaster - 用户登录"
          subTitle="程序员面试刷题网站"
          onFinish={doSubmit}
          actions={
            <Space>
              其他登录方式
              <GithubOutlined style={iconStyles} />
              <AlipayCircleOutlined style={iconStyles} />
              <TaobaoCircleOutlined style={iconStyles} />
              <WechatOutlined style={iconStyles} />
            </Space>
          }
        >
          <Tabs
            centered
            activeKey={loginType}
            onChange={(activeKey) => setLoginType(activeKey as LoginType)}
          >
            <Tabs.TabPane key={"account"} tab={"账号密码登录"} />
            <Tabs.TabPane key={"phone"} tab={"手机号登录"} />
          </Tabs>
          {loginType === "account" && (
            <>
              <ProFormText
                name="userAccount"
                fieldProps={{
                  size: "large",
                  prefix: <UserOutlined className={"prefixIcon"} />,
                }}
                placeholder={"请输入用户账号"}
                rules={[
                  {
                    required: true,
                    message: "请输入用户名!",
                  },
                ]}
              />
              <ProFormText.Password
                name="userPassword"
                fieldProps={{
                  size: "large",
                  prefix: <LockOutlined className={"prefixIcon"} />,
                  strengthText:
                    "密码由数字、字母和特殊字符组成，长度至少为8个字符。",
                  statusRender: (value) => {
                    const getStatus = () => {
                      if (value && value.length > 12) {
                        return "ok";
                      }
                      if (value && value.length > 6) {
                        return "pass";
                      }
                      return "poor";
                    };
                    const status = getStatus();
                    if (status === "pass") {
                      return (
                        <div style={{ color: token.colorWarning }}>
                          强度：中
                        </div>
                      );
                    }
                    if (status === "ok") {
                      return (
                        <div style={{ color: token.colorSuccess }}>
                          强度：强
                        </div>
                      );
                    }
                    return (
                      <div style={{ color: token.colorError }}>强度：弱</div>
                    );
                  },
                }}
                placeholder={"请输入密码"}
                rules={[
                  {
                    required: true,
                    message: "请输入密码！",
                  },
                ]}
              />
            </>
          )}
          {loginType === "phone" && (
            <>
              <ProFormText
                fieldProps={{
                  size: "large",
                  prefix: <MobileOutlined className={"prefixIcon"} />,
                }}
                name="mobile"
                placeholder={"手机号"}
                rules={[
                  {
                    required: true,
                    message: "请输入手机号！",
                  },
                  {
                    pattern: /^1\d{10}$/,
                    message: "手机号格式错误！",
                  },
                ]}
              />
              <ProFormCaptcha
                fieldProps={{
                  size: "large",
                  prefix: <LockOutlined className={"prefixIcon"} />,
                }}
                captchaProps={{
                  size: "large",
                }}
                placeholder={"请输入验证码"}
                captchaTextRender={(timing, count) => {
                  if (timing) {
                    return `${count} ${"获取验证码"}`;
                  }
                  return "获取验证码";
                }}
                name="captcha"
                rules={[
                  {
                    required: true,
                    message: "请输入验证码！",
                  },
                ]}
                onGetCaptcha={async () => {
                  message.success("获取验证码成功！验证码为：1234");
                }}
              />
            </>
          )}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBlockEnd: 24,
            }}
          >
            <ProFormCheckbox noStyle name="autoLogin">
              自动登录
            </ProFormCheckbox>
            <div style={{ textAlign: "end" }}>
              还没有账号？
              <Link href={"/user/register"}>去注册</Link>
            </div>
          </div>
        </LoginForm>
      </div>
    </ProConfigProvider>
  );
};

export default UserLoginPage;
