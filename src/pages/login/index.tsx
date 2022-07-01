import React, { useContext } from "react";
import { createForm } from "@formily/core";
import { createSchemaField } from "@formily/react";
import { Input, Form, FormItem, Password, Submit } from "@formily/antd";
import { Card, message } from "antd";
import { umiLogin } from "@/service/login";
import { useRequest } from "ahooks";
import { StoreContext } from "@/store";
import { history } from "umi";

// mobx
import { observer } from "mobx-react";
// 样式
// @ts-ignore
import styles from "./login.less";

// TODO 1. 建立领域模型
const loginForm = createForm({
  validateFirst: true,
});

// TODO 2. 添加schemaField 组件
const SchemaField = createSchemaField({
  components: {
    Input,
    Form,
    FormItem,
    Password,
  },
});

// TODO 3. 创建 schema
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

function LoginPage() {
  const { userStore } = useContext(StoreContext);

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

  const handleLogin = (data: any) => {
    runLogin(data);
  };

  return (
    <div className={styles.login}>
      <Card className={styles.card}>
        <h1 className={styles.title}>登录</h1>
        <Form form={loginForm} layout="vertical" onAutoSubmit={handleLogin}>
          <SchemaField schema={schema} />
          <Submit style={{ width: "100%", height: "36px" }}>提交</Submit>
        </Form>
      </Card>
    </div>
  );
}

export default observer(LoginPage);
