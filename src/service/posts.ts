import {request} from "@/service/request";

export const getPosts = () => request.get("/posts")

export interface IPost {
  author: any
  content:string;
  createAt: string;
  id: number
  imageUrl?: string;
  tags?: string
  title: string
  updateAt: string
}

export const getPostById = (postId: string) => request.get<IPost[]>('/posts', {
  params: {
    postId
  }
})