export default {
  npmClient: "pnpm",
  // 其中，apiRoute 这个配置项告诉 Umi 我们的项目启用了 API 路由 这个功能，而 platform: 'vercel' 代表我们要部署到 Vercel 平台，在 umi build 的时候会针对这个平台来将 API 路由进行打包。
  apiRoute: {
    platform: "vercel",
  },
  routes: [
    { exact: true, path: "/", component: "index" },
    { exact: true, path: "/posts/create", component: "posts/create" },
    { exact: true, path: "/login", component: "login" },
    { exact: true, path: "/posts/:postId", component: "posts/post" },
  ],
  tailwindcss: {},
  plugins: ["@umijs/plugins/dist/tailwindcss"],
  // plugins: [require.resolve('@umijs/plugins/dist/tailwindcss')],
};
