import React, {useContext, useState} from "react";
// @ts-ignore
import {history} from "umi";
import {StoreContext, StoreProvider} from "@/store";
import {Navigate} from "@/.umi/exports";
import {getPosts} from "@/service/posts";
import {useMount, useRequest} from "ahooks";
import {Button, Card} from "antd";

const { Meta } = Card;

const HomePage = () => {
  console.log("history from umi", history);
  const [posts, setPosts] = useState<any[]>();
  const { run: runGetPosts } = useRequest(getPosts, {
    manual: true,
    onSuccess(data) {
      setPosts(data)
    }
  })
  useMount(() => {
    runGetPosts();
  })

  const {userStore} = useContext(StoreContext);


  console.log("userStore", userStore);
  if(userStore.isLogin) {
    return (
      <div>
        <header>{userStore.userInfo.name}
          <Button onClick={() => history.push("/posts/create")}>创建</Button>
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
    return <Navigate to={"/login"}/>
  }

}

export default HomePage