import React, { useContext, useState } from "react";
// @ts-ignore
import { history } from "umi";
import { StoreContext, StoreProvider } from "@/store";
import { Navigate } from "@/.umi/exports";
import { getPosts } from "@/service/posts";
import { useMount, useRequest } from "ahooks";
import { Avatar, Button, Card, Dropdown, Layout, Menu, Popover } from "antd";
import { axiosLogout } from "@/service/login";
// @ts-ignore
import styles from "./index.less";
import "./global.less";

const { Meta } = Card;
const { Header, Content } = Layout;

// menu
const menuItems = [
  { label: "退出登录", key: "logout" }, // 菜单项务必填写 key
  // { label: "菜单项二", key: "item-2" },
  // {
  //   label: "子菜单",
  //   key: "submenu",
  //   children: [{ label: "子菜单项", key: "submenu-item-1" }],
  // },
];

const HomePage = () => {
  console.log("history from umi", history);
  const [posts, setPosts] = useState<any[]>();
  // 获取文章
  const { run: runGetPosts } = useRequest(getPosts, {
    manual: true,
    onSuccess(data) {
      setPosts(data);
    },
  });
  // 退出登录
  const { run: runLogout } = useRequest(axiosLogout, {
    manual: true,
    onSuccess() {
      console.log("退出登录成功");
    },
  });

  useMount(() => {
    runGetPosts();
  });

  const { userStore } = useContext(StoreContext);

  console.log("userStore", userStore);

  const handleLogout = () => {
    // runLogout();
    userStore.logout();
    history.push("/login");
  };

  const handleMenuItemClick = (item: any) => {
    console.log("    handleMenuItemClick   ", item);
    const { key } = item;
    switch (key) {
      case "logout":
        handleLogout();
        break;
      default:
        throw new Error("key not match");
    }
  };

  if (userStore.isLogin) {
    return (
      <Layout className={styles.home}>
        <Header className={styles.header}>
          <div className={styles.logo}>Blog</div>
          <div className="right">
            <Button
              style={{ marginRight: "10px" }}
              onClick={() => history.push("/posts/create")}
              type="primary"
            >
              创建
            </Button>
            <Popover
              overlayClassName="header-popover"
              // overlay={<Menu onClick={handleMenuItemClick} items={menuItems} />}
              content={<Menu onClick={handleMenuItemClick} items={menuItems} />}
            >
              <span style={{ marginRight: "10px" }}>
                {userStore.userInfo.name}
              </span>
              <Avatar
                style={{ backgroundColor: "#87d068" }}
                size={50}
                src="https://joeschmoe.io/api/v1/random"
              />
            </Popover>
          </div>
        </Header>
        <Content className={styles.content}>
          <div className={styles.main}>
            {!posts && <p>Loading</p>}
            {posts && (
              <div>
                {posts.map((post) => (
                  <Card
                    key={post.id}
                    hoverable
                    style={{ width: 240 }}
                    cover={<img alt="example" src={post.imageUrl} />}
                    onClick={() => history.push(`/posts/${post.id}`)}
                  >
                    <Meta title={post.title} description={post.content} />
                  </Card>
                ))}
              </div>
            )}
          </div>
        </Content>
      </Layout>
    );
  } else {
    return <Navigate to={"/login"} />;
  }
};

export default HomePage;
