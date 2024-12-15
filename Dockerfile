FROM node:18-alpine

WORKDIR /app

# 首先只複製 package 文件
COPY package*.json ./

# 安裝依賴
RUN npm install

# 複製其他所有文件
COPY . .

# 設定環境變數
ENV PORT=3000
ENV NODE_ENV=production

# 開放端口
EXPOSE 3000

# 啟動命令
CMD ["npm", "start"]
