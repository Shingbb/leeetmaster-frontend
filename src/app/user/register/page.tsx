"use client";

import { LockOutlined, UserOutlined } from "@ant-design/icons";
import {
  LoginForm,
  ProConfigProvider,
  ProFormText,
} from "@ant-design/pro-components";
import { message, theme } from "antd";
import { ProForm } from "@ant-design/pro-form";
import { useRouter } from "next/navigation";
import { userRegisterUsingPost } from "@/api/user";
import Link from "next/link";
import "./index.css";
import Image from "next/image";

/**
 * 用户注册页面
 * @constructor
 */
const UserRegisterPage: React.FC = () => {
  const { token } = theme.useToken();
  const [form] = ProForm.useForm();
  const router = useRouter();

  /**
   * 提交
   */
  const doSubmit = async (values: API.UserLoginRequest) => {
    try {
      const res = await userRegisterUsingPost(values);
      if (res.data) {
        message.success("注册成功，请登录");
        // 前往登录页
        router.replace("/user/login");
        form.resetFields();
      }
    } catch (e) {
      message.error("注册失败，" + e.message);
    }
  };

  return (
    <ProConfigProvider hashed={false}>
      <div
        id="userRegisterPage"
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
          title="面试大师 LeetMaster - 用户注册"
          subTitle="程序员面试刷题网站"
          onFinish={doSubmit}
        >
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
                      <div style={{ color: token.colorWarning }}>强度：中</div>
                    );
                  }
                  if (status === "ok") {
                    return (
                      <div style={{ color: token.colorSuccess }}>强度：强</div>
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
            <ProFormText.Password
              name="checkPassword"
              fieldProps={{
                size: "large",
                prefix: <LockOutlined />,
              }}
              placeholder={"请输入确认密码"}
              rules={[
                {
                  required: true,
                  message: "请输入密码！",
                },
              ]}
            />
          </>
          <div
            style={{
              marginBlockEnd: 24,
              textAlign: "end",
            }}
          >
            已有账号？
            <Link href={"/user/login"}>去登录</Link>
          </div>
        </LoginForm>
      </div>
    </ProConfigProvider>
  );
};

export default UserRegisterPage;
