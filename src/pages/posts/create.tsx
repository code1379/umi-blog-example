import React from 'react';
import {Form, Input} from "antd";

export default function Page() {
  const [form] = Form.useForm();
  return (
    <div>
      <h1 >Page create</h1>
      <Form>
        <Form.Item>
          <Input/>
        </Form.Item>
        <Form.Item>
          <Input/>
        </Form.Item>
      </Form>
    </div>
  );
}
