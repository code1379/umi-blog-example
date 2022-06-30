import type { UmiApiRequest, UmiApiResponse } from "umi";

export default async function (req: UmiApiRequest, res: UmiApiResponse) {
  console.log("用户退出登录");
  console.log("req", req.body);
  switch (req.method) {
    case "POST":
      res.status(200).setCookie("token", "");
      break;
    default:
      res.status(405).json({ error: "Method not allowed" });
  }
}
