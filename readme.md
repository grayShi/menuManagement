<!--
 * @Date: 2021-06-14 23:24:35
 * @LastEditTime: 2021-06-16 22:36:33
-->

数据库更改

desk 表  
type: varchar(20)

order 表  
增加 orderStatus: int(11)

1 已下单  
2 菜已经上齐  
3 已结账  
4 已取消

order 表改成 orders

---

前端文件夹 /fronted  
后端文件夹 /service

---

前端服务启动

cd fronted  
npm install (第一次启动运行此命令，后续不需要这个命令,跳过此步骤)  
npm run start

---

后端服务配置数据库

修改 /service/config/config.default.js

第 31 行

client: {  
 host: 数据库地址,  
 port: 端口号,  
 user: 用户名,  
 password: 密码,  
 database: 数据库名称  
}

后端服务启动

cd service  
npm install (第一次启动运行此命令，后续不需要这个命令,跳过此步骤)  
npm run dev

---
2021.06.16  

新增 childdesk 表  
修改 orders表 restaurantChildDeskId  
sql文件已更新  

---

新增qrcode

需要安装包  
cd fronted  
npm install

