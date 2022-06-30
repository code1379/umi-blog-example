import React, { useState } from "react";
// @ts-ignore
import styles from "./post.less";
import { useParams } from "@/.umi/exports";
import { useMount, useRequest } from "ahooks";
import { getPostById, IPost } from "@/service/posts";

export default function Page() {
  const { postId } = useParams();
  console.log("postId", postId);

  const [post, setPost] = useState<IPost>({} as IPost);
  const { run: runGetPostById } = useRequest(getPostById, {
    manual: true,
    onSuccess(data) {
      console.log("data111", data);
      setPost(data[0]);
    },
  });

  useMount(() => {
    runGetPostById(postId as string);
  });

  const { data } = useRequest(() => getPostById(postId || ''));
  console.log("data999", data)
  return (
    <div>
      <h1 className="bg-amber-300">{post.title}</h1>
      <p>{post.content}</p>
      <img src={post.imageUrl} />
    </div>
  );
}
