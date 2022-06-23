import React, {useContext} from 'react'
import {Button} from 'antd';

const LoginPage = () => {
  return <>
    <div className="h-screen relative">
      <div
        className="absolute -mt-32 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/3 h-96 rounded-2xl shadow-2xl">
          <Button>登录</Button>
      </div>
    </div>
  </>
}
export default LoginPage