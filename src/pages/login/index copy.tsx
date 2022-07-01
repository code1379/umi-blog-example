import React, { useContext } from "react";
import { Button, Card, Space, message } from "antd";
import { umiLogin, fetchLogin, axiosLogin } from "@/service/login";
import { useRequest } from "ahooks";
import { StoreContext } from "@/store";
// @ts-ignore
import { history } from "umi";
import { observer } from "mobx-react";
import { Navigate } from "@/.umi/exports";

// formily
import { createForm } from "@formily/core";
import { createSchemaField } from "@formily/react";
// 引入组件
import { Form, FormItem, Input, Password, Submit } from "@formily/antd";

// TODO 1. 创建领域模型
const loginForm = createForm({
  validateFirst: true,
});
// TODO 2. 添加要使用的组件
const SchemaField = createSchemaField({
  components: {
    Input,
    FormItem,
    Password,
  },
});

// TODO3. 表单使用的 schema
const schema = {
  type: "object",
  properties: {
    email: {
      type: "string",
      title: "邮箱",
      required: true,
      "x-decorator": "FormItem",
      "x-component": "Input",
      "x-component-props": {},
    },
    password: {
      type: "string",
      title: "密码",
      required: true,
      "x-decorator": "FormItem",
      "x-component": "Password",
    },
  },
};

const LoginPage = () => {
  // storeContext
  const { userStore } = useContext(StoreContext);
  const isLogin = userStore.isLogin;

  // 请求
  const { run: runLogin } = useRequest(umiLogin, {
    manual: true,
    onSuccess(res) {
      userStore.setUserInfo(res);
      userStore.login();
      history.push("/");
    },
    onError(err) {
      message.error(err as any);
    },
  });
  const onFinish = () => {
    //   form
    //     .validateFields()
    //     .then((res) => {
    //       console.log("res", res);
    //       runLogin(res);
    //     })
    //     .catch((err) => {
    //       console.error(err);
    //     });
    // };

    const handleRegister = () => {
      console.log("handleRegister");
    };

    return (
      <>
        {!isLogin ? (
          <div className="h-screen relative flex justify-center items-center">
            <Card style={{ width: 500, marginTop: -60 }}>
              <h1 className="font-bold text-center text-4xl leading-loose">
                登录
              </h1>
              {/* <Form
                form={loginForm}
                layout="vertical"
                size="large"
                onAutoSubmit={console.log}
              >
                <SchemaField schema={schema} />
                <Submit block size="large">
                  登录
                </Submit>
              </Form> */}
            </Card>
          </div>
        ) : (
          <Navigate to={"/"} />
        )}
      </>
    );
  };
};

export default LoginPage;
