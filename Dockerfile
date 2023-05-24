FROM node:18-slim

WORKDIR /app

# アプリケーションのソースコードをコピー
COPY . .

# ポートの解放
EXPOSE 8080
EXPOSE 3000

# 環境変数
ENV HTTP_PORT=8080
ENV SOCKET_PORT=3000

# start
CMD ["npm", "run", "production-start"]
