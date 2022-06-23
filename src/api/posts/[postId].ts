import type { UmiApiRequest, UmiApiResponse } from "umi";
// 引入 prismaClient
import { PrismaClient } from "@prisma/client";
// 引入 redis
import { Redis } from "@upstash/redis";
export default async function (req: UmiApiRequest, res: UmiApiResponse) {
  let prisma: PrismaClient;
  switch (req.method) {
    case "GET":
      const redis = Redis.fromEnv();
      // TODO 从 redis 中读取数据
      let post = await redis.get("post-" + req.params.postId);
      // TODO 如果从缓存中找到文章 直接返回
      if (post) {
        res.status(200).json(post);
        return;
      }
      // TODO 如果没找到，则从数据库读取，然后存储到缓存中，并返回
      if (!post) {
        // TODO 连接数据库 查询
        prisma = new PrismaClient();
        post = await prisma.post.findUnique({
          where: { id: +req.params.postId },
          include: { author: true },
        });

        // TODO 如果有文章则返回
        if (post) {
          res.status(200).json(post);
        } else {
          res.status(404).json({ error: "Post not found." });
        }
        // TODO 不管怎么样？我们都存储到缓存中
        await redis.set("post-" + req.params.postId, JSON.stringify(post));

        // prisma 断开连接
        await prisma.$disconnect();
      }

      break;
    default:
      res.status(405).json({ error: "Method not allowed" });
  }
}
