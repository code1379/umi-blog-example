import React, { useContext, useState } from "react";
// @ts-ignore
import { history } from "umi";
import { StoreContext, StoreProvider } from "@/store";
import { Navigate } from "@/.umi/exports";
import { getPosts } from "@/service/posts";
import { useMount, useRequest } from "ahooks";
import { Button, Card } from "antd";
import { axiosLogout } from "@/service/login";

const { Meta } = Card;

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

  if (userStore.isLogin) {
    return (
      <div>
        <header>
          {userStore.userInfo.name}
          <Button onClick={() => history.push("/posts/create")}>创建</Button>
          <Button onClick={handleLogout}>退出登录</Button>
        </header>
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
    );
  } else {
    return <Navigate to={"/login"} />;
  }
};

export default HomePage;
