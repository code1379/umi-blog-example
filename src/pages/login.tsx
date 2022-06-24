import React, {useContext} from 'react'
import {Button, Card, Form, Input, Space, message} from 'antd';
import {umiLogin, fetchLogin, axiosLogin} from "@/service/login";
import {useRequest} from 'ahooks'
import {StoreContext} from "@/store";
// @ts-ignore
import {history} from "umi";
import {observer} from "mobx-react";
import {Navigate} from "@/.umi/exports";

const LoginPage = () => {

  const [form] = Form.useForm();
  // storeContext
  const {userStore} = useContext(StoreContext);
  const isLogin = userStore.isLogin

  // 请求
  const {run: runLogin} = useRequest(umiLogin, {
    manual: true,
    onSuccess(res) {
      userStore.setUserInfo(res);
      userStore.login();
      history.push("/")
    },
    onError(err) {
      message.error(err as any)
    }
  })
  const onFinish = () => {
    form.validateFields().then(res => {
      console.log("res", res)
      runLogin(res)
    }).catch(err => {
      console.error(err)
    })
  }

  const handleRegister = () => {
    console.log("handleRegister")
  }

  return <>
    {
      !isLogin ? <div className="h-screen relative flex justify-center items-center">
          <Card style={{width: 500, marginTop: -60}}>
            <h1 className="font-bold text-center text-4xl leading-loose">登录</h1>
            <Form form={form}
                  labelCol={{span: 4}}
                  wrapperCol={{span: 20}}
                  onFinish={onFinish}
            >
              <Form.Item name="email"
                         label={"email"}
                         rules={[{required: true, message: 'Please input your email!'}]}
                // initialValue={'v.fcs@jxfcdhkaui.ru'}
                         initialValue={'b.bondijl@imhomr.gn'}
              >
                <Input></Input>
              </Form.Item>
              <Form.Item
                name="password"
                label={"password"}
                rules={[{required: true, message: 'Please input your password!'}]}
                initialValue={'123456'}
              >
                <Input type={"password"}></Input>
              </Form.Item>
              <Form.Item wrapperCol={{offset: 4, span: 16}}>
                <Space>
                  <Button type="primary" htmlType="submit">
                    登录
                  </Button>
                  <Button onClick={handleRegister}>
                    去注册
                  </Button>
                </Space>
              </Form.Item>
            </Form>
          </Card>

        </div>
        : <Navigate to={"/"}/>
    }
  </>
}
export default observer(LoginPage)