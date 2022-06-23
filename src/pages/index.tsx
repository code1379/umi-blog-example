import React, { useState } from "react";
import { history } from "umi";

export default function HomePage() {
  console.log("history from umi", history);
  const [posts, setPosts] = useState<any[]>();
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
}
