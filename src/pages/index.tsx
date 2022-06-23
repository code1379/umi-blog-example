import React, {useContext, useState} from "react";
// @ts-ignore
import {history} from "umi";
import {StoreContext, StoreProvider} from "@/store";
import {Navigate} from "@/.umi/exports";

const HomePage = () => {
  console.log("history from umi", history);
  const [posts, setPosts] = useState<any[]>();
  const {userStore} = useContext(StoreContext);
  console.log("userStore", userStore);
  if(userStore.isLogin) {
    return (
      <div>
        {!posts && <p>Loading</p>}
        {posts && (
          <div>
            {posts.map((post) => (
              <div key={post.id}>
                <div onClick={() => history.push(`/posts/${post.id}`)}>
                  <p>{post.title}</p>
                </div>
              </div>
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