import React from 'react';
// @ts-ignore
import { Link, Outlet } from 'umi';
import {StoreProvider} from "@/store";
import "./index.less"

export default function Layout() {
  return (
    <StoreProvider>
      <div className="h-screen ">
        <Outlet />
      </div>
    </StoreProvider>

  );
}
