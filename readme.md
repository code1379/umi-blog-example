# 数据库
https://app.planetscale.com/coderxialuo/umi-blog-excample

# prisma
DATABASE_URL='mysql://plvo1lam5ulx:pscale_pw_w1WWd_SPcp2gTQocgKGL5YcvHijftbI5AhNGHz306t0@jzaxk9bizqct.ap-southeast-2.psdb.cloud/umi-blog-example?sslaccept=strict'

## 还需要查看官方文档 https://docs.planetscale.com/tutorials/prisma-quickstart
## watch this video https://www.youtube.com/watch?v=M5Uq6Gu51Xo

# umi 配置项
https://umijs.org/docs/api/config

## umi 生成页面
```bash
cd src
npx umi g page login posts/post posts/create 
```
Write: pages\login.tsx
Write: pages\login.less
Write: pages\posts\post.tsx
Write: pages\posts\post.less
Write: pages\posts\create.tsx
Write: pages\posts\create.less


## scoop.sh windows 命令行工具？
https://scoop.sh/
```powershell
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser # Optional: Needed to run a remote script the first time

# irm get.scoop.sh | iex # 对我不管用
# 参考 https://community.wappler.io/t/scoop-installer-failed/40795/3
# https://github.com/ScoopInstaller/Install/blob/master/README.md
iwr -useb get.scoop.sh -outfile 'install.ps1'
.\install.ps1 -RunAsAdmin


# 在家不行，在公司可以
scoop bucket add pscale https://github.com/planetscale/scoop-bucket.git
scoop install pscale

scoop update pscale
```

## （第二种方案）直接在官网下载 pscale 的命令 https://github.com/planetscale/cli/releases/tag/v0.100.0

- 将路径添加到 系统的环境变量里面。这样就可以直接使用 pscale 命令，而不需要到目录下面执行 ./pscale.exe 了
- 如果上面 scoop 可以安装的话，这里的第二种方案就不需要使用了

### 常用 pscale 命令
```
1. 登录
pscale auth login
2. 列出当前创建的数据库
pscale database list
3. 列出选择数据库的分支 
pscale branch list umi-blog-example
```

### prisma 常用操作                                                                                                                                                                    ```
prisma db push
prisma studio
```          

### 在线 redis https://console.upstash.com/redis/35aef327-9075-4ddc-bd4b-52a3850fba4d
```
import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: 'https://apn1-relative-halibut-33311.upstash.io',
  token: 'AYIfASQgMzVhZWYzMjctOTA3NS00ZGRjLWJkNGItNTJhMzg1MGZiYTRkYThlMmRmZjBlMTZjNGYwMThjODM5NzQwMDJmMmM2ZDc=',
})
   
const data = await redis.get('key');
```

## 如何在.env 中配置，参考 https://github.dev/upstash/upstash-redis/tree/main/examples/cloudflare-workers